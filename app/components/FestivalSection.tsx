"use client";

import { CheckCircle2, Clock3, Tags } from "lucide-react";
import { useMemo } from "react";
import { getUpcomingFestivals } from "../data/festivals";

export default function FestivalSection() {
  const year = new Date().getFullYear();
  const festivals = useMemo(() => getUpcomingFestivals(year), [year]);

  return (
    <section className="section-block band" id="festival">
      <div className="section-inner">
        <header className="section-head-block">
          <h2 className="section-title">節日專區</h2>
          <p className="section-desc">依農曆自動換算 {year} 年節慶，含拜拜時間與供品建議。</p>
        </header>
        <div className="festival-grid">
          {festivals.map((festival) => (
            <article className="festival-card compact" key={festival.id}>
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
  );
}
