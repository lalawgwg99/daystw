"use client";

import { useMemo, useState } from "react";
import { getDayDetail } from "../lib/calendar";
import { findSolarForLunar, formatSolarDate } from "../lib/finder";

type Mode = "solar-to-lunar" | "lunar-to-solar";

export default function LunarConverter() {
  const today = new Date();
  const [mode, setMode] = useState<Mode>("solar-to-lunar");
  const [solarYear, setSolarYear] = useState(today.getFullYear());
  const [solarMonth, setSolarMonth] = useState(today.getMonth() + 1);
  const [solarDay, setSolarDay] = useState(today.getDate());
  const [lunarYear, setLunarYear] = useState(today.getFullYear());
  const [lunarMonth, setLunarMonth] = useState(7);
  const [lunarDay, setLunarDay] = useState(1);

  const solarResult = useMemo(
    () => getDayDetail(solarYear, solarMonth, solarDay),
    [solarYear, solarMonth, solarDay],
  );

  const lunarToSolarIso = useMemo(
    () => findSolarForLunar(lunarYear, lunarMonth, lunarDay),
    [lunarYear, lunarMonth, lunarDay],
  );

  const lunarResult = useMemo(() => {
    if (!lunarToSolarIso) return null;
    const [y, m, d] = lunarToSolarIso.split("-").map(Number);
    return getDayDetail(y, m, d);
  }, [lunarToSolarIso]);

  return (
    <section className="section-block" id="converter">
      <div className="section-inner">
        <header className="section-head-block">
          <h2 className="section-title">國農曆轉換</h2>
          <p className="section-desc">輸入國曆或農曆日期，立即換算干支、生肖與對應日期。</p>
        </header>

        <div className="converter-mode-toggle">
          <button
            className={`purpose-chip small ${mode === "solar-to-lunar" ? "active" : ""}`}
            type="button"
            onClick={() => setMode("solar-to-lunar")}
          >
            國曆 → 農曆
          </button>
          <button
            className={`purpose-chip small ${mode === "lunar-to-solar" ? "active" : ""}`}
            type="button"
            onClick={() => setMode("lunar-to-solar")}
          >
            農曆 → 國曆
          </button>
        </div>

        {mode === "solar-to-lunar" ? (
          <div className="converter-panel">
            <div className="converter-inputs">
              <label>
                國曆日期
                <input
                  type="date"
                  value={formatSolarDate(new Date(solarYear, solarMonth - 1, solarDay))}
                  onChange={(e) => {
                    const [y, m, d] = e.target.value.split("-").map(Number);
                    setSolarYear(y);
                    setSolarMonth(m);
                    setSolarDay(d);
                  }}
                />
              </label>
            </div>
            <div className="converter-result">
              <p>
                <strong>農曆</strong> {solarResult.lunarText}
              </p>
              <p>
                <strong>干支</strong> {solarResult.pillarsText}
              </p>
              <p>
                <strong>宜</strong> {solarResult.yi.slice(0, 6).join("、") || "—"}
              </p>
            </div>
          </div>
        ) : (
          <div className="converter-panel">
            <div className="converter-inputs grid-3">
              <label>
                農曆年（國曆年）
                <input
                  max={2035}
                  min={2024}
                  type="number"
                  value={lunarYear}
                  onChange={(e) => setLunarYear(Number(e.target.value))}
                />
              </label>
              <label>
                農曆月
                <input
                  max={12}
                  min={1}
                  type="number"
                  value={lunarMonth}
                  onChange={(e) => setLunarMonth(Number(e.target.value))}
                />
              </label>
              <label>
                農曆日
                <input
                  max={30}
                  min={1}
                  type="number"
                  value={lunarDay}
                  onChange={(e) => setLunarDay(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="converter-result">
              {lunarResult ? (
                <>
                  <p>
                    <strong>國曆</strong> {lunarToSolarIso}
                  </p>
                  <p>
                    <strong>農曆</strong> {lunarResult.lunarText}
                  </p>
                  <p>
                    <strong>干支</strong> {lunarResult.pillarsText}
                  </p>
                </>
              ) : (
                <p className="today-empty-note">此農曆日期在 {lunarYear} 年找不到對應國曆，請確認閏月或日期。</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
