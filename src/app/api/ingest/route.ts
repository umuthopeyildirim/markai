import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from "langchain/text_splitter";

import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { auth } from '@clerk/nextjs';

export const runtime = "edge";

async function handleExtension(extension: string, content: string, brand_id: string, client: any) {
  let splitter;
  
  if (extension === "txt") {
    splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 256,
      chunkOverlap: 20,
    });
  } else {
    const language = extension === "md" ? "markdown" : "html";
    splitter = RecursiveCharacterTextSplitter.fromLanguage(language, {
      chunkSize: 256,
      chunkOverlap: 20,
    });
  }

  const splitDocuments = await splitter.createDocuments(
    [content],
    [{ brand_id: brand_id }],
  );

  const vectorstore = await SupabaseVectorStore.fromDocuments(
    splitDocuments,
    new OpenAIEmbeddings(
      {
        openAIApiKey: process.env.NEXT_SECRET_OPENAI_API_KEY!,
      }
    ),
    {
      client,
      tableName: "brand_documents",
      queryName: "match_brand_documents",
    }
  );
}

export async function POST(req: NextRequest) {
  const { userId, getToken } = auth();
  if(!userId){
    return NextResponse.json({ error: "Not logged in." }, { status: 403 });
  }
  const token = await getToken({template: "supabase"});
  const body = await req.json();
  const {name, content, brand_id, knowledge_id} = body;

  // Get file extension
  const extension = name.split(".").pop();
  
  // Accept these file types
  // Markdown, Text, HTML
  if (!["md", "txt", "html"].includes(extension)) {
    return NextResponse.json(
      {
        error: [
          "File type not supported.",
          "Please upload a markdown, text, or html file.",
        ].join("\n"),
      },
      { status: 403 },
    );
  }

  try {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      }
    );

    await handleExtension(extension, content, brand_id, client);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
