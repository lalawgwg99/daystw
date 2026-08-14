/** 維基式百科條目資料 */

export type WikiCategory =
  | "calendar"
  | "almanac"
  | "worship"
  | "deity"
  | "fortune"
  | "yiji";

export const wikiCategoryLabels: Record<WikiCategory, string> = {
  calendar: "曆法節氣",
  almanac: "黃曆術語",
  worship: "民俗拜拜",
  deity: "神明信仰",
  fortune: "命理方位",
  yiji: "宜忌用語",
};

export type WikiSection = {
  heading: string;
  body: string;
};

export type WikiArticle = {
  slug: string;
  title: string;
  category: WikiCategory;
  /** 一句話摘要（tooltip 用） */
  summary: string;
  /** 導言段落 */
  intro: string;
  sections: WikiSection[];
  relatedSlugs: string[];
  aliases?: string[];
};

export const wikiArticles: WikiArticle[] = [
  {
    slug: "nong-li",
    title: "農曆",
    category: "calendar",
    summary: "以月相與節氣編排的陰陽合曆，民間慣稱農民曆。",
    intro:
      "農曆（陰陽曆）同時參考月亮繞地球一圈的周期（朔望月）與太陽視運動（節氣）。因此除了初一、十五等月相日期，還有立春、清明等反映季節的節氣。台灣日常所謂「農民曆」「黃曆」，多半以農曆日期標示宜忌、沖煞與節慶。",
    sections: [
      {
        heading: "與國曆的差異",
        body: "國曆（陽曆／格里曆）以地球繞太陽一周為一年，日期固定。農曆月份則有大小月之分，且約每二至三年會閏一個月，以調和陰陽。故同一國曆日期，對應的農曆日期每年不同。",
      },
      {
        heading: "在擇日中的角色",
        body: "傳統擇日多以農曆日干支、建除、神煞等判斷宜忌。婚嫁、搬家、開業等重大事項，常先查農曆是否宜該事，再避開沖生肖、凶日。",
      },
    ],
    relatedSlugs: ["jie-qi", "gan-zhi", "huang-dao"],
  },
  {
    slug: "jie-qi",
    title: "節氣",
    category: "calendar",
    summary: "依太陽位置劃分的二十四個季節節點。",
    intro:
      "節氣是古人觀察太陽周年視運動，將一年分為二十四等份，每份約十五日。節氣分「節」與「氣」，反映春夏秋冬與農事節律。清明、冬至等既是節氣，也與民俗節日重疊。",
    sections: [
      {
        heading: "二十四節氣一覧",
        body: "春：立春、雨水、驚蟄、春分、清明、穀雨。夏：立夏、小滿、芒種、夏至、小暑、大暑。秋：立秋、處暑、白露、秋分、寒露、霜降。冬：立冬、小雪、大雪、冬至、小寒、大寒。",
      },
      {
        heading: "與宜忌的關係",
        body: "節氣交節前後，部分通書列為四离日、四絕日等凶日，大事不宜。春分、秋分、夏至、冬至亦為陰陽平衡的重要節點。",
      },
    ],
    relatedSlugs: ["nong-li", "si-jue-ri", "si-li-ri", "dong-zhi"],
    aliases: ["二十四節氣"],
  },
  {
    slug: "gan-zhi",
    title: "干支",
    category: "calendar",
    summary: "天干地支組合，用於紀年、紀月、紀日、紀時。",
    intro:
      "天干（甲乙丙丁戊己庚辛壬癸）與地支（子丑寅卯辰巳午未申酉戌亥）兩兩搭配，形成六十甲子循環。黃曆上每一日都有日干支，並據此推算沖煞、彭祖百忌、納音等資訊。",
    sections: [
      {
        heading: "年月日時四柱",
        body: "年干支以立春為界（民俗亦有用正月初一者）；月干支依節氣換月；日干支每日一換；時干支每兩小時一換。八字命理即以出生年月日時四柱排盤。",
      },
      {
        heading: "與生肖的關係",
        body: "十二地支對應十二生肖：子鼠、丑牛、寅虎、卯兔、辰龍、巳蛇、午馬、未羊、申猴、酉雞、戌狗、亥豬。日地支與某生肖相沖，該生肖者傳統上宜避開該日大事。",
      },
    ],
    relatedSlugs: ["chong-sha", "peng-zu", "na-yin", "sheng-xiao"],
  },
  {
    slug: "chong-sha",
    title: "沖煞",
    category: "almanac",
    summary: "日地支與某生肖相沖，並有煞方方位。",
    intro:
      "黃曆常見「沖（某生肖）」「煞（某方位）」。例如「沖虎煞南」表示該日地支與虎相沖，且南方為凶煞方位。屬該生肖者，傳統上會避免在沖日辦婚嫁、搬家、簽約等大事。",
    sections: [
      {
        heading: "六沖原理",
        body: "子午沖、丑未沖、寅申沖、卯酉沖、辰戌沖、巳亥沖。日柱地支與生肖地支相同者即為「沖該生肖」。",
      },
      {
        heading: "煞方",
        body: "煞東、煞南、煞西、煞北表示當日不宜在該方位動土、裝修或長時間逗留。與風水中的凶方概念相近，宜參考通書記載。",
      },
      {
        heading: "實務建議",
        body: "若全家多人屬不同生肖，擇日時可篩選「全家皆不沖」的日期。若僅一人相沖，可依事項重要性與個人信仰決定是否避開。",
      },
    ],
    relatedSlugs: ["gan-zhi", "sheng-xiao", "tai-sui", "ze-ri"],
  },
  {
    slug: "sheng-xiao",
    title: "生肖",
    category: "almanac",
    summary: "十二地支對應的動物，用於沖日與流年。",
    intro:
      "生肖（屬相）以出生年的地支判定，民俗多以北農曆正月初一或立春為換年界。黃曆每日標示沖哪些生肖，擇日、安太歲、拜太歲都與生肖密切相關。",
    sections: [
      {
        heading: "十二生肖",
        body: "鼠、牛、虎、兔、龍、蛇、馬、羊、猴、雞、狗、豬。與地支一一對應，循環往复。",
      },
      {
        heading: "本命年與太歲",
        body: "出生年地支與流年地支相同，即值太歲（本命年）。另有沖太歲、刑太歲、害太歲、破太歲等，可至廟宇安太歲或佩戴平安符（依個人信仰）。",
      },
    ],
    relatedSlugs: ["tai-sui", "chong-sha", "gan-zhi"],
  },
  {
    slug: "tai-sui",
    title: "太歲",
    category: "almanac",
    summary: "值年歲神，本命年與犯太歲須留意。",
    intro:
      "太歲是道教與民俗中的值年神煞，對應流年地支。值太歲（本命年）、沖太歲、刑太歲、害太歲、破太歲合稱「犯太歲」。民間認為犯太歲年宜穩健行事，並可至廟宇安太歲祈福。",
    sections: [
      {
        heading: "安太歲",
        body: "農曆新年前後，可至道觀、宮廟安太歲，填寫姓名生辰，祈求平安。部分廟宇提供安太歲燈或太歲符。",
      },
      {
        heading: "與擇日的關係",
        body: "犯太歲年仍可依黃曆宜忌擇日，但傳統上更強調謹慎，避免衝動投資、重大變動。",
      },
    ],
    relatedSlugs: ["sheng-xiao", "chong-sha", "an-tai-sui"],
  },
  {
    slug: "peng-zu",
    title: "彭祖百忌",
    category: "almanac",
    summary: "每日天干地支各一句禁忌簡訣。",
    intro:
      "彭祖百忌相傳為古時長壽者彭祖所留，以干支為單位各列一句忌諱。例如「甲不開倉」「子不問卜」。黃曆每日顯示當日彭祖百忌，供參考是否適合特定行為。",
    sections: [
      {
        heading: "如何閱讀",
        body: "日干支分兩句：天干忌與地支忌。并非所有禁忌都需嚴格遵守，現代多作為通書參考，與宜忌、沖煞一併考量。",
      },
      {
        heading: "常見範例",
        body: "「開倉」指開啟倉庫、動用儲蓄；「問卜」指占卜問事。理解字義後較能判斷與自身事項是否相關。",
      },
    ],
    relatedSlugs: ["gan-zhi", "yi-ji", "ze-ri"],
  },
  {
    slug: "tai-shen",
    title: "胎神",
    category: "almanac",
    summary: "傳統認為每日胎神所在方位，不宜驚動。",
    intro:
      "胎神佔方是通書記載的每日神煞位置，如「房床內」「廚灶門」。古時認為動土、釘釘子、敲打該處恐驚動胎神。現代若無孕產需求，多作為裝修、搬家的參考。",
    sections: [
      {
        heading: "孕婦與家人",
        body: "若家中有孕婦，傳統上會避開胎神方位施工。若無懷孕計畫，影響較小，仍可參考通書。",
      },
      {
        heading: "與入宅、裝修",
        body: "裝潢前可查當日、當月胎神位置，盡量避免在該處鑽孔、敲牆。",
      },
    ],
    relatedSlugs: ["yi-ji", "ru-zhai", "dong-tu"],
  },
  {
    slug: "jian-chu",
    title: "建除十二神",
    category: "almanac",
    summary: "建、除、滿、平、定、執、破、危、成、收、開、閉。",
    intro:
      "建除是黃曆十二值日神，循環標示每日吉凶傾向。民間有「建日宜開創、除日宜掃除、破日大事不宜」等口訣。擇日時常與宜忌、黃道並用。",
    sections: [
      {
        heading: "十二日簡述",
        body: "建：萬事可為，宜開創。除：宜掃除、解除。滿：宜祭祀、修造。平：宜修造、安床。定：宜冠帶、安床。執：宜捕捉。破：大事勿用。危：宜安床。成：宜開市、嫁娶。收：宜收納、進人口。開：宜開市、求嗣。閉：宜修造、安葬。",
      },
      {
        heading: "使用注意",
        body: "不同通書對建除的吉凶解釋略有差異，宜以完整宜忌條目為主，建除為輔。",
      },
    ],
    relatedSlugs: ["huang-dao", "yi-ji", "ze-ri"],
  },
  {
    slug: "huang-dao",
    title: "黃道吉日",
    category: "almanac",
    summary: "吉神當值、適合辦喜事的日子。",
    intro:
      "黃道原指太陽在天空運行的軌道，後引申為吉神所臨。黃曆標示每日天神類型（如青龍、明堂為吉；天刑、朱雀為凶）。黃道日一般較適合嫁娶、開市、入宅等喜慶事項。",
    sections: [
      {
        heading: "與黑道日",
        body: "相對黃道，黑道日（凶神當值）宜謹慎，不宜大事。實務上仍須看當日完整宜忌，不可單憑黃道二字。",
      },
      {
        heading: "如何查詢",
        body: "吉日通月曆以標記提示黃道日；擇日時系統會綜合宜忌、沖煞、凶日過濾後推薦。",
      },
    ],
    relatedSlugs: ["hei-dao", "jian-chu", "ze-ri"],
  },
  {
    slug: "hei-dao",
    title: "黑道凶日",
    category: "almanac",
    summary: "凶神當值，傳統上大事宜謹慎。",
    intro:
      "黑道與黃道相對，指當日值日天神為凶類。黑道日不一定诸事不宜，仍須參考宜忌列表，但婚嫁、開業等喜慶事傳統上會優先避開。",
    sections: [
      {
        heading: "常見凶神",
        body: "天刑、朱雀、白虎、天牢、玄武、勾陳等名稱常見於通書，各自有傳統解釋。",
      },
    ],
    relatedSlugs: ["huang-dao", "xiong-ri"],
  },
  {
    slug: "xiong-ri",
    title: "凶日（月破、受死等）",
    category: "almanac",
    summary: "月破、四絕、受死、楊公忌等不宜大事之日。",
    intro:
      "除每日宜忌外，通書還列特殊凶日：月破（與月令相沖）、四絕四离（節氣交節前後）、受死、楊公忌等。擇日時可選擇「排除凶日」自動過濾。",
    sections: [
      {
        heading: "月破日",
        body: "日支與月支相沖，如子月逢午日。傳統認為大事不宜，尤其忌婚嫁、簽約、動土。",
      },
      {
        heading: "四絕日與四离日",
        body: "四絕：立春、立夏、立秋、立冬前一日。四离：春分、夏至、秋分、冬至前一日。節氣交替，氣場不穩，宜靜不宜動。",
      },
      {
        heading: "楊公忌",
        body: "相傳楊公十三忌日，不宜婚嫁、動土、開張等。通書依日干支列示。",
      },
    ],
    relatedSlugs: ["jie-qi", "si-jue-ri", "si-li-ri", "yang-gong-ji"],
    aliases: ["凶日", "月破"],
  },
  {
    slug: "si-jue-ri",
    title: "四絕日",
    category: "almanac",
    summary: "立春、立夏、立秋、立冬的前一日。",
    intro: "四絕指四季交替「絕」盡舊氣之日，位於四立節氣前一天。傳統擇日忌婚嫁、搬家、開業等重大事項。",
    sections: [{ heading: "記憶方式", body: "找到當年立春、立夏、立秋、立冬的國曆日期，各自前一日即四絕日。" }],
    relatedSlugs: ["jie-qi", "xiong-ri", "si-li-ri"],
  },
  {
    slug: "si-li-ri",
    title: "四离日",
    category: "almanac",
    summary: "春分、夏至、秋分、冬至的前一日。",
    intro: "四离位於二分二至前一天，陰陽分離之際。與四絕並列為節氣相關凶日，大事不宜。",
    sections: [{ heading: "與四絕的差別", body: "四絕在「四立」前；四离在「二分二至」前。皆為節氣交節前一日。" }],
    relatedSlugs: ["jie-qi", "xiong-ri", "si-jue-ri"],
  },
  {
    slug: "yang-gong-ji",
    title: "楊公忌",
    category: "almanac",
    summary: "傳統十三忌日，忌婚嫁動土。",
    intro: "楊公忌相傳為唐代楊筠松所留禁忌日，通書依農曆或干支列示。遇楊公忌日，傳統上避免婚嫁、動土、開市。",
    sections: [{ heading: "現代看法", body: "可作為擇日參考之一，與宜忌、沖煞、個人行程一併考量。" }],
    relatedSlugs: ["xiong-ri", "ze-ri"],
  },
  {
    slug: "ji-shi",
    title: "吉時（時辰）",
    category: "almanac",
    summary: "一日分十二時辰，各有宜忌。",
    intro:
      "古時一日分十二時辰，每時辰約兩小時：子（23–1）、丑（1–3）、寅（3–5）、卯（5–7）、辰（7–9）、巳（9–11）、午（11–13）、未（13–15）、申（15–17）、酉（17–19）、戌（19–21）、亥（21–23）。黃曆列各時辰宜忌，重要儀式可選吉時進行。",
    sections: [
      {
        heading: "如何選吉時",
        body: "吉日確定後，可查當日各時辰宜忌。嫁娶、簽約、動土等可選「宜」該事的時辰。子時換日有爭議，通書多依傳統划分。",
      },
      {
        heading: "與八字的關係",
        body: "出生時辰決定時柱，影響八字排盤。擇日吉時與命理時辰是不同概念。",
      },
    ],
    relatedSlugs: ["gan-zhi", "ba-zi", "ze-ri"],
  },
  {
    slug: "na-yin",
    title: "納音",
    category: "fortune",
    summary: "干支組合的五行屬性名稱，如「海中金」。",
    intro:
      "納音五行將六十甲子每兩組配一種五行名稱，如甲子、乙丑為「海中金」。八字命理用納音輔助解讀性格與運勢；黃曆亦列日柱納音供參考。",
    sections: [
      {
        heading: "常見納音",
        body: "海中金、爐中火、大林木、路傍土、劍鋒金等共三十種。需查六十甲子納音表對照。",
      },
    ],
    relatedSlugs: ["gan-zhi", "ba-zi", "wu-xing"],
  },
  {
    slug: "wu-xing",
    title: "五行",
    category: "fortune",
    summary: "金、木、水、火、土，傳統哲學與命理基礎。",
    intro:
      "五行相生（木生火、火生土、土生金、金生水、水生木）與相剋（木剋土、土剋水、水剋火、火剋金、金剋木）用於解釋自然與人事。黃曆、八字、風水、中醫皆廣泛運用。",
    sections: [
      {
        heading: "與干支",
        body: "天干地支各有五行屬性。擇日時部分通書會參考五行生剋，但一般使用者以宜忌、沖煞為主即可。",
      },
    ],
    relatedSlugs: ["na-yin", "ba-zi", "gan-zhi"],
  },
  {
    slug: "ba-zi",
    title: "八字",
    category: "fortune",
    summary: "出生年月日時四柱干支，簡稱八字命理。",
    intro:
      "八字以出生年、月、日、時的干支共八個字排盤。日柱天干為「日主」，代表命主本人。可據此分析性格、流年運勢、太歲等。需準確出生時間（時辰）才能排完整時柱。",
    sections: [
      {
        heading: "與黃曆的關係",
        body: "黃曆提供每日宜忌；八字提供個人命盤。擇日可結合二者：先依八字避開沖太歲年，再依黃曆選宜嫁娶、入宅之日。",
      },
      {
        heading: "理性看待",
        body: "命理供參考，重大決定仍應考量現實條件、健康、法律與家庭共識。",
      },
    ],
    relatedSlugs: ["gan-zhi", "tai-sui", "ji-shi", "na-yin"],
  },
  {
    slug: "yi-ji",
    title: "宜忌",
    category: "yiji",
    summary: "當日適合（宜）與不適合（忌）的行為列表。",
    intro:
      "黃曆核心即每日「宜」與「忌」。宜嫁娶、宜入宅等表示傳統通書認為該日適合該事；忌則相反。擇日時會篩選「宜」含目標事項的日子，並排除沖煞與凶日。",
    sections: [
      {
        heading: "如何解讀",
        body: "同一日可能宜多事、忌多事，需看是否包含你的目標。例如宜「嫁娶」且未沖你的生肖，即為候選吉日。",
      },
      {
        heading: "古今差異",
        body: "部分宜忌源自農耕社會（如納畜、畋獵），現代可轉譯為相近事項或略過。",
      },
    ],
    relatedSlugs: ["ze-ri", "jia-qu", "ru-zhai", "huang-dao"],
  },
  {
    slug: "ze-ri",
    title: "擇日",
    category: "yiji",
    summary: "選擇適合行事的吉日與吉時。",
    intro:
      "擇日（選日子）是華人文化重要習俗，常見於婚嫁、搬家、開業、動土、安葬。現代可透過黃曆篩選宜忌、避沖生肖、排除凶日，再依個人行程決定。",
    sections: [
      {
        heading: "擇日步驟",
        body: "① 確定事項（嫁娶、入宅等）② 列出需避開的生肖 ③ 篩選宜該事的日子 ④ 排除沖日、凶日 ⑤ 選吉時 ⑥ 配合國定假日與工作行程。",
      },
      {
        heading: "常見迷思",
        body: "并非「黃道日」就一定適合所有事；仍須看宜忌是否含該事項。雙方家庭生肖不同時，可篩選無人沖煞之日。",
      },
    ],
    relatedSlugs: ["yi-ji", "chong-sha", "huang-dao", "ji-shi"],
  },
  {
    slug: "jia-qu",
    title: "嫁娶",
    category: "yiji",
    summary: "結婚、訂婚、迎娶等婚事。",
    intro: "黃曆「宜嫁娶」表示該日通書認為適合舉行婚禮、訂婚、納采等。擇日時宜避開沖新郎新娘及雙方父母生肖之日，並避開月破、四絕等凶日。",
    sections: [
      {
        heading: "相關宜事",
        body: "納采（送聘）、訂盟（訂婚）、迎親、安床等常與嫁娶一併考量。",
      },
      {
        heading: "現代補充",
        body: "除傳統擇日外，需配合飯店、戶政、賓客時間。可先以黃曆篩出數個吉日，再與現實行程交集。",
      },
    ],
    relatedSlugs: ["yi-ji", "ze-ri", "ru-zhai", "an-chuang"],
  },
  {
    slug: "ru-zhai",
    title: "入宅／移徙",
    category: "yiji",
    summary: "搬進新居或遷移住所。",
    intro:
      "入宅指搬入新屋；移徙指搬遷。傳統流程常先拜地基主、再搬家具入宅。宜選「宜入宅」「宜移徙」且未沖家人生肖之日。",
    sections: [
      {
        heading: "拜拜順序",
        body: "① 入宅前拜地基主（戶外或廚房）② 搬入後拜家神、祖先 ③ 請客入宅（依習俗）",
      },
      {
        heading: "與動土差異",
        body: "動土、破土多指施工開挖；入宅指入住。裝潢動土與入宅日可分开擇定。",
      },
    ],
    relatedSlugs: ["di-ji-zhu", "dong-tu", "yi-ji", "ze-ri"],
  },
  {
    slug: "dong-tu",
    title: "動土／破土",
    category: "yiji",
    summary: "動工、挖掘、建築相關儀式。",
    intro: "動土指開始施工；破土多見於安葬挖掘。須選宜動土且非月破、非沖家主生肖之日，並避開胎神方位施工。",
    sections: [
      {
        heading: "現代裝修",
        body: "小規模裝修是否需擇日依家庭觀念而定。若擇日，宜動土、修造並避凶日。",
      },
    ],
    relatedSlugs: ["tai-shen", "ru-zhai", "yi-ji"],
  },
  {
    slug: "an-chuang",
    title: "安床",
    category: "yiji",
    summary: "安置新床、新婚安床儀式。",
    intro: "安床指將新床安置就定位，新婚時常選吉時安床、铺新床。宜選「宜安床」且未沖新人之日。",
    sections: [{ heading: "與嫁娶", body: "婚禮前後皆可安床，各地習俗不同，宜問長輩或依通書。" }],
    relatedSlugs: ["jia-qu", "yi-ji"],
  },
  {
    slug: "kai-shi",
    title: "開市／開業",
    category: "yiji",
    summary: "商店、公司開始營業。",
    intro: "宜開市、宜交易之日適合開幕、剪綵、首筆交易。商家常選正月初五迎財神、或通書黃道吉日。可同時拜土地公、財神。",
    sections: [
      {
        heading: "供品建議",
        body: "發糕（發財）、甜茶、水果、鮮花。金紙依廟方或習俗。",
      },
    ],
    relatedSlugs: ["cai-shen", "tu-di-gong", "yi-ji", "ze-ri"],
  },
  {
    slug: "tian-gong",
    title: "拜天公",
    category: "worship",
    summary: "祭祀玉皇上帝，常見於正月初九。",
    intro:
      "天公即玉皇上帝，民間視為天界最高神。正月初九為天公生，子時或清晨設天公桌祭拜，供品含九層塔、發糕、天公金。平日初一、十五亦常拜天公。",
    sections: [
      {
        heading: "天公桌",
        body: "供品分層擺放，最上層供奉天公，下方供奉其他神明。依閩南、客家習俗略有不同。",
      },
    ],
    relatedSlugs: ["tu-di-gong", "chuyi-shiwu", "cai-shen"],
    aliases: ["玉皇大帝", "天公生"],
  },
  {
    slug: "tu-di-gong",
    title: "土地公",
    category: "deity",
    summary: "福德正神，保佑地方平安、生意興隆。",
    intro:
      "土地公（福德正神）是最親近民間的神明，廟宇、住家、商店常設土地公神位。初二、十六或頭尾牙必拜，求平安、求財。",
    sections: [
      {
        heading: "頭牙與尾牙",
        body: "農曆二月初二為頭牙，十二月十六為尾牙。公司尾牙酬神，感謝土地公一年保佑。",
      },
      {
        heading: "供品",
        body: "發糕、甜茶、水果、刈金。求財可備金紙，依廟方規定。",
      },
    ],
    relatedSlugs: ["di-ji-zhu", "kai-shi", "wei-ya"],
    aliases: ["福德正神", "土地公誕"],
  },
  {
    slug: "di-ji-zhu",
    title: "地基主",
    category: "worship",
    summary: "守護宅邸土地的神靈，入宅前必拜。",
    intro:
      "地基主（地神）守護該塊土地，與土地公不同。搬家、入宅前須先拜地基主，告知新戶入籍，供品多為便飯、茶酒、水果，於戶外或廚房設案。",
    sections: [
      {
        heading: "拜法要點",
        body: "說明新址地址、家人姓名，行禮三拜。供品不可長期放置腐敗，依習俗收供。",
      },
    ],
    relatedSlugs: ["ru-zhai", "tu-di-gong"],
  },
  {
    slug: "mazu",
    title: "媽祖",
    category: "deity",
    summary: "海上守护神，保佑行船、出行平安。",
    intro:
      "媽祖（天上聖母）原為宋代林默娘，後成為東南沿海最重要信仰。農曆三月二十三為媽祖誕。大甲鎮瀾宮、北港朝天宮等遶境舉世聞名。",
    sections: [
      {
        heading: "求平安",
        body: "出遠門、出國、航海前可至媽祖廟祈求。供品以鮮花、素果、清茶為主。",
      },
    ],
    relatedSlugs: ["chuan-wang", "ze-ri"],
    aliases: ["天上聖母", "媽祖誕"],
  },
  {
    slug: "guan-sheng",
    title: "關聖帝君",
    category: "deity",
    summary: "忠義之神，商業與讀書人皆拜。",
    intro:
      "關公（關聖帝君）象徵忠信，商家拜之求生意誠信；讀書人求正直。農曆五月十三為關帝誕。行天宮、祀典武廟香火鼎盛。",
    sections: [
      {
        heading: "求事業",
        body: "開業、簽約、求職可至關帝廟祈求。供品宜整潔，忌求不正手段。",
      },
    ],
    relatedSlugs: ["cai-shen", "wen-chang", "kai-shi"],
    aliases: ["關帝", "關公"],
  },
  {
    slug: "wen-chang",
    title: "文昌帝君",
    category: "deity",
    summary: "掌管功名、考試、文運的神明。",
    intro:
      "文昌帝君為讀書人、考生供奉之神。農曆十一月二十六為文昌誕。供品常見蔥（聰明）、芹菜（勤勞）、包子、粽子（包中）。",
    sections: [
      {
        heading: "考試祈福",
        body: "大考、升學、證照考試前可至文昌廟祈求。可供奉文具、准考證影本（依習俗）。",
      },
    ],
    relatedSlugs: ["guan-sheng", "ba-zi"],
    aliases: ["文昌", "文曲星"],
  },
  {
    slug: "yue-lao",
    title: "月下老人",
    category: "deity",
    summary: "掌管姻緣，牽紅線。",
    intro:
      "月老（月下老人）掌管男女姻緣。台北霞海城隍廟月老聞名全台。祈求時說明姓名、生辰，誠心求良緣，依廟方規定取紅線或求籤。",
    sections: [
      {
        heading: "求姻緣禮儀",
        body: "供品宜甜食、鮮花。忌求複數對象、忌不誠心。求得紅線須依指示置放或佩戴。",
      },
    ],
    relatedSlugs: ["jia-qu", "yuan-xiao"],
    aliases: ["月老"],
  },
  {
    slug: "cai-shen",
    title: "財神",
    category: "deity",
    summary: "掌管財富，正月初五迎財神。",
    intro:
      "財神有多位（如比干、范蠡、趙公明等），民間常合祀。正月初五為迎財神日，商家凌晨或上午祭拜，求新年財運。",
    sections: [
      {
        heading: "與土地公",
        body: "商家常同拜土地公（守店）與財神（招財）。供品：發糕、甜茶、水果。",
      },
    ],
    relatedSlugs: ["kai-shi", "tu-di-gong", "tian-gong"],
    aliases: ["財神爺", "迎財神"],
  },
  {
    slug: "pu-du",
    title: "中元普渡",
    category: "worship",
    summary: "農曆七月祭祀好兄弟、超薦祖先。",
    intro:
      "中元節（七月十五）與整個七月為鬼月，民間舉行普渡祭祀「好兄弟」（無祀孤魂）與祖先。供品含三牲、水果、乾糧、金紙。",
    sections: [
      {
        heading: "禁忌",
        body: "部分習俗忌晚上晾衣、忌隨意捡拾普渡供品。供品避免香蕉、李子、梨子、鳳梨（音似「來」「你」「離」「旺」等，依地方說法）。",
      },
      {
        heading: "時間",
        body: "普渡多於下午完成，最遲宜在傍晚前，依地方習俗。",
      },
    ],
    relatedSlugs: ["zhong-yuan", "di-ji-zhu"],
    aliases: ["普渡", "中元節"],
  },
  {
    slug: "chuyi-shiwu",
    title: "初一、十五",
    category: "worship",
    summary: "每月朔望，傳統拜拜日。",
    intro:
      "農曆每月初一（朔）與十五（望）為傳統祭祀日，拜天公、祖先、家神。供品可簡可豐，鮮花、素果、清茶、金紙即可，重在誠心。",
    sections: [
      {
        heading: "現代家庭",
        body: "若無時間每月兩次，可選重要初一、十五或節日集中祭拜。",
      },
    ],
    relatedSlugs: ["tian-gong", "tu-di-gong"],
    aliases: ["初一十五", "朔望"],
  },
  {
    slug: "wei-ya",
    title: "尾牙",
    category: "worship",
    summary: "農曆十二月十六，酬謝土地公。",
    intro: "尾牙是商家一年最後一次牙祭，感謝土地公保佑一年生意。公司常設宴員工，廟宇則有酬神活動。",
    sections: [{ heading: "與頭牙", body: "二月初二為頭牙，十二月十六為尾牙，中間每月初二、十六亦可拜土地公。" }],
    relatedSlugs: ["tu-di-gong", "kai-shi"],
  },
  {
    slug: "an-tai-sui",
    title: "安太歲",
    category: "worship",
    summary: "化解犯太歲，至廟宇祈福。",
    intro: "犯太歲年可到道觀、宮廟安太歲，填寫姓名生辰，祈求平安。可點安太歲燈或佩戴平安符（依廟方）。",
    sections: [{ heading: "時機", body: "農曆新年前後至該年結束前皆可，以立春換年後安奉當年太歲最為普遍。" }],
    relatedSlugs: ["tai-sui", "sheng-xiao"],
  },
  {
    slug: "zhong-yuan",
    title: "中元節",
    category: "worship",
    summary: "農曆七月十五，普渡與祭祖。",
    intro: "中元源於道教中元節與佛教盂蘭盆，在台灣與普渡、祭祖習俗融合。是慎終追遠、感恩先人的重要節日。",
    sections: [{ heading: "與鬼門開", body: "七月一日鬼門開、七月二十九鬼門關（依地方），整月皆謹慎行事。" }],
    relatedSlugs: ["pu-du", "qing-ming"],
  },
  {
    slug: "qing-ming",
    title: "清明節",
    category: "worship",
    summary: "掃墓祭祖，緬懷先人。",
    intro: "清明兼具節氣與節日，是掃墓、春祭的重要時節。供品宜先人生前喜好，整理墓園，報告近況，行禮三拜。",
    sections: [{ heading: "注意事項", body: "墓園用火、焚化金紙須遵守管理規定。環保掃墓可減少金紙，以鮮花、擦拭墓碑代替。" }],
    relatedSlugs: ["zhong-yuan", "pu-du"],
    aliases: ["清明", "掃墓"],
  },
  {
    slug: "yuan-xiao",
    title: "元宵節",
    category: "worship",
    summary: "農曆正月十五，團圓賞燈。",
    intro: "元宵為春節後第一個月圓夜，傳統賞燈、吃湯圓、猜燈謎。可至廟宇點光明燈、求月老。",
    sections: [{ heading: "湯圓", body: "圓形象徵團圓，全家共食湯圓寓意闔家美滿。" }],
    relatedSlugs: ["yue-lao", "chun-jie"],
  },
  {
    slug: "chun-jie",
    title: "春節",
    category: "worship",
    summary: "農曆正月初一，一年最重要節日。",
    intro: "春節（過年）含除夕守歲、初一拜年、迎神、祭祖等。初一宜說吉祥話、穿新衣、拜年，忌掃地（依習俗）。",
    sections: [
      {
        heading: "流程概略",
        body: "除夕：祭祖、團圓。初一：拜天公、祖先、拜年。初四：迎神。初五：迎財神。",
      },
    ],
    relatedSlugs: ["tian-gong", "cai-shen", "yuan-xiao"],
    aliases: ["過年", "正月初一"],
  },
  {
    slug: "dong-zhi",
    title: "冬至",
    category: "worship",
    summary: "節氣與節日，補冬、吃湯圓。",
    intro: "冬至日最短、陰極陽生，民間有「冬至大如年」之說。台灣習俗吃湯圓、補冬，部分家庭祭祖。",
    sections: [{ heading: "補冬", body: "進補食膳，如薑母鴨、麻油雞、湯圓，象徵度過嚴冬。" }],
    relatedSlugs: ["jie-qi", "chun-jie"],
  },
  {
    slug: "chuan-wang",
    title: "送王、迎王",
    category: "worship",
    summary: "西南沿海王爺遶境儀式。",
    intro: "送王、迎王是台灣西南沿海（如南州、西港）重要宗教活動，王爺為驅疫、保境神明。與媽祖遶境同為台灣重要民俗。",
    sections: [{ heading: "與王爺誕", body: "農曆六月廿四為王爺千歲誕，部分地區有慶典。" }],
    relatedSlugs: ["mazu", "pu-du"],
  },
];

