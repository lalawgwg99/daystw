"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildMonthGrid, getDayDetail, shiftDate, type CalendarDay } from "../lib/calendar";
import { formatSolarDate } from "../lib/finder";
import { getHourDetails } from "../lib/hours";
import AlmanacCalendar from "./AlmanacCalendar";
import AlmanacDetailPanel from "./AlmanacDetailPanel";
import AlmanacHourSection from "./AlmanacHourSection";
import UpcomingFestivalsStrip from "./UpcomingFestivalsStrip";

type Props = {
  initialDate?: Date;
};

export default function TodayBanner({ initialDate }: Props) {
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(initialDate ?? today);
  const [viewYear, setViewYear] = useState((initialDate ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((initialDate ?? today).getMonth() + 1);

  const currentIso = formatSolarDate(currentDate);
  const todayIso = formatSolarDate(today);
  const isToday = currentIso === todayIso;

  const detail = useMemo(
    () =>
      getDayDetail(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
      ),
    [currentDate],
  );

  const hourDetails = useMemo(
    () =>
      getHourDetails(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
      ),
    [currentDate],
  );

  const viewDetail = useMemo(() => getDayDetail(viewYear, viewMonth, 15), [viewYear, viewMonth]);

  useEffect(() => {
    setViewYear(currentDate.getFullYear());
    setViewMonth(currentDate.getMonth() + 1);
  }, [currentDate]);

  function shift(delta: number) {
    setCurrentDate(shiftDate(currentDate, delta));
  }

  function selectCell(cell: CalendarDay) {
    setCurrentDate(cell.date);
    if (!cell.inMonth) {
      setViewYear(cell.date.getFullYear());
      setViewMonth(cell.date.getMonth() + 1);
    }
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      requestAnimationFrame(() => {
        document.getElementById("calendar-detail-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function goToday() {
    setCurrentDate(today);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth() + 1);
  }

  function prevMonth() {
    if (viewMonth === 1) {
      setViewYear((y) => y - 1);
      setViewMonth(12);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1);
      setViewMonth(1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  return (
    <section aria-labelledby="today-heading" className="almanac-dashboard" id="calendar">
      <div className="almanac-day-nav">
        <button aria-label="前一天" className="icon-btn ghost" type="button" onClick={() => shift(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div className="almanac-day-nav-center">
          <p className="almanac-day-nav-eyebrow">{isToday ? "今日黃曆" : "黃曆查詢"}</p>
          <h1 className="almanac-day-nav-title" id="today-heading">
            {currentDate.getFullYear()}/{currentDate.getMonth() + 1}/{currentDate.getDate()}（{detail.weekdayLabel}）
          </h1>
        </div>
        <button aria-label="後一天" className="icon-btn ghost" type="button" onClick={() => shift(1)}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="almanac-layout">
        <AlmanacCalendar
          currentIso={currentIso}
          detail={detail}
          isToday={isToday}
          todayIso={todayIso}
          viewMonth={viewMonth}
          viewYear={viewYear}
          yearPillar={viewDetail.yearGanZhi}
          yearShengXiao={viewDetail.yearShengXiao}
          onGoToday={goToday}
          onNextMonth={nextMonth}
          onPrevMonth={prevMonth}
          onSelectCell={selectCell}
          onViewMonthChange={setViewMonth}
          onViewYearChange={setViewYear}
        />
        <AlmanacDetailPanel currentDate={currentDate} detail={detail} />
      </div>

      <AlmanacHourSection hours={hourDetails} />
      <UpcomingFestivalsStrip />

      <div className="almanac-actions">
        <a className="btn-primary inline-link" href="#finder">
          找這個月的吉日
        </a>
        <a className="btn-secondary inline-link" href="#glossary">
          民俗百科
        </a>
      </div>
    </section>
  );
}
