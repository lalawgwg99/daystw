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
  const [open, setOpen] = useState(true);

  const detail = useMemo(() => {
    return getDayDetail(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );
  }, [currentDate]);

  const solarDate = formatSolarDate(currentDate);
  const isToday = solarDate === formatSolarDate(new Date());
  const weekday = ["日", "一", "二", "三", "四", "五", "六"][currentDate.getDay()];

  function shift(delta: number) {
    setCurrentDate(shiftDate(currentDate, delta));
  }

  return (
    <div className="today-hero" id="calendar">
      <div className="today-hero-nav">
        <button aria-label="前一天" className="icon-btn ghost" type="button" onClick={() => shift(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div className="today-hero-center">
          <span className="today-hero-label">{isToday ? "今日黃曆" : "黃曆"}</span>
          <div className="today-hero-date">
            <strong>{solarDate}</strong>
            <span>週{weekday}</span>
          </div>
          <p className="today-hero-lunar">{detail.lunarText}</p>
        </div>
        <button aria-label="後一天" className="icon-btn ghost" type="button" onClick={() => shift(1)}>
          <ChevronRight size={20} />
        </button>
      </div>

      {detail.holidayName && <p className="holiday-badge center">{detail.holidayName}</p>}

      <div className="today-hero-yi">
        {detail.yiExplained.slice(0, 6).map(({ term, plain }) => (
          <TermTooltip key={term} plain={plain} term={term}>
            <span className="good-tag">{term}</span>
          </TermTooltip>
        ))}
      </div>

      <button
        aria-expanded={open}
        className="today-hero-toggle"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <CalendarDays size={16} />
        {open ? "收合詳情" : "查看沖煞、胎神"}
        <ChevronDown className={open ? "rotated" : ""} size={16} />
      </button>

      {open && (
        <dl className="compact-dl today-hero-detail">
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
            <dd>
              {detail.pengGan}；{detail.pengZhi}
            </dd>
          </div>
          {detail.badReasons.length > 0 && (
            <div>
              <dt>凶日提示</dt>
              <dd>{detail.badReasons.join("、")}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
