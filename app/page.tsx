"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  Tags,
} from "lucide-react";
import { Solar } from "lunar-javascript";
import { useMemo, useState } from "react";
import ServicePanel from "./components/ServicePanel";

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
    tags: ["普度", "供品清單", "戶外祭拜", "禁忌提醒"],
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
    caution: "內容可搭配月餅、柚子等團圓食品，依家庭習慣準備",
  },
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
              <a href="#services">民俗指南</a>
            </nav>

            <div className="product-heading">
              <h1>吉日、節氣、拜拜指南，一次查清楚。</h1>
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
          <h2 className="section-title">節日專區</h2>
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
        <ServicePanel />
      </section>
    </main>
  );
}
