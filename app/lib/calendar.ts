import { Solar } from "lunar-javascript";
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
  isBadDay: boolean;
  badReasons: string[];
};

export type DayDetail = {
  iso: string;
  solarDate: string;
  lunarText: string;
  dayGanZhi: string;
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
  holidayName?: string;
  isHuangDao: boolean;
  isBadDay: boolean;
  badReasons: string[];
};

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

  return {
    iso,
    solarDate: iso,
    lunarText: formatLunarDate(lunar.toString()),
    dayGanZhi: toTaiwanTraditional(lunar.getDayInGanZhi()),
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
    jieQi: toTaiwanTraditional(lunar.getJieQi() || ""),
    holidayName: holiday?.name,
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
