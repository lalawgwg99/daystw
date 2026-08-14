import { Solar } from "lunar-javascript";
import { taiwanHolidays } from "./taiwan-holidays";
import { toTaiwanTraditional } from "../lib/traditional";

export type FestivalCategory = "folk" | "deity" | "jieqi" | "worship" | "national";

export const festivalCategoryLabels: Record<FestivalCategory, string> = {
  folk: "民俗節慶",
  deity: "神明誕辰",
  jieqi: "二十四節氣",
  worship: "定期拜拜",
  national: "國定假日",
};

export type FestivalEntry = {
  id: string;
  name: string;
  category: FestivalCategory;
  /** 農曆月（1–12）；0 表示依節氣或國曆 */
  lunarMonth: number;
  /** 農曆日；0 表示依節氣 */
  lunarDay: number;
  jieQi?: string;
  intent: string;
  time: string;
  offering: string;
  caution: string;
  /** 主要祭祀神明（選填） */
  deity?: string;
};

export const festivalTemplates: FestivalEntry[] = [
  // ── 民俗節慶 ──
  {
    id: "new-year-eve",
    name: "除夕",
    category: "folk",
    lunarMonth: 12,
    lunarDay: 30,
    intent: "團圓守歲、祭祖辭歲",
    time: "傍晚至子時，依家族習慣",
    offering: "年菜、紅包、金紙、天公金",
    caution: "子時接神後再休息；避免掃地倒垃圾（依習俗）",
  },
  {
    id: "spring",
    name: "春節（正月初一）",
    category: "folk",
    lunarMonth: 1,
    lunarDay: 1,
    intent: "闔家團圓、拜年祈福",
    time: "清晨開門後，上午拜年",
    offering: "甜茶、發糕、糖果、金紙",
    caution: "初一忌掃地、打破物品；說吉祥話",
    deity: "天公、祖先、家神",
  },
  {
    id: "spring-day4",
    name: "迎神日（正月初四）",
    category: "folk",
    lunarMonth: 1,
    lunarDay: 4,
    intent: "迎神回府、接財神",
    time: "上午至中午",
    offering: "發糕、水果、金紙",
    caution: "部分商家此日才正式開市",
    deity: "神明、財神",
  },
  {
    id: "spring-day5",
    name: "破五／迎財神（正月初五）",
    category: "folk",
    lunarMonth: 1,
    lunarDay: 5,
    intent: "迎財神、開市求財",
    time: "清晨至上午（部分廟宇零時起）",
    offering: "發糕、甜茶、水果、金紙",
    caution: "商家常選此日開市或首拜",
    deity: "財神爺、路神",
  },
  {
    id: "lantern",
    name: "元宵節",
    category: "folk",
    lunarMonth: 1,
    lunarDay: 15,
    intent: "賞燈、求姻緣、開年祈福",
    time: "傍晚至月出後",
    offering: "湯圓、花燈、清茶",
    caution: "可點光明燈、求月老紅線",
    deity: "天官、月老",
  },
  {
    id: "qingming",
    name: "清明節",
    category: "folk",
    lunarMonth: 0,
    lunarDay: 0,
    jieQi: "清明",
    intent: "掃墓、祭祖、追思",
    time: "上午為主，依家族習慣",
    offering: "鮮花、素果、茶酒、先人生前喜愛食物",
    caution: "墓園用火與金紙須依地方規範",
    deity: "祖先",
  },
  {
    id: "qixi",
    name: "七夕",
    category: "folk",
    lunarMonth: 7,
    lunarDay: 7,
    intent: "乞巧、姻緣、情人節",
    time: "傍晚",
    offering: "巧果、鮮花、甜食",
    caution: "可至月老廟祈求姻緣",
    deity: "月老、七娘媽",
  },
  {
    id: "ghost-open",
    name: "中元開門（七月一日）",
    category: "folk",
    lunarMonth: 7,
    lunarDay: 1,
    intent: "鬼門開、普渡準備",
    time: "上午祭祀",
    offering: "普渡供品、乾糧、水果",
    caution: "開始準備中元普渡供品，避免深夜外出（依習俗）",
  },
  {
    id: "ghost",
    name: "中元節（七月十五）",
    category: "folk",
    lunarMonth: 7,
    lunarDay: 15,
    intent: "普度、慎終追遠、孝親報恩",
    time: "下午 2 點至 5 點前",
    offering: "三牲、水果、乾糧、米酒、紙錢",
    caution: "避免香蕉、李子、梨子、鳳梨；祭拜時不呼叫本名",
    deity: "地基主、好兄弟",
  },
  {
    id: "ghost-close",
    name: "中元關門（七月廿九）",
    category: "folk",
    lunarMonth: 7,
    lunarDay: 29,
    intent: "鬼門關、送好兄弟",
    time: "下午前完成",
    offering: "普渡供品、金紙",
    caution: "依地方習俗送別，部分地區日期略有不同",
  },
  {
    id: "midautumn",
    name: "中秋節",
    category: "folk",
    lunarMonth: 8,
    lunarDay: 15,
    intent: "團圓、拜月",
    time: "傍晚至月出後",
    offering: "月餅、柚子、圓形水果、清茶",
    caution: "依家庭習慣準備團圓食品",
    deity: "月娘、祖先",
  },
  {
    id: "double-nine",
    name: "重陽節",
    category: "folk",
    lunarMonth: 9,
    lunarDay: 9,
    intent: "敬老、登高、避災",
    time: "上午",
    offering: "菊花酒、花糕（依習俗）",
    caution: "可陪長輩登高或聚餐",
  },
  {
    id: "hanyi",
    name: "寒衣節",
    category: "folk",
    lunarMonth: 10,
    lunarDay: 1,
    intent: "送寒衣、祭祀祖先",
    time: "上午",
    offering: "紙衣、金紙、素果",
    caution: "部分家庭會在此時準備冬衣供奉",
    deity: "祖先",
  },
  {
    id: "xiayuan",
    name: "下元節",
    category: "folk",
    lunarMonth: 10,
    lunarDay: 15,
    intent: "祈福消災、謝平安",
    time: "上午至中午",
    offering: "鮮花、素果、金紙",
    caution: "與上元、中元合稱三元",
    deity: "水官大帝",
  },
  {
    id: "laba",
    name: "臘八節",
    category: "folk",
    lunarMonth: 12,
    lunarDay: 8,
    intent: "喝臘八粥、祈福",
    time: "上午",
    offering: "臘八粥、素果",
    caution: "部分佛寺有施粥活動",
  },
  {
    id: "weiya",
    name: "尾牙",
    category: "folk",
    lunarMonth: 12,
    lunarDay: 16,
    intent: "酬謝土地公、公司尾牙",
    time: "下午或傍晚",
    offering: "發糕、刈金、三牲（依公司習慣）",
    caution: "商家必拜，答謝一年保佑",
    deity: "土地公",
  },
  {
    id: "stove-send",
    name: "送灶神",
    category: "folk",
    lunarMonth: 12,
    lunarDay: 23,
    intent: "送灶神上天稟報",
    time: "傍晚前",
    offering: "糖果、粘糕、水果、清茶",
    caution: "用甜食「黏住」灶神嘴巴；正月初四迎回",
    deity: "灶神",
  },
  {
    id: "dragon",
    name: "端午節",
    category: "folk",
    lunarMonth: 5,
    lunarDay: 5,
    intent: "避邪、驅疫、紀念屈原",
    time: "上午掛艾草、中午吃粽子",
    offering: "粽子、艾草、雄黃酒（依習俗）",
    caution: "部分廟宇有驅疫祈福儀式",
  },
  {
    id: "winter",
    name: "冬至",
    category: "folk",
    lunarMonth: 0,
    lunarDay: 0,
    jieQi: "冬至",
    intent: "補冬、祭祖、闔家團圓",
    time: "傍晚闔家團聚",
    offering: "湯圓、酒釀、雞鴨補冬",
    caution: "民間有「冬至大如年」之說",
  },

  // ── 神明誕辰 ──
  {
    id: "tiangong",
    name: "天公生",
    category: "deity",
    lunarMonth: 1,
    lunarDay: 9,
    intent: "拜天公、祈求全年平安",
    time: "子時（零時）或清晨",
    offering: "九層塔、發糕、天公金、紅線",
    caution: "需準備天公桌，供品排列依習俗",
    deity: "玉皇大帝",
  },
  {
    id: "tudigong-2-2",
    name: "頭牙（二月二）",
    category: "deity",
    lunarMonth: 2,
    lunarDay: 2,
    intent: "拜土地公、祈求生意興隆",
    time: "上午",
    offering: "發糕、甜茶、水果、刈金",
    caution: "一年兩次牙（頭牙、尾牙）的起點",
    deity: "土地公",
  },
  {
    id: "guanyin-2-19",
    name: "觀音誕辰（二月十九）",
    category: "deity",
    lunarMonth: 2,
    lunarDay: 19,
    intent: "祈求平安、消災解厄",
    time: "上午，素齋為主",
    offering: "鮮花、素果、清茶",
    caution: "觀音殿忌葷腥，保持心誠",
    deity: "觀音菩薩",
  },
  {
    id: "baosheng",
    name: "保生大帝誕辰",
    category: "deity",
    lunarMonth: 3,
    lunarDay: 15,
    intent: "祈求健康、消災",
    time: "上午",
    offering: "鮮花、素果、清茶",
    caution: "南部學甲慈濟宮等大廟有遶境慶典",
    deity: "保生大帝",
  },
  {
    id: "mazu",
    name: "媽祖誕辰",
    category: "deity",
    lunarMonth: 3,
    lunarDay: 23,
    intent: "祈求行船平安、出入順遂",
    time: "上午",
    offering: "鮮花、素果、清茶、發糕",
    caution: "大甲媽、北港朝天宮等會舉行慶典",
    deity: "媽祖",
  },
  {
    id: "guanyu",
    name: "關聖帝君誕辰",
    category: "deity",
    lunarMonth: 5,
    lunarDay: 13,
    intent: "祈求事業、誠信、平安",
    time: "上午",
    offering: "鮮花、水果、清茶、金紙",
    caution: "行天宮、祀典武廟等香火鼎盛",
    deity: "關聖帝君",
  },
  {
    id: "guanyin-6-19",
    name: "觀音成道日",
    category: "deity",
    lunarMonth: 6,
    lunarDay: 19,
    intent: "祈求平安、解厄",
    time: "上午，素齋",
    offering: "鮮花、素果、清茶",
    caution: "與二月十九、九月十九合稱觀音誕",
    deity: "觀音菩薩",
  },
  {
    id: "wangye",
    name: "王爺千歲誕",
    category: "deity",
    lunarMonth: 6,
    lunarDay: 24,
    intent: "祈求平安、驅邪",
    time: "上午",
    offering: "鮮花、素果、清茶",
    caution: "南部部分廟宇有送王、迎王習俗",
    deity: "王爺（千歲）",
  },
  {
    id: "dizang",
    name: "地藏王誕辰",
    category: "deity",
    lunarMonth: 7,
    lunarDay: 30,
    intent: "超渡、孝親、祈福",
    time: "上午",
    offering: "鮮花、素果、清茶",
    caution: "中元前後常與普渡一併祭祀",
    deity: "地藏王菩薩",
  },
  {
    id: "guanyin-9-19",
    name: "觀音出家日",
    category: "deity",
    lunarMonth: 9,
    lunarDay: 19,
    intent: "祈求平安、消災",
    time: "上午，素齋",
    offering: "鮮花、素果、清茶",
    caution: "一年三次觀音誕的最後一次",
    deity: "觀音菩薩",
  },
  {
    id: "wenchang",
    name: "文昌帝君誕辰",
    category: "deity",
    lunarMonth: 11,
    lunarDay: 26,
    intent: "祈求考試、升學、文運",
    time: "上午",
    offering: "蔥、芹菜、包子、粽子",
    caution: "考生可準備文具供奉",
    deity: "文昌帝君",
  },

  // ── 定期拜拜 ──
  {
    id: "chuyi",
    name: "每月初一",
    category: "worship",
    lunarMonth: 0,
    lunarDay: 0,
    intent: "拜天公、祖先、家神",
    time: "上午",
    offering: "鮮花、素果、清茶、金紙",
    caution: "每月初一、十五為傳統拜拜日",
    deity: "天公、祖先",
  },
  {
    id: "shiwu",
    name: "每月十五",
    category: "worship",
    lunarMonth: 0,
    lunarDay: 0,
    intent: "拜天公、祖先、家神",
    time: "上午",
    offering: "鮮花、素果、清茶、金紙",
    caution: "滿月日，宜誠心祈福",
    deity: "天公、祖先",
  },

  // ── 二十四節氣 ──
  { id: "jq-lichun", name: "立春", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "立春", intent: "春季開始，萬物復甦", time: "節氣當日", offering: "—", caution: "宜規劃年度、整理環境" },
  { id: "jq-yushui", name: "雨水", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "雨水", intent: "降雨增多，農事準備", time: "節氣當日", offering: "—", caution: "注意保暖防濕" },
  { id: "jq-jingzhe", name: "驚蟄", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "惊蛰", intent: "春雷驚醒蟲類", time: "節氣當日", offering: "—", caution: "萬物甦醒，宜戶外活動" },
  { id: "jq-chunfen", name: "春分", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "春分", intent: "晝夜平分，陰陽平衡", time: "節氣當日", offering: "—", caution: "四离日，大事不宜" },
  { id: "jq-qingming", name: "清明（節氣）", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "清明", intent: "天清地明，掃墓時節", time: "節氣當日", offering: "—", caution: "與清明節同一日或相近" },
  { id: "jq-guyu", name: "穀雨", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "谷雨", intent: "雨生百穀，農忙開始", time: "節氣當日", offering: "—", caution: "適合播種、整理農事" },
  { id: "jq-lixia", name: "立夏", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "立夏", intent: "夏季開始", time: "節氣當日", offering: "—", caution: "注意防暑、補充水分" },
  { id: "jq-xiaoman", name: "小滿", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "小满", intent: "麥類將熟未熟", time: "節氣當日", offering: "—", caution: "農作物進入關鍵期" },
  { id: "jq-mangzhong", name: "芒種", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "芒种", intent: "有芒作物成熟", time: "節氣當日", offering: "—", caution: "農忙時節" },
  { id: "jq-xiazhi", name: "夏至", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "夏至", intent: "日最長、夏最盛", time: "節氣當日", offering: "—", caution: "四离日，大事不宜" },
  { id: "jq-xiaoshu", name: "小暑", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "小暑", intent: "暑熱開始", time: "節氣當日", offering: "—", caution: "注意防暑" },
  { id: "jq-dashu", name: "大暑", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "大暑", intent: "一年最熱", time: "節氣當日", offering: "—", caution: "避免過勞、多補水" },
  { id: "jq-liqiu", name: "立秋", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "立秋", intent: "秋季開始", time: "節氣當日", offering: "—", caution: "早晚溫差漸大" },
  { id: "jq-chushu", name: "處暑", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "处暑", intent: "暑氣將止", time: "節氣當日", offering: "—", caution: "秋老虎仍須防暑" },
  { id: "jq-bailu", name: "白露", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "白露", intent: "露水增多，秋意漸濃", time: "節氣當日", offering: "—", caution: "注意保暖" },
  { id: "jq-qiufen", name: "秋分", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "秋分", intent: "晝夜平分", time: "節氣當日", offering: "—", caution: "四离日，大事不宜" },
  { id: "jq-hanlu", name: "寒露", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "寒露", intent: "露水帶寒", time: "節氣當日", offering: "—", caution: "秋深須添衣" },
  { id: "jq-shuangjiang", name: "霜降", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "霜降", intent: "開始降霜", time: "節氣當日", offering: "—", caution: "冬季來臨前準備" },
  { id: "jq-lidong", name: "立冬", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "立冬", intent: "冬季開始、補冬", time: "節氣當日", offering: "—", caution: "民間有補冬習俗" },
  { id: "jq-xiaoxue", name: "小雪", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "小雪", intent: "開始降雪", time: "節氣當日", offering: "—", caution: "注意保暖" },
  { id: "jq-daxue", name: "大雪", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "大雪", intent: "降雪增多", time: "節氣當日", offering: "—", caution: "嚴防寒潮" },
  { id: "jq-dongzhi", name: "冬至（節氣）", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "冬至", intent: "日最短、陰極陽生", time: "節氣當日", offering: "—", caution: "與冬至節同一日" },
  { id: "jq-xiaohan", name: "小寒", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "小寒", intent: "天氣嚴寒", time: "節氣當日", offering: "—", caution: "一年最冷時節將至" },
  { id: "jq-dahan", name: "大寒", category: "jieqi", lunarMonth: 0, lunarDay: 0, jieQi: "大寒", intent: "一年最冷", time: "節氣當日", offering: "—", caution: "春節將近，準備過年" },
];

