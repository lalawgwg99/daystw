"use client";

import { useEffect, useState } from "react";
import FestivalSection from "./components/FestivalSection";
import FinderSection from "./components/FinderSection";
import MonthCalendar from "./components/MonthCalendar";
import SavedDatesPanel from "./components/SavedDatesPanel";
import ServicePanel from "./components/ServicePanel";
import SettingsBar, { applyStoredSettings, GlossaryPanel } from "./components/SettingsBar";
import TodayBanner from "./components/TodayBanner";
import ZodiacFortune from "./components/ZodiacFortune";
import { notifyDueReminders, registerServiceWorker } from "./lib/storage";

export default function Home() {
  const [settingsVersion, setSettingsVersion] = useState(0);

  useEffect(() => {
    applyStoredSettings();
    registerServiceWorker();
    notifyDueReminders();
  }, []);

  return (
    <main className="page-root">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-brand">
            <span className="brand-mark">吉</span>
            <span className="brand-name">吉日通</span>
          </div>
          <nav className="site-nav">
            <a href="#finder">找吉日</a>
            <a href="#calendar">今日黃曆</a>
            <a href="#month-calendar">月曆</a>
            <a href="#festival">節日</a>
            <a href="#saved">收藏</a>
            <a href="#services">民俗指南</a>
            <a href="#glossary">術語</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SettingsBar onChange={() => setSettingsVersion((v) => v + 1)} />
        <TodayBanner />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-6" id="month-calendar">
        <h2 className="section-title">月曆總覽</h2>
        <p className="service-desc">農曆、節氣、國定假日、黃道與凶日標記，點選日期查看詳情。</p>
        <MonthCalendar />
      </section>

      <FinderSection settingsVersion={settingsVersion} />

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-6" id="zodiac">
        <ZodiacFortune />
      </section>

      <FestivalSection />

      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6" id="saved">
        <SavedDatesPanel />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-5 lg:px-6" id="services">
        <h2 className="section-title">民俗指南</h2>
        <ServicePanel />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-5 lg:px-6">
        <GlossaryPanel />
      </div>

      <footer className="site-footer">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
          <p>SEO 專頁：</p>
          <div className="seo-links">
            <a href="/2026/move-in">2026 搬家吉日</a>
            <a href="/2026/wedding">2026 結婚吉日</a>
            <a href="/2026/business">2026 開工吉日</a>
            <a href="/2026/exam">2026 考試吉日</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
