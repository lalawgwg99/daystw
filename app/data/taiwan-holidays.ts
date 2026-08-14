/** 台灣國定假日與補班（2024–2027，依人事行政總處公告整理） */

export type HolidayType = "holiday" | "makeup";

export type TaiwanHoliday = {
  date: string;
  name: string;
  type: HolidayType;
};

export const taiwanHolidays: TaiwanHoliday[] = [
  // 2024
  { date: "2024-01-01", name: "開國紀念日", type: "holiday" },
  { date: "2024-02-08", name: "小年夜", type: "holiday" },
  { date: "2024-02-09", name: "除夕", type: "holiday" },
  { date: "2024-02-10", name: "春節", type: "holiday" },
  { date: "2024-02-11", name: "春節", type: "holiday" },
  { date: "2024-02-12", name: "春節", type: "holiday" },
  { date: "2024-02-13", name: "春節", type: "holiday" },
  { date: "2024-02-14", name: "春節", type: "holiday" },
  { date: "2024-02-17", name: "補班", type: "makeup" },
  { date: "2024-02-28", name: "和平紀念日", type: "holiday" },
  { date: "2024-04-04", name: "兒童節、清明節", type: "holiday" },
  { date: "2024-04-05", name: "清明節", type: "holiday" },
  { date: "2024-06-10", name: "端午節", type: "holiday" },
  { date: "2024-09-17", name: "中秋節", type: "holiday" },
  { date: "2024-10-10", name: "國慶日", type: "holiday" },
  // 2025
  { date: "2025-01-01", name: "開國紀念日", type: "holiday" },
  { date: "2025-01-27", name: "小年夜", type: "holiday" },
  { date: "2025-01-28", name: "除夕", type: "holiday" },
  { date: "2025-01-29", name: "春節", type: "holiday" },
  { date: "2025-01-30", name: "春節", type: "holiday" },
  { date: "2025-01-31", name: "春節", type: "holiday" },
  { date: "2025-02-01", name: "春節", type: "holiday" },
  { date: "2025-02-02", name: "春節", type: "holiday" },
  { date: "2025-02-08", name: "補班", type: "makeup" },
  { date: "2025-02-28", name: "和平紀念日", type: "holiday" },
  { date: "2025-04-03", name: "兒童節", type: "holiday" },
  { date: "2025-04-04", name: "兒童節、清明節", type: "holiday" },
  { date: "2025-05-31", name: "端午節", type: "holiday" },
  { date: "2025-09-29", name: "教師節", type: "holiday" },
  { date: "2025-10-06", name: "中秋節", type: "holiday" },
  { date: "2025-10-10", name: "國慶日", type: "holiday" },
  { date: "2025-10-24", name: "補班", type: "makeup" },
  { date: "2025-12-25", name: "行憲紀念日", type: "holiday" },
  // 2026
  { date: "2026-01-01", name: "開國紀念日", type: "holiday" },
  { date: "2026-02-14", name: "小年夜", type: "holiday" },
  { date: "2026-02-15", name: "除夕", type: "holiday" },
  { date: "2026-02-16", name: "春節", type: "holiday" },
  { date: "2026-02-17", name: "春節", type: "holiday" },
  { date: "2026-02-18", name: "春節", type: "holiday" },
  { date: "2026-02-19", name: "春節", type: "holiday" },
  { date: "2026-02-20", name: "春節", type: "holiday" },
  { date: "2026-02-28", name: "和平紀念日", type: "holiday" },
  { date: "2026-04-03", name: "兒童節", type: "holiday" },
  { date: "2026-04-04", name: "兒童節、清明節", type: "holiday" },
  { date: "2026-04-05", name: "清明節", type: "holiday" },
  { date: "2026-06-19", name: "端午節", type: "holiday" },
  { date: "2026-09-25", name: "中秋節", type: "holiday" },
  { date: "2026-09-28", name: "教師節", type: "holiday" },
  { date: "2026-10-09", name: "國慶日", type: "holiday" },
  { date: "2026-10-10", name: "國慶日", type: "holiday" },
  { date: "2026-10-25", name: "光復節", type: "holiday" },
  { date: "2026-12-25", name: "行憲紀念日", type: "holiday" },
  // 2027（部分，待官方公告後更新）
  { date: "2027-01-01", name: "開國紀念日", type: "holiday" },
  { date: "2027-02-06", name: "除夕", type: "holiday" },
  { date: "2027-02-07", name: "春節", type: "holiday" },
  { date: "2027-02-08", name: "春節", type: "holiday" },
  { date: "2027-02-09", name: "春節", type: "holiday" },
  { date: "2027-02-28", name: "和平紀念日", type: "holiday" },
  { date: "2027-04-04", name: "兒童節、清明節", type: "holiday" },
  { date: "2027-04-05", name: "清明節", type: "holiday" },
  { date: "2027-06-09", name: "端午節", type: "holiday" },
  { date: "2027-09-15", name: "中秋節", type: "holiday" },
  { date: "2027-10-10", name: "國慶日", type: "holiday" },
];

const holidayMap = new Map(taiwanHolidays.map((h) => [h.date, h]));

export function getHoliday(dateStr: string): TaiwanHoliday | undefined {
  return holidayMap.get(dateStr);
}

export function isHoliday(dateStr: string): boolean {
  return holidayMap.get(dateStr)?.type === "holiday";
}

export function isMakeupDay(dateStr: string): boolean {
  return holidayMap.get(dateStr)?.type === "makeup";
}
