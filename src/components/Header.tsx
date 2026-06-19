import Link from "next/link";

// 縦書きグローバルナビ。Figma の並びは左から お問い合わせ / 仕事 / 自己紹介 / HOME。
const navItems = [
  { label: "お問い合わせ", href: "/contact" },
  { label: "仕事", href: "/works" },
  { label: "自己紹介", href: "/about" },
  { label: "HOME", href: "/" },
];

// ソーシャルリンク。
const socialLinks = [
  { label: "Github", href: "https://github.com/Tamach1Q" },
  { label: "Facebook", href: "https://www.facebook.com/share/14mMQ1UHxrS/" },
  { label: "Twitter", href: "https://x.com/_machidaaaa_" },
  { label: "Gmail", href: "mailto:akihiro77akihiro@gmail.com" },
];

export default function Header() {
  return (
    <header className="relative z-30 w-full px-5 pt-6 md:px-12 md:pt-10">
      {/* モバイル: 名前(左) + ナビ(右) を同じ行に。デスクトップ: ブロックに戻し、ナビは絶対配置。 */}
      <div className="flex items-start justify-between md:block">
        {/* 名前（EB Garamond） */}
        <div className="md:pl-44">
          <p className="font-garamond text-ink-strong text-[18px] leading-none tracking-[0.18em] md:text-[26px] md:tracking-[0.28em]">
            Akihiro Machida
          </p>
          <p className="font-garamond text-ink mt-2 text-[9px] font-medium tracking-[0.2em] md:text-[13px]">
            Machine Learning Engineer
          </p>
        </div>

        {/* グローバルナビ（モバイル: 右上に横書きで縦積み / デスクトップ: 右上に縦書きで横並び） */}
        <nav className="flex shrink-0 flex-col items-end gap-1.5 md:absolute md:top-10 md:right-24 md:flex-row md:items-start md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mincho text-ink hover:text-muted text-[12px] tracking-[0.2em] transition-colors duration-300 md:text-[15px] md:tracking-[0.25em] md:[text-orientation:upright] md:[writing-mode:vertical-rl]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ソーシャルリンク（モバイル: 名前下に横並び / デスクトップ: 左端に縦並び + 黒い縦バー） */}
      <div className="mt-3 flex items-center gap-4 md:absolute md:top-[74px] md:left-12 md:mt-0 md:items-stretch md:gap-3">
        <span aria-hidden className="bg-ink-strong hidden w-[6px] md:block" />
        <ul className="font-garamond text-ink flex flex-row gap-4 text-[9px] leading-[1.3] tracking-[0.06em] md:flex-col md:gap-[6px] md:text-[11px]">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-opacity duration-300 hover:opacity-50"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
