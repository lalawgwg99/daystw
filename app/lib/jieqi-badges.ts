/** 二十四節氣簡易視覺標記（CSS class + 標籤字） */
export const jieQiBadgeMap: Record<string, { glyph: string; tone: string }> = {
  立春: { glyph: "春", tone: "spring" },
  雨水: { glyph: "雨", tone: "spring" },
  驚蟄: { glyph: "雷", tone: "spring" },
  春分: { glyph: "分", tone: "spring" },
  清明: { glyph: "清", tone: "spring" },
  穀雨: { glyph: "穀", tone: "spring" },
  立夏: { glyph: "夏", tone: "summer" },
  小滿: { glyph: "滿", tone: "summer" },
  芒種: { glyph: "芒", tone: "summer" },
  夏至: { glyph: "至", tone: "summer" },
  小暑: { glyph: "暑", tone: "summer" },
  大暑: { glyph: "暑", tone: "summer" },
  立秋: { glyph: "秋", tone: "autumn" },
  處暑: { glyph: "暑", tone: "autumn" },
  白露: { glyph: "露", tone: "autumn" },
  秋分: { glyph: "分", tone: "autumn" },
  寒露: { glyph: "露", tone: "autumn" },
  霜降: { glyph: "霜", tone: "autumn" },
  立冬: { glyph: "冬", tone: "winter" },
  小雪: { glyph: "雪", tone: "winter" },
  大雪: { glyph: "雪", tone: "winter" },
  冬至: { glyph: "至", tone: "winter" },
  小寒: { glyph: "寒", tone: "winter" },
  大寒: { glyph: "寒", tone: "winter" },
};

export function getJieQiBadge(name: string): { glyph: string; tone: string } | null {
  if (!name) return null;
  return jieQiBadgeMap[name] ?? { glyph: name.charAt(0), tone: "default" };
}
