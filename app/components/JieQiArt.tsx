import { getJieQiBadge } from "../lib/jieqi-badges";

type Props = {
  name: string;
};

/** 二十四節氣專屬 SVG 插畫 */
export default function JieQiArt({ name }: Props) {
  const badge = getJieQiBadge(name);
  const tone = badge?.tone ?? "default";

  return (
    <svg
      aria-hidden
      className={`jieqi-art tone-${tone}`}
      role="img"
      viewBox="0 0 88 88"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient cx="50%" cy="38%" id={`jq-glow-${name}`} r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle className="jieqi-art-ring" cx="44" cy="44" r="40" />
      <circle cx="44" cy="44" fill={`url(#jq-glow-${name})`} r="34" />
      {renderMotif(name)}
      <text className="jieqi-art-label" dominantBaseline="middle" textAnchor="middle" x="44" y="72">
        {name}
      </text>
    </svg>
  );
}

function renderMotif(name: string) {
  switch (name) {
    case "立春":
      return (
        <>
          <path className="jq-spring" d="M44 58 V38" strokeWidth="2" />
          <path className="jq-spring" d="M44 42 Q36 36 34 28" strokeWidth="1.8" />
          <path className="jq-spring" d="M44 42 Q52 36 54 28" strokeWidth="1.8" />
          <circle className="jq-spring-fill" cx="34" cy="27" r="3" />
          <circle className="jq-spring-fill" cx="54" cy="27" r="3" />
        </>
      );
    case "雨水":
      return (
        <>
          <path className="jq-rain" d="M30 28 Q44 18 58 28" fill="none" strokeWidth="2" />
          {[32, 44, 56].map((x) => (
            <line className="jq-rain" key={x} strokeLinecap="round" strokeWidth="2" x1={x} x2={x - 2} y1="38" y2="48" />
          ))}
        </>
      );
    case "驚蟄":
      return (
        <>
          <path className="jq-thunder" d="M48 24 L40 40 H46 L42 56" fill="none" strokeWidth="2.2" />
          <ellipse className="jq-bug" cx="58" cy="50" rx="5" ry="3" />
          <line className="jq-bug" x1="53" x2="50" y1="50" y2="52" />
          <line className="jq-bug" x1="63" x2="66" y1="50" y2="52" />
        </>
      );
    case "春分":
      return (
        <>
          <line className="jq-balance" x1="24" x2="64" y1="44" y2="44" strokeWidth="2" />
          <line className="jq-balance" x1="44" x2="44" y1="44" y2="58" strokeWidth="2" />
          <circle className="jq-sun-half" cx="34" cy="36" r="8" />
          <circle className="jq-sun-half" cx="54" cy="36" r="8" />
        </>
      );
    case "清明":
      return (
        <>
          <path className="jq-willow" d="M44 58 V32" strokeWidth="2" />
          {[30, 38, 46, 54, 58].map((x, i) => (
            <path className="jq-willow" d={`M44 34 Q${x} ${40 + i * 2} ${x - 2} ${52 + i}`} fill="none" key={x} strokeWidth="1.4" />
          ))}
        </>
      );
    case "穀雨":
      return (
        <>
          {[36, 44, 52].map((x, i) => (
            <line className="jq-grain" key={x} strokeWidth="2" x1={x} x2={x} y1={50 + i * 2} y2={34} />
          ))}
          <ellipse className="jq-grain-head" cx="36" cy="32" rx="4" ry="6" />
          <ellipse className="jq-grain-head" cx="44" cy="30" rx="4" ry="7" />
          <ellipse className="jq-grain-head" cx="52" cy="32" rx="4" ry="6" />
        </>
      );
    case "立夏":
      return (
        <>
          <path className="jq-lotus" d="M44 56 Q32 48 34 40 Q44 44 54 40 Q56 48 44 56" />
          <circle className="jq-lotus-center" cx="44" cy="42" r="4" />
        </>
      );
    case "小滿":
      return (
        <>
          <path className="jq-wheat" d="M38 56 V36" strokeWidth="2" />
          <path className="jq-wheat" d="M44 56 V34" strokeWidth="2" />
          <path className="jq-wheat" d="M50 56 V36" strokeWidth="2" />
          <ellipse className="jq-wheat-head" cx="38" cy="34" rx="3" ry="5" />
          <ellipse className="jq-wheat-head" cx="44" cy="32" rx="3.5" ry="6" />
          <ellipse className="jq-wheat-head" cx="50" cy="34" rx="3" ry="5" opacity="0.6" />
        </>
      );
    case "芒種":
      return (
        <>
          <path className="jq-sickle" d="M52 56 Q58 44 48 32" fill="none" strokeWidth="2.2" />
          <line className="jq-wheat" x1="36" x2="36" y1="56" y2="38" strokeWidth="2" />
          <ellipse className="jq-wheat-head" cx="36" cy="36" rx="3" ry="5" />
        </>
      );
    case "夏至":
      return (
        <>
          <circle className="jq-sun-full" cx="44" cy="40" r="14" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                className="jq-sun-ray"
                key={deg}
                strokeLinecap="round"
                strokeWidth="2"
                x1={44 + Math.cos(rad) * 18}
                x2={44 + Math.cos(rad) * 24}
                y1={40 + Math.sin(rad) * 18}
                y2={40 + Math.sin(rad) * 24}
              />
            );
          })}
        </>
      );
    case "小暑":
      return (
        <>
          <circle className="jq-heat-sun" cx="44" cy="38" r="10" />
          <path className="jq-heat-wave" d="M28 54 Q34 48 40 54 T52 54 T64 54" fill="none" strokeWidth="2" />
        </>
      );
    case "大暑":
      return (
        <>
          <circle className="jq-heat-sun" cx="44" cy="36" r="16" />
          <path className="jq-heat-wave" d="M24 58 Q32 50 40 58 T56 58 T68 58" fill="none" strokeWidth="2.2" />
        </>
      );
    case "立秋":
      return (
        <>
          <circle className="jq-longan" cx="38" cy="42" r="7" />
          <circle className="jq-longan" cx="52" cy="46" r="6" />
          <circle className="jq-longan" cx="46" cy="54" r="5" />
          <path className="jq-leaf-fall" d="M58 28 Q52 34 54 42" fill="none" strokeWidth="1.8" />
        </>
      );
    case "處暑":
      return (
        <>
          <path className="jq-fan" d="M44 56 V44" strokeWidth="2" />
          <path className="jq-fan" d="M44 44 Q28 36 26 48 Q44 40 62 48 Q60 36 44 44" />
        </>
      );
    case "白露":
      return (
        <>
          <path className="jq-dew-grass" d="M44 56 V40" strokeWidth="2" />
          <circle className="jq-dew-drop" cx="44" cy="36" r="5" />
          <circle className="jq-dew-shine" cx="42" cy="34" r="1.5" fill="#fff" opacity="0.8" />
        </>
      );
    case "秋分":
      return (
        <>
          <line className="jq-balance" x1="26" x2="62" y1="44" y2="44" strokeWidth="2" />
          <path className="jq-leaf-fall" d="M34 36 Q44 28 50 36 L44 48 Z" />
          <path className="jq-leaf-fall" d="M54 36 Q44 28 38 36 L44 48 Z" opacity="0.7" />
        </>
      );
    case "寒露":
      return (
        <>
          <path className="jq-dew-grass" d="M44 56 V38" strokeWidth="2" />
          <circle className="jq-dew-drop" cx="40" cy="34" r="4" />
          <circle className="jq-dew-drop" cx="50" cy="36" r="3.5" opacity="0.8" />
          <line className="jq-cold" x1="30" x2="36" y1="28" y2="32" strokeWidth="1.5" />
        </>
      );
    case "霜降":
      return (
        <>
          {[44].map((cx) => (
            <g key={cx} transform={`translate(${cx - 44}, 0)`}>
              <line className="jq-frost" x1="44" x2="44" y1="28" y2="56" strokeWidth="1.5" />
              <line className="jq-frost" x1="36" x2="52" y1="36" y2="36" strokeWidth="1.5" />
              <line className="jq-frost" x1="38" x2="50" y1="48" y2="48" strokeWidth="1.5" />
            </g>
          ))}
        </>
      );
    case "立冬":
      return (
        <>
          <rect className="jq-hearth" height="14" rx="2" width="20" x="34" y="46" />
          <path className="jq-flame" d="M44 46 Q38 38 44 30 Q50 38 44 46" />
        </>
      );
    case "小雪":
      return (
        <>
          {[
            [34, 32],
            [50, 36],
            [42, 48],
            [56, 50],
          ].map(([x, y]) => (
            <circle className="jq-snowflake" cx={x} cy={y} key={`${x}-${y}`} r="2.5" />
          ))}
        </>
      );
    case "大雪":
      return (
        <>
          {[
            [30, 30],
            [44, 26],
            [58, 32],
            [36, 44],
            [52, 46],
            [44, 54],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line className="jq-snow-star" x1={x} x2={x} y1={y - 4} y2={y + 4} strokeWidth="1.5" />
              <line className="jq-snow-star" x1={x - 4} x2={x + 4} y1={y} y2={y} strokeWidth="1.5" />
            </g>
          ))}
        </>
      );
    case "冬至":
      return (
        <>
          <ellipse className="jq-dumpling" cx="38" cy="44" rx="7" ry="5" />
          <ellipse className="jq-dumpling" cx="50" cy="44" rx="7" ry="5" />
          <path className="jq-steam" d="M38 36 Q36 28 38 24" fill="none" strokeWidth="1.5" />
          <path className="jq-steam" d="M50 36 Q52 28 50 24" fill="none" strokeWidth="1.5" />
        </>
      );
    case "小寒":
      return (
        <>
          <rect className="jq-ice" height="16" rx="3" width="22" x="33" y="42" />
          <line className="jq-cold" x1="28" x2="34" y1="30" y2="34" strokeWidth="2" />
          <line className="jq-cold" x1="60" x2="54" y1="30" y2="34" strokeWidth="2" />
        </>
      );
    case "大寒":
      return (
        <>
          <path className="jq-coat" d="M34 56 V38 Q44 32 54 38 V56" fill="none" strokeWidth="2" />
          <line className="jq-coat" x1="44" x2="44" y1="38" y2="56" strokeWidth="1.5" />
          <line className="jq-cold" x1="24" x2="30" y1="26" y2="32" strokeWidth="2" />
          <line className="jq-cold" x1="64" x2="58" y1="26" y2="32" strokeWidth="2" />
        </>
      );
    default:
      return <circle className="jq-default" cx="44" cy="40" fill="currentColor" opacity="0.2" r="12" />;
  }
}
