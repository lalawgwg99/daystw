"use client";

import {
  CheckCircle2,
  Clock3,
  Filter,
  Tags,
} from "lucide-react";
import { useMemo, useState } from "react";
import DateResultCard from "./components/DateResultCard";
import ServicePanel from "./components/ServicePanel";
import TodayBanner from "./components/TodayBanner";
import {
  buildMonthResults,
  formatSolarDate,
  getLunarForDate,
  monthOptions,
  purposeOptions,
  yearOptions,
  zodiacFromBirthYear,
  zodiacOptions,
} from "./lib/finder";
import { formatLunarDate, toTaiwanTraditional } from "./lib/traditional";

const festivals = [
  {
    name: "中元節",
    lunar: "農曆七月十五",
    solar: "2026-08-27",
    intent: "普度、慎終追遠、孝親報恩",
    time: "下午 2 點至 5 點前",
    offering: "三牲、水果、乾糧、米酒、紙錢",
    caution: "避免香蕉、李子、梨子、鳳梨；祭拜時不呼叫本名",
  },
  {
    name: "清明節",
    lunar: "節氣清明",
    solar: "2026-04-05",
    intent: "掃墓、祭祖",
    time: "上午為主，依家族習慣調整",
    offering: "鮮花、素果、茶酒、祖先生前喜愛食物",
    caution: "墓園用火與金紙須依地方規範",
  },
  {
    name: "中秋節",
    lunar: "農曆八月十五",
    solar: "2026-09-25",
    intent: "團圓、拜月",
    time: "傍晚至月出後",
    offering: "月餅、柚子、圓形水果、清茶",
    caution: "依家庭習慣準備團圓食品即可",
  },
];

export default function Home() {
  const today = new Date();
  const todayLunar = getLunarForDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [purpose, setPurpose] = useState("入宅");
  const [avoidZodiac, setAvoidZodiac] = useState("不限");
  const [weekendOnly, setWeekendOnly] = useState(false);
  const [birthYear, setBirthYear] = useState("");

  const todayYi = todayLunar.getDayYi().slice(0, 8).map((item: string) => toTaiwanTraditional(item));

  const results = useMemo(
    () => buildMonthResults(year, month, purpose, avoidZodiac, weekendOnly),
    [year, month, purpose, avoidZodiac, weekendOnly],
  );

  const activePurpose = purposeOptions.find((p) => p.value === purpose);

  function handleBirthYearChange(value: string) {
    setBirthYear(value);
    const yearNum = Number(value);
    const zodiac = zodiacFromBirthYear(yearNum);
    if (zodiac) setAvoidZodiac(zodiac);
  }

  return (
    <main className="page-root">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-brand">
            <span className="brand-mark">吉</span>
            <span className="brand-name">吉日通</span>
          </div>
          <nav className="site-nav">
            <a href="#finder">找吉日</a>
            <a href="#calendar">今日黃曆</a>
            <a href="#festival">節日</a>
            <a href="#services">民俗指南</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <TodayBanner
          clash={toTaiwanTraditional(todayLunar.getDayChongDesc())}
          lunarText={formatLunarDate(todayLunar.toString())}
          pengGan={toTaiwanTraditional(todayLunar.getPengZuGan())}
          sha={toTaiwanTraditional(todayLunar.getDaySha())}
          solarDate={formatSolarDate(today)}
          tai={toTaiwanTraditional(todayLunar.getDayPositionTai())}
          yi={todayYi}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-6" id="finder">
        <div className="finder-layout">
          <div className="results-area">
            <div className="results-header">
              <h2 className="finder-heading">推薦吉日</h2>
              {results.length > 0 && (
                <span className="results-count">
                  {year} 年 {month} 月共 {results.length} 個
                  {activePurpose ? activePurpose.shortLabel : ""}吉日
                </span>
              )}
            </div>
            <div className="results-grid">
              {results.length === 0 ? (
                <div className="empty-state">
                  這個月沒有符合的日期，試試放寬「只看週末」或更改避開生肖。
                </div>
              ) : (
                results.map((item) => (
                  <DateResultCard item={item} key={item.iso} month={month} />
                ))
              )}
            </div>
          </div>

          <aside className="finder-sidebar">
            <div className="finder-panel">
              <div className="panel-title">
                <Filter size={18} />
                <span>想找哪天做事？</span>
              </div>

              <div className="purpose-chips">
                {purposeOptions.map((item) => (
                  <button
                    className={`purpose-chip ${purpose === item.value ? "active" : ""}`}
                    key={item.value}
                    type="button"
                    onClick={() => setPurpose(item.value)}
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>

              <div className="form-row">
                <label>
                  年份
                  <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y} 年
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  月份
                  <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                    {monthOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                避開生肖（沖日）
                <select value={avoidZodiac} onChange={(e) => setAvoidZodiac(e.target.value)}>
                  <option>不限</option>
                  {zodiacOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                出生年（自動帶入生肖）
                <input
                  max={2100}
                  min={1900}
                  placeholder="例如 1990"
                  type="number"
                  value={birthYear}
                  onChange={(e) => handleBirthYearChange(e.target.value)}
                />
              </label>

              <label className="toggle-line">
                <input
                  checked={weekendOnly}
                  type="checkbox"
                  onChange={(e) => setWeekendOnly(e.target.checked)}
                />
                只看週末
              </label>
            </div>
          </aside>
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
        <h2 className="section-title">民俗指南</h2>
        <ServicePanel />
      </section>
    </main>
  );
}
