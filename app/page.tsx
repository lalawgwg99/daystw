"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  Filter,
  HandCoins,
  HeartHandshake,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
} from "lucide-react";
import { Solar } from "lunar-javascript";
import { useMemo, useState } from "react";

const purposeOptions = [
  { label: "搬家入宅", value: "入宅", keywords: ["入宅", "移徙"] },
  { label: "結婚訂婚", value: "嫁娶", keywords: ["嫁娶", "订盟", "纳采"] },
  { label: "開市開工", value: "开市", keywords: ["开市", "开业", "交易"] },
  { label: "祭祀祈福", value: "祭祀", keywords: ["祭祀", "祈福"] },
];

const zodiacOptions = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];

const festivals = [
  {
    name: "中元節",
    lunar: "農曆七月十五",
    solar: "2026-08-27",
    intent: "普度、慎終追遠、孝親報恩",
    tags: ["普度", "供品清單", "戶外祭拜", "導購"],
    time: "下午 2 點至 5 點前",
    offering: "三牲、水果、乾糧、米酒、紙錢",
    caution: "避免香蕉、李子、梨子、鳳梨；祭拜時不呼叫本名",
  },
  {
    name: "清明節",
    lunar: "節氣清明",
    solar: "2026-04-05",
    intent: "掃墓、祭祖、家族記憶整理",
    tags: ["掃墓", "祭祖", "交通需求", "用品包"],
    time: "上午為主，依家族習慣調整",
    offering: "鮮花、素果、茶酒、祖先生前喜愛食物",
    caution: "墓園用火與金紙須依地方規範",
  },
  {
    name: "中秋節",
    lunar: "農曆八月十五",
    solar: "2026-09-25",
    intent: "團圓、拜月、送禮",
    tags: ["拜月", "送禮", "月餅", "家庭"],
    time: "傍晚至月出後",
    offering: "月餅、柚子、圓形水果、清茶",
    caution: "內容可串接禮盒、旅遊與團聚餐廳推薦",
  },
];

const contentPillars = [
  "由來故事 300 字版",
  "拜拜時間與地點",
  "供品清單與禁忌",
  "可購買懶人包",
  "名詞百科內鏈",
  "審稿與來源紀錄",
];

const serviceModules = [
  {
    title: "線上算命",
    phase: "付費轉換",
    copy: "先做八字、紫微、流年運勢的問卷式下單，再媒合命理師回覆。結果頁保留免責聲明、命理師資歷、修改次數與交付時間。",
    checkpoints: ["生辰資料加密", "命理師審核", "不做醫療投資保證"],
  },
  {
    title: "線上點燈祈福",
    phase: "宮廟合作",
    copy: "年底主打光明燈、安太歲、文昌燈、財神燈。每筆訂單要有宮廟、燈種、姓名資料、完成回證與收據。",
    checkpoints: ["合作宮廟名冊", "履約照片或編號", "付款與退款規則"],
  },
  {
    title: "拜拜提醒",
    phase: "留存功能",
    copy: "依節日、生肖、家中需求建立提醒，例如考試前拜文昌帝君、開工拜土地公、搬家前拜地基主。",
    checkpoints: ["國農曆雙日期", "LINE/Email 提醒", "供品清單連動"],
  },
  {
    title: "該拜哪尊神明",
    phase: "搜尋入口",
    copy: "把需求轉成神明推薦與拜法，例如求財、求姻緣、求學業、求平安、求子、搬家入宅。",
    checkpoints: ["神明職掌資料庫", "廟宇地區篩選", "禁忌與供品標籤"],
  },
];

const deityMatches = [
  { need: "求財、開店、業績", deity: "財神爺、土地公、關聖帝君", offering: "發糕、甜茶、水果、金紙" },
  { need: "考試、升學、證照", deity: "文昌帝君、孔子、魁星爺", offering: "蔥、芹菜、包子、粽子" },
  { need: "姻緣、人際", deity: "月下老人", offering: "甜食、鮮花、紅線依廟方規定" },
  { need: "搬家入宅", deity: "地基主、土地公、家神祖先", offering: "便飯、茶酒、水果、刈金" },
  { need: "平安健康", deity: "保生大帝、媽祖、觀音菩薩", offering: "鮮花、素果、清茶" },
];

function toTraditionalZodiac(text: string) {
  return text
    .replace("龙", "龍")
    .replace("鸡", "雞")
    .replace("猪", "豬");
}

function formatSolarDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getLunarForDate(year: number, month: number, day: number) {
  return Solar.fromYmd(year, month, day).getLunar();
}

function buildMonthResults(year: number, month: number, purpose: string, avoidZodiac: string, weekendOnly: boolean) {
  const purposeConfig = purposeOptions.find((item) => item.value === purpose) ?? purposeOptions[0];
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month - 1, day);
    const lunar = getLunarForDate(year, month, day);
    const yi = lunar.getDayYi();
    const ji = lunar.getDayJi();
    const clash = toTraditionalZodiac(lunar.getDayChongDesc());
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const purposeMatched = purposeConfig.keywords.some((keyword) => yi.includes(keyword));
    const clashBlocked = avoidZodiac !== "不限" && clash.includes(avoidZodiac);
    const weekendBlocked = weekendOnly && !isWeekend;
    const score = (purposeMatched ? 58 : 18) + (isWeekend ? 18 : 4) + (!clashBlocked ? 18 : -24) + (ji.length <= 5 ? 6 : 0);

    return {
      date,
      day,
      iso: formatSolarDate(date),
      lunarText: lunar.toString().replace("二〇二六年", ""),
      yi: yi.slice(0, 6),
      ji: ji.slice(0, 4),
      clash,
      sha: lunar.getDaySha(),
      tai: lunar.getDayPositionTai(),
      peng: `${lunar.getPengZuGan()}；${lunar.getPengZuZhi()}`,
      tianShen: `${lunar.getDayTianShen()}・${lunar.getDayTianShenType()}`,
      isWeekend,
      purposeMatched,
      clashBlocked,
      weekendBlocked,
      score,
    };
  })
    .filter((item) => item.purposeMatched && !item.clashBlocked && !item.weekendBlocked)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

