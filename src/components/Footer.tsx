// フッター（全ページ共通）。Figma / PDF 準拠：
// 全幅（フルブリード）の細い罫線の右半分に黒い太線を重ね、左に大きな PORTFOLIO、
// 右上に Akihiro Machida。PORTFOLIO のベースラインが罫線に乗る。
export default function Footer() {
  return (
    <footer className="w-full pb-9 md:pb-12">
      <div className="relative">
        {/* 全幅の細い罫線 */}
        <span
          aria-hidden
          className="bg-hairline absolute inset-x-0 bottom-0 h-px"
        />
        {/* 右側の黒い太線（罫線に重ねる・右端までフルブリード） */}
        <span
          aria-hidden
          className="bg-ink-strong absolute right-0 -bottom-px h-[3px] w-1/2 md:h-[4px]"
        />

        {/* テキスト行（左右に余白を取る） */}
        <div className="flex items-end justify-between gap-4 px-6 md:px-12">
          <span className="font-garamond text-ink-strong text-[26px] leading-[0.78] tracking-[0.2em] md:text-[46px] md:tracking-[0.38em]">
            PORTFOLIO
          </span>
          <span className="font-garamond text-ink mb-1 shrink-0 text-[9px] tracking-[0.18em] md:mb-2 md:text-[13px] md:tracking-[0.3em]">
            Akihiro Machida
          </span>
        </div>
      </div>
    </footer>
  );
}
