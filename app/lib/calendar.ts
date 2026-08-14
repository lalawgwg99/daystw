import { Solar } from "lunar-javascript";
import { getCommemorativeDay } from "../data/commemorative-days";
import { getHoliday, isHoliday, isMakeupDay } from "../data/taiwan-holidays";
import { explainTerm } from "../data/glossary";
import { getBadDayInfo } from "./bad-days";
import { explainClash, type ClashExplanation } from "./clash";
import { formatSolarDate, getLunarForDate } from "./finder";
import { formatLunarDate, toTaiwanTraditional } from "./traditional";

export type CalendarDay = {
  date: Date;
  iso: string;
  day: number;
  inMonth: boolean;
  lunarDay: string;
  jieQi: string;
  holidayName?: string;
  isHoliday: boolean;
  isMakeup: boolean;
  isWeekend: boolean;
  isHuangDao: boolean;
  yiPreview: string[];
  jiPreview: string[];
  jianChu: string;
  clash: string;
  clashZodiac: string;
  dayGanZhi: string;
  dayShengXiao: string;
  isBadDay: boolean;
  badReasons: string[];
};

export type JieQiPeriod = {
  name: string;
  rangeLabel: string;
};

export type DayDetail = {
  iso: string;
  solarDate: string;
  lunarText: string;
  dayGanZhi: string;
  yearGanZhi: string;
  yearShengXiao: string;
  monthGanZhi: string;
  pillarsText: string;
  weekNumber: number;
  weekdayLabel: string;
  yi: string[];
  ji: string[];
  yiExplained: { term: string; plain: string }[];
  jiExplained: { term: string; plain: string }[];
  clash: string;
  sha: string;
  clashExplain: ClashExplanation;
  tai: string;
  pengGan: string;
  pengZhi: string;
  tianShen: string;
  jianChu: string;
  naYin: string;
  jieQi: string;
  jieQiPeriod: JieQiPeriod | null;
  jiShen: string[];
  xiongSha: string[];
  positionText: string;
  auspiciousHourBranches: string[];
  holidayName?: string;
  importantDayName?: string;
  isHuangDao: boolean;
  isBadDay: boolean;
  badReasons: string[];
};

function isoWeekNumber(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
  );
}

function getJieQiPeriod(
  lunar: ReturnType<typeof getLunarForDate>,
  year: number,
  month: number,
  day: number,
): JieQiPeriod | null {
  const table = lunar.getJieQiTable() as Record<string, { toYmd: () => string }>;
  const current = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const entries = Object.entries(table)
    .map(([name, solar]) => ({
      name: toTaiwanTraditional(name),
      ymd: solar.toYmd(),
    }))
    .sort((a, b) => a.ymd.localeCompare(b.ymd));

  let active: (typeof entries)[number] | null = null;
  for (const entry of entries) {
    if (entry.ymd <= current) active = entry;
    else break;
  }
  if (!active) return null;

  const activeIndex = entries.findIndex((entry) => entry.ymd === active!.ymd);
  const next = entries[activeIndex + 1];
  const [, startMonth, startDay] = active.ymd.split("-").map(Number);

  let endMonth = 12;
  let endDay = 31;
  if (next) {
    const end = new Date(next.ymd);
    end.setDate(end.getDate() - 1);
    endMonth = end.getMonth() + 1;
    endDay = end.getDate();
  }

  return {
    name: active.name,
    rangeLabel: `${startMonth}/${startDay} - ${endMonth}/${endDay}`,
  };
}

function getPositionText(lunar: ReturnType<typeof getLunarForDate>): string {
  const xi = toTaiwanTraditional(lunar.getDayPositionXiDesc());
  const fu = toTaiwanTraditional(lunar.getDayPositionFuDesc());
  const cai = toTaiwanTraditional(lunar.getDayPositionCaiDesc());
  return `喜神${xi} 福神${fu} 財神${cai}`;
}

function getAuspiciousHourBranches(lunar: ReturnType<typeof getLunarForDate>): string[] {
  const branches: string[] = [];
  for (const time of lunar.getTimes().slice(0, 12)) {
    if (time.getTianShenLuck() !== "吉") continue;
    const branch = toTaiwanTraditional(time.getGanZhi()).charAt(1);
    if (!branches.includes(branch)) branches.push(branch);
  }
  return branches;
}

function isHuangDao(lunar: ReturnType<typeof getLunarForDate>): boolean {
  const type = toTaiwanTraditional(lunar.getDayTianShenType());
  return type.includes("黃") || type.includes("吉");
}

