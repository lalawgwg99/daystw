import { Solar } from "lunar-javascript";
import { formatLunarDate, toTaiwanTraditional } from "./traditional";

export type PurposeOption = {
  label: string;
  value: string;
  keywords: string[];
  shortLabel: string;
};

export const purposeOptions: PurposeOption[] = [
  { label: "搬家入宅", shortLabel: "搬家", value: "入宅", keywords: ["入宅", "移徙"] },
  { label: "結婚訂婚", shortLabel: "結婚", value: "嫁娶", keywords: ["嫁娶", "订盟", "訂盟", "纳采", "納采"] },
  { label: "開市開工", shortLabel: "開工", value: "开市", keywords: ["开市", "開市", "开业", "開業", "交易"] },
  { label: "祭祀祈福", shortLabel: "祈福", value: "祭祀", keywords: ["祭祀", "祈福"] },
  { label: "考試升學", shortLabel: "考試", value: "冠笄", keywords: ["冠笄", "入学", "入學", "開光"] },
];

export const zodiacOptions = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];

export type DateResult = {
  day: number;
  iso: string;
  lunarText: string;
  yi: string[];
  ji: string[];
  matchedYi: string[];
  clash: string;
  sha: string;
  tai: string;
  peng: string;
  tianShen: string;
  isWeekend: boolean;
  summary: string;
};

export function formatSolarDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getLunarForDate(year: number, month: number, day: number) {
  return Solar.fromYmd(year, month, day).getLunar();
}

function matchesPurpose(rawYi: string[], keywords: string[]): boolean {
  return keywords.some((keyword) =>
    rawYi.some((y) => y.includes(keyword) || toTaiwanTraditional(y).includes(keyword)),
  );
}

function getMatchedYi(yi: string[], keywords: string[]): string[] {
  return yi.filter((item) =>
    keywords.some((keyword) => item.includes(keyword) || item.includes(toTaiwanTraditional(keyword))),
  );
}

export function buildSummary(
  purposeLabel: string,
  matchedYi: string[],
  clash: string,
  avoidZodiac: string,
): string {
  const highlight = matchedYi.length > 0 ? matchedYi.join("、") : "相關宜事";
  if (avoidZodiac !== "不限" && clash.includes(avoidZodiac)) {
    return `此日宜${highlight}，但沖${avoidZodiac}，屬${avoidZodiac}者宜避開。`;
  }
  return `適合${purposeLabel}，宜：${highlight}。`;
}

export function buildMonthResults(
  year: number,
  month: number,
  purpose: string,
  avoidZodiac: string,
  weekendOnly: boolean,
): DateResult[] {
  const purposeConfig = purposeOptions.find((item) => item.value === purpose) ?? purposeOptions[0];
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month - 1, day);
    const lunar = getLunarForDate(year, month, day);
    const rawYi = lunar.getDayYi();
    const yi = rawYi.map((item: string) => toTaiwanTraditional(item));
    const ji = lunar.getDayJi().map((item: string) => toTaiwanTraditional(item));
    const clash = toTaiwanTraditional(lunar.getDayChongDesc());
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const purposeMatched = matchesPurpose(rawYi, purposeConfig.keywords);
    const clashBlocked = avoidZodiac !== "不限" && clash.includes(avoidZodiac);
    const weekendBlocked = weekendOnly && !isWeekend;
    const matchedYi = getMatchedYi(yi, purposeConfig.keywords);
    const score =
      (purposeMatched ? 58 : 18) +
      (isWeekend ? 18 : 4) +
      (!clashBlocked ? 18 : -24) +
      (ji.length <= 5 ? 6 : 0);

    return { day, yi, ji, clash, isWeekend, purposeMatched, clashBlocked, weekendBlocked, matchedYi, score, lunar };
  })
    .filter((item) => item.purposeMatched && !item.clashBlocked && !item.weekendBlocked)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => ({
      day: item.day,
      iso: formatSolarDate(new Date(year, month - 1, item.day)),
      lunarText: formatLunarDate(item.lunar.toString(), true),
      yi: item.yi.slice(0, 6),
      ji: item.ji.slice(0, 4),
      matchedYi: item.matchedYi,
      clash: item.clash,
      sha: toTaiwanTraditional(item.lunar.getDaySha()),
      tai: toTaiwanTraditional(item.lunar.getDayPositionTai()),
      peng: `${toTaiwanTraditional(item.lunar.getPengZuGan())}；${toTaiwanTraditional(item.lunar.getPengZuZhi())}`,
      tianShen: `${toTaiwanTraditional(item.lunar.getDayTianShen())}・${toTaiwanTraditional(item.lunar.getDayTianShenType())}`,
      isWeekend: item.isWeekend,
      summary: buildSummary(purposeConfig.label, item.matchedYi, item.clash, avoidZodiac),
    }));
}

export const yearOptions = Array.from({ length: 12 }, (_, i) => 2024 + i);

export const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} 月`,
}));

/** 依出生年推算生肖（以立春為界簡化為該年正月初一對應生肖） */
export function zodiacFromBirthYear(birthYear: number): string | null {
  if (birthYear < 1900 || birthYear > 2100) return null;
  const lunar = Solar.fromYmd(birthYear, 6, 1).getLunar();
  return toTaiwanTraditional(lunar.getYearShengXiao());
}
