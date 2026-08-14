"use client";

import { useId, useState } from "react";

type Props = {
  term: string;
  plain: string;
  kind?: "yi" | "ji";
  children: React.ReactNode;
};

export default function TermTooltip({ term, plain, kind, children }: Props) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span
      aria-describedby={open ? tooltipId : undefined}
      className="term-tooltip-wrap"
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          className={`term-tooltip${kind ? ` term-tooltip-${kind}` : ""}`}
          id={tooltipId}
          role="tooltip"
        >
          <span className="term-tooltip-head">{term}</span>
          <span className="term-tooltip-body">{plain}</span>
        </span>
      )}
    </span>
  );
}
