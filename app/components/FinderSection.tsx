"use client";

import { Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  buildFinderResults,
  monthOptions,
  purposeOptions,
  yearOptions,
  zodiacFromBirthYear,
  zodiacOptions,
  type DateRangeMode,
} from "../lib/finder";
import { storage } from "../lib/storage";
import DateResultCard from "./DateResultCard";

type Props = {
  settingsVersion?: number;
};

export default function FinderSection({ settingsVersion = 0 }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [endYear, setEndYear] = useState(today.getFullYear());
  const [endMonth, setEndMonth] = useState(Math.min(today.getMonth() + 3, 12));
  const [purpose, setPurpose] = useState("入宅");
  const [avoidZodiacs, setAvoidZodiacs] = useState<string[]>(() => {
    const s = storage.getSettings();
    return [...(s.myZodiac ? [s.myZodiac] : []), ...s.familyZodiacs].filter(Boolean);
  });
  const [weekendOnly, setWeekendOnly] = useState(false);
  const [rangeMode, setRangeMode] = useState<DateRangeMode>("month");
  const [showAll, setShowAll] = useState(false);
  const [birthYears, setBirthYears] = useState<string[]>(["", "", ""]);
  const [excludeBadDays, setExcludeBadDays] = useState(() => storage.getSettings().excludeBadDays);

  useEffect(() => {
    setExcludeBadDays(storage.getSettings().excludeBadDays);
  }, [settingsVersion]);

  const { results, totalMatched } = useMemo(
    () =>
      buildFinderResults({
        year,
        month,
        endYear,
        endMonth,
        purpose,
        avoidZodiacs,
        weekendOnly,
        excludeBadDays,
        rangeMode,
        limit: showAll ? 999 : 12,
      }),
    [year, month, endYear, endMonth, purpose, avoidZodiacs, weekendOnly, excludeBadDays, rangeMode, showAll, settingsVersion],
  );

  const activePurpose = purposeOptions.find((p) => p.value === purpose);

  function handleBirthYearChange(index: number, value: string) {
    const next = [...birthYears];
    next[index] = value;
    setBirthYears(next);
    const zodiacs = next
      .map((y) => zodiacFromBirthYear(Number(y)))
      .filter((z): z is string => Boolean(z));
    setAvoidZodiacs([...new Set(zodiacs)]);
  }

  function toggleFamilyZodiac(zodiac: string) {
    setAvoidZodiacs((prev) =>
      prev.includes(zodiac) ? prev.filter((z) => z !== zodiac) : [...prev, zodiac],
    );
  }

  return (
    <section className="section-block section-finder" id="finder">
      <div className="section-inner">
        <header className="section-head-block">
          <div className="finder-head-row">
            <h2 className="section-title">推薦吉日</h2>
            {totalMatched > 0 && (
              <span className="results-count">
                共 {totalMatched} 個{activePurpose?.shortLabel ?? ""}吉日
              </span>
            )}
          </div>
          <p className="section-desc">選用途與條件，依黃曆宜忌與沖煞自動篩選，結果依日期由近到遠排列。</p>
        </header>

        <div className="finder-layout">
          <aside className="finder-sidebar">
            <div className="finder-panel">
              <div className="panel-title">
                <Filter size={18} />
                <span>篩選條件</span>
              </div>

              <div className="purpose-chips scroll-x">
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

              <label>
                查詢範圍
                <select
                  value={rangeMode}
                  onChange={(e) => setRangeMode(e.target.value as DateRangeMode)}
                >
                  <option value="month">單月</option>
                  <option value="range">自訂區間</option>
                </select>
              </label>

              <div className="form-row">
                <label>
                  {rangeMode === "month" ? "年份" : "起始年"}
                  <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y} 年
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {rangeMode === "month" ? "月份" : "起始月"}
                  <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                    {monthOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {rangeMode === "range" && (
                <div className="form-row">
                  <label>
                    結束年
                    <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y} 年
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    結束月
                    <select value={endMonth} onChange={(e) => setEndMonth(Number(e.target.value))}>
                      {monthOptions.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              <div>
                <span className="field-label">避開生肖</span>
                <div className="zodiac-chips compact scroll-x">
                  {zodiacOptions.map((z) => (
                    <button
                      className={`purpose-chip small ${avoidZodiacs.includes(z) ? "active" : ""}`}
                      key={z}
                      type="button"
                      onClick={() => toggleFamilyZodiac(z)}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {birthYears.map((value, index) => (
                <label key={index}>
                  家人{index + 1}出生年
                  <input
                    max={2100}
                    min={1900}
                    placeholder="例如 1990"
                    type="number"
                    value={value}
                    onChange={(e) => handleBirthYearChange(index, e.target.value)}
                  />
                </label>
              ))}

              <label className="toggle-line">
                <input
                  checked={weekendOnly}
                  type="checkbox"
                  onChange={(e) => setWeekendOnly(e.target.checked)}
                />
                只看週末
              </label>

              <label className="toggle-line">
                <input
                  checked={excludeBadDays}
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setExcludeBadDays(checked);
                    storage.updateSettings({ excludeBadDays: checked });
                  }}
                />
                排除凶日
              </label>
            </div>
          </aside>

          <div className="results-area">
            <div className="results-grid">
              {results.length === 0 ? (
                <div className="empty-state">
                  沒有符合的日期，試試放寬條件或減少避開生肖。
                </div>
              ) : (
                results.map((item) => (
                  <DateResultCard item={item} key={item.iso} purpose={purpose} />
                ))
              )}
            </div>
            {totalMatched > results.length && !showAll && (
              <div className="form-actions center">
                <button className="btn-secondary" type="button" onClick={() => setShowAll(true)}>
                  查看全部 {totalMatched} 個吉日
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
