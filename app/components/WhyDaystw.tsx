import { BookOpen, Heart, MapPin } from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "免費無廣告",
    desc: "農民曆、擇日、時辰查詢全部開放，沒有付費牆或點數制。",
  },
  {
    icon: BookOpen,
    title: "白話沖煞",
    desc: "不只列生肖，還標出生年、虛歲與煞方說明，長輩也看得懂。",
  },
  {
    icon: MapPin,
    title: "台灣在地",
    desc: "國定假日、廟宇推薦、民俗百科與拜拜提醒，為台灣家庭設計。",
  },
];

export default function WhyDaystw() {
  return (
    <section aria-labelledby="why-daystw-title" className="why-daystw">
      <h2 id="why-daystw-title">為什麼選吉日通？</h2>
      <ul className="why-daystw-list">
        {items.map(({ icon: Icon, title, desc }) => (
          <li key={title}>
            <span className="why-daystw-icon">
              <Icon aria-hidden size={20} />
            </span>
            <strong>{title}</strong>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
