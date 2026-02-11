'use client';

import { useState } from 'react';
import Button from '@/src/components/ui/Button';

export default function Translator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setResult(data.translation);
    } catch (err) {
      setResult('Error translating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col gap-4">
        <div className="text-left">
          <label className="text-sm font-semibold text-slate-600">
            English
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border border-slate-200 p-3 focus:ring-2 focus:ring-slate-900 focus:outline-none"
            placeholder="e.g. Morning"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="text-left">
          <label className="text-sm font-semibold text-slate-600">
            Japanese Translation
          </label>
          <div className="mt-1 min-h-[56px] w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-lg font-medium">
            {loading ? (
              <span className="text-slate-400">Thinking...</span>
            ) : (
              result || <span className="text-slate-300">...</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={handleTranslate} variant="secondary">
          Translate
        </Button>
        <Button onClick={() => console.log('Saving...')}>Add Word</Button>
      </div>
    </div>
  );
}
