import type { ClashExplanation } from "../lib/clash";

type Props = {
  clash: ClashExplanation;
  compact?: boolean;
};

function ClashHighlights({ clash }: { clash: ClashExplanation }) {
  return (
    <div className="clash-highlights">
      <div className="clash-stat clash-stat-zodiac">
        <span className="clash-stat-label">沖生肖</span>
        <strong className="clash-stat-value">{clash.zodiac || "—"}</strong>
      </div>
      <div className="clash-stat clash-stat-age">
        <span className="clash-stat-label">沖年次</span>
        <strong className="clash-stat-value">
          {clash.yearTags.length > 0 ? clash.yearTags.join("、") : "—"}
        </strong>
      </div>
      <div className="clash-stat clash-stat-sha">
        <span className="clash-stat-label">煞方</span>
        <strong className="clash-stat-value">{clash.sha ? `煞${clash.sha}` : "—"}</strong>
      </div>
    </div>
  );
}

export default function ClashExplain({ clash, compact = false }: Props) {
  if (!clash.zodiac && !clash.rawClash) return null;

  if (compact) {
    return (
      <div className="clash-block compact">
        <ClashHighlights clash={clash} />
        <p className="clash-summary">{clash.whoPlain}</p>
      </div>
    );
  }

  return (
    <section aria-label="沖煞說明" className="clash-block">
      <h3 className="clash-block-title">沖煞提醒</h3>
      <ClashHighlights clash={clash} />
      <p className="clash-summary">{clash.whoPlain}</p>
      <details className="clash-details">
        <summary>查看完整沖煞說明</summary>
        <dl className="clash-detail">
          <div>
            <dt>沖什麼</dt>
            <dd>
              沖<strong>{clash.zodiac}</strong>
              {clash.ganZhi ? `（日沖 ${clash.ganZhi}）` : ""}
              — 屬{clash.zodiac}者與今日地支相沖
            </dd>
          </div>
          {clash.birthYears.length > 0 && (
            <div>
              <dt>沖哪些出生年</dt>
              <dd>
                {clash.birthYears.join("、")} 年出生
                <span className="clash-sub">（{clash.yearTags.join("、")} 年次）</span>
              </dd>
            </div>
          )}
          {clash.ages.length > 0 && (
            <div>
              <dt>沖幾歲（虛歲）</dt>
              <dd>
                {clash.ages.join("、")} 歲
                <span className="clash-sub"> — 屬{clash.zodiac}者宜避開重要事</span>
              </dd>
            </div>
          )}
          <div>
            <dt>煞什麼</dt>
            <dd>
              煞{clash.sha} — {clash.shaPlain}
            </dd>
          </div>
        </dl>
      </details>
    </section>
  );
}
