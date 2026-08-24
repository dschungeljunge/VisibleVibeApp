import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  phase?: string;
  task?: string;
  why?: string;
  board?: string;
  text?: string;
  coach?: string;
  notes?: unknown;
};

const SYSTEM = `Du bist Coach in der VisibleVibe-Methode. Du passt eine kurze Whiteboard-Anleitung an das an, was eine Lehrperson bereits notiert hat.

Regeln:
- Deutsch, Du-Form, schweizerische Schreibweise (ss statt ß)
- Höchstens 70 Wörter
- Eine klare Handlung auf dem Board
- Nimm Formulierungen vom Board auf
- Keine neue Theorie, keine Feature-Liste, keine App-Idee, wenn der Schritt das nicht verlangt
- Kein Smalltalk, keine Überschrift`;

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "unavailable" }, { status: 501 });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const notes = Array.isArray(payload.notes)
    ? payload.notes
        .filter((note): note is string => typeof note === "string" && note.trim().length > 0)
        .slice(0, 8)
        .map((note) => note.slice(0, 180))
    : [];

  if (!notes.length) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const user = [
    `Phase: ${payload.phase ?? ""}`,
    `Aufgabe: ${payload.task ?? ""}`,
    `Warum: ${payload.why ?? ""}`,
    `Board-Auftrag: ${payload.board ?? ""}`,
    `Originaltext: ${payload.text ?? ""}`,
    `Coach-Hinweis: ${payload.coach ?? ""}`,
    `Notizen vom Board:`,
    ...notes.map((note) => `- ${note}`),
  ].join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 220,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: user.slice(0, 3500) },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const instruction = data.choices?.[0]?.message?.content?.trim();
    if (!instruction) {
      return NextResponse.json({ error: "empty-model" }, { status: 502 });
    }

    return NextResponse.json({ instruction });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
