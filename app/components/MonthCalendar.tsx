"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { buildMonthGrid, getDayDetail, type CalendarDay } from "../lib/calendar";
import { formatSolarDate } from "../lib/finder";
import { getAuspiciousHours } from "../lib/hours";
import ClashExplain from "./ClashExplain";
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
  const monthStats = useMemo(() => {
    const inMonth = cells.filter((c) => c.inMonth);
    return {
      holidays: inMonth.filter((c) => c.isHoliday).length,
      huangdao: inMonth.filter((c) => c.isHuangDao).length,
      bad: inMonth.filter((c) => c.isBadDay).length,
    };
  }, [cells]);

  const selectedDetail = useMemo(() => {
    const [y, m, d] = selectedIso.split("-").map(Number);
    return getDayDetail(y, m, d);
  }, [selectedIso]);

  const selectedHours = useMemo(() => {
    const [y, m, d] = selectedIso.split("-").map(Number);
    return getAuspiciousHours(y, m, d, 4);
  }, [selectedIso]);

  const selectedDate = useMemo(() => {
    const [y, m, d] = selectedIso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [selectedIso]);

  const selectedWeekday = ["日", "一", "二", "三", "四", "五", "六"][selectedDate.getDay()];

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

  function goToday() {
    const iso = formatSolarDate(today);
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setSelectedIso(iso);
    onSelectDate?.(iso);
  }

  return (
    <div className="month-calendar">
      <div className="calendar-toolbar">
        <button aria-label="上個月" className="icon-btn" type="button" onClick={prevMonth}>
          <ChevronLeft size={18} />
        </button>
        <div className="calendar-toolbar-center">
          <strong>
            {year} 年 {month} 月
          </strong>
          <p className="calendar-month-summary">
            本月 {monthStats.holidays} 個國定假日 · {monthStats.huangdao} 個黃道日 · {monthStats.bad} 個凶日
          </p>
        </div>
        <button aria-label="下個月" className="icon-btn" type="button" onClick={nextMonth}>
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="calendar-hint">點選任一天，右側會顯示完整宜忌、吉時與沖煞。</p>

      <div className="month-calendar-layout">
        <div className="month-calendar-grid-wrap">
          <div className="calendar-weekdays">
            {WEEKDAYS.map((day, index) => (
              <span className={index === 0 || index === 6 ? "weekend-head" : ""} key={day}>
                {day}
              </span>
            ))}
          </div>

          <div className="calendar-grid">
            {cells.map((cell) => {
              const isToday = cell.iso === formatSolarDate(today);
              const isSelected = cell.iso === selectedIso;
              return (
                <button
                  aria-label={`${cell.iso} 農曆${cell.lunarDay}${cell.yiPreview.length ? ` 宜${cell.yiPreview.join("、")}` : ""}`}
                  aria-pressed={isSelected}
                  className={`calendar-cell ${cell.inMonth ? "" : "other-month"} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${cell.isHoliday ? "holiday" : ""} ${cell.isHuangDao ? "huangdao" : ""} ${cell.isBadDay ? "bad-day" : ""} ${cell.isWeekend ? "weekend" : ""}`}
                  key={cell.iso}
                  type="button"
                  onClick={() => handleSelect(cell)}
                >
                  <div className="cell-head">
                    <span className="cell-solar">{cell.day}</span>
                    <span className={`cell-badge ${cell.isHuangDao ? "good" : "neutral"}`}>
                      {cell.isHuangDao ? "吉" : "平"}
                    </span>
                  </div>
                  <span className="cell-lunar">{cell.jieQi || cell.lunarDay}</span>
                  {cell.yiPreview.length > 0 && (
                    <span className="cell-yi">宜 {cell.yiPreview.join("、")}</span>
                  )}
                  {cell.clashZodiac && (
                    <span className="cell-clash">沖{cell.clashZodiac}</span>
                  )}
                  {cell.jiPreview.length > 0 && (
                    <span className="cell-ji">忌 {cell.jiPreview[0]}</span>
                  )}
                  {cell.holidayName && <span className="cell-holiday">{cell.holidayName}</span>}
                  {cell.isMakeup && <span className="cell-makeup">補班</span>}
                  {cell.isBadDay && !cell.holidayName && <span className="cell-bad-tag">凶</span>}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span>
              <i className="dot huangdao" />
              黃道吉日
            </span>
            <span>
              <i className="dot holiday" />
              國定假日
            </span>
            <span>
              <i className="dot bad" />
              凶日
            </span>
            <span>
              <i className="dot yi" />
              格子內「宜」為當日宜事
            </span>
          </div>
        </div>

        <aside aria-labelledby="calendar-detail-title" className="calendar-detail-panel">
          <div className="calendar-detail-head">
            <div>
              <p className="calendar-detail-eyebrow">選取日期</p>
              <h3 id="calendar-detail-title">
                {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 週{selectedWeekday}
              </h3>
              <p className="calendar-detail-solar">{selectedDetail.iso}</p>
            </div>
            <button className="btn-secondary small-btn" type="button" onClick={goToday}>
              回到今天
            </button>
          </div>

          <p className="calendar-detail-lunar">{selectedDetail.lunarText}</p>

          <div className="today-dashboard-badges compact">
            <span className={`day-type-badge ${selectedDetail.isHuangDao ? "huangdao" : "heidao"}`}>
              {selectedDetail.isHuangDao ? "黃道日" : "黑道日"}
            </span>
            {selectedDetail.jieQi && <span className="day-type-badge jieqi">{selectedDetail.jieQi}</span>}
            {selectedDetail.holidayName && (
              <span className="day-type-badge holiday">{selectedDetail.holidayName}</span>
            )}
            {selectedDetail.isBadDay && <span className="day-type-badge warning">凶日</span>}
          </div>

          <section className="calendar-detail-block">
            <h4>宜</h4>
            {selectedDetail.yiExplained.length > 0 ? (
              <div className="tag-row today-tags">
                {selectedDetail.yiExplained.map(({ term, plain }) => (
                  <TermTooltip key={term} plain={plain} term={term}>
                    <span className="good-tag">{term}</span>
                  </TermTooltip>
                ))}
              </div>
            ) : (
              <p className="today-empty-note">無特別宜事</p>
            )}
          </section>

          <section className="calendar-detail-block">
            <h4>忌</h4>
            {selectedDetail.jiExplained.length > 0 ? (
              <div className="tag-row today-tags">
                {selectedDetail.jiExplained.map(({ term, plain }) => (
                  <TermTooltip key={term} plain={plain} term={term}>
                    <span className="bad-tag">{term}</span>
                  </TermTooltip>
                ))}
              </div>
            ) : (
              <p className="today-empty-note">無特別忌事</p>
            )}
          </section>

          {selectedHours.length > 0 && (
            <section className="calendar-detail-block">
              <h4>吉時</h4>
              <div className="today-hour-grid">
                {selectedHours.map((hour) => (
                  <span className="hour-chip large" key={hour.ganZhi}>
                    {hour.label}
                  </span>
                ))}
              </div>
            </section>
          )}

          <ClashExplain clash={selectedDetail.clashExplain} />

          <dl className="today-info-grid compact">
            <div>
              <dt>建除</dt>
              <dd>{selectedDetail.jianChu}</dd>
            </div>
            <div>
              <dt>值神</dt>
              <dd>{selectedDetail.tianShen}</dd>
            </div>
            <div>
              <dt>胎神</dt>
              <dd>{selectedDetail.tai}</dd>
            </div>
            {selectedDetail.badReasons.length > 0 && (
              <div className="today-info-wide warning">
                <dt>凶日提示</dt>
                <dd>{selectedDetail.badReasons.join("、")}</dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </div>
  );
}
