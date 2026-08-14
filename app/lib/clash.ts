import { Solar } from "lunar-javascript";
import { zodiacFromBirthYear } from "./zodiac";
import { toTaiwanTraditional } from "./traditional";

export type ClashExplanation = {
  /** 原始字串，如 (甲寅)虎 */
  rawClash: string;
  /** 日干支沖 */
  ganZhi: string;
  /** 被沖生肖 */
  zodiac: string;
  /** 煞方 */
  sha: string;
  /** 一句話摘要 */
  summary: string;
  /** 白話：誰要避 */
  whoPlain: string;
  /** 出生年列表 */
  birthYears: number[];
  /** 年次標籤，如 74、86 */
  yearTags: string[];
  /** 虛歲列表（以查詢日計） */
  ages: number[];
  /** 煞方白話 */
  shaPlain: string;
};

const SHA_PLAIN: Record<string, string> = {
  東: "東方不宜動土、裝修或長時間敲打",
  南: "南方不宜動土、裝修或長時間敲打",
  西: "西方不宜動土、裝修或長時間敲打",
  北: "北方不宜動土、裝修或長時間敲打",
};

function parseClashDesc(raw: string): { ganZhi: string; zodiac: string } {
  const match = raw.match(/[（(]([^)）]+)[)）]([鼠牛虎兔龍蛇馬羊猴雞狗豬])/);
  if (match) {
    return { ganZhi: match[1], zodiac: match[2] };
  }
  const zodiacMatch = raw.match(/[鼠牛虎兔龍蛇馬羊猴雞狗豬]/);
  return {
    ganZhi: "",
    zodiac: zodiacMatch?.[0] ?? "",
  };
}

function birthYearsForZodiac(zodiac: string, refYear: number, max = 5): number[] {
  if (!zodiac) return [];

  let anchor: number | null = null;
  for (let y = refYear; y >= refYear - 24; y--) {
    if (zodiacFromBirthYear(y) === zodiac) {
      anchor = y;
      break;
    }
  }
  if (anchor === null) return [];

  const years: number[] = [anchor];
  for (let y = anchor - 12; years.length < max && y >= 1900; y -= 12) {
    if (zodiacFromBirthYear(y) === zodiac) years.push(y);
  }

  return years.reverse();
}

/** 虛歲：以農曆年計，出生年即一歲起算 */
function virtualAge(birthYear: number, refYear: number): number {
  return refYear - birthYear + 1;
}

export function explainClash(year: number, month: number, day: number): ClashExplanation {
  const lunar = Solar.fromYmd(year, month, day).getLunar();
  const rawClash = toTaiwanTraditional(lunar.getDayChongDesc());
  const sha = toTaiwanTraditional(lunar.getDaySha());
  const { ganZhi, zodiac } = parseClashDesc(rawClash);
  const zodiacFromApi = toTaiwanTraditional(lunar.getDayChongShengXiao());
  const targetZodiac = zodiac || zodiacFromApi;

  const birthYears = birthYearsForZodiac(targetZodiac, year);
  const yearTags = birthYears.map((y) => String(y).slice(-2));
  const ages = birthYears.map((y) => virtualAge(y, year));

  const shaPlain = SHA_PLAIN[sha] ?? `煞${sha}，該方位宜謹慎`;

  const yearListText =
    birthYears.length > 0
      ? `${birthYears.join("、")} 年出生（${yearTags.join("、")} 年次）`
      : "";

  const ageListText =
    ages.length > 0 ? `虛歲 ${ages.join("、")} 歲` : "";

  const whoPlain = targetZodiac
    ? `屬${targetZodiac}的人（${[yearListText, ageListText].filter(Boolean).join("；")}）今天不宜婚嫁、搬家、簽約等重要事項。`
    : "請參考通書沖煞記載。";

  const summary = targetZodiac
    ? `今日沖${targetZodiac}，${whoPlain} ${shaPlain}。`
    : `${rawClash} 煞${sha}。${shaPlain}。`;

  return {
    rawClash,
    ganZhi,
    zodiac: targetZodiac,
    sha,
    summary,
    whoPlain,
    birthYears,
    yearTags,
    ages,
    shaPlain,
  };
}

/** 從已有 clash 字串快速解析（擇日卡片用） */
/** click108 風格一行沖煞摘要 */
export function formatClashOneLine(clash: ClashExplanation): string {
  if (!clash.zodiac) return clash.rawClash || "—";
  let text = `屬${clash.zodiac}`;
  if (clash.ganZhi || clash.ages.length > 0) {
    const inner = [clash.ganZhi, clash.ages.length > 0 ? `${clash.ages.join("、")} 歲` : ""]
      .filter(Boolean)
      .join(" · ");
    text += `（${inner}）`;
  }
  return text;
}

export function explainClashFromRaw(
  rawClash: string,
  sha: string,
  refYear: number,
): ClashExplanation {
  const { ganZhi, zodiac } = parseClashDesc(rawClash);
  const birthYears = birthYearsForZodiac(zodiac, refYear);
  const yearTags = birthYears.map((y) => String(y).slice(-2));
  const ages = birthYears.map((y) => virtualAge(y, refYear));
  const shaPlain = SHA_PLAIN[sha] ?? `煞${sha}，該方位宜謹慎`;

  const yearListText =
    birthYears.length > 0
      ? `${birthYears.join("、")} 年出生（${yearTags.join("、")} 年次）`
      : "";

  const ageListText = ages.length > 0 ? `虛歲 ${ages.join("、")} 歲` : "";

  const whoPlain = zodiac
    ? `屬${zodiac}的人（${[yearListText, ageListText].filter(Boolean).join("；")}）今天不宜婚嫁、搬家、簽約等重要事項。`
    : "請參考通書沖煞記載。";

  const summary = zodiac
    ? `今日沖${zodiac}，${whoPlain} ${shaPlain}。`
    : `${rawClash} 煞${sha}。${shaPlain}。`;

  return {
    rawClash,
    ganZhi,
    zodiac,
    sha,
    summary,
    whoPlain,
    birthYears,
    yearTags,
    ages,
    shaPlain,
  };
}
