import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";

const fallbackSets = [
  "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?",
  "What's the best trip you've ever taken?||If you could learn any skill instantly, what would it be?||What's a movie you can watch over and over?",
  "What's your go-to comfort food?||If you could live anywhere in the world, where would it be?||What's a book that changed your perspective?",
  "What's the most interesting thing you've learned recently?||If you had a free day with no responsibilities, how would you spend it?||What's a goal you're working towards right now?",
  "What's the best advice you've ever received?||If you could start a business, what would it be?||What's something you're grateful for today?",
];

function getFallbackResponse() {
  const randomIndex = Math.floor(Math.random() * fallbackSets.length);
  return new Response(fallbackSets[randomIndex], {
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform. Avoid personal or sensitive topics. Only return the three questions separated by '||', nothing else.";

    const result = await streamText({
      model: google("gemini-2.0-flash-lite"),
      prompt: prompt,
      maxRetries: 0,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI suggestion failed, using fallback");
    return getFallbackResponse();
  }
}