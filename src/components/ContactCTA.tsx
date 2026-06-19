import Link from "next/link";
import VerticalHeading from "@/components/VerticalHeading";
import FadeIn from "@/components/FadeIn";

const EMAIL = "akihiro77akihiro@gmail.com";

// ホーム・仕事ページ下部に置く「お問い合わせ」への誘導ブロック。
export default function ContactCTA() {
  return (
    <section className="w-full px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto flex max-w-[1100px] items-start justify-between gap-8">
        {/* 左: Gmail ラベル + メールアドレス */}
        <FadeIn className="flex flex-col gap-4 pt-4">
          <span className="font-garamond text-ink text-xl tracking-[0.2em] md:text-2xl">
            Gmail
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="font-garamond text-muted hover:text-ink text-[12px] tracking-[0.1em] underline-offset-4 transition-colors duration-300 hover:underline md:text-[14px]"
          >
            {EMAIL}
          </a>
          <Link
            href="/contact"
            className="font-mincho text-ink hover:text-muted mt-4 inline-flex items-center gap-2 text-sm tracking-[0.15em] transition-colors duration-300"
          >
            フォームへ <span aria-hidden>&rarr;</span>
          </Link>
        </FadeIn>

        {/* 右: 大きな縦書き見出し */}
        <FadeIn className="flex justify-end">
          <Link href="/contact" aria-label="お問い合わせページへ">
            <VerticalHeading text="お問い合わせ" size="md" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
