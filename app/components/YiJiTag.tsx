import TermTooltip from "./TermTooltip";

type Props = {
  term: string;
  plain: string;
  kind: "yi" | "ji";
  compact?: boolean;
  highlighted?: boolean;
};

export default function YiJiTag({ term, plain, kind, compact, highlighted }: Props) {
  const className = [
    "term-chip",
    kind === "yi" ? "term-chip-yi" : "term-chip-ji",
    compact ? "compact" : "",
    highlighted ? "highlighted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TermTooltip kind={kind} plain={plain} term={term}>
      <span className={className} tabIndex={0}>
        {term}
      </span>
    </TermTooltip>
  );
}
