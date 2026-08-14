"use client";

import { CalendarPlus, ChevronDown, Heart, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { explainTerms } from "../data/glossary";
import { explainClashFromRaw } from "../lib/clash";
import type { DateResult } from "../lib/finder";
import { buildIcs, downloadIcs } from "../lib/ics";
import { generateId, storage } from "../lib/storage";
import ClashExplain from "./ClashExplain";
import TermTooltip from "./TermTooltip";

type Props = {
  item: DateResult;
  purpose: string;
};

export default function DateResultCard({ item, purpose }: Props) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(() => storage.isDateSaved(item.iso, purpose));
  const yiExplained = explainTerms(item.matchedYi.length > 0 ? item.matchedYi : item.yi.slice(0, 4));
  const clashExplain = useMemo(
    () => explainClashFromRaw(item.clash, item.sha, item.year),
    [item.clash, item.sha, item.year],
  );

  function handleSave() {
    storage.saveDate({
      id: generateId(),
      iso: item.iso,
      purpose,
      summary: item.summary,
      savedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  async function handleShare() {
    const text = `${item.iso}（${item.lunarText}）\n${item.summary}\n— 吉日通`;
    if (navigator.share) {
      await navigator.share({ title: "吉日通｜推薦吉日", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  }

  function handleIcs() {
    const ics = buildIcs([
      {
        title: `吉日通｜${purpose}`,
        date: item.iso,
        description: `${item.summary}\n沖煞：${item.clash}`,
        uid: `${item.iso}-${purpose}@daystw`,
      },
    ]);
    downloadIcs(`jiritong-${item.iso}.ics`, ics);
  }

  return (
    <article className="date-card compact stretch">
      <div className="date-topline">
        <span>{item.iso}</span>
        <strong className={item.isWeekend ? "weekend-badge" : "weekday-badge"}>
          {item.isWeekend ? "週末" : "平日"}
        </strong>
      </div>
      <h2>
        {item.month}月{item.day}日
      </h2>
      <p>{item.lunarText}</p>

      <p className="date-summary">{item.summary}</p>

      <div className="tag-row compact">
        {yiExplained.map(({ term, plain }) => (
          <TermTooltip key={term} plain={plain} term={term}>
            <span className={`good-tag ${item.matchedYi.includes(term) ? "highlight-tag" : ""}`}>
              {term}
            </span>
          </TermTooltip>
        ))}
      </div>

      {item.auspiciousHours.length > 0 && (
        <div className="hour-row">
          <strong className="hour-row-label">吉時</strong>
          <div className="hour-row-chips">
            {item.auspiciousHours.map((h) => (
              <span className="hour-chip" key={h.ganZhi}>
                {h.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <ClashExplain clash={clashExplain} compact />

      <div className="card-actions">
        <button className="icon-action" type="button" onClick={handleShare}>
          <Share2 size={15} /> 分享
        </button>
        <button className="icon-action" disabled={saved} type="button" onClick={handleSave}>
          <Heart size={15} /> {saved ? "已收藏" : "收藏"}
        </button>
        <button className="icon-action" type="button" onClick={handleIcs}>
          <CalendarPlus size={15} /> 加入行事曆
        </button>
      </div>

      <button
        aria-expanded={open}
        className="detail-toggle"
        type="button"
        onClick={() => setOpen(!open)}
      >
        {open ? "收合進階資訊" : "查看胎神、彭祖等進階資訊"}
        <ChevronDown className={open ? "rotated" : ""} size={16} />
      </button>

      {open && (
        <dl className="detail-list compact-dl advanced-dl">
          <div>
            <dt>全部宜事</dt>
            <dd>{item.yi.join("、")}</dd>
          </div>
          <div>
            <dt>忌事</dt>
            <dd>{item.ji.join("、") || "無"}</dd>
          </div>
          <div>
            <dt>胎神</dt>
            <dd>{item.tai}</dd>
          </div>
          <div>
            <dt>彭祖百忌</dt>
            <dd>{item.peng}</dd>
          </div>
          <div>
            <dt>天神</dt>
            <dd>{item.tianShen}</dd>
          </div>
        </dl>
      )}
    </article>
  );
}
