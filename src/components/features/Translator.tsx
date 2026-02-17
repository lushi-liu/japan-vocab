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
      setResult('Error.');
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
      alert('Saved');
      setResult('');
      setInput('');
      setReadingData([]);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <span
          className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${isEnglishSource ? 'text-teal-400' : 'text-slate-600'}`}
        >
          {isEnglishSource ? 'English' : 'Japanese'}
        </span>
        <button
          onClick={swapLanguages}
          className="rounded-full bg-slate-800/40 p-2.5 text-slate-500 transition-all hover:bg-slate-800 hover:text-teal-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </button>
        <span
          className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${!isEnglishSource ? 'text-teal-400' : 'text-slate-600'}`}
        >
          {!isEnglishSource ? 'English' : 'Japanese'}
        </span>
      </div>

      <div className="space-y-8">
        <textarea
          className="min-h-[80px] w-full resize-none bg-transparent text-2xl font-light text-slate-100 placeholder-slate-800 outline-none"
          placeholder={isEnglishSource ? 'Enter text...' : '文章を入力...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex min-h-[120px] items-center justify-center rounded-3xl border border-slate-800/30 bg-slate-950/30 p-8 backdrop-blur-sm">
          {loading ? (
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500" />
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500 [animation-delay:200ms]" />
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500 [animation-delay:400ms]" />
            </div>
          ) : isEnglishSource && readingData.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-6">
              {readingData.map((item, idx) => (
                <ruby key={idx} className="text-4xl font-medium text-white">
                  {item.surface}
                  {item.reading && (
                    <rt className="text-[0.4em] text-teal-400 opacity-80">
                      {item.reading}
                    </rt>
                  )}
                </ruby>
              ))}
            </div>
          ) : (
            <p className="text-center text-4xl font-medium text-white">
              {result || <span className="text-slate-800 italic">Result</span>}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={handleTranslate}>Translate</Button>
        <Button onClick={saveWord} variant="secondary">
          Save Word
        </Button>
      </div>
    </div>
  );
}
