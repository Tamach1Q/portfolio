"use client";

import { useMemo, useState } from "react";
import { WORK_CATEGORIES, type Work, type WorkCategory } from "@/data/works";
import WorkCard from "@/components/WorkCard";
import FadeIn from "@/components/FadeIn";

// 「すべて」を先頭に置いた選択肢。null = 絞り込みなし。
const OPTIONS: { label: string; value: WorkCategory | null }[] = [
  { label: "すべて", value: null },
  ...WORK_CATEGORIES.map((c) => ({ label: c, value: c as WorkCategory })),
];

export default function WorksFilter({ works }: { works: Work[] }) {
  const [active, setActive] = useState<WorkCategory | null>(null);

  const filtered = useMemo(
    () => (active === null ? works : works.filter((w) => w.category === active)),
    [works, active],
  );

  // 各カテゴリの件数。0件のタブは押せないようにして空振りを防ぐ。
  const counts = useMemo(() => {
    const map = new Map<WorkCategory, number>();
    for (const w of works) map.set(w.category, (map.get(w.category) ?? 0) + 1);
    return map;
  }, [works]);

  return (
    <>
      {/* フィルター。横スクロールさせず、狭い画面では折り返す */}
      <FadeIn>
        <div
          role="group"
          aria-label="カテゴリで絞り込む"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-5"
        >
          {OPTIONS.map(({ label, value }) => {
            const count = value === null ? works.length : (counts.get(value) ?? 0);
            const isActive = active === value;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActive(value)}
                disabled={count === 0}
                aria-pressed={isActive}
                className={[
                  "font-mincho border-hairline inline-flex h-9 items-center gap-2 border px-4 text-[13px] tracking-[0.15em] transition-colors duration-300",
                  isActive
                    ? "bg-ink-strong text-paper border-transparent"
                    : "text-ink hover:bg-ink-strong/5",
                  count === 0 ? "cursor-not-allowed opacity-35" : "",
                ].join(" ")}
              >
                {label}
                <span className="font-garamond text-[11px] tracking-[0.1em] opacity-60">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* 件数は視覚的にも読み上げにも出す。フィルター操作の結果をその場で伝える */}
      <p
        aria-live="polite"
        className="font-garamond text-muted mt-6 text-center text-[11px] tracking-[0.25em]"
      >
        {filtered.length} {filtered.length === 1 ? "WORK" : "WORKS"}
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-x-[60px] gap-y-[60px] lg:mt-14 lg:gap-x-[94px] lg:gap-y-[94px]">
        {filtered.map((work, i) => (
          <FadeIn
            key={work.slug}
            delay={i * 0.08}
            className="flex w-full justify-center sm:w-[46%] lg:w-[356px]"
          >
            <WorkCard work={work} />
          </FadeIn>
        ))}
      </div>
    </>
  );
}
