import { Solar } from "lunar-javascript";
import { getBadDayInfo } from "./bad-days";
import { getAuspiciousHours, type HourSlot } from "./hours";
import { formatLunarDate, toTaiwanTraditional } from "./traditional";
import { zodiacFromBirthYear, zodiacOptions } from "./zodiac";

export { zodiacFromBirthYear, zodiacOptions };

export type PurposeOption = {
  label: string;
  value: string;
  keywords: string[];
  shortLabel: string;
  seoSlug: string;
};

export const purposeOptions: PurposeOption[] = [
  { label: "搬家入宅", shortLabel: "搬家", value: "入宅", keywords: ["入宅", "移徙"], seoSlug: "move-in" },
  { label: "結婚訂婚", shortLabel: "結婚", value: "嫁娶", keywords: ["嫁娶", "订盟", "訂盟", "纳采", "納采"], seoSlug: "wedding" },
  { label: "開市開工", shortLabel: "開工", value: "开市", keywords: ["开市", "開市", "开业", "開業", "交易"], seoSlug: "business" },
  { label: "祭祀祈福", shortLabel: "祈福", value: "祭祀", keywords: ["祭祀", "祈福"], seoSlug: "worship" },
  { label: "考試升學", shortLabel: "考試", value: "冠笄", keywords: ["冠笄", "入学", "入學", "開光"], seoSlug: "exam" },
  { label: "安床移床", shortLabel: "安床", value: "安床", keywords: ["安床", "移徙", "入宅"], seoSlug: "bed" },
  { label: "動土修造", shortLabel: "動土", value: "动土", keywords: ["动土", "動土", "修造", "上梁"], seoSlug: "groundbreaking" },
  { label: "出行遠行", shortLabel: "出行", value: "出行", keywords: ["出行", "远行", "遠行", "赴任"], seoSlug: "travel" },
  { label: "簽約交易", shortLabel: "簽約", value: "立券", keywords: ["立券", "交易", "纳财", "納財"], seoSlug: "contract" },
  { label: "安葬掃墓", shortLabel: "安葬", value: "安葬", keywords: ["安葬", "破土", "启钻", "啟鑽"], seoSlug: "burial" },
];

export type DateRangeMode = "month" | "range";

export type FinderOptions = {
  purpose: string;
  avoidZodiacs: string[];
  weekendOnly: boolean;
  excludeBadDays: boolean;
  rangeMode: DateRangeMode;
  year: number;
  month: number;
  endYear?: number;
  endMonth?: number;
  limit?: number;
};

export type DateResult = {
  day: number;
  month: number;
  year: number;
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
  isBadDay: boolean;
  badReasons: string[];
  auspiciousHours: HourSlot[];
  summary: string;
};

export function formatSolarDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getLunarForDate(year: number, month: number, day: number) {
  return Solar.fromYmd(year, month, day).getLunar();
}

export function purposeBySlug(slug: string): PurposeOption | undefined {
  return purposeOptions.find((p) => p.seoSlug === slug);
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

function clashesAny(clash: string, zodiacs: string[]): boolean {
  return zodiacs.some((z) => z !== "不限" && clash.includes(z));
}

export function buildSummary(
  purposeLabel: string,
  matchedYi: string[],
  clash: string,
  avoidZodiacs: string[],
): string {
  const highlight = matchedYi.length > 0 ? matchedYi.join("、") : "相關宜事";
  const blocked = avoidZodiacs.filter((z) => z !== "不限" && clash.includes(z));
  if (blocked.length > 0) {
    return `此日宜${highlight}，但沖${blocked.join("、")}，屬相者宜避開。`;
  }
  return `適合${purposeLabel}，宜：${highlight}。`;
}

function iterDates(options: FinderOptions): { year: number; month: number; day: number }[] {
  const dates: { year: number; month: number; day: number }[] = [];

  if (options.rangeMode === "month") {
    const daysInMonth = new Date(options.year, options.month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push({ year: options.year, month: options.month, day });
    }
    return dates;
  }

  const start = new Date(options.year, options.month - 1, 1);
  const endY = options.endYear ?? options.year;
  const endM = options.endMonth ?? options.month;
  const end = new Date(endY, endM, 0);
  const cursor = new Date(start);

  while (cursor <= end) {
    dates.push({
      year: cursor.getFullYear(),
      month: cursor.getMonth() + 1,
      day: cursor.getDate(),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export function buildFinderResults(options: FinderOptions): { results: DateResult[]; totalMatched: number } {
  const purposeConfig = purposeOptions.find((item) => item.value === options.purpose) ?? purposeOptions[0];
  const avoidZodiacs = options.avoidZodiacs.filter((z) => z && z !== "不限");
  const displayLimit = options.limit ?? 12;

  const scored = iterDates(options)
    .map(({ year, month, day }) => {
      const date = new Date(year, month - 1, day);
      const lunar = getLunarForDate(year, month, day);
      const rawYi = lunar.getDayYi();
      const yi = rawYi.map((item: string) => toTaiwanTraditional(item));
      const ji = lunar.getDayJi().map((item: string) => toTaiwanTraditional(item));
      const clash = toTaiwanTraditional(lunar.getDayChongDesc());
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const purposeMatched = matchesPurpose(rawYi, purposeConfig.keywords);
      const clashBlocked = clashesAny(clash, avoidZodiacs);
      const weekendBlocked = options.weekendOnly && !isWeekend;
      const bad = getBadDayInfo(year, month, day);
      const badBlocked = options.excludeBadDays && bad.isBad;
      const matchedYi = getMatchedYi(yi, purposeConfig.keywords);
      const score =
        (purposeMatched ? 58 : 18) +
        (isWeekend ? 18 : 4) +
        (!clashBlocked ? 18 : -24) +
        (!bad.isBad ? 10 : -20) +
        (ji.length <= 5 ? 6 : 0);

      return {
        year,
        month,
        day,
        yi,
        ji,
        clash,
        isWeekend,
        purposeMatched,
        clashBlocked,
        weekendBlocked,
        badBlocked,
        matchedYi,
        score,
        lunar,
        bad,
      };
    })
    .filter(
      (item) =>
        item.purposeMatched &&
        !item.clashBlocked &&
        !item.weekendBlocked &&
        !item.badBlocked,
    )
    .sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1, a.day).getTime();
      const dateB = new Date(b.year, b.month - 1, b.day).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return b.score - a.score;
    });

  const totalMatched = scored.length;

  const results = scored.slice(0, displayLimit).map((item) => ({
    day: item.day,
    month: item.month,
    year: item.year,
    iso: formatSolarDate(new Date(item.year, item.month - 1, item.day)),
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
    isBadDay: item.bad.isBad,
    badReasons: item.bad.reasons,
    auspiciousHours: getAuspiciousHours(item.year, item.month, item.day),
    summary: buildSummary(purposeConfig.label, item.matchedYi, item.clash, avoidZodiacs),
  }));

  return { results, totalMatched };
}

/** @deprecated 使用 buildFinderResults */
export function buildMonthResults(
  year: number,
  month: number,
  purpose: string,
  avoidZodiac: string,
  weekendOnly: boolean,
): DateResult[] {
  return buildFinderResults({
    year,
    month,
    purpose,
    avoidZodiacs: avoidZodiac === "不限" ? [] : [avoidZodiac],
    weekendOnly,
    excludeBadDays: false,
    rangeMode: "month",
    limit: 8,
  }).results;
}

export const yearOptions = Array.from({ length: 12 }, (_, i) => 2024 + i);

export const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} 月`,
}));
