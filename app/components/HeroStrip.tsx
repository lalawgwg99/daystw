"use client";

import { purposeOptions } from "../lib/finder";

export default function HeroStrip() {
  return (
    <section aria-label="網站簡介" className="hero-strip compact">
      <p className="hero-compact-text">
        台灣繁體 · 免費無廣告 · 農民曆宜忌、擇日、節慶拜拜一站查詢
      </p>
      <div aria-label="快速選用途" className="hero-quick-links" role="navigation">
        {purposeOptions.slice(0, 6).map((p) => (
          <a className="hero-chip" href="#finder" key={p.value}>
            {p.shortLabel}
          </a>
        ))}
      </div>
    </section>
  );
}