const articleBySlug = new Map(wikiArticles.map((a) => [a.slug, a]));
const articleByTitle = new Map<string, WikiArticle>();
for (const a of wikiArticles) {
  articleByTitle.set(a.title, a);
  for (const alias of a.aliases ?? []) {
    articleByTitle.set(alias, a);
  }
}

export function getWikiArticle(slug: string): WikiArticle | undefined {
  return articleBySlug.get(slug);
}

export function getAllWikiArticles(): WikiArticle[] {
  return wikiArticles;
}

export function searchWikiArticles(query: string, category?: WikiCategory | ""): WikiArticle[] {
  const q = query.trim().toLowerCase();
  return wikiArticles.filter((a) => {
    if (category && a.category !== category) return false;
    if (!q) return true;
    const haystack = [a.title, a.summary, a.intro, ...a.sections.map((s) => s.body), ...(a.aliases ?? [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q) || a.slug.includes(q);
  });
}

export function getWikiSummary(term: string): string | undefined {
  const normalized = term.trim();
  const direct = articleByTitle.get(normalized);
  if (direct) return direct.summary;
  for (const a of wikiArticles) {
    if (normalized.includes(a.title) || a.title.includes(normalized)) return a.summary;
    for (const alias of a.aliases ?? []) {
      if (normalized.includes(alias)) return a.summary;
    }
  }
  return undefined;
}

export function countWikiByCategory(): Record<WikiCategory, number> {
  const counts = {} as Record<WikiCategory, number>;
  for (const key of Object.keys(wikiCategoryLabels) as WikiCategory[]) {
    counts[key] = wikiArticles.filter((a) => a.category === key).length;
  }
  return counts;
}
