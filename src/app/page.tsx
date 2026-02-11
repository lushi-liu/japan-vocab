'use client';
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Japan Vocab <span className="text-red-500">日本語</span>
          </h1>
          <p className="text-slate-500">
            Master your Japanese vocabulary, one word at a time.
          </p>
        </header>

        <div className="pt-4">
          <button
            className="group relative inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none"
            onClick={() => alert('Add word logic coming soon!')}
          >
            <span className="mr-2 text-lg">+</span>
            Add Word
          </button>
        </div>

        <footer className="border-t border-slate-50 pt-8">
          <p className="text-xs font-medium tracking-widest text-slate-400 uppercase">
            Your list is currently empty
          </p>
        </footer>
      </div>
    </main>
  );
}
