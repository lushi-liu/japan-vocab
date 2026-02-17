'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-800/40 bg-slate-950/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 shadow-lg shadow-teal-500/20 transition-transform group-hover:scale-110" />
          <span className="text-sm font-bold tracking-tighter text-white">
            JV
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${
              pathname === '/'
                ? 'text-teal-400'
                : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            Add Word
          </Link>
          <Link
            href="/dictionary"
            className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${
              pathname === '/dictionary'
                ? 'text-teal-400'
                : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            Dictionary
          </Link>
        </div>
      </div>
    </nav>
  );
}
