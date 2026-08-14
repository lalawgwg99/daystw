"use client";

import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { getAllZodiacFortunes, zodiacList } from "../data/zodiac-fortune";
import { formatSolarDate } from "../lib/finder";
import { storage } from "../lib/storage";

export default function ZodiacFortune() {
  const today = formatSolarDate(new Date());
  const settings = storage.getSettings();
  const [selected, setSelected] = useState(settings.myZodiac || "鼠");

  const fortunes = useMemo(() => getAllZodiacFortunes(today), [today]);
  const active = fortunes.find((f) => f.zodiac === selected) ?? fortunes[0];

  return (
    <div className="zodiac-fortune">
      <div className="service-module-head">
        <Sparkles size={20} />
        <div>
          <strong>今日生肖運勢</strong>
          <p>{today} · 離線決定式，同一天結果一致</p>
        </div>
      </div>

      <div className="zodiac-chips">
        {zodiacList.map((zodiac) => (
          <button
            className={`purpose-chip ${selected === zodiac ? "active" : ""}`}
            key={zodiac}
            type="button"
            onClick={() => setSelected(zodiac)}
          >
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
          <h3>{active.zodiac} — 今日運勢</h3>
          <p>{active.summary}</p>
          <p className="fortune-tip">小提示：{active.tip}</p>
        </div>
      )}
    </div>
  );
}
