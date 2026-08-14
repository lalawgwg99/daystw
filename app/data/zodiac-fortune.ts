/** 每日生肖運勢（離線決定式，同一天同一生肖結果一致） */

export const zodiacList = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"] as const;

export type ZodiacFortune = {
  zodiac: string;
  score: number;
  summary: string;
  tip: string;
};

const SUMMARIES = [
  "整體平穩，適合處理日常事務。",
  "貴人運佳，可多請教長輩或同事。",
  "宜低調行事，避免衝動決策。",
  "財運普通，不宜大筆投資。",
  "人際和諧，適合聚會或洽談。",
  "健康需留意，避免過勞。",
  "工作順遂，可推進既定計畫。",
  "感情運佳，適合表達心意。",
  "小有波折，保持耐心即可。",
  "學習運強，適合進修或考試。",
  "出行宜謹慎，確認行程細節。",
  "創意靈感佳，適合規劃新方案。",
];

const TIPS = [
  "穿著暖色調可增旺運勢。",
  "上午處理重要事項較順利。",
  "多喝水、早休息，保持體力。",
  "避免與人爭執，以和為貴。",
  "可整理環境，清走雜物。",
  "適合向長輩問安、關心家人。",
  "記帳、理財，避免衝動消費。",
  "午後適合短暫休息再出發。",
  "誠心祈福，心態正向。",
  "簽約、開會選在吉時更佳。",
  "適合運動，舒展筋骨。",
  "與老友聯絡，心情更舒暢。",
];

function hashSeed(dateStr: string, zodiacIndex: number): number {
  let hash = zodiacIndex * 9973;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getZodiacFortune(dateStr: string, zodiac: string): ZodiacFortune {
  const index = zodiacList.indexOf(zodiac as (typeof zodiacList)[number]);
  const safeIndex = index >= 0 ? index : 0;
  const seed = hashSeed(dateStr, safeIndex);
  const score = 55 + (seed % 40);
  const summary = SUMMARIES[seed % SUMMARIES.length];
  const tip = TIPS[(seed >> 3) % TIPS.length];

  return { zodiac, score, summary, tip };
}

export function getAllZodiacFortunes(dateStr: string): ZodiacFortune[] {
  return zodiacList.map((zodiac) => getZodiacFortune(dateStr, zodiac));
}
