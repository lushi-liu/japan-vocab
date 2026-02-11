'use client';

import WordForm from '@/src/components/features/WordForm';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Japan Vocab <span className="text-red-500">日本語</span>
          </h1>
          <p className="text-slate-500">
            Translate and save new words to your deck.
          </p>
        </header>

        <WordForm />
      </div>
    </main>
  );
}
