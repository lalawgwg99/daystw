import { getLunarForDate } from "./finder";
import type { ClashExplanation } from "./clash";
import { toTaiwanTraditional } from "./traditional";

export type FoodAdvice = {
  /** 日納音，如石榴木 */
  naYin: string;
  /** 納音五行：木火土金水 */
  wuXing: string;
  /** 宜食（依五行民俗） */
  yiShi: string[];
  /** 忌食（依五行民俗） */
  jiShi: string[];
  /** 沖生肖相關飲食提醒 */
  clashNote: string;
  /** 白話摘要 */
  summary: string;
};

const WU_XING_FOOD: Record<
  string,
  { yi: string[]; ji: string[]; plain: string }
> = {
  木: {
    yi: ["青蔬、時令水果", "酸味料理（如醋、檸檬）", "綠色葉菜、豆類"],
    ji: ["過量油炸", "過度辛辣刺激", "暴飲暴食"],
    plain: "木主疏泄，宜清爽少油，忌過燥過膩。",
  },
  火: {
    yi: ["紅色蔬果（番茄、紅蘿蔔）", "苦味蔬菜（苦瓜、萬壽菊）", "清淡湯品"],
    ji: ["過度烧烤、香炸", "大量酒精", "深夜重口味宵夜"],
    plain: "火日易燥，宜清潤降火，忌過熱過燥食物。",
  },
  土: {
    yi: ["黃色根莖（南瓜、地瓜）", "甘味穀物、粥品", "溫補但不油膩的料理"],
    ji: ["過酸過澀", "生冷冰品過量", "難消化的大魚大肉"],
    plain: "土日宜養脾胃，宜溫軟甘平，忌過冷過酸傷胃。",
  },
  金: {
    yi: ["白色食材（蘿蔔、梨、銀耳）", "微辛暖身（薑、蔥白）", "潤肺湯品"],
    ji: ["過苦過寒", "過度麻辣", "乾燥炸物過量"],
    plain: "金日宜潤燥，宜清潤微辛，忌過苦過燥。",
  },
  水: {
    yi: ["黑色食材（黑豆、黑芝麻）", "適量海鮮、魚湯", "溫熱補水類湯品"],
    ji: ["過鹹醃漬品", "過量生冷", "酒精與冰品同時大量攝取"],
    plain: "水日宜溫補腎水，宜鹹淡適中，忌過鹹過冷。",
  },
};

/** 納音末字取五行，如「石榴木」→ 木 */
function wuXingFromNaYin(naYin: string): string {
  const last = naYin.slice(-1);
  return ["木", "火", "土", "金", "水"].includes(last) ? last : "土";
}

function clashFoodNote(clash: ClashExplanation): string {
  if (!clash.zodiac) return "";
  const ages =
    clash.ages.length > 0 ? `（虛歲 ${clash.ages.slice(0, 3).join("、")} 等）` : "";
  return `今日沖${clash.zodiac}。民俗上屬${clash.zodiac}者${ages}宜飲食清淡、七分飽，忌酒後暴食；一般人也宜避免過度荤腥與深夜進食。`;
}

export function getFoodAdvice(
  year: number,
  month: number,
  day: number,
  clash: ClashExplanation,
): FoodAdvice {
  const lunar = getLunarForDate(year, month, day);
  const naYin = toTaiwanTraditional(lunar.getDayNaYin());
  const wuXing = wuXingFromNaYin(naYin);
  const guide = WU_XING_FOOD[wuXing] ?? WU_XING_FOOD.土;
  const clashNote = clashFoodNote(clash);

  const summary = [
    `日納音「${naYin}」屬${wuXing}，${guide.plain}`,
    clashNote ? clashNote.split("。")[0] + "。" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    naYin,
    wuXing,
    yiShi: guide.yi,
    jiShi: guide.ji,
    clashNote,
    summary,
  };
}
