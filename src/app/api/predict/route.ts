"use server";
import callPredict from "@/lib/predict";
import { NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";

export async function GET(req: any) {
  const text = req.nextUrl.searchParams.get(["text"]);
  const prediction = await callPredict(text);
  console.log();
  return NextResponse.json(
    prediction[0].predictions[0].structValue.fields.content.stringValue
  );
}

// async function openAiPredict(prompt) {
//   const llm = new OpenAi({
//     temperature: 0.9
//   })
//   const chatModel = new ChatOpenAi()
  
//   const result = await chatModel.predict(prompt)



// }