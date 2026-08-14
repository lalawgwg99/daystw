"use client";

import { useState } from "react";

type Props = {
  term: string;
  plain: string;
  children: React.ReactNode;
};

export default function TermTooltip({ term, plain, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="term-tooltip-wrap"
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="term-tooltip" role="tooltip">
          <strong>{term}</strong>
          <span>{plain}</span>
        </span>
      )}
    </span>
  );
}
