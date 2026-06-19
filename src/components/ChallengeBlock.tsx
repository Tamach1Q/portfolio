import FadeIn from "@/components/FadeIn";

type Variant = "challenge" | "approach" | "result";

const meta: Record<Variant, { heading: string; icon: React.ReactNode }> = {
  challenge: {
    heading: "課題",
    // 虫眼鏡
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </>
    ),
  },
  approach: {
    heading: "アプローチ",
    // 電球
    icon: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 1 3.5 10.9c-.6.5-1 1.2-1 2H9.5c0-.8-.4-1.5-1-2A6 6 0 0 1 12 3Z" />
      </>
    ),
  },
  result: {
    heading: "結果",
    // クリップボード
    icon: (
      <>
        <rect x="5" y="4" width="14" height="18" rx="1.5" />
        <path d="M9 4V2.8C9 2.4 9.4 2 9.8 2h4.4c.4 0 .8.4.8.8V4" />
        <line x1="8.5" y1="10" x2="15.5" y2="10" />
        <line x1="8.5" y1="14" x2="15.5" y2="14" />
        <line x1="8.5" y1="18" x2="12.5" y2="18" />
      </>
    ),
  },
};

// 課題 / アプローチ / 結果 の1ブロック（アイコン + 見出し + 本文）
export default function ChallengeBlock({
  variant,
  body,
}: {
  variant: Variant;
  body: string;
}) {
  const { heading, icon } = meta[variant];
  return (
    <FadeIn as="section" className="border-hairline border-t pt-8 md:pt-10">
      <div className="mb-5 flex items-center gap-4 md:mb-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink h-7 w-7 shrink-0 md:h-8 md:w-8"
          aria-hidden
        >
          {icon}
        </svg>
        <h2 className="font-mincho text-ink-strong text-xl tracking-[0.1em] md:text-2xl">
          {heading}
        </h2>
      </div>
      <p className="font-mincho text-ink max-w-3xl text-[14px] leading-[2.1] tracking-[0.05em] md:text-[15px]">
        {body}
      </p>
    </FadeIn>
  );
}
