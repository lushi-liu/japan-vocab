import { FuriganaText } from './FuriganaText';

export function WordCard({
  word,
}: {
  word: { english: string; japanese: string; reading: string };
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-1 text-2xl">
        {/* If you have the reading, show it as furigana */}
        {word.reading ? (
          <FuriganaText kanji={word.japanese} reading={word.reading} />
        ) : (
          <span>{word.japanese}</span>
        )}
      </div>
      <p className="text-sm text-gray-500 italic">{word.english}</p>
    </div>
  );
}
