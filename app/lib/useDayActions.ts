"use client";

import type { DayDetail } from "./calendar";
import { buildIcs, downloadIcs } from "./ics";

export function buildDayShareText(detail: DayDetail): string {
  const yi = detail.yi.length > 0 ? detail.yi.join("、") : "無";
  const ji = detail.ji.length > 0 ? detail.ji.join("、") : "無";
  const hours =
    detail.auspiciousHourBranches.length > 0
      ? detail.auspiciousHourBranches.join("、")
      : "—";
  return [
    `${detail.iso}（${detail.lunarText}）`,
    `宜：${yi}`,
    `忌：${ji}`,
    `沖：${detail.clashExplain.zodiac ? `屬${detail.clashExplain.zodiac}` : detail.clash}`,
    `煞：${detail.sha}方`,
    `吉時：${hours}`,
    "— 吉日通",
  ].join("\n");
}

export async function shareDay(detail: DayDetail): Promise<void> {
  const text = buildDayShareText(detail);
  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share({ title: "吉日通｜今日黃曆", text });
    return;
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
}

export function downloadDayIcs(detail: DayDetail): void {
  const description = buildDayShareText(detail);
  const ics = buildIcs([
    {
      title: `吉日通｜${detail.lunarText}`,
      date: detail.iso,
      description,
      uid: `${detail.iso}-almanac@daystw`,
    },
  ]);
  downloadIcs(`jiritong-${detail.iso}.ics`, ics);
}