export function getDayDetail(year: number, month: number, day: number): DayDetail {
  const lunar = getLunarForDate(year, month, day);
  const iso = formatSolarDate(new Date(year, month - 1, day));
  const yi = lunar.getDayYi().map((item: string) => toTaiwanTraditional(item));
  const ji = lunar.getDayJi().map((item: string) => toTaiwanTraditional(item));
  const holiday = getHoliday(iso);
  const bad = getBadDayInfo(year, month, day);

  const explainItems = (items: string[], fallback: string) =>
    items.map((term) => ({
      term,
      plain: explainTerm(term) ?? fallback,
    }));

  const date = new Date(year, month - 1, day);
  const yearGanZhi = toTaiwanTraditional(lunar.getYearInGanZhi());
  const yearShengXiao = toTaiwanTraditional(lunar.getYearShengXiao());
  const monthGanZhi = toTaiwanTraditional(lunar.getMonthInGanZhi());
  const dayGanZhi = toTaiwanTraditional(lunar.getDayInGanZhi());
  const jieQiPeriod = getJieQiPeriod(lunar, year, month, day);

  return {
    iso,
    solarDate: iso,
    lunarText: formatLunarDate(lunar.toString()),
    dayGanZhi,
    yearGanZhi,
    yearShengXiao,
    monthGanZhi,
    pillarsText: `${yearGanZhi}${yearShengXiao}年 ${monthGanZhi}月 ${dayGanZhi}日`,
    weekNumber: isoWeekNumber(date),
    weekdayLabel: ["日", "一", "二", "三", "四", "五", "六"][date.getDay()],
    yi,
    ji,
    yiExplained: explainItems(yi, "傳統黃曆記載的宜行之事"),
    jiExplained: explainItems(ji, "傳統黃曆記載的忌行之事"),
    clash: toTaiwanTraditional(lunar.getDayChongDesc()),
    sha: toTaiwanTraditional(lunar.getDaySha()),
    clashExplain: explainClash(year, month, day),
    tai: toTaiwanTraditional(lunar.getDayPositionTai()),
    pengGan: toTaiwanTraditional(lunar.getPengZuGan()),
    pengZhi: toTaiwanTraditional(lunar.getPengZuZhi()),
    tianShen: `${toTaiwanTraditional(lunar.getDayTianShen())}・${toTaiwanTraditional(lunar.getDayTianShenType())}`,
    jianChu: toTaiwanTraditional(lunar.getZhiXing()),
    naYin: toTaiwanTraditional(lunar.getDayNaYin()),
    jieQi: toTaiwanTraditional(lunar.getJieQi() || jieQiPeriod?.name || ""),
    jieQiPeriod,
    jiShen: lunar.getDayJiShen().map((item: string) => toTaiwanTraditional(item)),
    xiongSha: lunar.getDayXiongSha().map((item: string) => toTaiwanTraditional(item)),
    positionText: getPositionText(lunar),
    auspiciousHourBranches: getAuspiciousHourBranches(lunar),
    holidayName: holiday?.name,
    importantDayName: getCommemorativeDay(iso),
    isHuangDao: isHuangDao(lunar),
    isBadDay: bad.isBad,
    badReasons: bad.reasons,
  };
}

export function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month - 1, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const gridStart = new Date(year, month - 1, 1 - startOffset);
  const cells: CalendarDay[] = [];

  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const iso = formatSolarDate(date);
    const lunar = getLunarForDate(y, m, d);
    const yi = lunar.getDayYi().map((item: string) => toTaiwanTraditional(item));
    const ji = lunar.getDayJi().map((item: string) => toTaiwanTraditional(item));
    const holiday = getHoliday(iso);
    const bad = getBadDayInfo(y, m, d);
    const lunarDayNum = lunar.getDay();
    const lunarDay =
      lunarDayNum === 1
        ? `${lunar.getMonthInChinese()}月`
        : lunar.getDayInChinese();

    cells.push({
      date,
      iso,
      day: d,
      inMonth: date.getMonth() === month - 1,
      lunarDay: toTaiwanTraditional(lunarDay),
      jieQi: toTaiwanTraditional(lunar.getJieQi() || ""),
      holidayName: holiday?.name,
      isHoliday: isHoliday(iso),
      isMakeup: isMakeupDay(iso),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isHuangDao: isHuangDao(lunar),
      yiPreview: yi.slice(0, 2),
      jiPreview: ji.slice(0, 1),
      jianChu: toTaiwanTraditional(lunar.getZhiXing()),
      clash: toTaiwanTraditional(lunar.getDayChongDesc()),
      clashZodiac: toTaiwanTraditional(lunar.getDayChongShengXiao()),
      dayGanZhi: toTaiwanTraditional(lunar.getDayInGanZhi()),
      dayShengXiao: toTaiwanTraditional(lunar.getDayShengXiao()),
      isBadDay: bad.isBad,
      badReasons: bad.reasons,
    });
  }

  return cells;
}

export function shiftDate(base: Date, deltaDays: number): Date {
  const next = new Date(base);
  next.setDate(base.getDate() + deltaDays);
  return next;
}
