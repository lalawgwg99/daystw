"use client";

import { CalendarHeart, Flame, Sparkles, Sun } from "lucide-react";
import { useMemo } from "react";
import {
  festivalCategoryLabels,
  getUpcomingFestivals,
  type FestivalCategory,
} from "../data/festivals";

const categoryIcons: Record<FestivalCategory, typeof Sparkles> = {
  folk: Sparkles,
  deity: Flame,
  worship: CalendarHeart,
  jieqi: Sun,
  national: CalendarHeart,
};

export default function UpcomingFestivalsStrip() {
  const year = new Date().getFullYear();
  const upcoming = useMemo(() => getUpcomingFestivals(year, new Date(), 5), [year]);

  if (upcoming.length === 0) return null;

  return (
    <section aria-labelledby="upcoming-festivals-title" className="upcoming-festivals-strip">
      <div className="upcoming-festivals-head">
        <h2 id="upcoming-festivals-title">
          <CalendarHeart aria-hidden size={18} />
          即將到來的節日
        </h2>
        <a className="inline-link subtle" href="#festival">
          查看全部
        </a>
      </div>
      <div className="upcoming-festivals-scroll scroll-x">
        {upcoming.map((festival) => {
          const Icon = categoryIcons[festival.category];
          return (
            <a className="upcoming-festival-card" href="#festival" key={festival.id + festival.solar}>
              <span className="upcoming-festival-icon">
                <Icon aria-hidden size={18} />
              </span>
              <span className="upcoming-festival-date">{festival.solar.slice(5).replace("-", "/")}</span>
              <strong>{festival.name}</strong>
              <span className={`festival-tag tag-${festival.category} small`}>
                {festivalCategoryLabels[festival.category]}
              </span>
              <span className="upcoming-festival-lunar">{festival.lunar}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
