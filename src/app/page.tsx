'use client';

import Translator from '@/src/components/features/Translator';

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 pt-32">
      <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full max-w-4xl -translate-x-1/2">
        <div className="absolute top-[10%] left-[10%] h-64 w-64 rounded-full bg-teal-500/10 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[10%] h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-5xl font-extralight tracking-tighter text-white">
            Japan<span className="font-black text-teal-500">Vocab</span>
          </h1>
          <p className="text-[10px] font-black tracking-[0.4em] text-slate-600 uppercase">
            Personal Language Collection
          </p>
        </div>

        <section className="rounded-[2.5rem] border border-slate-800/40 bg-slate-900/10 p-10 shadow-2xl backdrop-blur-md">
          <Translator />
        </section>
      </div>
    </main>
  );
}
