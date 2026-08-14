"use client";

import { CheckCircle2, Clock3, Tags } from "lucide-react";
import { useMemo, useState } from "react";
import {
  countFestivalsByCategory,
  festivalCategoryLabels,
  filterFestivalsByCategory,
  getUpcomingFestivals,
  resolveFestivalsForYear,
  type FestivalCategory,
  type ResolvedFestival,
} from "../data/festivals";

const categoryOrder: (FestivalCategory | "")[] = ["", "folk", "deity", "worship", "jieqi", "national"];

function FestivalCard({ festival }: { festival: ResolvedFestival }) {
  return (
    <article className="festival-card compact">
      <div className="date-topline">
        <span>{festival.solar}</span>
        <strong>{festival.lunar}</strong>
      </div>
      <div className="festival-card-head">
        <span className={`festival-tag tag-${festival.category}`}>
          {festivalCategoryLabels[festival.category]}
        </span>
        <h3>{festival.name}</h3>
      </div>
      {festival.deity && (
        <p className="festival-deity">主祀／相關：{festival.deity}</p>
      )}
      <p>{festival.intent}</p>
      <div className="mini-list">
        <span>
          <Clock3 size={15} />
          {festival.time}
        </span>
        {festival.offering !== "—" && (
          <span>
            <CheckCircle2 size={15} />
            {festival.offering}
          </span>
        )}
        {festival.caution !== "—" && (
          <span>
            <Tags size={15} />
            {festival.caution}
          </span>
        )}
      </div>
    </article>
  );
}

export default function FestivalSection() {
  const year = new Date().getFullYear();
  const [category, setCategory] = useState<FestivalCategory | "">("");
  const [view, setView] = useState<"upcoming" | "all">("upcoming");
  const [showAll, setShowAll] = useState(false);

  const counts = useMemo(() => countFestivalsByCategory(year), [year]);

  const festivals = useMemo(() => {
    const base =
      view === "upcoming"
        ? getUpcomingFestivals(year)
        : resolveFestivalsForYear(year);
    const filtered = filterFestivalsByCategory(base, category);
    const displayLimit = showAll || view === "all" ? filtered.length : 12;
    return { list: filtered.slice(0, displayLimit), total: filtered.length };
  }, [year, category, view, showAll]);

  const totalYear = resolveFestivalsForYear(year).length;

  return (
    <section className="section-block band" id="festival">
      <div className="section-inner">
        <header className="section-head-block">
          <h2 className="section-title">節日專區</h2>
          <p className="section-desc">
            {year} 年共整理 <strong>{totalYear}</strong> 個節慶與拜拜日（民俗、神明誕辰、初一十五、節氣、國定假日），依農曆自動換算國曆日期。
          </p>
        </header>

        <div className="festival-toolbar">
          <div className="view-toggle">
            <button
              className={`purpose-chip small ${view === "upcoming" ? "active" : ""}`}
              type="button"
              onClick={() => {
                setView("upcoming");
                setShowAll(false);
              }}
            >
              即將到來
            </button>
            <button
              className={`purpose-chip small ${view === "all" ? "active" : ""}`}
              type="button"
              onClick={() => {
                setView("all");
                setShowAll(true);
              }}
            >
              全年一覽
            </button>
          </div>
        </div>

        <div className="festival-filters scroll-x">
          {categoryOrder.map((key) => {
            const label = key === "" ? `全部 (${totalYear})` : `${festivalCategoryLabels[key]} (${counts[key]})`;
            return (
              <button
                className={`purpose-chip small ${category === key ? "active" : ""}`}
                key={key || "all"}
                type="button"
                onClick={() => {
                  setCategory(key);
                  setShowAll(false);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {festivals.list.length === 0 ? (
          <div className="empty-state compact">此分類沒有符合的節日，試試其他分類。</div>
        ) : (
          <div className="festival-grid">
            {festivals.list.map((festival) => (
              <FestivalCard festival={festival} key={festival.id + festival.solar} />
            ))}
          </div>
        )}

        {festivals.total > festivals.list.length && (
          <div className="form-actions center">
            <button className="btn-secondary" type="button" onClick={() => setShowAll(true)}>
              查看全部 {festivals.total} 個節日
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
