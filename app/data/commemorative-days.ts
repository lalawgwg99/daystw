/** 紀念日／民俗日（非國定假日，但農民曆常標示） */
export type CommemorativeDay = {
  month: number;
  day: number;
  name: string;
};

export const commemorativeDays: CommemorativeDay[] = [
  { month: 1, day: 1, name: "中華民國開國紀念日" },
  { month: 3, day: 29, name: "青年節" },
  { month: 5, day: 1, name: "勞動節" },
  { month: 6, day: 3, name: "警察節" },
  { month: 7, day: 15, name: "解嚴紀念日" },
  { month: 8, day: 14, name: "空軍節" },
  { month: 9, day: 3, name: "軍人節" },
  { month: 9, day: 28, name: "教師節" },
  { month: 10, day: 25, name: "光復節" },
  { month: 10, day: 31, name: "臺灣光復節（民俗）" },
  { month: 11, day: 12, name: "國父誕辰紀念日" },
  { month: 12, day: 25, name: "行憲紀念日" },
];

export function getCommemorativeDay(iso: string): string | undefined {
  const [, m, d] = iso.split("-").map(Number);
  return commemorativeDays.find((item) => item.month === m && item.day === d)?.name;
}
