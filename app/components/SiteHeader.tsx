"use client";

import { Bell, BookOpen, Menu, Type, X } from "lucide-react";
import { useEffect, useState } from "react";
import { requestNotificationPermission, storage } from "../lib/storage";

const navItems = [
  { href: "#finder", label: "找吉日" },
  { href: "#calendar", label: "今日" },
  { href: "#month-calendar", label: "月曆" },
  { href: "#services", label: "民俗" },
];

type Props = {
  onSettingsChange?: () => void;
};

export default function SiteHeader({ onSettingsChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [settings, setSettings] = useState(() => storage.getSettings());

  useEffect(() => {
    const sections = ["finder", "calendar", "month-calendar", "zodiac", "festival", "services"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function refresh() {
    setSettings(storage.getSettings());
    onSettingsChange?.();
  }

  function toggleElderMode() {
    const next = !settings.elderMode;
    storage.updateSettings({ elderMode: next });
    document.documentElement.classList.toggle("elder-mode", next);
    refresh();
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href="#top">
          <span className="brand-mark">吉</span>
          <span className="brand-name">吉日通</span>
        </a>

        <nav aria-label="主要導覽" className="site-nav desktop-only">
          {navItems.map((item) => (
            <a
              className={`nav-link ${active === item.href.slice(1) ? "active" : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            aria-label="長輩模式"
            className={`header-icon-btn ${settings.elderMode ? "active" : ""}`}
            title="長輩模式：放大字級"
            type="button"
            onClick={toggleElderMode}
          >
            <Type size={18} />
          </button>
          <button
            aria-label="開啟通知"
            className="header-icon-btn"
            title="開啟拜拜提醒通知"
            type="button"
            onClick={() => requestNotificationPermission().then(refresh)}
          >
            <Bell size={18} />
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label="選單"
            className="header-icon-btn mobile-only"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="手機選單" className="mobile-nav">
          {navItems.map((item) => (
            <a
              className={`nav-link ${active === item.href.slice(1) ? "active" : ""}`}
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-link" href="#festival" onClick={() => setMenuOpen(false)}>
            節日
          </a>
          <a className="nav-link" href="#saved" onClick={() => setMenuOpen(false)}>
            收藏
          </a>
          <a className="nav-link" href="#glossary" onClick={() => setMenuOpen(false)}>
            <BookOpen size={14} /> 術語
          </a>
        </nav>
      )}
    </header>
  );
}
