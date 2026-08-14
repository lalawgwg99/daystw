import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageHeader from "../../components/SubpageHeader";
import {
  getAllWikiArticles,
  getWikiArticle,
  wikiCategoryLabels,
} from "../../data/wiki-articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllWikiArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) return { title: "找不到條目｜吉日通" };
  return {
    title: `${article.title}｜民俗百科｜吉日通`,
    description: article.summary,
  };
}

export default async function WikiArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) notFound();

  const related = article.relatedSlugs
    .map((s) => getWikiArticle(s))
    .filter(Boolean);

  return (
    <main className="page-root">
      <SubpageHeader active="wiki" />

      <article className="wiki-article page-container">
        <nav className="wiki-breadcrumb">
          <a href="/">首頁</a>
          <span>/</span>
          <a href="/wiki">民俗百科</a>
          <span>/</span>
          <span>{article.title}</span>
        </nav>

        <header className="wiki-article-header">
          <span className={`festival-tag tag-wiki-${article.category}`}>
            {wikiCategoryLabels[article.category]}
          </span>
          <h1>{article.title}</h1>
          {article.aliases && article.aliases.length > 0 && (
            <p className="wiki-aliases">又稱：{article.aliases.join("、")}</p>
          )}
        </header>

        <p className="wiki-lead">{article.intro}</p>

        {article.sections.length > 1 && (
          <nav aria-label="目錄" className="wiki-toc">
            <strong>目錄</strong>
            <ol>
              {article.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${encodeURIComponent(s.heading)}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="wiki-body">
          {article.sections.map((section) => (
            <section className="wiki-section-block" id={section.heading} key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        {related.length > 0 && (
          <aside className="wiki-related">
            <h2>相關條目</h2>
            <ul>
              {related.map((r) =>
                r ? (
                  <li key={r.slug}>
                    <a href={`/wiki/${r.slug}`}>{r.title}</a>
                    <span>{r.summary}</span>
                  </li>
                ) : null,
              )}
            </ul>
          </aside>
        )}

        <div className="form-actions">
          <a className="btn-secondary inline-link" href="/wiki">
            瀏覽全部條目
          </a>
          <a className="btn-primary inline-link" href="/">
            返回吉日通
          </a>
        </div>
      </article>
    </main>
  );
}
