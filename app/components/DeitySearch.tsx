"use client";

import { MapPin, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import {
  categoryLabels,
  deities,
  searchDeities,
  type DeityCategory,
} from "../data/deities";
import {
  getTemple,
  getTemplesByDeityId,
  regionLabels,
  searchTemples,
  temples,
  type TaiwanRegion,
} from "../data/temples";

function resolveTemplesForDeity(item: (typeof deities)[number]) {
  const fromIds = (item.recommendedTempleIds ?? [])
    .map((id) => getTemple(id))
    .filter(Boolean);
  const fromRelation = getTemplesByDeityId(item.id);
  const merged = new Map<string, NonNullable<ReturnType<typeof getTemple>>>();
  for (const t of [...fromIds, ...fromRelation]) {
    if (t) merged.set(t.id, t);
  }
  return [...merged.values()];
}

export default function DeitySearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DeityCategory | "">("");
  const [region, setRegion] = useState<TaiwanRegion | "">("");
  const [viewMode, setViewMode] = useState<"need" | "temple">("need");
  const [showAll, setShowAll] = useState(false);

  const results = useMemo(
    () => searchDeities(query, category || undefined, region || undefined),
    [query, category, region],
  );

  const templeResults = useMemo(
    () => searchTemples(query, region || undefined),
    [query, region],
  );

  const hasFilter = Boolean(query.trim() || category || region);
  const displayLimit = hasFilter || showAll ? 999 : 6;
  const visibleResults = results.slice(0, displayLimit);
  const visibleTemples = templeResults.slice(0, displayLimit);

  return (
    <div className="service-module">
      <div className="service-module-head">
        <Sparkles size={20} />
        <div>
          <strong>該拜哪尊神明</strong>
          <p>依需求查詢神明職掌、供品、拜拜方式，並附台灣各地推薦廟宇。</p>
        </div>
      </div>

      <div className="view-toggle">
        <button
          className={`purpose-chip small ${viewMode === "need" ? "active" : ""}`}
          type="button"
          onClick={() => setViewMode("need")}
        >
          依需求查
        </button>
        <button
          className={`purpose-chip small ${viewMode === "temple" ? "active" : ""}`}
          type="button"
          onClick={() => setViewMode("temple")}
        >
          依廟宇查
        </button>
      </div>

      <div className="form-grid">
        <label>
          搜尋
          <input
            placeholder={viewMode === "need" ? "例如：考試、求財、搬家…" : "廟名、縣市、神明…"}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          地區
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as TaiwanRegion | "")}
          >
            <option value="">全台</option>
            {(Object.keys(regionLabels) as TaiwanRegion[]).map((key) => (
              <option key={key} value={key}>
                {regionLabels[key]}
              </option>
            ))}
          </select>
        </label>
        {viewMode === "need" && (
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
        )}
      </div>

      {viewMode === "need" ? (
        results.length === 0 ? (
          <div className="empty-state">找不到符合條件的神明，請換個關鍵字或地區試試。</div>
        ) : (
          <>
            {!hasFilter && (
              <p className="results-hint">顯示常用需求，搜尋或篩選可查看全部 {results.length} 筆。</p>
            )}
            <div className="deity-results">
            {visibleResults.map((item) => {
              const relatedTemples = resolveTemplesForDeity(item).filter(
                (t) => !region || t.region === region,
              );
              return (
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

                  {relatedTemples.length > 0 && (
                    <div className="temple-list-block">
                      <strong className="temple-list-title">
                        <MapPin size={14} /> 推薦廟宇
                      </strong>
                      <ul className="temple-list">
                        {relatedTemples.slice(0, 4).map((t) => (
                          <li key={t.id}>
                            <span className="temple-name">{t.name}</span>
                            <span className="temple-meta">
                              {t.city}
                              {t.district ? ` ${t.district}` : ""} · 主祀 {t.mainDeity}
                            </span>
                            <span className="temple-address">{t.address}</span>
                            {t.note && <span className="temple-note">{t.note}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="tag-row">
                    {item.taboos.map((taboo) => (
                      <span className="caution-tag" key={taboo}>
                        {taboo}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
            </div>
            {!hasFilter && !showAll && results.length > 6 && (
              <div className="form-actions center">
                <button className="btn-secondary" type="button" onClick={() => setShowAll(true)}>
                  查看全部 {results.length} 筆需求
                </button>
              </div>
            )}
          </>
        )
      ) : templeResults.length === 0 ? (
        <div className="empty-state">找不到符合條件的廟宇，請換個關鍵字或地區試試。</div>
      ) : (
        <>
          {!hasFilter && (
            <p className="results-hint">顯示部分廟宇，搜尋或選地區可查看全部 {templeResults.length} 座。</p>
          )}
          <div className="deity-results">
          {visibleTemples.map((t) => (
            <article className="deity-result-card temple-card" key={t.id}>
              <div className="date-topline">
                <span>{regionLabels[t.region]}</span>
                <strong>{t.name}</strong>
              </div>
              <dl className="detail-list">
                <div>
                  <dt>主祀神明</dt>
                  <dd>{t.mainDeity}</dd>
                </div>
                <div>
                  <dt>地址</dt>
                  <dd>{t.address}</dd>
                </div>
                <div>
                  <dt>適合需求</dt>
                  <dd>{t.specialties.join("、")}</dd>
                </div>
              </dl>
              {t.note && <p className="temple-note block">{t.note}</p>}
            </article>
          ))}
          </div>
          {!hasFilter && !showAll && templeResults.length > 6 && (
            <div className="form-actions center">
              <button className="btn-secondary" type="button" onClick={() => setShowAll(true)}>
                查看全部 {templeResults.length} 座廟宇
              </button>
            </div>
          )}
        </>
      )}

      <details className="data-preview">
        <summary>
          資料庫：{deities.length} 筆需求 · {temples.length} 座廟宇
        </summary>
        <div className="deity-table compact">
          <div className="deity-row header-row">
            <strong>廟宇</strong>
            <span>主祀</span>
            <small>縣市</small>
          </div>
          {temples.map((row) => (
            <div className="deity-row" key={row.id}>
              <strong>{row.name}</strong>
              <span>{row.mainDeity}</span>
              <small>{row.city}</small>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
