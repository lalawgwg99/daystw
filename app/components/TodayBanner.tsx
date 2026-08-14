"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getDayDetail, shiftDate } from "../lib/calendar";
import { formatSolarDate } from "../lib/finder";
import { getAuspiciousHours } from "../lib/hours";
import ClashExplain from "./ClashExplain";
import TermTooltip from "./TermTooltip";

type Props = {
  initialDate?: Date;
};

export default function TodayBanner({ initialDate }: Props) {
  const [currentDate, setCurrentDate] = useState(initialDate ?? new Date());
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const sync = () => setAdvancedOpen(window.innerWidth >= 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const detail = useMemo(() => {
    return getDayDetail(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );
  }, [currentDate]);

  const auspiciousHours = useMemo(
    () =>
      getAuspiciousHours(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        6,
      ),
    [currentDate],
  );

  const solarDate = formatSolarDate(currentDate);
  const isToday = solarDate === formatSolarDate(new Date());
  const weekday = ["日", "一", "二", "三", "四", "五", "六"][currentDate.getDay()];
  const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

  function shift(delta: number) {
    setCurrentDate(shiftDate(currentDate, delta));
  }

  return (
    <section aria-labelledby="today-heading" className="today-dashboard" id="calendar">
      <div className="today-dashboard-nav">
        <button aria-label="前一天" className="icon-btn ghost" type="button" onClick={() => shift(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div className="today-dashboard-title">
          <p className="today-dashboard-eyebrow">{isToday ? "今日黃曆" : "黃曆查詢"}</p>
          <h1 className="today-dashboard-date" id="today-heading">
            {currentDate.getMonth() + 1}月{currentDate.getDate()}日
            <span>週{weekday}</span>
          </h1>
          <p className="today-dashboard-solar">{solarDate}</p>
        </div>
        <button aria-label="後一天" className="icon-btn ghost" type="button" onClick={() => shift(1)}>
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="today-dashboard-lunar">{detail.lunarText}</p>

      <div className="today-dashboard-badges">
        <span className={`day-type-badge ${isWeekend ? "weekend" : "weekday"}`}>
          {isWeekend ? "週末" : "平日"}
        </span>
        <span className={`day-type-badge ${detail.isHuangDao ? "huangdao" : "heidao"}`}>
          {detail.isHuangDao ? "黃道日" : "黑道日"}
        </span>
        {detail.jieQi && <span className="day-type-badge jieqi">{detail.jieQi}</span>}
        {detail.holidayName && <span className="day-type-badge holiday">{detail.holidayName}</span>}
        {detail.isBadDay && <span className="day-type-badge warning">凶日</span>}
      </div>

      <div className="today-dashboard-main">
        <section className="today-panel-block yi-block">
          <h2>宜</h2>
          {detail.yiExplained.length > 0 ? (
            <div className="tag-row today-tags">
              {detail.yiExplained.map(({ term, plain }) => (
                <TermTooltip key={term} plain={plain} term={term}>
                  <span className="good-tag">{term}</span>
                </TermTooltip>
              ))}
            </div>
          ) : (
            <p className="today-empty-note">今日無特別宜事記載</p>
          )}
        </section>

        <section className="today-panel-block ji-block">
          <h2>忌</h2>
          {detail.jiExplained.length > 0 ? (
            <div className="tag-row today-tags">
              {detail.jiExplained.map(({ term, plain }) => (
                <TermTooltip key={term} plain={plain} term={term}>
                  <span className="bad-tag">{term}</span>
                </TermTooltip>
              ))}
            </div>
          ) : (
            <p className="today-empty-note">今日無特別忌事記載</p>
          )}
        </section>
      </div>

      {auspiciousHours.length > 0 && (
        <section className="today-panel-block hours-block">
          <h2>吉時</h2>
          <div className="today-hour-grid">
            {auspiciousHours.map((hour) => (
              <span className="hour-chip large" key={hour.ganZhi}>
                {hour.label}
              </span>
            ))}
          </div>
        </section>
      )}

      <ClashExplain clash={detail.clashExplain} />

      <details
        className="advanced-details"
        open={advancedOpen}
        onToggle={(e) => setAdvancedOpen(e.currentTarget.open)}
      >
        <summary>進階資訊（干支、胎神、彭祖）</summary>
        <dl className="today-info-grid">
        <div>
          <dt>日干支</dt>
          <dd>{detail.dayGanZhi}</dd>
        </div>
        <div>
          <dt>建除</dt>
          <dd>{detail.jianChu}</dd>
        </div>
        <div>
          <dt>納音</dt>
          <dd>{detail.naYin}</dd>
        </div>
        <div>
          <dt>值神</dt>
          <dd>{detail.tianShen}</dd>
        </div>
        <div>
          <dt>胎神</dt>
          <dd>{detail.tai}</dd>
        </div>
        <div className="today-info-wide">
          <dt>彭祖百忌</dt>
          <dd>
            {detail.pengGan}；{detail.pengZhi}
          </dd>
        </div>
        {detail.badReasons.length > 0 && (
          <div className="today-info-wide warning">
            <dt>凶日提示</dt>
            <dd>{detail.badReasons.join("、")}</dd>
          </div>
        )}
        </dl>
      </details>

      <div className="today-dashboard-actions">
        <a className="btn-primary inline-link" href="#finder">
          找這個月的吉日
        </a>
        <a className="btn-secondary inline-link" href="#month-calendar">
          查看月曆
        </a>
      </div>
    </section>
  );
}
