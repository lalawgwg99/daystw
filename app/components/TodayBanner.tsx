"use client";

import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { getDayDetail, shiftDate } from "../lib/calendar";
import { formatSolarDate } from "../lib/finder";
import TermTooltip from "./TermTooltip";

type Props = {
  initialDate?: Date;
};

export default function TodayBanner({ initialDate }: Props) {
  const [currentDate, setCurrentDate] = useState(initialDate ?? new Date());
  const [open, setOpen] = useState(false);

  const detail = useMemo(() => {
    return getDayDetail(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );
  }, [currentDate]);

  const solarDate = formatSolarDate(currentDate);
  const isToday = solarDate === formatSolarDate(new Date());
  const label = isToday ? "今日" : solarDate;

  function shift(delta: number) {
    setCurrentDate(shiftDate(currentDate, delta));
  }

  return (
    <div className="today-banner" id="calendar">
      <div className="today-banner-nav">
        <button aria-label="前一天" className="icon-btn" type="button" onClick={() => shift(-1)}>
          <ChevronLeft size={18} />
        </button>
        <button
          aria-expanded={open}
          className="today-banner-main"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <CalendarDays size={18} />
          <div className="today-banner-text">
            <strong>
              {label} {solarDate}
            </strong>
            <span>
              {detail.lunarText}
              {detail.yi.length > 0 && ` · 宜 ${detail.yi.slice(0, 4).join("、")}`}
            </span>
          </div>
          <ChevronDown className={open ? "rotated" : ""} size={18} />
        </button>
        <button aria-label="後一天" className="icon-btn" type="button" onClick={() => shift(1)}>
          <ChevronRight size={18} />
        </button>
      </div>

      {open && (
        <div className="today-banner-detail">
          {detail.holidayName && (
            <p className="holiday-badge">{detail.holidayName}</p>
          )}
          <div className="tag-row compact">
            {detail.yiExplained.map(({ term, plain }) => (
              <TermTooltip key={term} plain={plain} term={term}>
                <span className="good-tag">{term}</span>
              </TermTooltip>
            ))}
          </div>
          <dl className="compact-dl">
            <div>
              <dt>沖煞</dt>
              <dd>
                {detail.clash} 煞{detail.sha}
              </dd>
            </div>
            <div>
              <dt>胎神</dt>
              <dd>{detail.tai}</dd>
            </div>
            <div>
              <dt>彭祖</dt>
              <dd>{detail.pengGan}；{detail.pengZhi}</dd>
            </div>
            {detail.badReasons.length > 0 && (
              <div>
                <dt>凶日提示</dt>
                <dd>{detail.badReasons.join("、")}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
