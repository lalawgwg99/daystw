"use client";

import { useMemo } from "react";
import { festivalCategoryLabels, getUpcomingFestivals } from "../data/festivals";

export default function UpcomingFestivalsStrip() {
  const year = new Date().getFullYear();
  const upcoming = useMemo(() => getUpcomingFestivals(year, new Date(), 5), [year]);

  if (upcoming.length === 0) return null;

  return (
    <section aria-labelledby="upcoming-festivals-title" className="upcoming-festivals-strip">
      <div className="upcoming-festivals-head">
        <h2 id="upcoming-festivals-title">即將到來的節日</h2>
        <a className="inline-link subtle" href="#festival">
          查看全部
        </a>
      </div>
      <div className="upcoming-festivals-scroll scroll-x">
        {upcoming.map((festival) => (
          <a className="upcoming-festival-card" href="#festival" key={festival.id + festival.solar}>
            <span className="upcoming-festival-date">{festival.solar.slice(5).replace("-", "/")}</span>
            <strong>{festival.name}</strong>
            <span className={`festival-tag tag-${festival.category} small`}>
              {festivalCategoryLabels[festival.category]}
            </span>
            <span className="upcoming-festival-lunar">{festival.lunar}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
