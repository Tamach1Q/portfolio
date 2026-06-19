// 大きな縦書き見出し（明朝・正立）。oniguili 系の主役要素。
// アウトライン化されていた Figma の見出しを実テキストで再現する。
export default function VerticalHeading({
  text,
  note,
  size = "lg",
  className = "",
}: {
  text: string;
  /** 見出しに添える小さな縦書き注記（例: これまでの仕事） */
  note?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "lg"
      ? "text-[56px] md:text-[80px] lg:text-[96px]"
      : "text-[44px] md:text-[60px] lg:text-[72px]";

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {note && (
        <span className="writing-vertical-upright font-mincho text-muted mt-2 text-[11px] tracking-[0.3em] md:text-[12px]">
          {note}
        </span>
      )}
      <h2
        className={`writing-vertical-upright font-mincho text-ink-strong leading-[1.05] tracking-[0.12em] ${sizeClass}`}
      >
        {text}
      </h2>
    </div>
  );
}
