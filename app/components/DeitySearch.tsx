"use client";

import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import {
  categoryLabels,
  deities,
  searchDeities,
  type DeityCategory,
} from "../data/deities";

export default function DeitySearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DeityCategory | "">("");

  const results = useMemo(() => searchDeities(query, category || undefined), [query, category]);

  return (
    <div className="service-module">
      <div className="service-module-head">
        <Sparkles size={20} />
        <div>
          <strong>該拜哪尊神明</strong>
          <p>依需求查詢神明職掌、供品、拜拜時間與禁忌，全部免費查閱。</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          搜尋需求
          <input
            placeholder="例如：考試、求財、搬家…"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          需求分類
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as DeityCategory | "")}
          >
            <option value="">全部</option>
            {(Object.keys(categoryLabels) as DeityCategory[]).map((key) => (
              <option key={key} value={key}>
                {categoryLabels[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">找不到符合條件的神明，請換個關鍵字試試。</div>
      ) : (
        <div className="deity-results">
          {results.map((item) => (
            <article className="deity-result-card" key={item.id}>
              <div className="date-topline">
                <span>{item.need}</span>
                <strong>{item.deities.join("、")}</strong>
              </div>
              <dl className="detail-list">
                <div>
                  <dt>建議供品</dt>
                  <dd>{item.offering}</dd>
                </div>
                <div>
                  <dt>拜拜時間</dt>
                  <dd>{item.worshipTime}</dd>
                </div>
                <div>
                  <dt>拜拜方式</dt>
                  <dd>{item.worshipMethod}</dd>
                </div>
              </dl>
              <div className="tag-row">
                {item.taboos.map((taboo) => (
                  <span className="caution-tag" key={taboo}>
                    {taboo}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      <details className="data-preview" open>
        <summary>神明職掌資料庫（{deities.length} 筆）</summary>
        <div className="deity-table compact">
          <div className="deity-row header-row">
            <strong>需求</strong>
            <span>神明</span>
            <small>供品</small>
          </div>
          {deities.map((row) => (
            <div className="deity-row" key={row.id}>
              <strong>{row.need}</strong>
              <span>{row.deities.join("、")}</span>
              <small>{row.offering}</small>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
