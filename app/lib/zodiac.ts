import { Solar } from "lunar-javascript";
import { toTaiwanTraditional } from "./traditional";

/** 依出生年推算生肖（以立春為界） */
export function zodiacFromBirthYear(birthYear: number): string | null {
  if (birthYear < 1900 || birthYear > 2100) return null;
  const lunar = Solar.fromYmd(birthYear, 6, 15).getLunar();
  return toTaiwanTraditional(lunar.getYearShengXiaoByLiChun());
}

export const zodiacOptions = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
