import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: string;
  desc?: string;
  variant?: "default" | "band";
  children: ReactNode;
};

export default function SectionBlock({
  id,
  title,
  desc,
  variant = "default",
  children,
}: Props) {
  return (
    <section className={`section-block ${variant === "band" ? "band" : ""}`} id={id}>
      <div className="section-inner">
        <header className="section-head-block">
          <h2 className="section-title">{title}</h2>
          {desc && <p className="section-desc">{desc}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
