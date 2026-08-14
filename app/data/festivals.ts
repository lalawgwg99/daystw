import { Solar } from "lunar-javascript";

export type FestivalEntry = {
  id: string;
  name: string;
  /** 農曆月（1–12） */
  lunarMonth: number;
  /** 農曆日；0 表示依節氣 */
  lunarDay: number;
  /** 節氣名稱（lunarDay 為 0 時使用） */
  jieQi?: string;
  intent: string;
  time: string;
  offering: string;
  caution: string;
};

export const festivalTemplates: FestivalEntry[] = [
  {
    id: "spring",
    name: "春節",
    lunarMonth: 1,
    lunarDay: 1,
    intent: "闔家團圓、祭祖祈福",
    time: "除夕至初五，上午為主",
    offering: "年菜、發糕、糖果、金紙",
    caution: "初一避免掃地、打破物品；拜年吉時依各地習俗",
  },
  {
    id: "lantern",
    name: "元宵節",
    lunarMonth: 1,
    lunarDay: 15,
    intent: "賞燈、求姻緣",
    time: "傍晚至月出後",
    offering: "湯圓、花燈、清茶",
    caution: "可至廟宇點光明燈或求月老紅線",
  },
  {
    id: "qingming",
    name: "清明節",
    lunarMonth: 0,
    lunarDay: 0,
    jieQi: "清明",
    intent: "掃墓、祭祖",
    time: "上午為主，依家族習慣調整",
    offering: "鮮花、素果、茶酒、祖先生前喜愛食物",
    caution: "墓園用火與金紙須依地方規範",
  },
  {
    id: "dragon",
    name: "端午節",
    lunarMonth: 5,
    lunarDay: 5,
    intent: "避邪、紀念屈原",
    time: "上午懸掛艾草、中午吃粽子",
    offering: "粽子、艾草、雄黃酒（依習俗）",
    caution: "部分廟宇有驅疫祈福儀式",
  },
  {
    id: "ghost",
    name: "中元節",
    lunarMonth: 7,
    lunarDay: 15,
    intent: "普度、慎終追遠、孝親報恩",
    time: "下午 2 點至 5 點前",
    offering: "三牲、水果、乾糧、米酒、紙錢",
    caution: "避免香蕉、李子、梨子、鳳梨；祭拜時不呼叫本名",
  },
  {
    id: "midautumn",
    name: "中秋節",
    lunarMonth: 8,
    lunarDay: 15,
    intent: "團圓、拜月",
    time: "傍晚至月出後",
    offering: "月餅、柚子、圓形水果、清茶",
    caution: "依家庭習慣準備團圓食品即可",
  },
  {
    id: "double-nine",
    name: "重陽節",
    lunarMonth: 9,
    lunarDay: 9,
    intent: "敬老、登高、避災",
    time: "上午",
    offering: "菊花酒、花糕（依習俗）",
    caution: "可陪長輩登高或聚餐",
  },
  {
    id: "winter",
    name: "冬至",
    lunarMonth: 0,
    lunarDay: 0,
    jieQi: "冬至",
    intent: "補冬、祭祖",
    time: "傍晚闔家團聚",
    offering: "湯圓、酒釀、雞鴨補冬",
    caution: "民間有「冬至大如年」之說",
  },
  {
    id: "laba",
    name: "臘八節",
    lunarMonth: 12,
    lunarDay: 8,
    intent: "喝臘八粥、祈福",
    time: "上午",
    offering: "臘八粥、素果",
    caution: "部分佛寺有施粥活動",
  },
];

export type ResolvedFestival = FestivalEntry & {
  solar: string;
  lunar: string;
};

function findSolarForLunar(year: number, lunarMonth: number, lunarDay: number): string | null {
  for (let m = 1; m <= 12; m++) {
    const days = new Date(year, m, 0).getDate();
    for (let d = 1; d <= days; d++) {
      const lunar = Solar.fromYmd(year, m, d).getLunar();
      if (lunar.getMonth() === lunarMonth && lunar.getDay() === lunarDay) {
        return `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      }
    }
  }
  return null;
}

function findSolarForJieQi(year: number, jieQi: string): string | null {
  for (let m = 1; m <= 12; m++) {
    const days = new Date(year, m, 0).getDate();
    for (let d = 1; d <= days; d++) {
      const lunar = Solar.fromYmd(year, m, d).getLunar();
      if (lunar.getJieQi() === jieQi) {
        return `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      }
    }
  }
  return null;
}

export function resolveFestivalsForYear(year: number): ResolvedFestival[] {
  return festivalTemplates
    .map((template) => {
      const solar =
        template.lunarDay === 0 && template.jieQi
          ? findSolarForJieQi(year, template.jieQi)
          : findSolarForLunar(year, template.lunarMonth, template.lunarDay);

      if (!solar) return null;

      const lunar = Solar.fromYmd(
        Number(solar.slice(0, 4)),
        Number(solar.slice(5, 7)),
        Number(solar.slice(8, 10)),
      ).getLunar();

      return {
        ...template,
        solar,
        lunar: `農曆${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      };
    })
    .filter((item): item is ResolvedFestival => item !== null)
    .sort((a, b) => a.solar.localeCompare(b.solar));
}

export function getUpcomingFestivals(year: number, fromDate = new Date(), limit = 6): ResolvedFestival[] {
  const today = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, "0")}-${String(fromDate.getDate()).padStart(2, "0")}`;
  return resolveFestivalsForYear(year)
    .filter((f) => f.solar >= today)
    .slice(0, limit);
}
