'use client';

import { useState } from 'react';
import Button from '@/src/components/ui/Button';

export default function WordForm() {
  const [english, setEnglish] = useState('');
  const [japanese, setJapanese] = useState('');
  const [loading, setLoading] = useState(false);

  const translateWord = async () => {
    if (!english) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(english)}&langpair=en|ja`
      );
      const data = await res.json();
      setJapanese(data.responseData.translatedText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4 text-left">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            English
          </label>
          <input
            type="text"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="Type a word..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Japanese
          </label>
          <div className="min-h-[42-px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900">
            {loading ? 'Translating...' : japanese || '...'}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={translateWord} variant="secondary">
          Check Translation
        </Button>
        <Button onClick={() => console.log('Saving:', { english, japanese })}>
          Add to Vocabulary
        </Button>
      </div>
    </div>
  );
}