export type ResolvedFestival = FestivalEntry & {
  solar: string;
  lunar: string;
  isRecurring?: boolean;
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

function resolveNationalHolidays(year: number): ResolvedFestival[] {
  return taiwanHolidays
    .filter((h) => h.date.startsWith(String(year)) && h.type === "holiday")
    .map((h) => ({
      id: `national-${h.date}`,
      name: h.name,
      category: "national" as const,
      lunarMonth: 0,
      lunarDay: 0,
      intent: "國定假日，安排返鄉、出遊或休息",
      time: "全天",
      offering: "—",
      caution: h.name.includes("補班") ? "補班日" : "人事行政總處公告假日",
      solar: h.date,
      lunar: formatLunarLabel(h.date),
    }));
}

function formatLunarLabel(solar: string): string {
  const [y, m, d] = solar.split("-").map(Number);
  const lunar = Solar.fromYmd(y, m, d).getLunar();
  return `農曆${toTaiwanTraditional(lunar.getMonthInChinese())}月${toTaiwanTraditional(lunar.getDayInChinese())}`;
}

/** 展開每月初一、十五 */
function expandMonthlyWorship(year: number): ResolvedFestival[] {
  const entries: ResolvedFestival[] = [];
  const chuyi = festivalTemplates.find((t) => t.id === "chuyi")!;
  const shiwu = festivalTemplates.find((t) => t.id === "shiwu")!;

  for (let m = 1; m <= 12; m++) {
    const daysInMonth = new Date(year, m, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const lunar = Solar.fromYmd(year, m, d).getLunar();
      const day = lunar.getDay();
      const template = day === 1 ? chuyi : day === 15 ? shiwu : null;
      if (!template) continue;
      const solar = `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      entries.push({
        ...template,
        id: `${template.id}-${solar}`,
        solar,
        lunar: formatLunarLabel(solar),
      });
    }
  }
  return entries;
}

export function resolveFestivalsForYear(year: number): ResolvedFestival[] {
  const resolved = festivalTemplates
    .filter((t) => t.category !== "worship")
    .map((template) => {
      const solar =
        template.lunarDay === 0 && template.jieQi
          ? findSolarForJieQi(year, template.jieQi)
          : template.lunarMonth > 0
            ? findSolarForLunar(year, template.lunarMonth, template.lunarDay)
            : null;

      if (!solar) return null;

      return {
        ...template,
        name: template.category === "jieqi" ? toTaiwanTraditional(template.name) : template.name,
        solar,
        lunar: formatLunarLabel(solar),
      };
    })
    .filter((item): item is ResolvedFestival => item !== null);

  const worship = expandMonthlyWorship(year);
  const national = resolveNationalHolidays(year);

  const merged = [...resolved, ...worship, ...national];
  const seen = new Set<string>();

  return merged
    .filter((item) => {
      const key = `${item.solar}-${item.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.solar.localeCompare(b.solar));
}

export function getUpcomingFestivals(
  year: number,
  fromDate = new Date(),
  limit?: number,
): ResolvedFestival[] {
  const today = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, "0")}-${String(fromDate.getDate()).padStart(2, "0")}`;
  const list = resolveFestivalsForYear(year).filter((f) => f.solar >= today);
  return limit ? list.slice(0, limit) : list;
}

export function filterFestivalsByCategory(
  festivals: ResolvedFestival[],
  category: FestivalCategory | "",
): ResolvedFestival[] {
  if (!category) return festivals;
  return festivals.filter((f) => f.category === category);
}

export function countFestivalsByCategory(year: number): Record<FestivalCategory, number> {
  const all = resolveFestivalsForYear(year);
  return {
    folk: all.filter((f) => f.category === "folk").length,
    deity: all.filter((f) => f.category === "deity").length,
    jieqi: all.filter((f) => f.category === "jieqi").length,
    worship: all.filter((f) => f.category === "worship").length,
    national: all.filter((f) => f.category === "national").length,
  };
}