export default function Home() {
  const today = new Date();
  const todayLunar = getLunarForDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(10);
  const [purpose, setPurpose] = useState("入宅");
  const [avoidZodiac, setAvoidZodiac] = useState("兔");
  const [weekendOnly, setWeekendOnly] = useState(true);

  const results = useMemo(
    () => buildMonthResults(year, month, purpose, avoidZodiac, weekendOnly),
    [year, month, purpose, avoidZodiac, weekendOnly],
  );

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#201b16]">
      <section className="border-b border-[#ded2bf] bg-[#fffaf1]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-5 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-5">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6e6257]">
              <span className="brand-mark">吉</span>
              <a href="#finder">吉日篩選</a>
              <a href="#calendar">黃曆查詢</a>
              <a href="#festival">節日專區</a>
              <a href="#services">線上祈福</a>
              <a href="#system">資料治理</a>
            </nav>

            <div className="product-heading">
              <p>精準日曆工具 + 傳統文化內容樞紐</p>
              <h1>吉日、節氣、拜拜指南，一次查清楚。</h1>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="metric">
                <Sparkles size={18} />
                <span>黃曆引擎</span>
                <strong>lunar-javascript</strong>
              </div>
              <div className="metric">
                <ShieldCheck size={18} />
                <span>二次校驗</span>
                <strong>官方節氣資料</strong>
              </div>
              <div className="metric">
                <Search size={18} />
                <span>SEO 入口</span>
                <strong>2026 搬家吉日</strong>
              </div>
            </div>
          </div>

          <aside className="today-panel" id="calendar">
            <div className="panel-title">
              <CalendarDays size={20} />
              <span>今日黃曆</span>
            </div>
            <strong>{formatSolarDate(today)}</strong>
            <p>{todayLunar.toString()}</p>
            <div className="tag-row">
              {todayLunar.getDayYi().slice(0, 5).map((item: string) => (
                <span className="good-tag" key={item}>{item}</span>
              ))}
            </div>
            <dl>
              <div><dt>沖煞</dt><dd>{toTraditionalZodiac(todayLunar.getDayChongDesc())} 煞{todayLunar.getDaySha()}</dd></div>
              <div><dt>胎神</dt><dd>{todayLunar.getDayPositionTai()}</dd></div>
              <div><dt>彭祖</dt><dd>{todayLunar.getPengZuGan()}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[420px_1fr] lg:px-8" id="finder">
        <div className="finder-panel">
          <div className="panel-title">
            <Filter size={20} />
            <span>吉日篩選器</span>
          </div>
          <label>
            年份
            <input value={year} min={2026} max={2035} type="number" onChange={(event) => setYear(Number(event.target.value))} />
          </label>
          <label>
            月份
            <input value={month} min={1} max={12} type="number" onChange={(event) => setMonth(Number(event.target.value))} />
          </label>
          <label>
            用途
            <select value={purpose} onChange={(event) => setPurpose(event.target.value)}>
              {purposeOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label>
            避開生肖
            <select value={avoidZodiac} onChange={(event) => setAvoidZodiac(event.target.value)}>
              <option>不限</option>
              {zodiacOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="toggle-line">
            <input checked={weekendOnly} type="checkbox" onChange={(event) => setWeekendOnly(event.target.checked)} />
            只看週末
          </label>
        </div>

        <div className="results-grid">
          {results.length === 0 ? (
            <div className="empty-state">這組條件沒有找到合適日期，建議放寬週末或生肖限制。</div>
          ) : results.map((item) => (
            <article className="date-card" key={item.iso}>
              <div className="date-topline">
                <span>{item.iso}</span>
                <strong>{item.isWeekend ? "週末" : "平日"}</strong>
              </div>
              <h2>{month} 月 {item.day} 日</h2>
              <p>{item.lunarText}</p>
              <div className="tag-row">
                {item.yi.map((tag: string) => <span className="good-tag" key={tag}>{tag}</span>)}
              </div>
              <dl className="detail-list">
                <div><dt>沖煞</dt><dd>{item.clash} 煞{item.sha}</dd></div>
                <div><dt>天神</dt><dd>{item.tianShen}</dd></div>
                <div><dt>胎神</dt><dd>{item.tai}</dd></div>
                <div><dt>彭祖</dt><dd>{item.peng}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="band" id="festival">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="section-head">
            <div>
              <p>節日專區</p>
              <h2>每篇內容都做成可維護、可導購、可內鏈的模組。</h2>
            </div>
            <HandCoins size={28} />
          </div>
          <div className="festival-grid">
            {festivals.map((festival) => (
              <article className="festival-card" key={festival.name}>
                <div className="date-topline">
                  <span>{festival.solar}</span>
                  <strong>{festival.lunar}</strong>
                </div>
                <h3>{festival.name}</h3>
                <p>{festival.intent}</p>
                <div className="mini-list">
                  <span><Clock3 size={16} />{festival.time}</span>
                  <span><CheckCircle2 size={16} />{festival.offering}</span>
                  <span><Tags size={16} />{festival.caution}</span>
                </div>
                <div className="tag-row">
                  {festival.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8" id="services">
        <div className="section-head">
          <div>
            <p>未來服務擴充</p>
            <h2>從查詢工具延伸到算命、點燈、祈福與神明推薦。</h2>
          </div>
          <HeartHandshake size={28} />
        </div>
        <div className="service-grid">
          {serviceModules.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="date-topline">
                <span>{service.phase}</span>
                <strong>{service.title}</strong>
              </div>
              <p>{service.copy}</p>
              <div className="tag-row">
                {service.checkpoints.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
        <div className="deity-table">
          <div className="table-title">需求對應神明資料庫範例</div>
          {deityMatches.map((row) => (
            <div className="deity-row" key={row.need}>
              <strong>{row.need}</strong>
              <span>{row.deity}</span>
              <small>{row.offering}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_1fr] lg:px-8" id="system">
        <div className="ops-panel">
          <div className="panel-title">
            <DatabaseZap size={20} />
            <span>資料準確性策略</span>
          </div>
          <ol>
            <li>曆法主引擎採成熟開源庫，負責農曆、節氣、宜忌、沖煞與時辰資料。</li>
            <li>節氣與國定假日由官方資料定期同步，建立差異報告與人工覆核。</li>
            <li>所有文章欄位保留來源、審稿人、更新時間，避免民俗內容變成不可追溯的口耳相傳。</li>
          </ol>
        </div>
        <div className="ops-panel">
          <div className="panel-title">
            <Tags size={20} />
            <span>內容資料模型</span>
          </div>
          <div className="pill-grid">
            {contentPillars.map((item) => <span key={item}>{item}</span>)}
          </div>
          <p>下一步可接 PostgreSQL：日期、宜忌、生肖沖煞、節日、供品、禁忌與導購商品分表，讓「找日子」和「節慶文章」共用同一批可信資料。</p>
        </div>
      </section>
    </main>
  );
}
