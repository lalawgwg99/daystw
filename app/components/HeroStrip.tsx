"use client";

import { purposeOptions } from "../lib/finder";

export default function HeroStrip() {
  return (
    <section className="hero-strip" id="top">
      <p className="hero-eyebrow">台灣繁體 · 免費 · 無廣告</p>
      <h1 className="hero-title">今天適合做什麼？吉日一次查清楚</h1>
      <p className="hero-desc">
        農民曆宜忌、搬家結婚擇日、節慶拜拜與廟宇推薦，長輩也能輕鬆上手。
      </p>
      <div aria-label="快速選用途" className="hero-quick-links" role="navigation">
        {purposeOptions.slice(0, 6).map((p) => (
          <a className="hero-chip" href={`#finder`} key={p.value}>
            {p.shortLabel}
          </a>
        ))}
      </div>
    </section>
  );
}
