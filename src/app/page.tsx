'use client';

import Translator from '@/src/components/features/Translator';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            Japan Vocab <span className="text-red-500">🇯🇵</span>
          </h1>
          <p className="mt-2 text-slate-500">
            Start building your personal dictionary.
          </p>
        </header>
        <Translator />
      </div>
    </main>
  );
}
