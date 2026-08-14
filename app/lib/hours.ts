import { Solar } from "lunar-javascript";
import { toTaiwanTraditional } from "./traditional";

const BRANCH_LABELS: Record<string, string> = {
  子: "子時（23:00–01:00）",
  丑: "丑時（01:00–03:00）",
  寅: "寅時（03:00–05:00）",
  卯: "卯時（05:00–07:00）",
  辰: "辰時（07:00–09:00）",
  巳: "巳時（09:00–11:00）",
  午: "午時（11:00–13:00）",
  未: "未時（13:00–15:00）",
  申: "申時（15:00–17:00）",
  酉: "酉時（17:00–19:00）",
  戌: "戌時（19:00–21:00）",
  亥: "亥時（21:00–23:00）",
};

const BRANCH_TIME_RANGE: Record<string, string> = {
  子: "23:00 | 01:00",
  丑: "01:00 | 03:00",
  寅: "03:00 | 05:00",
  卯: "05:00 | 07:00",
  辰: "07:00 | 09:00",
  巳: "09:00 | 11:00",
  午: "11:00 | 13:00",
  未: "13:00 | 15:00",
  申: "15:00 | 17:00",
  酉: "17:00 | 19:00",
  戌: "19:00 | 21:00",
  亥: "21:00 | 23:00",
};

type LunarTime = {
  getGanZhi: () => string;
  getYi: () => string[];
  getJi: () => string[];
  getChongDesc: () => string;
  getSha: () => string;
  getTianShenLuck: () => string;
};

export type HourSlot = {
  branch: string;
  label: string;
  ganZhi: string;
  yi: string[];
  isAuspicious: boolean;
};

export type HourDetail = HourSlot & {
  timeRange: string;
  ji: string[];
  clash: string;
  sha: string;
  luck: string;
};

function mapHourSlot(time: LunarTime): HourDetail {
  const ganZhi = toTaiwanTraditional(time.getGanZhi());
  const branch = ganZhi.charAt(1);
  const yi = time.getYi().map((item: string) => toTaiwanTraditional(item));
  const ji = time.getJi().map((item: string) => toTaiwanTraditional(item));
  const luck = toTaiwanTraditional(time.getTianShenLuck());
  const isAuspicious = luck === "吉";

  return {
    branch,
    label: BRANCH_LABELS[branch] ?? branch,
    timeRange: BRANCH_TIME_RANGE[branch] ?? "",
    ganZhi,
    yi,
    ji,
    clash: toTaiwanTraditional(time.getChongDesc()),
    sha: toTaiwanTraditional(time.getSha()),
    luck,
    isAuspicious,
  };
}

export function getHourDetails(year: number, month: number, day: number): HourDetail[] {
  const lunar = Solar.fromYmd(year, month, day).getLunar();
  return lunar.getTimes().slice(0, 12).map((time: LunarTime) => mapHourSlot(time));
}

export function getHourSlots(year: number, month: number, day: number): HourSlot[] {
  return getHourDetails(year, month, day);
}

export function getAuspiciousHours(year: number, month: number, day: number, limit = 4): HourSlot[] {
  return getHourDetails(year, month, day)
    .filter((slot) => slot.isAuspicious)
    .slice(0, limit);
}
