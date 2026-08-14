"use client";

import { Bell, CheckCircle2, Trash2 } from "lucide-react";
import { Solar } from "lunar-javascript";
import { useCallback, useState } from "react";
import { deities } from "../data/deities";
import { generateId, storage, type WorshipReminder } from "../lib/storage";

const reminderTemplates = [
  {
    title: "考試前拜文昌帝君",
    deity: "文昌帝君",
    eventType: "考試",
    offering: "蔥、芹菜、包子、粽子",
    daysAhead: 7,
    note: "考試前一周準備供品，至文昌殿誠心祈求",
  },
  {
    title: "開工拜土地公",
    deity: "土地公",
    eventType: "開工",
    offering: "發糕、甜茶、水果",
    daysAhead: 1,
    note: "開工當日上午祭拜，祈求生意順遂",
  },
  {
    title: "搬家前拜地基主",
    deity: "地基主",
    eventType: "搬家",
    offering: "便飯、茶酒、水果、刈金",
    daysAhead: 0,
    note: "入宅前先拜地基主，再搬入家具",
  },
  {
    title: "初一十五拜拜",
    deity: "家神祖先",
    eventType: "定期",
    offering: "鮮花、素果、清茶",
    daysAhead: 0,
    note: "每月初一、十五準備簡單供品即可",
  },
];

function formatSolarDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getLunarNote(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return Solar.fromYmd(y, m, d).getLunar().toString();
}

export default function WorshipReminder() {
  const [reminders, setReminders] = useState<WorshipReminder[]>(() => storage.getReminders());
  const [title, setTitle] = useState("");
  const [deity, setDeity] = useState("文昌帝君");
  const [eventType, setEventType] = useState("考試");
  const [solarDate, setSolarDate] = useState("");
  const [offering, setOffering] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const refresh = useCallback(() => {
    setReminders(storage.getReminders());
  }, []);

  function applyTemplate(template: (typeof reminderTemplates)[0]) {
    const date = new Date();
    date.setDate(date.getDate() + template.daysAhead);
    setTitle(template.title);
    setDeity(template.deity);
    setEventType(template.eventType);
    setSolarDate(formatSolarDate(date));
    setOffering(template.offering);
    setNote(template.note);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !solarDate) return;

    storage.saveReminder({
      id: generateId(),
      createdAt: new Date().toISOString(),
      title,
      deity,
      eventType,
      solarDate,
      lunarNote: getLunarNote(solarDate),
      offering: offering || deities.find((d) => d.deities.includes(deity))?.offering || "",
      note,
      enabled: true,
    });
    refresh();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setTitle("");
    setNote("");
    setOffering("");
  }

  function handleToggle(id: string) {
    storage.toggleReminder(id);
    refresh();
  }

  function handleDelete(id: string) {
    storage.deleteReminder(id);
    refresh();
  }

  const upcoming = reminders
    .filter((r) => r.enabled && r.solarDate >= formatSolarDate(new Date()))
    .sort((a, b) => a.solarDate.localeCompare(b.solarDate));

  const today = formatSolarDate(new Date());
  const dueToday = upcoming.filter((r) => r.solarDate === today);

  return (
    <div className="service-module">
      <div className="service-module-head">
        <Bell size={20} />
        <div>
          <strong>拜拜提醒</strong>
          <p>建立個人拜拜日程，自動顯示國曆與農曆日期、建議供品。</p>
        </div>
      </div>

      <div className="refund-note">
        提醒僅保存在您的瀏覽器，不會發送任何外部通知，也不會收集個人資料。
      </div>

      {dueToday.length > 0 && (
        <div className="success-banner inline">
          <Bell size={18} />
          <span>今天有 {dueToday.length} 個拜拜提醒：{dueToday.map((r) => r.title).join("、")}</span>
        </div>
      )}

      <div className="template-row">
        <span className="template-label">快速套用：</span>
        {reminderTemplates.map((t) => (
          <button className="template-btn" key={t.title} type="button" onClick={() => applyTemplate(t)}>
            {t.title}
          </button>
        ))}
      </div>

      <form className="service-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            提醒名稱
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            事件類型
            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option>考試</option>
              <option>開工</option>
              <option>搬家</option>
              <option>節日</option>
              <option>定期</option>
              <option>其他</option>
            </select>
          </label>
          <label>
            神明
            <select value={deity} onChange={(e) => setDeity(e.target.value)}>
              {[...new Set(deities.flatMap((d) => d.deities))].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label>
            提醒日期（國曆）
            <input required type="date" value={solarDate} onChange={(e) => setSolarDate(e.target.value)} />
          </label>
          {solarDate && (
            <div className="lunar-preview">
              農曆：{getLunarNote(solarDate)}
            </div>
          )}
        </div>

        <label>
          供品清單
          <input
            placeholder="留空則自動帶入神明建議供品"
            type="text"
            value={offering}
            onChange={(e) => setOffering(e.target.value)}
          />
        </label>

        <label>
          備註
          <textarea
            placeholder="例如：記得準備金紙、拜拜時間為上午…"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        {submitted && (
          <div className="success-banner inline">
            <CheckCircle2 size={18} />
            <span>提醒已建立！將顯示在您的提醒清單中。</span>
          </div>
        )}

        <div className="form-actions">
          <button className="btn-primary" type="submit">
            建立提醒
          </button>
        </div>
      </form>

      {upcoming.length > 0 && (
        <div className="reminder-list">
          <div className="table-title">即將到來的提醒</div>
          {upcoming.map((r) => (
            <div className={`reminder-row ${r.enabled ? "" : "disabled"}`} key={r.id}>
              <div className="reminder-main">
                <strong>{r.title}</strong>
                <span>
                  {r.solarDate} · {r.lunarNote.replace(/二〇\d+年/, "")}
                </span>
                <small>
                  {r.deity}｜供品：{r.offering}
                  {r.note ? `｜${r.note}` : ""}
                </small>
              </div>
              <div className="reminder-actions">
                <button className="icon-btn" title={r.enabled ? "暫停" : "啟用"} type="button" onClick={() => handleToggle(r.id)}>
                  <Bell size={16} />
                </button>
                <button className="icon-btn danger" title="刪除" type="button" onClick={() => handleDelete(r.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
