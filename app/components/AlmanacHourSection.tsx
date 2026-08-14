"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { HourDetail } from "../lib/hours";

type Props = {
  hours: HourDetail[];
};

function joinTerms(items: string[]): string {
  return items.length > 0 ? items.join("、") : "—";
}

export default function AlmanacHourSection({ hours }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(window.innerWidth >= 900);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && typeof window !== "undefined" && window.innerWidth < 768) {
      requestAnimationFrame(() => {
        document.getElementById("hour-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  return (
    <section aria-labelledby="hour-heading" className="almanac-hours">
      <button
        aria-controls="hour-panel"
        aria-expanded={open}
        className="almanac-hours-toggle"
        id="hour-heading"
        type="button"
        onClick={toggle}
      >
        當日時辰吉凶
        <ChevronDown className={open ? "open" : ""} size={18} />
      </button>
      {open && (
        <div className="almanac-hour-list" id="hour-panel">
          {hours.map((hour) => (
            <article
              className={`almanac-hour-card ${hour.isAuspicious ? "auspicious" : ""}`}
              key={hour.ganZhi}
            >
              <header className="almanac-hour-head">
                <div className="almanac-hour-branch">
                  {hour.isAuspicious && <span className="almanac-hour-badge">吉時</span>}
                  <strong>{hour.branch}</strong>
                  <span className="almanac-hour-range">{hour.timeRange}</span>
                </div>
                <span className={`almanac-hour-luck ${hour.isAuspicious ? "good" : "bad"}`}>
                  {hour.luck}
                </span>
              </header>
              <dl className="almanac-hour-meta">
                <div>
                  <dt>宜</dt>
                  <dd>{joinTerms(hour.yi)}</dd>
                </div>
                <div>
                  <dt>忌</dt>
                  <dd>{joinTerms(hour.ji)}</dd>
                </div>
                <div>
                  <dt>沖</dt>
                  <dd>{hour.clash || "—"}</dd>
                </div>
                <div>
                  <dt>煞</dt>
                  <dd>{hour.sha ? `${hour.sha}方` : "—"}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
