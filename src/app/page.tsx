'use client';

import Translator from '@/src/components/features/Translator';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 pt-24">
      <div className="w-full max-w-xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tight text-white">
            Japan<span className="font-bold text-teal-500">Vocab</span>
          </h1>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-teal-500/30" />
          <p className="mt-4 text-sm font-medium tracking-wide text-slate-500 uppercase">
            Build your personal dictionary
          </p>
        </header>

        <section className="rounded-3xl border border-slate-800/50 bg-slate-900/20 p-8 shadow-xl backdrop-blur-sm">
          <Translator />
        </section>
      </div>
    </main>
  );
}
