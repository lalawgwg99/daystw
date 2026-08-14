"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DateResult } from "../lib/finder";

type Props = {
  item: DateResult;
  month: number;
};

export default function DateResultCard({ item, month }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <article className="date-card compact">
      <div className="date-topline">
        <span>{item.iso}</span>
        <strong>{item.isWeekend ? "週末" : "平日"}</strong>
      </div>
      <h2>
        {month}月{item.day}日
      </h2>
      <p>{item.lunarText}</p>

      <p className="date-summary">{item.summary}</p>

      <div className="tag-row compact">
        {item.matchedYi.length > 0 ? (
          item.matchedYi.map((tag) => (
            <span className="good-tag highlight-tag" key={tag}>
              {tag}
            </span>
          ))
        ) : (
          item.yi.slice(0, 4).map((tag) => (
            <span className="good-tag" key={tag}>
              {tag}
            </span>
          ))
        )}
      </div>

      <div className="date-card-meta">
        <span>
          沖煞：{item.clash} 煞{item.sha}
        </span>
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
