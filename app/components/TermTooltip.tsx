"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  term: string;
  plain: string;
  kind?: "yi" | "ji";
  children: React.ReactNode;
};

export default function TermTooltip({ term, plain, kind, children }: Props) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const vw = window.innerWidth;

    let shiftX = 0;
    if (tooltipRect.left < 8) shiftX += 8 - tooltipRect.left;
    if (tooltipRect.right + shiftX > vw - 8) shiftX -= tooltipRect.right + shiftX - (vw - 8);
    tooltip.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
  }, [open]);

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
          ref={tooltipRef}
          role="tooltip"
        >
          <span className="term-tooltip-head">{term}</span>
          <span className="term-tooltip-body">{plain}</span>
        </span>
      )}
    </span>
  );
}
