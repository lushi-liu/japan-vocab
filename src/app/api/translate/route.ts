import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        target_lang: 'JA',
      }),
    });

    const data = await response.json();
    return NextResponse.json({ translation: data.translations[0].text });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
