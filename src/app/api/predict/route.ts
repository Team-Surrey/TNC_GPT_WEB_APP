"use server"
import callPredict from "@/lib/predict"
import { NextResponse } from "next/server"


export async function GET(req:any) {
    const text= req.nextUrl.searchParams.get(["text"])
    const prediction = await callPredict(text)
    console.log()
    return NextResponse.json(prediction[0].predictions[0].structValue.fields.content.stringValue)
}