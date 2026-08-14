import type { Metadata } from "next";
import SubpageHeader from "../../components/SubpageHeader";
import { purposeBySlug, purposeOptions, buildFinderResults } from "../../lib/finder";

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

const slugLabels: Record<string, string> = {
  "move-in": "搬家入宅",
  wedding: "結婚嫁娶",
  business: "開市開工",
  worship: "祭祀祈福",
  exam: "考試升學",
  bed: "安床",
  groundbreaking: "動土修造",
  travel: "出行遠行",
  contract: "簽約交易",
  burial: "安葬",
};

export async function generateStaticParams() {
  const years = [2025, 2026, 2027];
  const slugs = purposeOptions.map((p) => p.seoSlug);
  return years.flatMap((year) => slugs.map((slug) => ({ year: String(year), slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  const label = slugLabels[slug] ?? slug;
  return {
    title: `${year}年${label}吉日｜吉日通`,
    description: `查詢 ${year} 年${label}黃道吉日，免費篩選宜忌、沖煞、吉時，繁體中文農民曆。`,
  };
}

export default async function PurposeLandingPage({ params }: Props) {
  const { year, slug } = await params;
  const yearNum = Number(year);
  const purpose = purposeBySlug(slug);
  const label = slugLabels[slug] ?? slug;

  if (!purpose || Number.isNaN(yearNum)) {
    return (
      <main className="page-root">
        <SubpageHeader />
        <div className="page-container">
          <h1>找不到頁面</h1>
          <a className="back-link prominent" href="/">
            ← 返回吉日通首頁
          </a>
        </div>
      </main>
    );
  }

  const { results, totalMatched } = buildFinderResults({
    year: yearNum,
    month: 1,
    endYear: yearNum,
    endMonth: 12,
    purpose: purpose.value,
    avoidZodiacs: [],
    weekendOnly: false,
    excludeBadDays: true,
    rangeMode: "range",
    limit: 20,
  });

  return (
    <main className="page-root">
      <SubpageHeader active="landing" />

      <div className="page-container landing-page">
        <a className="back-link prominent" href="/">
          ← 返回吉日通首頁
        </a>
        <h1 className="section-title">
          {year} 年{label}吉日
        </h1>
        <p className="section-desc">
          依傳統黃曆宜忌篩選，{year} 年共 {totalMatched} 個適合{label}的日期（顯示前 20 筆）。
        </p>
        <div className="landing-list">
          {results.map((item) => (
            <article className="date-card compact" key={item.iso}>
              <div className="date-topline">
                <span>{item.iso}</span>
                <strong className={item.isWeekend ? "weekend-badge" : "weekday-badge"}>
                  {item.isWeekend ? "週末" : "平日"}
                </strong>
              </div>
              <p>{item.lunarText}</p>
              <p className="date-summary">{item.summary}</p>
              {item.auspiciousHours.length > 0 && (
                <p className="date-card-meta">
                  吉時：{item.auspiciousHours.map((h) => h.label).join("、")}
                </p>
              )}
            </article>
          ))}
        </div>
        <div className="form-actions landing-actions">
          <a className="btn-primary inline-link" href="/">
            返回吉日通
          </a>
          <a className="btn-secondary inline-link" href="/#finder">
            到首頁自訂篩選
          </a>
        </div>
      </div>
    </main>
  );
}
