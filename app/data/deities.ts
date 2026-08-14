import { getTemplesByDeityId, type TaiwanRegion } from "./temples";

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
  /** 推薦廟宇 id（對應 temples.ts） */
  recommendedTempleIds?: string[];
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
    recommendedTempleIds: ["nt-honglu", "pt-cheheng", "kh-wusheng"],
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
    recommendedTempleIds: ["tpe-wenchang", "tc-wenchang"],
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
    recommendedTempleIds: ["tpe-xiahai"],
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
    recommendedTempleIds: ["tpe-longshan", "lk-longshan", "tc-baojue"],
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
    recommendedTempleIds: ["tpe-xingtian", "tn-wumiao", "nt-yuanshan"],
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
  {
    id: "car-wealth",
    category: "wealth",
    need: "車關、行車平安",
    deities: ["關聖帝君", "媽祖"],
    offering: "鮮花、水果、清茶",
    taboos: ["新車祭車需依習俗", "避免不潔供品"],
    worshipTime: "提車或上路前",
    worshipMethod: "於車前或廟宇誠心祈求行車平安，行禮三拜。",
    keywords: ["車關", "行車", "新車", "平安"],
  },
  {
    id: "debt",
    category: "wealth",
    need: "化解財務、避小人",
    deities: ["土地公", "虎爺"],
    offering: "發糕、甜茶、金紙",
    taboos: ["誠心懺悔，忌求偏財"],
    worshipTime: "每月初二、十六",
    worshipMethod: "說明困境，祈求化解，行禮三拜。",
    keywords: ["破財", "小人", "財務", "虎爺"],
  },
  {
    id: "license",
    category: "study",
    need: "考駕照、技術檢定",
    deities: ["文昌帝君", "關聖帝君"],
    offering: "蔥、芹菜、包子",
    taboos: ["考試前保持心態平穩"],
    worshipTime: "考試前一日",
    worshipMethod: "供奉文具或證件影本（依習俗），祈求順利過關。",
    keywords: ["駕照", "檢定", "考試", "證照"],
  },
  {
    id: "interview",
    category: "career",
    need: "面試、求職",
    deities: ["文昌帝君", "關聖帝君"],
    offering: "鮮花、水果、清茶",
    taboos: ["忌求不當手段錄取"],
    worshipTime: "面試前一日或當日清晨",
    worshipMethod: "說明應徵職位，祈求表現穩定，行禮三拜。",
    keywords: ["面試", "求職", "找工作", "應徵"],
  },
  {
    id: "promotion",
    category: "career",
    need: "升遷、考績",
    deities: ["關聖帝君", "玉皇大帝"],
    offering: "鮮花、素果、金紙",
    taboos: ["需憑實力，誠心即可"],
    worshipTime: "考績或升遷公布前",
    worshipMethod: "說明職務與努力，祈求順遂，行禮三拜。",
    keywords: ["升遷", "考績", "升職"],
  },
  {
    id: "business-open",
    category: "wealth",
    need: "新店開幕、開市",
    deities: ["財神爺", "土地公", "關聖帝君"],
    offering: "發糕、甜茶、鮮花、水果",
    taboos: ["開幕時間宜選吉日吉時", "金紙依廟方規定"],
    worshipTime: "開幕當日上午",
    worshipMethod: "說明店名、地址，祈求生意興隆，行禮三拜。",
    keywords: ["開幕", "開店", "開市", "生意"],
  },
  {
    id: "contract-sign",
    category: "career",
    need: "簽約、合作",
    deities: ["關聖帝君", "土地公"],
    offering: "鮮花、水果、清茶",
    taboos: ["簽約前詳閱條款", "忌求不義之財"],
    worshipTime: "簽約當日吉時",
    worshipMethod: "說明合作內容，祈求公平順利，行禮三拜。",
    keywords: ["簽約", "合約", "合作"],
  },
  {
    id: "love",
    category: "marriage",
    need: "告白、復合",
    deities: ["月下老人", "觀音菩薩"],
    offering: "甜食、鮮花",
    taboos: ["誠心單一對象", "忌強求"],
    worshipTime: "每月初一、十五",
    worshipMethod: "說明心意，祈求良緣，行禮三拜。",
    keywords: ["告白", "復合", "感情", "戀愛"],
  },
  {
    id: "wedding-plan",
    category: "marriage",
    need: "籌備婚禮",
    deities: ["媽祖", "月下老人", "祖先"],
    offering: "鮮花、水果、喜餅",
    taboos: ["喜慶事宜依長輩習俗"],
    worshipTime: "訂婚或迎娶前",
    worshipMethod: "稟告祖先與神明，祈求婚禮順利。",
    keywords: ["婚禮", "結婚", "訂婚", "迎娶"],
  },
  {
    id: "house-clean",
    category: "moving",
    need: "入宅前淨宅",
    deities: ["地基主", "土地公"],
    offering: "米、鹽、茶、水果",
    taboos: ["淨宅時避免争吵", "依風俗選吉時"],
    worshipTime: "入宅前一日或當日早晨",
    worshipMethod: "逐室焚香，告知地基主新戶入宅。",
    keywords: ["淨宅", "入宅", "新屋"],
  },
  {
    id: "travel-safe",
    category: "health",
    need: "出國、遠行平安",
    deities: ["媽祖", "關聖帝君"],
    offering: "鮮花、素果、清茶",
    taboos: ["告知行程與歸期"],
    worshipTime: "出發前一日",
    worshipMethod: "說明目的地與回程日期，祈求一路平安。",
    keywords: ["出國", "旅行", "遠行", "平安"],
  },
  {
    id: "surgery",
    category: "health",
    need: "開刀、手術平安",
    deities: ["保生大帝", "觀音菩薩"],
    offering: "鮮花、素果、清茶",
    taboos: ["以醫囑為主，祈福為輔"],
    worshipTime: "手術前一日",
    worshipMethod: "說明病患姓名，祈求手術順利、恢復良好。",
    keywords: ["開刀", "手術", "健康", "保生大帝"],
  },
  {
    id: "recovery",
    category: "health",
    need: "病後康復",
    deities: ["保生大帝", "藥師佛"],
    offering: "素果、清茶",
    taboos: ["配合治療與休息"],
    worshipTime: "康復後還願",
    worshipMethod: "感謝神明護佑，行禮三拜。",
    keywords: ["康復", "還願", "生病"],
  },
  {
    id: "nightmare",
    category: "health",
    need: "噩夢、睡不安",
    deities: ["床母", "地基主"],
    offering: "簡單素果、清茶",
    taboos: ["保持臥室整潔"],
    worshipTime: "早晨",
    worshipMethod: "說明狀況，祈求安眠，行禮三拜。",
    keywords: ["噩夢", "睡眠", "床母"],
  },
  {
    id: "exam-uni",
    category: "study",
    need: "大學指考、升學",
    deities: ["文昌帝君", "孔子"],
    offering: "蔥、芹菜、粽子",
    taboos: ["考試期間保持作息"],
    worshipTime: "考試季前",
    worshipMethod: "供奉書本，祈求金榜題名。",
    keywords: ["指考", "學測", "升學", "大學"],
  },
  {
    id: "tai-sui",
    category: "health",
    need: "安太歲、化解犯太歲",
    deities: ["斗母元君", "玉皇大帝"],
    offering: "鮮花、水果、金紙（依廟方）",
    taboos: ["需依當年太歲方位", "可到廟宇安太歲"],
    worshipTime: "農曆年前後或生日",
    worshipMethod: "說明姓名、生辰，祈求太歲星君庇佑。",
    keywords: ["太歲", "安太歲", "犯太歲", "本命年"],
    recommendedTempleIds: ["tc-tzushih", "yl-beigang", "il-dongshan"],
  },
  {
    id: "ghost-month",
    category: "health",
    need: "中元普渡、避邪",
    deities: ["地基主", "好兄弟"],
    offering: "普渡供品、米、乾貨（依習俗）",
    taboos: ["普渡供品不可隨意取食", "避免深夜外出（依習俗）"],
    worshipTime: "農曆七月",
    worshipMethod: "依社区或家庭習俗準備普渡，誠心祭祀。",
    keywords: ["中元", "普渡", "鬼月", "好兄弟"],
  },
  {
    id: "ancestor",
    category: "health",
    need: "祭祖、掃墓",
    deities: ["祖先", "土地公"],
    offering: "鮮花、素果、先人生前喜好食物",
    taboos: ["墓園用火依規定", "祭品整潔"],
    worshipTime: "清明、中元、冬至或忌日",
    worshipMethod: "整理墓園，報告近況，行禮三拜。",
    keywords: ["祭祖", "掃墓", "清明", "祖先"],
  },
  {
    id: "new-pet",
    category: "child",
    need: "新寵物入門",
    deities: ["土地公"],
    offering: "簡單素果、清水",
    taboos: ["寵物健康優先", "保持環境清潔"],
    worshipTime: "寵物到府當日",
    worshipMethod: "告知土地公家中添新成員，祈求平安。",
    keywords: ["寵物", "貓", "狗", "新寵"],
  },
  {
    id: "farm",
    category: "wealth",
    need: "農作、收成",
    deities: ["土地公", "五穀王"],
    offering: "米、水果、清茶",
    taboos: ["依時節祭祀"],
    worshipTime: "開耕或收成前",
    worshipMethod: "感謝土地，祈求風調雨順、五穀豐登。",
    keywords: ["農作", "收成", "五穀", "田裡"],
  },
  {
    id: "ship",
    category: "health",
    need: "出海、漁業平安",
    deities: ["媽祖", "王爺"],
    offering: "鮮花、素果、清茶",
    taboos: ["告知出海期程"],
    worshipTime: "出海前",
    worshipMethod: "祈求風平浪靜、漁獲豐收。",
    keywords: ["出海", "漁業", "媽祖", "王爺"],
    recommendedTempleIds: ["kl-dianji", "yl-beigang", "ph-tianhou", "tt-tianhou"],
  },
  {
    id: "renovation",
    category: "moving",
    need: "裝潢、修繕",
    deities: ["地基主", "土地公"],
    offering: "便飯、水果、茶酒",
    taboos: ["動土宜選吉日", "施工安全優先"],
    worshipTime: "開工前",
    worshipMethod: "告知修繕範圍，祈求施工順利。",
    keywords: ["裝潢", "修繕", "動土", "修造"],
  },
  {
    id: "student-abroad",
    category: "study",
    need: "出國讀書",
    deities: ["文昌帝君", "媽祖"],
    offering: "蔥、芹菜、鮮花",
    taboos: ["告知留學地點與期間"],
    worshipTime: "出發前",
    worshipMethod: "祈求學業順利、異地平安。",
    keywords: ["留學", "出國讀書", "遊學"],
  },
  {
    id: "legal",
    category: "career",
    need: "官司、訴訟",
    deities: ["關聖帝君", "包公"],
    offering: "鮮花、素果、清茶",
    taboos: ["需依法行事", "誠心求公正"],
    worshipTime: "開庭或訴訟前",
    worshipMethod: "說明案情，祈求公正裁決，行禮三拜。",
    keywords: ["官司", "訴訟", "法律", "包公"],
  },
];

export function searchDeities(
  query: string,
  category?: DeityCategory,
  region?: TaiwanRegion,
): DeityRecord[] {
  const normalized = query.trim().toLowerCase();
  return deities.filter((item) => {
    if (category && item.category !== category) return false;
    if (!normalized && !region) return true;

    const textMatch =
      !normalized ||
      item.need.toLowerCase().includes(normalized) ||
      item.deities.some((d) => d.includes(query)) ||
      item.keywords.some((k) => k.includes(query));

    if (!region) return textMatch;

    const regionMatch = getTemplesByDeityId(item.id).some((t) => t.region === region);
    return textMatch && regionMatch;
  });
}
