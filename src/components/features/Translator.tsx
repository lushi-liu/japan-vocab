'use client';

import { useState } from 'react';
import Button from '@/src/components/ui/Button';

export default function Translator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [readingData, setReadingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEnglishSource, setIsEnglishSource] = useState(true);

  const handleTranslate = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({
          text: input,
          targetLang: isEnglishSource ? 'JA' : 'EN',
        }),
      });
      const data = await res.json();
      setResult(data.translation);
      setReadingData(data.readingData || []);
    } catch (err) {
      setResult('Error translating.');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    setIsEnglishSource(!isEnglishSource);
    setInput(result);
    setResult('');
    setReadingData([]);
  };

  const saveWord = async () => {
    if (!result || !input) return;

    const res = await fetch('/api/words', {
      method: 'POST',
      body: JSON.stringify({
        english: isEnglishSource ? input : result,
        japanese: isEnglishSource ? result : input,
        reading: isEnglishSource ? JSON.stringify(readingData) : '',
      }),
    });

    if (res.ok) {
      alert('Word added!');
      setResult('');
      setInput('');
      setReadingData([]);
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to save');
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            {isEnglishSource ? 'English' : 'Japanese'}
          </span>
          <button
            onClick={swapLanguages}
            className="rounded-full p-2 transition-colors hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-600"
            >
              <path d="m7 21-4-4 4-4" />
              <path d="M3 17h18" />
              <path d="m17 3 4 4-4 4" />
              <path d="M21 7H3" />
            </svg>
          </button>
          <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            {isEnglishSource ? 'Japanese' : 'English'}
          </span>
        </div>

        <textarea
          className="h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-slate-900 focus:outline-none"
          placeholder={isEnglishSource ? 'Type English...' : '日本語を入力...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="relative">
          <div className="flex min-h-[128px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4 text-3xl font-medium text-slate-900">
            {loading ? (
              <span className="animate-pulse text-lg text-slate-400">
                Translating...
              </span>
            ) : isEnglishSource && readingData.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-x-1">
                {readingData.map((item, idx) => (
                  <ruby key={idx}>
                    {item.surface}
                    {item.reading && (
                      <>
                        <rp>(</rp>
                        <rt className="text-[0.45em] font-normal text-blue-600">
                          {item.reading}
                        </rt>
                        <rp>)</rp>
                      </>
                    )}
                  </ruby>
                ))}
              </div>
            ) : (
              <span>{result}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={handleTranslate} variant="primary">
          Translate
        </Button>
        <Button onClick={saveWord} variant="secondary">
          Add to Collection
        </Button>
      </div>
    </div>
  );
}
