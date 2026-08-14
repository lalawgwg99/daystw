import { Solar } from "lunar-javascript";
import { toTaiwanTraditional } from "./traditional";

const BAD_KEYWORDS = ["月破", "四绝", "四絕", "受死", "杨公忌", "楊公忌", "真灭没", "真滅沒"];

export type BadDayInfo = {
  isBad: boolean;
  reasons: string[];
};

export function getBadDayInfo(year: number, month: number, day: number): BadDayInfo {
  const lunar = Solar.fromYmd(year, month, day).getLunar();
  const xiongSha = lunar.getDayXiongSha().map((item: string) => toTaiwanTraditional(item));
  const reasons = xiongSha.filter((item) =>
    BAD_KEYWORDS.some((keyword) => item.includes(keyword)),
  );

  // 四离日：春分、夏至、秋分、冬至前一日
  const jieQi = toTaiwanTraditional(lunar.getJieQi() || "");
  const next = new Date(year, month - 1, day + 1);
  const nextDay = Solar.fromYmd(
    next.getFullYear(),
    next.getMonth() + 1,
    next.getDate(),
  ).getLunar();
  const nextJieQi = toTaiwanTraditional(nextDay.getJieQi() || "");
  if (["春分", "夏至", "秋分", "冬至"].includes(nextJieQi)) {
    reasons.push("四离日");
  }

  return { isBad: reasons.length > 0, reasons: [...new Set(reasons)] };
}

export function isBadDay(year: number, month: number, day: number): boolean {
  return getBadDayInfo(year, month, day).isBad;
}
