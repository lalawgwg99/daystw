"use client";

import { CheckCircle2, Flame, ListOrdered } from "lucide-react";
import { useState } from "react";
import { lampGuides, type LampType } from "../data/lamps";

export default function LampLighting() {
  const [lampType, setLampType] = useState<LampType>("光明燈");
  const guide = lampGuides.find((g) => g.type === lampType)!;

  return (
    <div className="service-module">
      <div className="service-module-head">
        <Flame size={20} />
        <div>
          <strong>點燈祈福指南</strong>
          <p>了解光明燈、安太歲、文昌燈、財神燈的意義、時機與拜拜方式。</p>
        </div>
      </div>

      <label>
        選擇燈種
        <select value={lampType} onChange={(e) => setLampType(e.target.value as LampType)}>
          {lampGuides.map((g) => (
            <option key={g.type} value={g.type}>
              {g.type}
            </option>
          ))}
        </select>
      </label>

      <div className="lamp-guide-card">
        <div className="date-topline">
          <span>民俗指南</span>
          <strong>{guide.type}</strong>
        </div>
        <p className="lamp-purpose">{guide.purpose}</p>
        <div className="lamp-period">
          <strong>最佳時機：</strong>{guide.bestPeriod}
        </div>
      </div>

      <div className="guide-columns">
        <div className="guide-block">
          <div className="guide-block-title">
            <ListOrdered size={16} />
            事前準備
          </div>
          <ol>
            {guide.preparation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="guide-block">
          <div className="guide-block-title">
            <CheckCircle2 size={16} />
            拜拜步驟
          </div>
          <ol>
            {guide.worshipSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="tag-row">
        {guide.notes.map((note) => (
          <span className="caution-tag" key={note}>
            {note}
          </span>
        ))}
      </div>

      <div className="refund-note">
        本指南為民俗文化整理，各廟宇作法與費用不同，請至現場依廟方規定辦理。本站不提供代點燈或任何付費服務。
      </div>
    </div>
  );
}
