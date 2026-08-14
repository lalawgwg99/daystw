"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { buildMonthGrid, getDayDetail, type CalendarDay } from "../lib/calendar";
import { formatSolarDate } from "../lib/finder";
import TermTooltip from "./TermTooltip";

type Props = {
  initialYear?: number;
  initialMonth?: number;
  onSelectDate?: (iso: string) => void;
};

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

export default function MonthCalendar({ initialYear, initialMonth, onSelectDate }: Props) {
  const today = new Date();
  const [year, setYear] = useState(initialYear ?? today.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? today.getMonth() + 1);
  const [selectedIso, setSelectedIso] = useState(formatSolarDate(today));

  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const selectedDetail = useMemo(() => {
    const [y, m, d] = selectedIso.split("-").map(Number);
    return getDayDetail(y, m, d);
  }, [selectedIso]);

  function prevMonth() {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function handleSelect(cell: CalendarDay) {
    setSelectedIso(cell.iso);
    onSelectDate?.(cell.iso);
    if (!cell.inMonth) {
      setYear(cell.date.getFullYear());
      setMonth(cell.date.getMonth() + 1);
    }
  }

  return (
    <div className="month-calendar">
      <div className="calendar-toolbar">
        <button aria-label="上個月" className="icon-btn" type="button" onClick={prevMonth}>
          <ChevronLeft size={18} />
        </button>
        <strong>
          {year} 年 {month} 月
        </strong>
        <button aria-label="下個月" className="icon-btn" type="button" onClick={nextMonth}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((cell) => {
          const isToday = cell.iso === formatSolarDate(today);
          const isSelected = cell.iso === selectedIso;
          return (
            <button
              className={`calendar-cell ${cell.inMonth ? "" : "other-month"} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${cell.isHoliday ? "holiday" : ""} ${cell.isHuangDao ? "huangdao" : ""} ${cell.isBadDay ? "bad-day" : ""}`}
              key={cell.iso}
              type="button"
              onClick={() => handleSelect(cell)}
            >
              <span className="cell-solar">{cell.day}</span>
              <span className="cell-lunar">{cell.jieQi || cell.lunarDay}</span>
              {cell.holidayName && <span className="cell-holiday">{cell.holidayName.slice(0, 4)}</span>}
              {cell.isMakeup && <span className="cell-makeup">補班</span>}
            </button>
          );
        })}
      </div>

      <div className="calendar-legend">
        <span><i className="dot huangdao" />黃道</span>
        <span><i className="dot holiday" />國定假日</span>
        <span><i className="dot bad" />凶日</span>
      </div>

      <div className="calendar-detail">
        <div className="date-topline">
          <span>{selectedDetail.iso}</span>
          {selectedDetail.holidayName && <strong>{selectedDetail.holidayName}</strong>}
        </div>
        <p>{selectedDetail.lunarText}{selectedDetail.jieQi ? ` · ${selectedDetail.jieQi}` : ""}</p>
        <div className="tag-row compact">
          {selectedDetail.yiExplained.slice(0, 6).map(({ term, plain }) => (
            <TermTooltip key={term} plain={plain} term={term}>
              <span className="good-tag">{term}</span>
            </TermTooltip>
          ))}
        </div>
        <dl className="compact-dl">
          <div>
            <dt>沖煞</dt>
            <dd>{selectedDetail.clash} 煞{selectedDetail.sha}</dd>
          </div>
          {selectedDetail.badReasons.length > 0 && (
            <div>
              <dt>凶日提示</dt>
              <dd>{selectedDetail.badReasons.join("、")}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
