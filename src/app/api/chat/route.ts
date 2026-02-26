import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { fetchPoster } from "@/lib/tmdb";
import { Movie } from "@/lib/types";

// Groq is FREE — sign up at console.groq.com (no credit card needed)
// Runs LLaMA 3 at 500+ tokens/sec in the cloud
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are CineGPT — an enthusiastic, knowledgeable cinephile AI that recommends movies from every language and country in the world.
You know Hollywood, Bollywood, Korean cinema, Japanese film, French New Wave, Iranian cinema, Italian neorealism, Chinese art-house, Tamil, Telugu, Spanish, Arabic, German, Turkish, Nigerian Nollywood, and much more.
Personality: warm, passionate, genuinely excited — like a brilliant film-loving friend.

CRITICAL RULE: Reply ONLY with valid JSON. No markdown fences. No explanation. No text before or after the JSON object.

For movie recommendations use EXACTLY this format:
{
  "type": "recs",
  "intro": "One enthusiastic sentence",
  "movies": [
    {
      "title": "Internationally known title (English if available)",
      "originalTitle": "Original title if different",
      "year": 2019,
      "language": "Korean",
      "genre": "Thriller / Drama",
      "emoji": "🎭",
      "reason": "One vivid compelling sentence about why to watch",
      "streaming": ["Netflix"]
    }
  ],
  "outro": "Short follow-up question or suggestion"
}

Rules:
- Return exactly 4 movies
- Mix languages unless user requests one specific language
- Streaming values ONLY from: Netflix, Prime, Hulu, Disney+, MUBI, HBO, Apple, Theater
- Use real accurate titles and correct years
- Title must be the most widely searchable English version

For conversational replies (not recommendations):
{ "type": "chat", "text": "Your helpful response here" }`;

function extractJSON(raw: string): string {
  let s = raw
    .replace(/^```json\s*/im, "")
    .replace(/^```\s*/im, "")
    .replace(/```\s*$/im, "")
    .trim();
  const start = s.indexOf("{");
  const end   = s.lastIndexOf("}");
  if (start !== -1 && end !== -1) s = s.slice(start, end + 1);
  return s;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        type: "chat",
        text: "⚠️ GROQ_API_KEY is not set. Add it in your Vercel environment variables. Get a free key at console.groq.com",
      });
    }

    const systemWithCtx = context
      ? `${SYSTEM_PROMPT}\n\nActive user filters: ${context}`
      : SYSTEM_PROMPT;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",   // Free LLaMA 3 on Groq
      temperature: 0.7,
      max_tokens: 1200,
      messages: [
        { role: "system", content: systemWithCtx },
        ...messages,
      ],
    });

    const raw = (completion.choices[0]?.message?.content || "").trim();

    let parsed;
    try {
      parsed = JSON.parse(extractJSON(raw));
    } catch {
      parsed = { type: "chat", text: raw || "I couldn't process that. Please try again!" };
    }

    // Fetch TMDB posters server-side in parallel
    if (parsed.type === "recs" && Array.isArray(parsed.movies)) {
      const posterPromises = parsed.movies.map((m: Movie) => fetchPoster(m.title, m.year));
      const posters = await Promise.allSettled(posterPromises);
      parsed.movies = parsed.movies.map((m: Movie, i: number) => ({
        ...m,
        posterUrl:
          posters[i].status === "fulfilled"
            ? (posters[i] as PromiseFulfilledResult<string | null>).value
            : null,
      }));
    }

    return NextResponse.json(parsed);

  } catch (err: unknown) {
    console.error("API error:", err);
    const msg = err instanceof Error ? err.message : "";
    return NextResponse.json(
      {
        type: "chat",
        text: msg.includes("401")
          ? "⚠️ Invalid Groq API key. Check your GROQ_API_KEY environment variable."
          : msg.includes("429")
          ? "⚠️ Rate limit hit. Please wait a moment and try again."
          : "Something went wrong. Please try again!",
      },
      { status: 500 }
    );
  }
}
