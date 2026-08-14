"use client";

import { AlertTriangle, BookOpen, ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import { fortuneDisclaimer, fortuneTopics, type FortuneTopic } from "../data/fortune";
import { buildBirthChart } from "../lib/lunar";

export default function FortuneTelling() {
  const [topic, setTopic] = useState<FortuneTopic>("八字");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [showResult, setShowResult] = useState(false);

  const topicInfo = fortuneTopics.find((t) => t.topic === topic)!;

  const chart = useMemo(() => {
    if (!birthDate || !showResult) return null;
    const [y, m, d] = birthDate.split("-").map(Number);
    return buildBirthChart(y, m, d, birthTime);
  }, [birthDate, birthTime, showResult]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDate) return;
    setShowResult(true);
  }

  return (
    <div className="service-module">
      <div className="service-module-head">
        <ScrollText size={20} />
        <div>
          <strong>命理查詢</strong>
          <p>輸入生辰，免費查詢八字四柱、生肖、流年太歲等基本資訊。</p>
        </div>
      </div>

      <form className="service-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            查詢主題
            <select value={topic} onChange={(e) => setTopic(e.target.value as FortuneTopic)}>
              {fortuneTopics.map((t) => (
                <option key={t.topic} value={t.topic}>
                  {t.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            出生日期（國曆）
            <input required type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </label>
          <label>
            出生時辰
            <select value={birthTime} onChange={(e) => setBirthTime(e.target.value)}>
              <option value="">不確定（時柱略過）</option>
              <option>子時（23:00–01:00）</option>
              <option>丑時（01:00–03:00）</option>
              <option>寅時（03:00–05:00）</option>
              <option>卯時（05:00–07:00）</option>
              <option>辰時（07:00–09:00）</option>
              <option>巳時（09:00–11:00）</option>
              <option>午時（11:00–13:00）</option>
              <option>未時（13:00–15:00）</option>
              <option>申時（15:00–17:00）</option>
              <option>酉時（17:00–19:00）</option>
              <option>戌時（19:00–21:00）</option>
              <option>亥時（21:00–23:00）</option>
            </select>
          </label>
        </div>

        <div className="info-card">
          <BookOpen size={16} />
          <div>
            <strong>{topicInfo.title}</strong>
            <p>{topicInfo.description}</p>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary" type="submit">
            免費查詢
          </button>
        </div>
      </form>

      {chart && (
        <div className="chart-result">
          <div className="table-title">您的命理資訊</div>
          <dl className="chart-grid">
            <div><dt>國曆生日</dt><dd>{chart.solarDate}</dd></div>
            <div><dt>農曆生日</dt><dd>{chart.lunarDate}</dd></div>
            <div><dt>生肖</dt><dd>{chart.zodiac}</dd></div>
            <div><dt>年柱</dt><dd>{chart.yearPillar}</dd></div>
            <div><dt>月柱</dt><dd>{chart.monthPillar}</dd></div>
            <div><dt>日柱</dt><dd>{chart.dayPillar}</dd></div>
            <div><dt>時柱</dt><dd>{chart.timePillar}</dd></div>
            <div><dt>日主（日干）</dt><dd>{chart.dayMaster}</dd></div>
            <div><dt>日柱納音</dt><dd>{chart.nayin}</dd></div>
            <div><dt>日沖</dt><dd>{chart.chong} 煞{chart.sha}</dd></div>
            <div><dt>{chart.currentYear}</dt><dd>流年 {chart.currentYearPillar}</dd></div>
            <div className="full-width"><dt>太歲提示</dt><dd>{chart.taiSuiNote}</dd></div>
          </dl>
        </div>
      )}

      <div className="guide-section">
        <strong>{topicInfo.title} — 閱讀指南</strong>
        <ul>
          {topicInfo.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="guide-note">{topicInfo.readingGuide}</p>
      </div>

      <div className="disclaimer-box">
        <AlertTriangle size={16} />
        <p>{fortuneDisclaimer}</p>
      </div>
    </div>
  );
}
