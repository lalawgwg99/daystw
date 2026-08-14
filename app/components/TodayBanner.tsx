"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  solarDate: string;
  lunarText: string;
  yi: string[];
  clash: string;
  sha: string;
  tai: string;
  pengGan: string;
};

export default function TodayBanner({
  solarDate,
  lunarText,
  yi,
  clash,
  sha,
  tai,
  pengGan,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="today-banner" id="calendar">
      <button
        aria-expanded={open}
        className="today-banner-main"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <CalendarDays size={18} />
        <div className="today-banner-text">
          <strong>今日 {solarDate}</strong>
          <span>
            {lunarText}
            {yi.length > 0 && ` · 宜 ${yi.slice(0, 4).join("、")}`}
          </span>
        </div>
        <ChevronDown className={open ? "rotated" : ""} size={18} />
      </button>

      {open && (
        <div className="today-banner-detail">
          <div className="tag-row compact">
            {yi.map((item) => (
              <span className="good-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
          <dl className="compact-dl">
            <div>
              <dt>沖煞</dt>
              <dd>
                {clash} 煞{sha}
              </dd>
            </div>
            <div>
              <dt>胎神</dt>
              <dd>{tai}</dd>
            </div>
            <div>
              <dt>彭祖</dt>
              <dd>{pengGan}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
