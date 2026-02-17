'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 left-0 z-50 flex w-full justify-center px-6">
      <nav className="flex items-center gap-1 rounded-full border border-slate-800/50 bg-slate-900/60 p-1.5 shadow-2xl backdrop-blur-xl">
        <Link
          href="/"
          className={`rounded-full px-6 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
            pathname === '/'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Add Word
        </Link>
        <Link
          href="/dictionary"
          className={`rounded-full px-6 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
            pathname === '/dictionary'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Dictionary
        </Link>
      </nav>
    </div>
  );
}
