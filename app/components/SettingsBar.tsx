"use client";

import { BookOpen, Type } from "lucide-react";
import { useState } from "react";
import { termEntries } from "../data/glossary";
import { requestNotificationPermission, storage } from "../lib/storage";

type Props = {
  onChange?: () => void;
};

export default function SettingsBar({ onChange }: Props) {
  const [settings, setSettings] = useState(() => storage.getSettings());

  function refresh() {
    setSettings(storage.getSettings());
    onChange?.();
  }

  function toggleElderMode() {
    const next = !settings.elderMode;
    storage.updateSettings({ elderMode: next });
    document.documentElement.classList.toggle("elder-mode", next);
    refresh();
  }

  function toggleBadDays() {
    storage.updateSettings({ excludeBadDays: !settings.excludeBadDays });
    refresh();
  }

  async function enableNotifications() {
    await requestNotificationPermission();
    refresh();
  }

  return (
    <div className="settings-bar">
      <button
        className={`settings-btn ${settings.elderMode ? "active" : ""}`}
        type="button"
        onClick={toggleElderMode}
      >
        <Type size={16} />
        長輩模式
      </button>
      <button
        className={`settings-btn ${settings.excludeBadDays ? "active" : ""}`}
        type="button"
        onClick={toggleBadDays}
      >
        <BookOpen size={16} />
        排除凶日
      </button>
      <button className="settings-btn" type="button" onClick={enableNotifications}>
        開啟提醒通知
      </button>
    </div>
  );
}

export function GlossaryPanel() {
  return (
    <div className="glossary-panel" id="glossary">
      <h2 className="section-title">術語小百科</h2>
      <p className="service-desc">黃曆常見名詞白話解釋，長輩也能一眼看懂。</p>
      <div className="glossary-grid">
        {termEntries.map((entry) => (
          <article className="glossary-card" key={entry.term}>
            <strong>{entry.term}</strong>
            <p>{entry.plain}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function applyStoredSettings(): void {
  const settings = storage.getSettings();
  document.documentElement.classList.toggle("elder-mode", settings.elderMode);
}
