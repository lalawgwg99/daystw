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
import { formatLunarDate, toTaiwanTraditional } from "./lib/traditional";

const purposeOptions = [
  { label: "搬家入宅", value: "入宅", keywords: ["入宅", "移徙"] },
  { label: "結婚訂婚", value: "嫁娶", keywords: ["嫁娶", "订盟", "訂盟", "纳采", "納采"] },
  { label: "開市開工", value: "开市", keywords: ["开市", "開市", "开业", "開業", "交易"] },
  { label: "祭祀祈福", value: "祭祀", keywords: ["祭祀", "祈福"] },
];

const zodiacOptions = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];

const festivals = [
  {
    name: "中元節",
    lunar: "農曆七月十五",
    solar: "2026-08-27",
    intent: "普度、慎終追遠、孝親報恩",
    tags: ["普度", "供品", "戶外祭拜", "禁忌"],
    time: "下午 2 點至 5 點前",
    offering: "三牲、水果、乾糧、米酒、金紙",
    caution: "避免香蕉、李子、梨子、鳳梨；祭拜時不呼叫本名",
  },
  {
    name: "清明節",
    lunar: "節氣清明",
    solar: "2026-04-05",
    intent: "掃墓、祭祖",
    tags: ["掃墓", "祭祖", "供品", "注意事項"],
    time: "上午為主，依家族習慣調整",
    offering: "鮮花、素果、茶酒、祖先生前喜愛食物",
    caution: "墓園用火與金紙須依地方規範",
  },
  {
    name: "中秋節",
    lunar: "農曆八月十五",
    solar: "2026-09-25",
    intent: "團圓、拜月",
    tags: ["拜月", "供品", "月餅", "家庭"],
    time: "傍晚至月出後",
    offering: "月餅、柚子、圓形水果、清茶",
    caution: "依家庭習慣準備團圓食品即可",
  },
];

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
    const yi = lunar.getDayYi().map((item: string) => toTaiwanTraditional(item));
    const ji = lunar.getDayJi().map((item: string) => toTaiwanTraditional(item));
    const clash = toTaiwanTraditional(lunar.getDayChongDesc());
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const purposeMatched = purposeConfig.keywords.some((keyword) =>
      lunar.getDayYi().some((y: string) => y.includes(keyword) || toTaiwanTraditional(y).includes(keyword)),
    );
    const clashBlocked = avoidZodiac !== "不限" && clash.includes(avoidZodiac);
    const weekendBlocked = weekendOnly && !isWeekend;
    const score = (purposeMatched ? 58 : 18) + (isWeekend ? 18 : 4) + (!clashBlocked ? 18 : -24) + (ji.length <= 5 ? 6 : 0);

    return {
      date,
      day,
      iso: formatSolarDate(date),
      lunarText: formatLunarDate(lunar.toString(), true),
      yi: yi.slice(0, 6),
      ji: ji.slice(0, 4),
      clash,
      sha: toTaiwanTraditional(lunar.getDaySha()),
      tai: toTaiwanTraditional(lunar.getDayPositionTai()),
      peng: `${toTaiwanTraditional(lunar.getPengZuGan())}；${toTaiwanTraditional(lunar.getPengZuZhi())}`,
      tianShen: `${toTaiwanTraditional(lunar.getDayTianShen())}・${toTaiwanTraditional(lunar.getDayTianShenType())}`,
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
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [purpose, setPurpose] = useState("入宅");
  const [avoidZodiac, setAvoidZodiac] = useState("不限");
  const [weekendOnly, setWeekendOnly] = useState(false);

  const todayYi = todayLunar.getDayYi().slice(0, 5).map((item: string) => toTaiwanTraditional(item));

  const results = useMemo(
    () => buildMonthResults(year, month, purpose, avoidZodiac, weekendOnly),
    [year, month, purpose, avoidZodiac, weekendOnly],
  );

  return (
    <main className="page-root">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-brand">
            <span className="brand-mark">吉</span>
            <span className="brand-name">吉日通</span>
          </div>
          <nav className="site-nav">
            <a href="#finder">吉日篩選</a>
            <a href="#calendar">今日黃曆</a>
            <a href="#festival">節日</a>
            <a href="#services">民俗指南</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-6" id="finder">
        <div className="finder-layout">
          <aside className="finder-sidebar">
            <div className="today-panel compact" id="calendar">
              <div className="panel-title">
                <CalendarDays size={18} />
                <span>今日黃曆</span>
              </div>
              <strong>{formatSolarDate(today)}</strong>
              <p>{formatLunarDate(todayLunar.toString())}</p>
              <div className="tag-row compact">
                {todayYi.map((item: string) => (
                  <span className="good-tag" key={item}>{item}</span>
                ))}
              </div>
              <dl className="compact-dl">
                <div><dt>沖煞</dt><dd>{toTaiwanTraditional(todayLunar.getDayChongDesc())} 煞{toTaiwanTraditional(todayLunar.getDaySha())}</dd></div>
                <div><dt>胎神</dt><dd>{toTaiwanTraditional(todayLunar.getDayPositionTai())}</dd></div>
              </dl>
            </div>

            <div className="finder-panel">
              <div className="panel-title">
                <Filter size={18} />
                <span>吉日篩選</span>
              </div>
              <label>
                年份
                <input value={year} min={2024} max={2035} type="number" onChange={(event) => setYear(Number(event.target.value))} />
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
          </aside>

          <div className="results-grid">
            {results.length === 0 ? (
              <div className="empty-state">這組條件沒有合適日期，建議放寬週末或生肖限制。</div>
            ) : results.map((item) => (
              <article className="date-card compact" key={item.iso}>
                <div className="date-topline">
                  <span>{item.iso}</span>
                  <strong>{item.isWeekend ? "週末" : "平日"}</strong>
                </div>
                <h2>{month}月{item.day}日</h2>
                <p>{item.lunarText}</p>
                <div className="tag-row compact">
                  {item.yi.map((tag: string) => <span className="good-tag" key={tag}>{tag}</span>)}
                </div>
                <dl className="detail-list compact-dl">
                  <div><dt>沖煞</dt><dd>{item.clash} 煞{item.sha}</dd></div>
                  <div><dt>胎神</dt><dd>{item.tai}</dd></div>
                  <div><dt>彭祖</dt><dd>{item.peng}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="festival">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-6">
          <h2 className="section-title">節日專區</h2>
          <div className="festival-grid">
            {festivals.map((festival) => (
              <article className="festival-card compact" key={festival.name}>
                <div className="date-topline">
                  <span>{festival.solar}</span>
                  <strong>{festival.lunar}</strong>
                </div>
                <h3>{festival.name}</h3>
                <p>{festival.intent}</p>
                <div className="mini-list">
                  <span><Clock3 size={15} />{festival.time}</span>
                  <span><CheckCircle2 size={15} />{festival.offering}</span>
                  <span><Tags size={15} />{festival.caution}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 lg:px-6" id="services">
        <ServicePanel />
      </section>
    </main>
  );
}
