import * as React from "react"
import "./pagination.css"

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  
  total?: number
  
  current?: number
}

function buildItems(current: number, total: number): (number | "gap")[] {
  const wanted = new Set<number>([1, total])
  for (const n of [current - 2, current - 1, current, current + 1, current + 2]) if (n >= 1 && n <= total) wanted.add(n)
  const sorted = [...wanted].sort((a, b) => a - b)
  const out: (number | "gap")[] = []
  for (const n of sorted) {
    const prev = out[out.length - 1]
    if (prev !== undefined && typeof prev === "number" && n - prev > 1) out.push("gap")
    out.push(n)
  }
  return out
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden>
      {dir === "left" ? (
        <path d="M6.4 1L2.4 6L6.4 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M1.6 1L5.6 6L1.6 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function Pagination({ total = 1, current = 1, ...props }: PaginationProps) {
  const items = buildItems(Math.min(current, Math.max(total, 1)), Math.max(total, 1))
  return (
    <nav aria-label="Pagination" {...props}>
      <div className="pds-pg">
        <button type="button" className="pds-pg__cell pds-pg__cell--prev" disabled={current <= 1} aria-label="Previous page">
          <Chevron dir="left" />
        </button>
        {items.map((item, i) =>
          item === "gap" ? (
            <span key={"gap-" + i} className="pds-pg__cell pds-pg__ellipsis" aria-hidden>{"..."}</span>
          ) : (
            <button
              type="button"
              key={item}
              className={"pds-pg__cell " + (item % 2 === 1 ? "pds-pg__cell--odd" : "pds-pg__cell--even")}
              aria-current={item === current ? ("page" as const) : undefined}
            >
              {item}
            </button>
          ),
        )}
        <button type="button" className="pds-pg__cell pds-pg__cell--next" disabled={current >= total} aria-label="Next page">
          <Chevron dir="right" />
        </button>
      </div>
    </nav>
  )
}

Pagination.displayName = "Pella Pagination"
