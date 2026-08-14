type Props = {
  name: string;
  tone: string;
};

/** 節氣圓形插畫（click108 風格簡化 SVG） */
export default function JieQiArt({ name, tone }: Props) {
  return (
    <svg
      aria-hidden
      className={`jieqi-art tone-${tone}`}
      role="img"
      viewBox="0 0 88 88"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient cx="50%" cy="35%" id={`jq-glow-${tone}`} r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle className="jieqi-art-ring" cx="44" cy="44" r="40" />
      <circle cx="44" cy="44" fill={`url(#jq-glow-${tone})`} r="34" />
      {tone === "spring" && (
        <>
          <circle className="jieqi-art-petal" cx="28" cy="30" r="4" />
          <circle className="jieqi-art-petal" cx="58" cy="26" r="3.5" />
          <circle className="jieqi-art-petal" cx="62" cy="52" r="3" />
        </>
      )}
      {tone === "summer" && (
        <>
          <line className="jieqi-art-ray" x1="44" x2="44" y1="8" y2="18" />
          <line className="jieqi-art-ray" x1="44" x2="44" y1="70" y2="80" />
          <line className="jieqi-art-ray" x1="8" x2="18" y1="44" y2="44" />
          <line className="jieqi-art-ray" x1="70" x2="80" y1="44" y2="44" />
        </>
      )}
      {tone === "autumn" && (
        <>
          <path className="jieqi-art-leaf" d="M30 52 C36 40 48 38 54 48 C46 50 38 58 30 52 Z" />
          <path className="jieqi-art-leaf" d="M56 34 C62 28 70 32 66 42 C60 40 56 36 56 34 Z" />
        </>
      )}
      {tone === "winter" && (
        <>
          <circle className="jieqi-art-snow" cx="30" cy="34" r="2" />
          <circle className="jieqi-art-snow" cx="58" cy="30" r="2.5" />
          <circle className="jieqi-art-snow" cx="52" cy="58" r="2" />
          <circle className="jieqi-art-snow" cx="34" cy="56" r="1.8" />
        </>
      )}
      <text className="jieqi-art-label" dominantBaseline="middle" textAnchor="middle" x="44" y="46">
        {name.slice(0, 2)}
      </text>
    </svg>
  );
}
