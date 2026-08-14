const PREFIX = "daystw:";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export type WorshipReminder = {
  id: string;
  createdAt: string;
  title: string;
  deity: string;
  eventType: string;
  solarDate: string;
  lunarNote: string;
  offering: string;
  note: string;
  enabled: boolean;
};

export type SavedDate = {
  id: string;
  iso: string;
  purpose: string;
  summary: string;
  savedAt: string;
};

export type AppSettings = {
  elderMode: boolean;
  excludeBadDays: boolean;
  notificationsEnabled: boolean;
  myZodiac: string;
  familyZodiacs: string[];
};

const defaultSettings: AppSettings = {
  elderMode: false,
  excludeBadDays: true,
  notificationsEnabled: false,
  myZodiac: "",
  familyZodiacs: [],
};

export const storage = {
  getReminders: () => read<WorshipReminder[]>("reminders", []),
  saveReminder: (reminder: WorshipReminder) => {
    const list = storage.getReminders();
    write("reminders", [reminder, ...list]);
  },
  toggleReminder: (id: string) => {
    const list = storage.getReminders().map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r,
    );
    write("reminders", list);
  },
  deleteReminder: (id: string) => {
    write(
      "reminders",
      storage.getReminders().filter((r) => r.id !== id),
    );
  },

  getSavedDates: () => read<SavedDate[]>("saved-dates", []),
  saveDate: (entry: SavedDate) => {
    const list = storage.getSavedDates().filter((d) => d.iso !== entry.iso || d.purpose !== entry.purpose);
    write("saved-dates", [entry, ...list]);
  },
  removeSavedDate: (id: string) => {
    write(
      "saved-dates",
      storage.getSavedDates().filter((d) => d.id !== id),
    );
  },
  isDateSaved: (iso: string, purpose: string) =>
    storage.getSavedDates().some((d) => d.iso === iso && d.purpose === purpose),

  getSettings: () => ({ ...defaultSettings, ...read<Partial<AppSettings>>("settings", {}) }),
  saveSettings: (settings: AppSettings) => write("settings", settings),
  updateSettings: (patch: Partial<AppSettings>) => {
    storage.saveSettings({ ...storage.getSettings(), ...patch });
  },
};

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** 頁面載入時檢查今日提醒並發送瀏覽器通知 */
export function notifyDueReminders(): void {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const due = storage.getReminders().filter((r) => r.enabled && r.solarDate === todayStr);

  for (const reminder of due) {
    new Notification("吉日通｜拜拜提醒", {
      body: `${reminder.title} — ${reminder.deity}`,
      tag: reminder.id,
    });
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  storage.updateSettings({ notificationsEnabled: result === "granted" });
  return result === "granted";
}

export function registerServiceWorker(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
