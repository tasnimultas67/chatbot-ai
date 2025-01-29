import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Error processing your request" },
      { status: 500 }
    );
  }
}
