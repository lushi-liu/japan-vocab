import kuromoji from 'kuromoji';

export async function getReading(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    kuromoji
      .builder({ dicPath: 'node_modules/kuromoji/dict' })
      .build((err, tokenizer) => {
        if (err) reject(err);
        const path = tokenizer.tokenize(text);
        const reading = path
          .map((token) => token.reading || token.surface_form)
          .join('');
        resolve(reading);
      });
  });
}
