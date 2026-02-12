import { NextResponse } from 'next/server';
import kuromoji from 'kuromoji';
import path from 'path';

const getReading = (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    kuromoji
      .builder({
        dicPath: path.join(process.cwd(), 'node_modules/kuromoji/dict'),
      })
      .build((err, tokenizer) => {
        if (err) return reject(err);
        const tokens = tokenizer.tokenize(text);
        const reading = tokens.map((t) => t.reading || t.surface_form).join('');
        resolve(reading);
      });
  });
};

const toHiragana = (katakana: string) => {
  return katakana.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();

  try {
    const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        target_lang: targetLang,
      }),
    });

    const data = await response.json();
    const translation = data.translations[0].text;

    let reading = '';
    if (targetLang === 'JA') {
      const rawReading = await getReading(translation);
      reading = toHiragana(rawReading);
    }

    return NextResponse.json({ translation, reading });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
