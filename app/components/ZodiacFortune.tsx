"use client";

import { useMemo, useState } from "react";
import { getAllZodiacFortunes, zodiacList } from "../data/zodiac-fortune";
import { formatSolarDate } from "../lib/finder";
import { storage } from "../lib/storage";
import ZodiacIcon from "./ZodiacIcon";

export default function ZodiacFortune() {
  const today = formatSolarDate(new Date());
  const settings = storage.getSettings();
  const [selected, setSelected] = useState(settings.myZodiac || "鼠");

  const fortunes = useMemo(() => getAllZodiacFortunes(today), [today]);
  const active = fortunes.find((f) => f.zodiac === selected) ?? fortunes[0];

  return (
    <div className="zodiac-panel">
      <p className="section-desc subtle">{today} · 離線決定式</p>
      <div className="zodiac-chips scroll-x">
        {zodiacList.map((zodiac) => (
          <button
            className={`purpose-chip zodiac-chip ${selected === zodiac ? "active" : ""}`}
            key={zodiac}
            type="button"
            onClick={() => setSelected(zodiac)}
          >
            <ZodiacIcon zodiac={zodiac} size={18} />
            {zodiac}
          </button>
        ))}
      </div>

      {active && (
        <div className="fortune-card">
          <div className="date-topline">
            <span>運勢指數</span>
            <strong>{active.score} 分</strong>
          </div>
          <h3>
            <ZodiacIcon zodiac={active.zodiac} size={22} />
            {active.zodiac} — 今日運勢
          </h3>
          <p>{active.summary}</p>
          <p className="fortune-tip">小提示：{active.tip}</p>
        </div>
      )}
    </div>
  );
}
