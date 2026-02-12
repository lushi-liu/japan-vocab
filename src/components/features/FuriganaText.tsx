interface FuriganaProps {
  kanji: string;
  reading: string;
}

export function FuriganaText({ kanji, reading }: FuriganaProps) {
  return (
    <ruby className="ruby-text">
      {kanji}
      <rp>(</rp>
      <rt className="text-[0.5em] leading-none font-normal text-blue-600">
        {reading}
      </rt>
      <rp>)</rp>
    </ruby>
  );
}
