"use client";

import { useEffect, useState } from "react";
import FestivalSection from "./components/FestivalSection";
import FinderSection from "./components/FinderSection";
import MonthCalendar from "./components/MonthCalendar";
import SavedDatesPanel from "./components/SavedDatesPanel";
import SectionBlock from "./components/SectionBlock";
import ServicePanel from "./components/ServicePanel";
import SiteHeader from "./components/SiteHeader";
import GlossaryWiki from "./components/GlossaryWiki";
import { applyStoredSettings } from "./components/SettingsBar";
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
      <SiteHeader onSettingsChange={() => setSettingsVersion((v) => v + 1)} />

      <div className="page-container">
        <div className="today-section today-section-first">
          <TodayBanner />
        </div>

        <FinderSection settingsVersion={settingsVersion} />

        <SectionBlock
          desc="每格顯示農曆、宜忌摘要；點選日期右側看完整說明。"
          id="month-calendar"
          title="月曆總覽"
        >
          <MonthCalendar />
        </SectionBlock>

        <SectionBlock id="zodiac" title="今日生肖運勢">
          <ZodiacFortune />
        </SectionBlock>

        <FestivalSection />

        <SectionBlock id="saved" title="收藏的吉日">
          <SavedDatesPanel embedded />
        </SectionBlock>

        <SectionBlock
          desc="神明推薦、命理、點燈與拜拜提醒。"
          id="services"
          title="民俗指南"
        >
          <ServicePanel />
        </SectionBlock>

        <SectionBlock id="glossary" variant="band">
          <GlossaryWiki preview />
        </SectionBlock>
      </div>

      <footer className="site-footer">
        <div className="section-inner">
          <p className="footer-tagline">吉日通 — 為台灣家庭做的免費農民曆</p>
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
