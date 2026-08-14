export type DeityCategory =
  | "wealth"
  | "study"
  | "marriage"
  | "moving"
  | "health"
  | "career"
  | "child";

export type DeityRecord = {
  id: string;
  category: DeityCategory;
  need: string;
  deities: string[];
  offering: string;
  taboos: string[];
  worshipTime: string;
  worshipMethod: string;
  keywords: string[];
};

export const categoryLabels: Record<DeityCategory, string> = {
  wealth: "求財、開店、業績",
  study: "考試、升學、證照",
  marriage: "姻緣、人際",
  moving: "搬家入宅",
  health: "平安健康",
  career: "事業、升遷",
  child: "求子、生育",
};

export const deities: DeityRecord[] = [
  {
    id: "wealth",
    category: "wealth",
    need: "求財、開店、業績",
    deities: ["財神爺", "土地公", "關聖帝君"],
    offering: "發糕、甜茶、水果、金紙",
    taboos: ["避免葷腥供品（依廟方規定）", "金紙依廟方焚化規範", "不宜在神明前爭吵"],
    worshipTime: "上午 9 點至 11 點，或依廟方開放時間",
    worshipMethod: "先焚香三柱，說明姓名、地址、所求之事，再依序供奉供品並行禮三拜。",
    keywords: ["財", "開店", "業績", "生意", "招財"],
  },
  {
    id: "study",
    category: "study",
    need: "考試、升學、證照",
    deities: ["文昌帝君", "孔子", "魁星爺"],
    offering: "蔥（聰明）、芹菜（勤勞）、包子、粽子（包中）",
    taboos: ["供品需保持整潔", "考試前避免葷腥（依個人信仰）", "不可在神像前嬉鬧"],
    worshipTime: "考試前一週或考試當天清晨",
    worshipMethod: "供奉文具或書本於案前，誠心祈求文思敏捷、金榜題名，行禮三拜。",
    keywords: ["考試", "升學", "證照", "讀書", "學業", "文昌"],
  },
  {
    id: "marriage",
    category: "marriage",
    need: "姻緣、人際",
    deities: ["月下老人"],
    offering: "甜食、鮮花、紅線（依廟方規定）",
    taboos: ["不可求複數對象", "紅線需依廟方規定處理", "求姻緣時需誠心，忌玩笑"],
    worshipTime: "每月初一、十五，或元宵節前後",
    worshipMethod: "說明姓名、生辰，祈求良緣，行禮三拜後依廟方規定取紅線或求籤。",
    keywords: ["姻緣", "結婚", "桃花", "感情", "月老"],
  },
  {
    id: "moving",
    category: "moving",
    need: "搬家入宅",
    deities: ["地基主", "土地公", "家神祖先"],
    offering: "便飯、茶酒、水果、刈金",
    taboos: ["搬家當日避免争吵", "地基主供品需置於戶外或指定位置", "入宅時間宜選吉日"],
    worshipTime: "入宅當日，先拜地基主再入宅",
    worshipMethod: "於新宅外或廚房設案，說明新址地址與家人姓名，行禮三拜後再搬入家具。",
    keywords: ["搬家", "入宅", "地基主", "新屋"],
  },
  {
    id: "health",
    category: "health",
    need: "平安健康",
    deities: ["保生大帝", "媽祖", "觀音菩薩"],
    offering: "鮮花、素果、清茶",
    taboos: ["供品以素淨為主", "避免葷腥（觀音殿）", "誠心即可，忌浮誇"],
    worshipTime: "每月初一、十五，或病中、康復後",
    worshipMethod: "說明所求平安對象與事由，行禮三拜，可添香油錢依廟方規定。",
    keywords: ["平安", "健康", "身體", "媽祖", "觀音"],
  },
  {
    id: "career",
    category: "career",
    need: "事業、升遷",
    deities: ["關聖帝君", "文昌帝君", "玉皇大帝"],
    offering: "鮮花、水果、清茶、金紙",
    taboos: ["不可求不正當手段升遷", "供品需整潔", "行禮時需端莊"],
    worshipTime: "開工日、升遷前、年初正財日",
    worshipMethod: "說明姓名、職務與所求，行禮三拜，可求籤指引。",
    keywords: ["事業", "升遷", "工作", "職場", "開工"],
  },
  {
    id: "child",
    category: "child",
    need: "求子、生育",
    deities: ["註生娘娘", "觀音菩薩", "送子娘娘"],
    offering: "鮮花、素果、紅雞蛋（依廟方規定）",
    taboos: ["需夫妻一同祈求", "供品依廟方規定", "求子後需還願"],
    worshipTime: "每月初一、十五，或依廟方指定日期",
    worshipMethod: "夫妻一同說明姓名、生辰，誠心祈求，行禮三拜。",
    keywords: ["求子", "懷孕", "生育", "註生娘娘"],
  },
];

export function searchDeities(query: string, category?: DeityCategory): DeityRecord[] {
  const normalized = query.trim().toLowerCase();
  return deities.filter((item) => {
    if (category && item.category !== category) return false;
    if (!normalized) return true;
    return (
      item.need.toLowerCase().includes(normalized) ||
      item.deities.some((d) => d.includes(query)) ||
      item.keywords.some((k) => k.includes(query))
    );
  });
}
