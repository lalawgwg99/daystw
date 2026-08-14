"use client";

import { CalendarDays, Flame, Sparkles, Sun } from "lucide-react";
import type { DayDetail } from "../lib/calendar";
import { formatClashOneLine } from "../lib/clash";
import { getJieQiBadge } from "../lib/jieqi-badges";
import { AlmanacChipIcon } from "./AlmanacChipIcon";
import AlmanacDecor from "./AlmanacDecor";
import ClashExplain from "./ClashExplain";
import JieQiArt from "./JieQiArt";
import YiJiTag from "./YiJiTag";

type Props = {
  detail: DayDetail;
  currentDate: Date;
};

function joinTerms(items: string[]): string {
  return items.length > 0 ? items.join("、") : "—";
}

function BranchPills({ branches }: { branches: string[] }) {
  if (branches.length === 0) return <>—</>;
  return (
    <span className="branch-pill-row">
      {branches.map((branch) => (
        <span className="branch-pill" key={branch}>
          {branch}
        </span>
      ))}
    </span>
  );
}

export default function AlmanacDetailPanel({ detail, currentDate }: Props) {
  const jieQiName = detail.jieQi || detail.jieQiPeriod?.name || "";
  const badge = getJieQiBadge(jieQiName);
  const clashLine = formatClashOneLine(detail.clashExplain);
  const importantDay = detail.holidayName || detail.importantDayName;
  const pengZu = `${detail.pengGan}；${detail.pengZhi}`;

  return (
    <div className="almanac-detail" id="calendar-detail-panel">
      <article className="almanac-date-card decorated">
        <AlmanacDecor />
        <div className="almanac-date-card-top">
          <div className="almanac-date-card-copy">
            <p className="almanac-date-card-label">
              <CalendarDays aria-hidden size={15} />
              國曆：{currentDate.getFullYear()} 年 {String(currentDate.getMonth() + 1).padStart(2, "0")} 月{" "}
              {String(currentDate.getDate()).padStart(2, "0")} 日
            </p>
            <p className="almanac-date-lunar">{detail.lunarText}</p>
            {importantDay && (
              <p className="almanac-date-important">
                <Sparkles aria-hidden size={14} />
                重要節日：<strong>{importantDay}</strong>
              </p>
            )}
            {(detail.jieQi || detail.jieQiPeriod) && (
              <p className="almanac-date-jieqi-inline">
                <Sun aria-hidden size={14} />
                所處節氣：{detail.jieQi || detail.jieQiPeriod?.name}
                {detail.jieQiPeriod ? `（${detail.jieQiPeriod.rangeLabel}）` : ""}
              </p>
            )}
            <p className="almanac-date-week">
              週{detail.weekdayLabel}，第 {detail.weekNumber} 週
            </p>
          </div>
          {badge && jieQiName && (
            <div className="almanac-jieqi-visual">
              <JieQiArt name={jieQiName} tone={badge.tone} />
              <span className="almanac-jieqi-caption">{jieQiName}</span>
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
          <AlmanacChipIcon tone="clash" />
          <p className="almanac-chip-content clash-line">{clashLine}</p>
        </div>
        <div className="almanac-chip-row">
          <AlmanacChipIcon tone="yi" />
          <div className="almanac-chip-content">
            {detail.yiExplained.length > 0 ? (
              <div className="tag-row yiji-tag-row">
                {detail.yiExplained.map(({ term, plain }) => (
                  <YiJiTag key={term} kind="yi" plain={plain} term={term} />
                ))}
              </div>
            ) : (
              <span className="today-empty-note">今日無特別宜事記載</span>
            )}
          </div>
        </div>
        <div className="almanac-chip-row">
          <AlmanacChipIcon tone="ji" />
          <div className="almanac-chip-content">
            {detail.jiExplained.length > 0 ? (
              <div className="tag-row yiji-tag-row">
                {detail.jiExplained.map(({ term, plain }) => (
                  <YiJiTag key={term} kind="ji" plain={plain} term={term} />
                ))}
              </div>
            ) : (
              <span className="today-empty-note">今日無特別忌事記載</span>
            )}
          </div>
        </div>
        <div className="almanac-chip-row">
          <AlmanacChipIcon tone="sha" />
          <p className="almanac-chip-content">{detail.sha ? `${detail.sha}方` : "—"}</p>
        </div>
        <div className="almanac-chip-row">
          <AlmanacChipIcon tone="hour" />
          <p className="almanac-chip-content">
            <BranchPills branches={detail.auspiciousHourBranches} />
          </p>
        </div>
      </article>

      <details className="almanac-summary-details">
        <summary>
          <Flame aria-hidden size={16} />
          當日紀要
        </summary>
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
