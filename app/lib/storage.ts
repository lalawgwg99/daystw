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
};

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
