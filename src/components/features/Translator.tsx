'use client';

import { useState } from 'react';

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
      alert('Word added to collection!');
      setResult('');
      setInput('');
      setReadingData([]);
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to save');
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 px-2 pb-4">
        <span
          className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isEnglishSource ? 'text-teal-400' : 'text-slate-600'}`}
        >
          {isEnglishSource ? 'English' : 'Japanese'}
        </span>

        <button
          onClick={swapLanguages}
          className="rounded-full bg-slate-800/50 p-2 text-slate-400 transition-colors hover:text-teal-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          className={`text-[10px] font-bold tracking-[0.2em] uppercase ${!isEnglishSource ? 'text-teal-400' : 'text-slate-600'}`}
        >
          {!isEnglishSource ? 'English' : 'Japanese'}
        </span>
      </div>

      <div className="space-y-6">
        <textarea
          className="min-h-[60px] w-full resize-none bg-transparent text-xl font-light text-slate-200 placeholder-slate-700 outline-none"
          placeholder={isEnglishSource ? 'Type something...' : '文章を入力...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex min-h-[100px] items-center justify-center rounded-2xl border border-slate-800/30 bg-slate-950/40 p-6">
          {loading ? (
            <div className="flex space-x-1.5">
              <div className="h-1 w-1 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.3s]" />
              <div className="h-1 w-1 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.15s]" />
              <div className="h-1 w-1 animate-bounce rounded-full bg-teal-500" />
            </div>
          ) : isEnglishSource && readingData.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-5">
              {readingData.map((item, idx) => (
                <ruby key={idx} className="text-3xl font-medium text-white">
                  {item.surface}
                  {item.reading && (
                    <rt className="text-[0.45em] text-teal-500/80">
                      {item.reading}
                    </rt>
                  )}
                </ruby>
              ))}
            </div>
          ) : (
            <p className="text-center text-3xl font-medium text-white">
              {result || (
                <span className="text-xl text-slate-800 italic">
                  Translation
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 pt-2">
        <button
          onClick={handleTranslate}
          className="rounded-full bg-teal-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition-all hover:bg-teal-500 active:scale-95"
        >
          Translate
        </button>
        <button
          onClick={saveWord}
          className="rounded-full border border-slate-700 px-8 py-2.5 text-sm font-bold text-slate-400 transition-all hover:border-slate-500 hover:text-slate-200 active:scale-95"
        >
          Save
        </button>
      </div>
    </div>
  );
}
