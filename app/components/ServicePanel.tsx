"use client";

import { Bell, BookOpen, Flame, Sparkles } from "lucide-react";
import { useState } from "react";
import DeitySearch from "./DeitySearch";
import FortuneTelling from "./FortuneTelling";
import LampLighting from "./LampLighting";
import WorshipReminder from "./WorshipReminder";

const tabs = [
  { id: "deity", label: "神明推薦", icon: Sparkles },
  { id: "fortune", label: "命理查詢", icon: BookOpen },
  { id: "lamp", label: "點燈指南", icon: Flame },
  { id: "reminder", label: "拜拜提醒", icon: Bell },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ServicePanel() {
  const [activeTab, setActiveTab] = useState<TabId>("deity");

  return (
    <div className="service-panel">
      <div className="service-tabs" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              aria-selected={activeTab === tab.id}
              className={`service-tab ${activeTab === tab.id ? "active" : ""}`}
              key={tab.id}
              role="tab"
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="service-tab-content" role="tabpanel">
        {activeTab === "fortune" && <FortuneTelling />}
        {activeTab === "lamp" && <LampLighting />}
        {activeTab === "reminder" && <WorshipReminder />}
        {activeTab === "deity" && <DeitySearch />}
      </div>
    </div>
  );
}
