import { FuriganaText } from './FuriganaText';

export function WordCard({
  word,
}: {
  word: { english: string; japanese: string; reading: string };
}) {
  return (
    <div className="group relative rounded-2xl border border-slate-800/50 bg-slate-900/40 p-6 transition-all hover:border-teal-500/30 hover:bg-slate-900/60">
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="text-3xl font-medium text-white transition-transform group-hover:scale-110">
          {word.reading ? (
            <FuriganaText kanji={word.japanese} reading={word.reading} />
          ) : (
            <span>{word.japanese}</span>
          )}
        </div>
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase italic">
          {word.english}
        </p>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-teal-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
