/** 台灣各地推薦廟宇（依縣市分區，供神明查詢參考） */

export type TaiwanRegion = "north" | "central" | "south" | "east" | "islands";

export const regionLabels: Record<TaiwanRegion, string> = {
  north: "北部（北北基桃）",
  central: "中部（中彰投雲）",
  south: "南部（南高屏）",
  east: "東部（宜花東）",
  islands: "離島（澎金馬）",
};

export type TempleRecord = {
  id: string;
  name: string;
  /** 主祀神明 */
  mainDeity: string;
  region: TaiwanRegion;
  city: string;
  district?: string;
  address: string;
  /** 適合的需求關鍵字（對應神明職掌） */
  specialties: string[];
  /** 可對應 deities.ts 的 id */
  relatedDeityIds: string[];
  note?: string;
};

export const temples: TempleRecord[] = [
  // ── 北部 ──
  {
    id: "tpe-xingtian",
    name: "台北行天宮",
    mainDeity: "關聖帝君",
    region: "north",
    city: "台北市",
    district: "中山區",
    address: "台北市中山區民權東路二段109號",
    specialties: ["事業", "健康", "消災", "改運"],
    relatedDeityIds: ["career", "health", "car-wealth", "interview"],
    note: "以「只收香燈錢、不收金紙」聞名，求籤改運人潮眾多。",
  },
  {
    id: "tpe-longshan",
    name: "艋舺龍山寺",
    mainDeity: "觀音菩薩",
    region: "north",
    city: "台北市",
    district: "萬華區",
    address: "台北市萬華區廣州街211號",
    specialties: ["平安", "健康", "求子", "姻緣"],
    relatedDeityIds: ["health", "child", "love", "marriage"],
    note: "國定古蹟，觀音、媽祖、關帝等同殿，求平安與求子者眾。",
  },
  {
    id: "tpe-xiahai",
    name: "台北霞海城隍廟",
    mainDeity: "月下老人",
    region: "north",
    city: "台北市",
    district: "大同區",
    address: "台北市大同區迪化街一段61號",
    specialties: ["姻緣", "結婚", "感情"],
    relatedDeityIds: ["marriage", "love", "wedding-plan"],
    note: "全台最知名月老廟，需依廟方規定取紅線或求籤。",
  },
  {
    id: "tpe-wenchang",
    name: "台北文昌宮",
    mainDeity: "文昌帝君",
    region: "north",
    city: "台北市",
    district: "大安區",
    address: "台北市大安區文昌街49號",
    specialties: ["考試", "升學", "讀書", "證照"],
    relatedDeityIds: ["study", "license", "exam-uni", "student-abroad"],
    note: "考季前考生祈福熱門，可準備蔥、芹菜等供品。",
  },
  {
    id: "nt-honglu",
    name: "烘爐地南山福德宮",
    mainDeity: "土地公",
    region: "north",
    city: "新北市",
    district: "中和區",
    address: "新北市中和區中正路399巷",
    specialties: ["求財", "開店", "事業"],
    relatedDeityIds: ["wealth", "business-open", "debt", "farm"],
    note: "北部知名土地公廟，求財與事業者眾。",
  },
  {
    id: "nt-tzushih",
    name: "艋舺慈祐宮（行天宮旁媽祖）",
    mainDeity: "媽祖",
    region: "north",
    city: "台北市",
    district: "大同區",
    address: "台北市大同區西寧北路51號",
    specialties: ["平安", "出行", "航海"],
    relatedDeityIds: ["health", "travel-safe", "ship"],
  },
  {
    id: "kl-dianji",
    name: "基隆奠濟宮",
    mainDeity: "媽祖",
    region: "north",
    city: "基隆市",
    district: "仁愛區",
    address: "基隆市仁愛區仁三路61號",
    specialties: ["平安", "出海", "漁業"],
    relatedDeityIds: ["health", "ship", "travel-safe"],
    note: "基隆廟口夜市旁，媽祖出巡遶境頗負盛名。",
  },
  {
    id: "tp-tamsui",
    name: "淡水福佑宮",
    mainDeity: "媽祖",
    region: "north",
    city: "新北市",
    district: "淡水區",
    address: "新北市淡水區中正路58號",
    specialties: ["平安", "出行", "姻緣"],
    relatedDeityIds: ["health", "travel-safe", "marriage"],
  },
  {
    id: "tpe-qingshan",
    name: "艋舺青山宮",
    mainDeity: "靈安尊王",
    region: "north",
    city: "台北市",
    district: "萬華區",
    address: "台北市萬華區廣州街218號",
    specialties: ["驅邪", "平安", "避災"],
    relatedDeityIds: ["health", "ghost-month", "nightmare"],
    note: "與艋舺遶境（大甲媽祖北巡相關）文化連結深。",
  },
  {
    id: "nt-yuanshan",
    name: "大溪普濟堂",
    mainDeity: "關聖帝君",
    region: "north",
    city: "桃園市",
    district: "大溪區",
    address: "桃園市大溪區和平路86號",
    specialties: ["事業", "升遷", "簽約"],
    relatedDeityIds: ["career", "promotion", "contract-sign", "legal"],
  },

  // ── 中部 ──
  {
    id: "tc-wanhe",
    name: "台中萬和宮",
    mainDeity: "媽祖",
    region: "central",
    city: "台中市",
    district: "南屯區",
    address: "台中市南屯區萬和路一段117號",
    specialties: ["平安", "健康", "出行"],
    relatedDeityIds: ["health", "travel-safe"],
  },
  {
    id: "tc-wenchang",
    name: "台中文昌廟",
    mainDeity: "文昌帝君",
    region: "central",
    city: "台中市",
    district: "北區",
    address: "台中市北區文昌街100號",
    specialties: ["考試", "升學", "讀書"],
    relatedDeityIds: ["study", "exam-uni", "license"],
  },
  {
    id: "ch-nan-yao",
    name: "彰化南瑤宮",
    mainDeity: "媽祖",
    region: "central",
    city: "彰化縣",
    district: "彰化市",
    address: "彰化縣彰化市中山路一段439號",
    specialties: ["平安", "求子", "姻緣"],
    relatedDeityIds: ["health", "child", "marriage"],
    note: "與北港朝天宮、鹿港天后宮合稱「台灣三大媽祖廟」。",
  },
  {
    id: "lk-tianhou",
    name: "鹿港天后宮",
    mainDeity: "媽祖",
    region: "central",
    city: "彰化縣",
    district: "鹿港鎮",
    address: "彰化縣鹿港鎮中山路430號",
    specialties: ["平安", "出海", "求子"],
    relatedDeityIds: ["health", "ship", "child"],
    note: "國定古蹟，媽祖分靈自湄洲，香火鼎盛。",
  },
  {
    id: "lk-longshan",
    name: "鹿港龍山寺",
    mainDeity: "觀音菩薩",
    region: "central",
    city: "彰化縣",
    district: "鹿港鎮",
    address: "彰化縣鹿港鎮金門街81號",
    specialties: ["平安", "健康", "求子"],
    relatedDeityIds: ["health", "child", "recovery"],
    note: "國定古蹟，與台北、台南龍山寺合稱三大龍山寺。",
  },
  {
    id: "yl-beigang",
    name: "北港朝天宮",
    mainDeity: "媽祖",
    region: "central",
    city: "雲林縣",
    district: "北港鎮",
    address: "雲林縣北港鎮中山路178號",
    specialties: ["平安", "出行", "改運"],
    relatedDeityIds: ["health", "travel-safe", "tai-sui"],
    note: "媽祖遶境起點之一，春節前後人潮最多。",
  },
  {
    id: "tc-baojue",
    name: "台中寶覺寺",
    mainDeity: "觀音菩薩",
    region: "central",
    city: "台中市",
    district: "東區",
    address: "台中市東區力行路140號",
    specialties: ["平安", "健康", "消災"],
    relatedDeityIds: ["health", "recovery", "surgery"],
  },
  {
    id: "tc-tzushih",
    name: "大甲鎮瀾宮",
    mainDeity: "媽祖",
    region: "central",
    city: "台中市",
    district: "大甲區",
    address: "台中市大甲區順天路158號",
    specialties: ["平安", "出行", "改運"],
    relatedDeityIds: ["health", "travel-safe", "tai-sui"],
    note: "媽祖遶境（大甲媽）起點，台灣最重要媽祖廟之一。",
  },

  // ── 南部 ──
  {
    id: "tn-grand-mazu",
    name: "台南大天后宮",
    mainDeity: "媽祖",
    region: "south",
    city: "台南市",
    district: "中西區",
    address: "台南市中西區永福路二段227巷18號",
    specialties: ["平安", "出行", "求子"],
    relatedDeityIds: ["health", "travel-safe", "child"],
    note: "台灣最早媽祖廟之一，赤崁樓旁。",
  },
  {
    id: "tn-wumiao",
    name: "祀典武廟",
    mainDeity: "關聖帝君",
    region: "south",
    city: "台南市",
    district: "中西區",
    address: "台南市中西區永福路二段229號",
    specialties: ["事業", "升遷", "官司", "誠信"],
    relatedDeityIds: ["career", "promotion", "legal", "contract-sign"],
    note: "國定古蹟，與大天后宮相鄰，求事業與官司者眾。",
  },
  {
    id: "tn-chihkan",
    name: "赤崁樓大天后宮",
    mainDeity: "媽祖",
    region: "south",
    city: "台南市",
    district: "中西區",
    address: "台南市中西區民族路二段257號",
    specialties: ["平安", "姻緣", "健康"],
    relatedDeityIds: ["health", "marriage", "travel-safe"],
  },
  {
    id: "tn-longshan",
    name: "台南開元寺（觀音殿）",
    mainDeity: "觀音菩薩",
    region: "south",
    city: "台南市",
    district: "北區",
    address: "台南市北區北園街89號",
    specialties: ["平安", "健康", "求子"],
    relatedDeityIds: ["health", "child", "recovery"],
  },
  {
    id: "kh-zuoying",
    name: "左營天后宮",
    mainDeity: "媽祖",
    region: "south",
    city: "高雄市",
    district: "左營區",
    address: "高雄市左營區蓮潭路48號",
    specialties: ["平安", "出行", "改運"],
    relatedDeityIds: ["health", "travel-safe", "tai-sui"],
  },
  {
    id: "kh-wusheng",
    name: "鼓山武聖宮",
    mainDeity: "關聖帝君",
    region: "south",
    city: "高雄市",
    district: "鼓山區",
    address: "高雄市鼓山區明誠三路42號",
    specialties: ["事業", "求財", "開店"],
    relatedDeityIds: ["career", "wealth", "business-open"],
  },
  {
    id: "kh-fengshan",
    name: "鳳山開山王",
    mainDeity: "開山王",
    region: "south",
    city: "高雄市",
    district: "鳳山區",
    address: "高雄市鳳山區三民路258號",
    specialties: ["平安", "驅邪", "改運"],
    relatedDeityIds: ["health", "ghost-month"],
  },
  {
    id: "pt-cheheng",
    name: "車城福安宮",
    mainDeity: "土地公",
    region: "south",
    city: "屏東縣",
    district: "車城鄉",
    address: "屏東縣車城鄉福安路51號",
    specialties: ["求財", "事業", "金運"],
    relatedDeityIds: ["wealth", "business-open", "debt"],
    note: "全台最大土地公廟，求財金紙量驚人。",
  },
  {
    id: "tn-baosheng",
    name: "學甲慈濟宮",
    mainDeity: "保生大帝",
    region: "south",
    city: "台南市",
    district: "學甲區",
    address: "台南市學甲區慈生街148號",
    specialties: ["健康", "平安", "消災"],
    relatedDeityIds: ["health", "surgery", "recovery"],
    note: "保生大帝遶境（學甲香）為南部重要民俗。",
  },

  // ── 東部 ──
  {
    id: "hl-sheng-an",
    name: "花蓮勝安宮",
    mainDeity: "媽祖",
    region: "east",
    city: "花蓮縣",
    district: "花蓮市",
    address: "花蓮縣花蓮市明義街一巷25號",
    specialties: ["平安", "出行", "健康"],
    relatedDeityIds: ["health", "travel-safe"],
  },
  {
    id: "tt-tianhou",
    name: "台東天后宮",
    mainDeity: "媽祖",
    region: "east",
    city: "台東縣",
    district: "台東市",
    address: "台東縣台東市中山路102號",
    specialties: ["平安", "出海", "漁業"],
    relatedDeityIds: ["health", "ship", "travel-safe"],
  },
  {
    id: "il-dongshan",
    name: "宜蘭奉尊宮",
    mainDeity: "玉皇上帝",
    region: "east",
    city: "宜蘭縣",
    district: "冬山鄉",
    address: "宜蘭縣冬山鄉冬山路二段148號",
    specialties: ["事業", "安太歲", "改運"],
    relatedDeityIds: ["career", "tai-sui", "promotion"],
  },

  // ── 離島 ──
  {
    id: "ph-tianhou",
    name: "澎湖天后宮",
    mainDeity: "媽祖",
    region: "islands",
    city: "澎湖縣",
    district: "馬公市",
    address: "澎湖縣馬公市正義街1號",
    specialties: ["平安", "出海", "漁業"],
    relatedDeityIds: ["health", "ship", "travel-safe"],
    note: "台灣最早媽祖廟（文獻記載），國定古蹟。",
  },
  {
    id: "ph-wugu",
    name: "澎湖通梁大樹公（土地公）",
    mainDeity: "土地公",
    region: "islands",
    city: "澎湖縣",
    district: "白沙鄉",
    address: "澎湖縣白沙鄉通梁村",
    specialties: ["求財", "平安", "旅遊"],
    relatedDeityIds: ["wealth", "health", "travel-safe"],
  },
  {
    id: "km-jincheng",
    name: "金門城隍廟",
    mainDeity: "城隍爺",
    region: "islands",
    city: "金門縣",
    district: "金城鎮",
    address: "金門縣金城鎮浯江街54號",
    specialties: ["平安", "消災", "改運"],
    relatedDeityIds: ["health", "debt", "legal"],
  },
  {
    id: "mz-niangniang",
    name: "南竿天后宮",
    mainDeity: "媽祖",
    region: "islands",
    city: "連江縣",
    district: "南竿鄉",
    address: "連江縣南竿鄉介壽村",
    specialties: ["平安", "出海", "軍人"],
    relatedDeityIds: ["health", "ship", "travel-safe"],
  },
];

const templeMap = new Map(temples.map((t) => [t.id, t]));

export function getTemple(id: string): TempleRecord | undefined {
  return templeMap.get(id);
}

export function getTemplesByDeityId(deityId: string): TempleRecord[] {
  return temples.filter((t) => t.relatedDeityIds.includes(deityId));
}

export function getTemplesByRegion(region: TaiwanRegion): TempleRecord[] {
  return temples.filter((t) => t.region === region);
}

export function searchTemples(
  query: string,
  region?: TaiwanRegion,
  deityId?: string,
): TempleRecord[] {
  const normalized = query.trim().toLowerCase();
  return temples.filter((t) => {
    if (region && t.region !== region) return false;
    if (deityId && !t.relatedDeityIds.includes(deityId)) return false;
    if (!normalized) return true;
    return (
      t.name.includes(query) ||
      t.mainDeity.includes(query) ||
      t.city.includes(query) ||
      t.district?.includes(query) ||
      t.specialties.some((s) => s.includes(query)) ||
      t.address.includes(query)
    );
  });
}

export const cityOptions = [...new Set(temples.map((t) => t.city))].sort();
