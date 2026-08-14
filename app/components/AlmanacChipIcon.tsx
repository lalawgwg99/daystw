import type { LucideIcon } from "lucide-react";
import { Clock3, Compass, Sparkles, Utensils, UtensilsCrossed, XCircle, Zap } from "lucide-react";

export type ChipTone = "clash" | "yi" | "ji" | "sha" | "hour" | "food-yi" | "food-ji";

const toneIcons: Record<ChipTone, LucideIcon> = {
  clash: Zap,
  yi: Sparkles,
  ji: XCircle,
  sha: Compass,
  hour: Clock3,
  "food-yi": Utensils,
  "food-ji": UtensilsCrossed,
};

const toneLabels: Record<ChipTone, string> = {
  clash: "沖",
  yi: "宜",
  ji: "忌",
  sha: "煞",
  hour: "吉時",
  "food-yi": "宜食",
  "food-ji": "忌食",
};

type ChipIconProps = {
  tone: ChipTone;
};

export function AlmanacChipIcon({ tone }: ChipIconProps) {
  const Icon = toneIcons[tone];
  return (
    <span aria-hidden className={`almanac-chip-icon tone-${tone}`}>
      <Icon size={16} strokeWidth={2.4} />
      <span className="sr-only">{toneLabels[tone]}</span>
    </span>
  );
}

export { toneLabels };
