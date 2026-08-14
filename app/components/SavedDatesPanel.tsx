"use client";

import { Heart, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { storage } from "../lib/storage";

export default function SavedDatesPanel() {
  const [saved, setSaved] = useState(() => storage.getSavedDates());

  const refresh = useCallback(() => {
    setSaved(storage.getSavedDates());
  }, []);

  if (saved.length === 0) {
    return (
      <div>
        <h2 className="section-title">收藏的吉日</h2>
        <div className="empty-state compact">在推薦吉日卡片點「收藏」，就會顯示在這裡。</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">收藏的吉日</h2>
      <div className="reminder-list">
        {saved.map((item) => (
          <div className="reminder-row" key={item.id}>
            <div className="reminder-main">
              <strong>
                <Heart size={14} /> {item.iso} — {item.purpose}
              </strong>
              <span>{item.summary}</span>
            </div>
            <button
              className="icon-btn danger"
              title="移除"
              type="button"
              onClick={() => {
                storage.removeSavedDate(item.id);
                refresh();
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
