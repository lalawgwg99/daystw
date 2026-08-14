"use client";

import { CalendarPlus, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { useMemo } from "react";
import { buildMonthGrid, type CalendarDay } from "../lib/calendar";
import { formatSolarDate, monthOptions, yearOptions } from "../lib/finder";
import { downloadDayIcs, shareDay } from "../lib/useDayActions";
import type { DayDetail } from "../lib/calendar";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

type Props = {
  viewYear: number;
  viewMonth: number;
  currentIso: string;
  todayIso: string;
  isToday: boolean;
  yearPillar: string;
  yearShengXiao: string;
  detail: DayDetail;
  onViewYearChange: (year: number) => void;
  onViewMonthChange: (month: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectCell: (cell: CalendarDay) => void;
  onGoToday: () => void;
};

export default function AlmanacCalendar({
  viewYear,
  viewMonth,
  currentIso,
  todayIso,
  isToday,
  yearPillar,
  yearShengXiao,
  detail,
  onViewYearChange,
  onViewMonthChange,
  onPrevMonth,
  onNextMonth,
  onSelectCell,
  onGoToday,
}: Props) {
  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  return (
    <div className="almanac-calendar">
      <div className="almanac-year-pillar">
        <span className="almanac-year-pillar-text">
          {yearPillar}［{yearShengXiao}］
        </span>
        <div className="almanac-month-selects">
          <select
            aria-label="選擇年份"
            value={viewYear}
            onChange={(e) => onViewYearChange(Number(e.target.value))}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year} 年
              </option>
            ))}
          </select>
          <select
            aria-label="選擇月份"
            value={viewMonth}
            onChange={(e) => onViewMonthChange(Number(e.target.value))}
          >
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="almanac-month-toolbar compact">
        <button aria-label="上個月" className="icon-btn ghost" type="button" onClick={onPrevMonth}>
          <ChevronLeft size={18} />
        </button>
        <button
          className="btn-primary almanac-back-today compact"
          disabled={isToday}
          type="button"
          onClick={onGoToday}
        >
          {isToday ? "今日" : "返回今日"}
        </button>
        <button aria-label="下個月" className="icon-btn ghost" type="button" onClick={onNextMonth}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="almanac-weekdays">
        {WEEKDAYS.map((day, index) => (
          <span className={index === 0 || index === 6 ? "weekend-head" : ""} key={day}>
            {day}
          </span>
        ))}
      </div>

      <div className="almanac-grid">
        {cells.map((cell) => {
          const cellToday = cell.iso === todayIso;
          const cellSelected = cell.iso === currentIso;
          const label = cell.jieQi || cell.lunarDay;
          return (
            <button
              aria-label={`${cell.iso} ${cell.dayGanZhi}${cell.dayShengXiao}`}
              aria-pressed={cellSelected}
              className={`almanac-cell ${cell.inMonth ? "" : "other-month"} ${cellToday ? "today" : ""} ${cellSelected ? "selected" : ""} ${cell.isHoliday ? "holiday" : ""} ${cell.isWeekend ? "weekend" : ""}`}
              key={cell.iso}
              type="button"
              onClick={() => onSelectCell(cell)}
            >
              <span className="almanac-cell-solar-wrap">
                <span className="almanac-cell-solar">{cellToday ? "今" : cell.day}</span>
              </span>
              <span className="almanac-cell-lunar">{label}</span>
              <span className="almanac-cell-ganzhi">
                {cell.dayGanZhi} {cell.dayShengXiao}
              </span>
              {cell.holidayName && <span className="almanac-cell-event">{cell.holidayName}</span>}
            </button>
          );
        })}
      </div>

      <div className="almanac-calendar-tools">
        <button className="icon-action" type="button" onClick={() => shareDay(detail)}>
          <Share2 size={16} />
          分享
        </button>
        <button className="icon-action" type="button" onClick={() => downloadDayIcs(detail)}>
          <CalendarPlus size={16} />
          加入行事曆
        </button>
      </div>
    </div>
  );
}
