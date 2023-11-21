import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { createClient } from "@supabase/supabase-js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { Document } from "langchain/document";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import {
  BytesOutputParser,
  StringOutputParser,
} from "langchain/schema/output_parser";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const runtime = "edge";

type ConversationalRetrievalQAChainInput = {
  question: string;
  chat_history: VercelChatMessage[];
};

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;
const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE,
);

const ANSWER_TEMPLATE = `You are an helpful assistant named "MarkAI", your task is to analyze the following conversation and give an answer, if you are not sure about the answer, you can say "I'm sorry, but I don't know the answer to your question. Why don't you try to give me some more context?".

Answer the question based only on the following context:
{context}

Question: {question}
`;
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

/**
 * This handler initializes and calls a retrieval chain. It composes the chain using
 * LangChain Expression Language. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#conversational-retrieval-chain
 */
// We switched to Agent retrieval chain.
// This is only example code.
async function retrieval(req: NextRequest) {
  try {
    const body = await req.json();
    const brand_id = body.brand_id;
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_SECRET_OPENAI_API_KEY!,
      modelName: "gpt-3.5-turbo",
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

    const retriever = vectorstore.asRetriever();

    /**
     * We use LangChain Expression Language to compose two chains.
     * To learn more, see the guide here:
     *
     * https://js.langchain.com/docs/guides/expression_language/cookbook
     */
    const standaloneQuestionChain = RunnableSequence.from([
      {
        question: (input: ConversationalRetrievalQAChainInput) =>
          input.question,
        chat_history: (input: ConversationalRetrievalQAChainInput) =>
          formatVercelMessages(input.chat_history),
      },
      condenseQuestionPrompt,
      model,
      new StringOutputParser(),
    ]);

    const answerChain = RunnableSequence.from([
      {
        context: retriever.pipe(combineDocumentsFn),
        question: new RunnablePassthrough(),
      },
      answerPrompt,
      model,
      new BytesOutputParser(),
    ]);

    const conversationalRetrievalQAChain =
      standaloneQuestionChain.pipe(answerChain);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: previousMessages,
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

