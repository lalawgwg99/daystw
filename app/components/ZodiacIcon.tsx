type Props = {
  zodiac: string;
  size?: number;
  className?: string;
};

/** 十二生肖簡化動物 SVG icon */
export default function ZodiacIcon({ zodiac, size = 18, className = "" }: Props) {
  return (
    <svg
      aria-hidden
      className={`zodiac-icon ${className}`.trim()}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderZodiac(zodiac)}
    </svg>
  );
}

function renderZodiac(zodiac: string) {
  switch (zodiac) {
    case "鼠":
      return (
        <>
          <circle cx="12" cy="13" fill="currentColor" opacity="0.15" r="8" />
          <circle cx="9" cy="11" fill="currentColor" r="1.2" />
          <circle cx="15" cy="11" fill="currentColor" r="1.2" />
          <ellipse cx="12" cy="14" fill="none" rx="4" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 8 Q4 4 7 6 M18 8 Q20 4 17 6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </>
      );
    case "牛":
      return (
        <>
          <ellipse cx="12" cy="14" fill="currentColor" opacity="0.15" rx="7" ry="6" />
          <path d="M8 8 Q8 4 10 7 M16 8 Q16 4 14 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9.5" cy="12" fill="currentColor" r="1" />
          <circle cx="14.5" cy="12" fill="currentColor" r="1" />
          <path d="M10 16 Q12 17.5 14 16" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </>
      );
    case "虎":
      return (
        <>
          <circle cx="12" cy="13" fill="currentColor" opacity="0.15" r="8" />
          <path d="M7 9 L9 7 M17 9 L15 7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="12" fill="currentColor" r="1.2" />
          <circle cx="15" cy="12" fill="currentColor" r="1.2" />
          <path d="M8 10 L10 11 M16 10 L14 11 M9 16 H15" stroke="currentColor" strokeWidth="1.2" />
        </>
      );
    case "兔":
      return (
        <>
          <ellipse cx="12" cy="15" fill="currentColor" opacity="0.15" rx="6" ry="5" />
          <ellipse cx="9" cy="7" fill="none" rx="2" ry="5" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="15" cy="7" fill="none" rx="2" ry="5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="14" fill="currentColor" r="1" />
          <circle cx="14" cy="14" fill="currentColor" r="1" />
        </>
      );
    case "龍":
      return (
        <>
          <path
            d="M6 16 Q12 6 18 16 Q14 13 12 16 Q10 13 6 16"
            fill="currentColor"
            opacity="0.2"
          />
          <path d="M6 16 Q12 8 18 16" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="15" cy="11" fill="currentColor" r="1.2" />
          <path d="M16 9 Q18 7 19 9" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </>
      );
    case "蛇":
      return (
        <>
          <path
            d="M7 17 Q10 8 14 12 Q18 16 12 18 Q8 19 7 17"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="8" cy="16" fill="currentColor" r="1.3" />
          <circle cx="8.5" cy="15.2" fill="currentColor" r="0.5" />
        </>
      );
    case "馬":
      return (
        <>
          <path d="M8 18 V10 Q12 6 16 10 V18" fill="currentColor" opacity="0.15" />
          <path d="M8 18 V10 Q12 5 16 10 V18" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 7 Q16 4 17 8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="12" fill="currentColor" r="1" />
        </>
      );
    case "羊":
      return (
        <>
          <circle cx="12" cy="14" fill="currentColor" opacity="0.15" r="7" />
          <circle cx="8" cy="10" fill="none" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="9" fill="none" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="16" cy="10" fill="none" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="14" fill="currentColor" r="1" />
          <circle cx="14" cy="14" fill="currentColor" r="1" />
        </>
      );
    case "猴":
      return (
        <>
          <circle cx="12" cy="13" fill="currentColor" opacity="0.15" r="7" />
          <circle cx="6" cy="14" fill="none" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="18" cy="14" fill="none" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="12" fill="currentColor" r="1" />
          <circle cx="14" cy="12" fill="currentColor" r="1" />
          <ellipse cx="12" cy="15.5" fill="none" rx="2" ry="1.2" stroke="currentColor" strokeWidth="1.2" />
        </>
      );
    case "雞":
      return (
        <>
          <ellipse cx="12" cy="14" fill="currentColor" opacity="0.15" rx="6" ry="5" />
          <path d="M12 6 L13 9 L11 9 Z" fill="currentColor" />
          <path d="M14 6 L16 8 L14 8 Z" fill="currentColor" opacity="0.7" />
          <circle cx="10" cy="13" fill="currentColor" r="1" />
          <path d="M13 16 L16 18 L13 17" fill="currentColor" />
        </>
      );
    case "狗":
      return (
        <>
          <ellipse cx="12" cy="14" fill="currentColor" opacity="0.15" rx="7" ry="6" />
          <ellipse cx="8" cy="10" fill="none" rx="2" ry="3" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="16" cy="10" fill="none" rx="2" ry="3" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10" cy="13" fill="currentColor" r="1" />
          <circle cx="14" cy="13" fill="currentColor" r="1" />
          <ellipse cx="12" cy="16" fill="currentColor" rx="2" ry="1.2" />
        </>
      );
    case "豬":
      return (
        <>
          <ellipse cx="12" cy="14" fill="currentColor" opacity="0.15" rx="8" ry="6" />
          <ellipse cx="12" cy="15" fill="none" rx="3.5" ry="2.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="12" fill="currentColor" r="1" />
          <circle cx="15" cy="12" fill="currentColor" r="1" />
          <path d="M6 12 Q4 10 6 8 M18 12 Q20 10 18 8" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </>
      );
    default:
      return <circle cx="12" cy="12" fill="currentColor" opacity="0.3" r="6" />;
  }
}
