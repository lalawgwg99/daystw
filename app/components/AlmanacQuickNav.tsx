"use client";

import { useEffect, useState } from "react";

const items = [
  { href: "#calendar", label: "黃曆查詢", id: "calendar" },
  { href: "#finder", label: "找好日子", id: "finder" },
  { href: "#finder?purpose=嫁娶", label: "結婚擇日", id: "finder-wedding" },
  { href: "#festival?category=jieqi", label: "二十四節氣", id: "festival-jieqi" },
  { href: "#festival?category=deity", label: "查神明誕辰", id: "festival-deity" },
  { href: "/wiki", label: "宜忌解說", id: "wiki", external: true },
  { href: "#converter", label: "國農曆轉換", id: "converter" },
];

export default function AlmanacQuickNav() {
  const [active, setActive] = useState("calendar");

  useEffect(() => {
    function sync() {
      const raw = window.location.hash.replace(/^#/, "");
      const section = raw.split("?")[0] || "calendar";
      if (["calendar", "finder", "converter", "festival"].includes(section)) {
        setActive(section);
      }
    }
    sync();
    window.addEventListener("hashchange", sync);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (id && ["calendar", "finder", "converter", "festival"].includes(id)) {
          setActive(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    for (const id of ["calendar", "finder", "converter", "festival"]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("hashchange", sync);
      observer.disconnect();
    };
  }, []);

  return (
    <nav aria-label="農民曆快捷功能" className="almanac-quick-nav">
      <div className="almanac-quick-nav-inner scroll-x">
        {items.map((item) => (
          <a
            className={`almanac-quick-link ${
              !item.external && (active === item.id || active === item.href.slice(1).split("?")[0])
                ? "active"
                : ""
            }`}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
