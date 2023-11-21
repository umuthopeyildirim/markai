import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { createClient } from "@supabase/supabase-js";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { AIMessage, ChatMessage, HumanMessage } from "langchain/schema";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  createRetrieverTool,
  OpenAIAgentTokenBufferMemory,
} from "langchain/agents/toolkits";
import { ChatMessageHistory } from "langchain/memory";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

export const runtime = "edge";

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

const TEMPLATE = `You are an helpful assistant named "MarkAI". If you don't know how to answer a question, use the available tools to look up relevant information.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brand_id = body.brand_id;
    // Check brand id for validation
    if (!brand_id) {
      return NextResponse.json({ error: "brand_id is either empty or wrong." }, { status: 400 });
    }
    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === "user" || message.role === "assistant",
    );
    const returnIntermediateSteps = body.show_intermediate_steps;
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_SECRET_OPENAI_API_KEY!,
      modelName: "gpt-3.5-turbo",
      // This was used so I could track usage of the model in Cloudflare Dashboard
      // for more info: https://developers.cloudflare.com/ai-gateway/
      configuration: {
        baseURL: "https://gateway.ai.cloudflare.com/v1/d26499da33ddd3d0e13f3a8efb2708d1/markai/openai",
      },
    });

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    );
    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(
      {
      openAIApiKey: process.env.NEXT_SECRET_OPENAI_API_KEY!,
    }
    ), {
      client,
      tableName: "brand_documents",
      queryName: "match_brand_documents",
      filter:{
        "brand_id": brand_id
      }
    });

    const chatHistory = new ChatMessageHistory(
      previousMessages.map(convertVercelMessageToLangChainMessage),
    );

    const memory = new OpenAIAgentTokenBufferMemory({
      llm: model,
      memoryKey: "chat_history",
      outputKey: "output",
      chatHistory,
    });

    const retriever = vectorstore.asRetriever();

    const tool = createRetrieverTool(retriever, {
      name: "search_latest_knowledge",
      description: "Searches and returns up-to-date general information.",
    });

    const executor = await initializeAgentExecutorWithOptions([tool], model, {
      agentType: "openai-functions",
      memory,
      returnIntermediateSteps: true,
      verbose: true,
      agentArgs: {
        prefix: TEMPLATE,
      },
    });

    const result = await executor.call({
      input: currentMessageContent,
    });

    if (returnIntermediateSteps) {
      return NextResponse.json(
        { output: result.output, intermediate_steps: result.intermediateSteps },
        { status: 200 },
      );
    } else {
      // Agent executors don't support streaming responses (yet!), so stream back the complete response one
      // character at a time to simluate it.
      const textEncoder = new TextEncoder();
      const fakeStream = new ReadableStream({
        async start(controller) {
          for (const character of result.output) {
            controller.enqueue(textEncoder.encode(character));
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          controller.close();
        },
      });

      return new StreamingTextResponse(fakeStream);
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
