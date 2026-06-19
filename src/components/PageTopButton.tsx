"use client";

export default function PageTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full justify-center pt-12 pb-3 md:pt-20 md:pb-4">
      <button
        type="button"
        onClick={handleClick}
        className="font-garamond text-ink group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] transition-opacity duration-300 hover:opacity-60 md:text-[12px]"
        aria-label="ページ上部へ戻る"
      >
        <span className="block leading-none transition-transform duration-300 group-hover:-translate-y-1">
          ↑
        </span>
        <span>PAGE TOP</span>
      </button>
    </div>
  );
}
