"use client";

import { BookOpen, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  countWikiByCategory,
  getAllWikiArticles,
  searchWikiArticles,
  wikiCategoryLabels,
  type WikiCategory,
} from "../data/wiki-articles";

type Props = {
  preview?: boolean;
};

export default function GlossaryWiki({ preview = false }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<WikiCategory | "">("");

  const counts = useMemo(() => countWikiByCategory(), []);
  const total = getAllWikiArticles().length;

  const results = useMemo(() => {
    const list = searchWikiArticles(query, category);
    return preview ? list.slice(0, 6) : list;
  }, [query, category, preview]);

  const categories: (WikiCategory | "")[] = ["", "calendar", "almanac", "worship", "deity", "fortune", "yiji"];

  return (
    <div className="wiki-section" id="glossary">
      <header className="section-head-block">
        <h2 className="section-title">民俗百科</h2>
        <p className="section-desc">
          像維基百科一樣查黃曆、拜拜、神明與擇日名詞，共 <strong>{total}</strong> 篇條目，附完整說明與相關連結。
        </p>
      </header>

      <div className="wiki-search-bar">
        <Search size={18} />
        <input
          placeholder="搜尋條目，例如：太歲、嫁娶、媽祖、四絕日…"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="wiki-filters scroll-x">
        {categories.map((key) => {
          const label =
            key === ""
              ? `全部 (${total})`
              : `${wikiCategoryLabels[key]} (${counts[key]})`;
          return (
            <button
              className={`purpose-chip small ${category === key ? "active" : ""}`}
              key={key || "all"}
              type="button"
              onClick={() => setCategory(key)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <div className="empty-state compact">找不到條目，試試其他關鍵字或分類。</div>
      ) : (
        <div className="wiki-index-grid">
          {results.map((article) => (
            <a className="wiki-index-card" href={`/wiki/${article.slug}`} key={article.slug}>
              <span className={`festival-tag tag-wiki-${article.category}`}>
                {wikiCategoryLabels[article.category]}
              </span>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <span className="wiki-read-more">
                閱讀全文 <ChevronRight size={14} />
              </span>
            </a>
          ))}
        </div>
      )}

      {preview && (
        <div className="form-actions center">
          <a className="btn-primary inline-link" href="/wiki">
            <BookOpen size={16} /> 進入完整百科（{total} 篇）
          </a>
        </div>
      )}
    </div>
  );
}
