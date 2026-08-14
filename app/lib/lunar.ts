import { Solar } from "lunar-javascript";

import { toTaiwanTraditional } from "./traditional";

export type BirthChart = {
  solarDate: string;
  lunarDate: string;
  zodiac: string;
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  timePillar: string;
  dayMaster: string;
  nayin: string;
  chong: string;
  sha: string;
  currentYear: string;
  currentYearPillar: string;
  taiSuiNote: string;
};

/** 時辰對應代表小時（用於排八字時柱） */
const branchHourMap: Record<string, number> = {
  子: 0,
  丑: 2,
  寅: 4,
  卯: 6,
  辰: 8,
  巳: 10,
  午: 12,
  未: 14,
  申: 16,
  酉: 18,
  戌: 20,
  亥: 22,
};

export function parseTimeBranch(timeLabel: string): string {
  if (!timeLabel) return "";
  return timeLabel.charAt(0);
}

export function buildBirthChart(
  year: number,
  month: number,
  day: number,
  timeLabel = "",
): BirthChart {
  const branch = parseTimeBranch(timeLabel);
  const hour = branch ? branchHourMap[branch] ?? 12 : 12;
  const solar = branch
    ? Solar.fromYmdHms(year, month, day, hour, 0, 0)
    : Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  const currentYear = new Date().getFullYear();
  const currentLunar = Solar.fromYmd(currentYear, 6, 1).getLunar();
  const currentYearPillar = currentLunar.getYearInGanZhi();

  const zodiacList = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
  const birthZodiac = toTaiwanTraditional(lunar.getYearShengXiaoByLiChun());
  const currentZodiac = toTaiwanTraditional(currentLunar.getYearShengXiaoByLiChun());
  const birthZodiacIndex = zodiacList.indexOf(birthZodiac);
  const currentZodiacIndex = zodiacList.indexOf(currentZodiac);

  let taiSuiNote = "今年未犯太歲";
  if (birthZodiacIndex === currentZodiacIndex) {
    taiSuiNote = "今年值太歲（本命年），宜穩健行事、多行善舉";
  } else if (birthZodiacIndex === (currentZodiacIndex + 6) % 12) {
    taiSuiNote = "今年沖太歲，宜謹慎行事，可至廟宇安太歲";
  } else {
    const diff = Math.abs(birthZodiacIndex - currentZodiacIndex);
    if (diff === 4 || diff === 8) {
      taiSuiNote = "今年刑太歲，宜注意人際關係與健康";
    } else if (
      birthZodiacIndex === (currentZodiacIndex + 3) % 12 ||
      birthZodiacIndex === (currentZodiacIndex + 9) % 12
    ) {
      taiSuiNote = "今年害太歲，宜低調行事";
    } else if (
      birthZodiacIndex === (currentZodiacIndex + 4) % 12 ||
      birthZodiacIndex === (currentZodiacIndex + 8) % 12
    ) {
      taiSuiNote = "今年破太歲，宜避免重大變動";
    }
  }

  return {
    solarDate: `${year} 年 ${month} 月 ${day} 日`,
    lunarDate: toTaiwanTraditional(lunar.toString()),
    zodiac: birthZodiac,
    yearPillar: toTaiwanTraditional(eightChar.getYear()),
    monthPillar: toTaiwanTraditional(eightChar.getMonth()),
    dayPillar: toTaiwanTraditional(eightChar.getDay()),
    timePillar: branch ? toTaiwanTraditional(eightChar.getTime()) : "（未提供時辰）",
    dayMaster: toTaiwanTraditional(eightChar.getDayGan()),
    nayin: toTaiwanTraditional(eightChar.getDayNaYin()),
    chong: toTaiwanTraditional(lunar.getDayChongDesc()),
    sha: toTaiwanTraditional(lunar.getDaySha()),
    currentYear: `${currentYear} 年`,
    currentYearPillar: toTaiwanTraditional(currentYearPillar),
    taiSuiNote,
  };
}
