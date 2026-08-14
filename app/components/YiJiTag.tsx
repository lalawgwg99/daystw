import { getYiJiIcon } from "../data/yiji-icons";
import TermTooltip from "./TermTooltip";

type Props = {
  term: string;
  plain: string;
  kind: "yi" | "ji";
};

export default function YiJiTag({ term, plain, kind }: Props) {
  const Icon = getYiJiIcon(term, kind);
  const className = kind === "yi" ? "yiji-tag yi" : "yiji-tag ji";

  return (
    <TermTooltip plain={plain} term={term}>
      <span className={className}>
        <Icon aria-hidden size={14} strokeWidth={2.2} />
        {term}
      </span>
    </TermTooltip>
  );
}
