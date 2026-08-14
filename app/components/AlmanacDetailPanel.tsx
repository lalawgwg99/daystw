"use client";

import type { DayDetail } from "../lib/calendar";
import { formatClashOneLine } from "../lib/clash";
import { getJieQiBadge } from "../lib/jieqi-badges";
import ClashExplain from "./ClashExplain";
import TermTooltip from "./TermTooltip";

type Props = {
  detail: DayDetail;
  currentDate: Date;
};

function joinTerms(items: string[]): string {
  return items.length > 0 ? items.join("、") : "—";
}

export default function AlmanacDetailPanel({ detail, currentDate }: Props) {
  const jieQiName = detail.jieQi || detail.jieQiPeriod?.name || "";
  const badge = getJieQiBadge(jieQiName);
  const clashLine = formatClashOneLine(detail.clashExplain);
  const importantDay = detail.holidayName || detail.importantDayName;
  const pengZu = `${detail.pengGan}；${detail.pengZhi}`;

  return (
    <div className="almanac-detail" id="calendar-detail-panel">
      <article className="almanac-date-card">
        <div className="almanac-date-card-top">
          <div className="almanac-date-card-copy">
            <p className="almanac-date-card-label">
              國曆：{currentDate.getFullYear()} 年 {String(currentDate.getMonth() + 1).padStart(2, "0")} 月{" "}
              {String(currentDate.getDate()).padStart(2, "0")} 日
            </p>
            <p className="almanac-date-lunar">
              農曆：{detail.lunarText}
            </p>
            {importantDay && (
              <p className="almanac-date-important">
                重要節日：<strong>{importantDay}</strong>
              </p>
            )}
            {(detail.jieQi || detail.jieQiPeriod) && (
              <p className="almanac-date-jieqi-inline">
                所處節氣：{detail.jieQi || detail.jieQiPeriod?.name}
                {detail.jieQiPeriod ? `（${detail.jieQiPeriod.rangeLabel}）` : ""}
              </p>
            )}
            <p className="almanac-date-week">
              週{detail.weekdayLabel}，第 {detail.weekNumber} 週
            </p>
          </div>
          {badge && (
            <div aria-hidden className={`almanac-jieqi-badge tone-${badge.tone}`}>
              <span className="almanac-jieqi-badge-glyph">{badge.glyph}</span>
              <span className="almanac-jieqi-badge-name">{jieQiName}</span>
            </div>
          )}
        </div>
        <div className="almanac-date-badges">
          <span className={`day-type-badge ${detail.isHuangDao ? "huangdao" : "heidao"}`}>
            {detail.isHuangDao ? "黃道日" : "黑道日"}
          </span>
          {detail.isBadDay && <span className="day-type-badge warning">凶日</span>}
        </div>
      </article>

      <article className="almanac-chips-card">
        <div className="almanac-chip-row">
          <span className="almanac-chip-icon tone-clash">沖</span>
          <p className="almanac-chip-content">{clashLine}</p>
        </div>
        <div className="almanac-chip-row">
          <span className="almanac-chip-icon tone-yi">宜</span>
          <div className="almanac-chip-content">
            {detail.yiExplained.length > 0 ? (
              <div className="tag-row today-tags">
                {detail.yiExplained.map(({ term, plain }) => (
                  <TermTooltip key={term} plain={plain} term={term}>
                    <span className="good-tag">{term}</span>
                  </TermTooltip>
                ))}
              </div>
            ) : (
              <span className="today-empty-note">今日無特別宜事記載</span>
            )}
          </div>
        </div>
        <div className="almanac-chip-row">
          <span className="almanac-chip-icon tone-ji">忌</span>
          <div className="almanac-chip-content">
            {detail.jiExplained.length > 0 ? (
              <div className="tag-row today-tags">
                {detail.jiExplained.map(({ term, plain }) => (
                  <TermTooltip key={term} plain={plain} term={term}>
                    <span className="bad-tag">{term}</span>
                  </TermTooltip>
                ))}
              </div>
            ) : (
              <span className="today-empty-note">今日無特別忌事記載</span>
            )}
          </div>
        </div>
        <div className="almanac-chip-row">
          <span className="almanac-chip-icon tone-sha">煞</span>
          <p className="almanac-chip-content">{detail.sha ? `${detail.sha}方` : "—"}</p>
        </div>
        <div className="almanac-chip-row">
          <span className="almanac-chip-icon tone-hour">吉時</span>
          <p className="almanac-chip-content">
            {detail.auspiciousHourBranches.length > 0
              ? detail.auspiciousHourBranches.join("、")
              : "—"}
          </p>
        </div>
      </article>

      <details className="almanac-summary-details">
        <summary>＋ 當日紀要</summary>
        <dl className="today-info-grid compact">
          <div>
            <dt>日干支</dt>
            <dd>{detail.dayGanZhi}</dd>
          </div>
          <div>
            <dt>建除</dt>
            <dd>{detail.jianChu}</dd>
          </div>
          <div>
            <dt>值神</dt>
            <dd>{detail.tianShen}</dd>
          </div>
          <div>
            <dt>納音</dt>
            <dd>{detail.naYin}</dd>
          </div>
          <div>
            <dt>胎神</dt>
            <dd>{detail.tai}</dd>
          </div>
          <div>
            <dt>方位</dt>
            <dd>{detail.positionText}</dd>
          </div>
          <div className="today-info-wide">
            <dt>吉神</dt>
            <dd>{joinTerms(detail.jiShen)}</dd>
          </div>
          <div className="today-info-wide">
            <dt>凶煞</dt>
            <dd>{joinTerms(detail.xiongSha)}</dd>
          </div>
          <div className="today-info-wide">
            <dt>彭祖百忌</dt>
            <dd>{pengZu}</dd>
          </div>
          {detail.badReasons.length > 0 && (
            <div className="today-info-wide warning">
              <dt>凶日提示</dt>
              <dd>{detail.badReasons.join("、")}</dd>
            </div>
          )}
        </dl>
        <ClashExplain clash={detail.clashExplain} />
      </details>
    </div>
  );
}
