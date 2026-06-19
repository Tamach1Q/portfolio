import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/about";
import { works } from "@/data/works";
import VerticalHeading from "@/components/VerticalHeading";
import WorkCard from "@/components/WorkCard";
import ContactCTA from "@/components/ContactCTA";
import FadeIn from "@/components/FadeIn";
import { withBase } from "@/lib/base-path";

export default function Home() {
  return (
    <>
      {/* ===== FV: 縦書きのメインコピー ===== */}
      <section className="relative flex min-h-[72vh] w-full items-center justify-center px-6 pt-6 pb-20 md:min-h-[80vh] md:px-12">
        <FadeIn y={32}>
          <h1 className="writing-vertical-upright font-mincho text-ink-strong text-[40px] leading-[1.35] tracking-[0.18em] md:text-[52px] lg:text-[58px]">
            機能を超え、
            <br />
            心を震わす熱狂を
            <br />
            実装する。
          </h1>
        </FadeIn>

        {/* Scroll インジケータ（右下） */}
        <div className="absolute right-6 bottom-10 flex flex-col items-center gap-3 md:right-12">
          <span className="writing-vertical font-garamond text-muted text-[11px] tracking-[0.3em]">
            Scroll
          </span>
          <span aria-hidden className="bg-hairline-strong h-16 w-px md:h-20" />
        </div>
      </section>

      {/* ===== 自己紹介概要 ===== */}
      <section className="w-full px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-10 md:flex-row md:justify-between md:gap-12">
          {/* 見出し */}
          <FadeIn className="order-1 md:order-1">
            <VerticalHeading text="自己紹介" />
          </FadeIn>

          {/* 本文 + もっと見るリンク */}
          <FadeIn
            delay={0.1}
            className="order-3 max-w-full md:order-2 md:flex md:items-start md:gap-8"
          >
            <Link
              href="/about"
              className="font-mincho text-muted hover:text-ink mb-6 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] transition-colors duration-300 md:mb-0 md:[text-orientation:upright] md:[writing-mode:vertical-rl]"
            >
              自己紹介をもっと見る
            </Link>
            <p className="font-mincho text-ink max-w-prose text-[13px] leading-[2.1] tracking-[0.05em] md:max-h-[420px] md:max-w-none md:text-[14px] md:leading-[2.4] md:[text-orientation:mixed] md:[writing-mode:vertical-rl]">
              {profile.intro}
            </p>
          </FadeIn>

          {/* 人物写真 */}
          <FadeIn delay={0.2} className="order-2 w-full md:order-3 md:w-[340px]">
            <div className="border-hairline relative aspect-[372/280] w-full overflow-hidden border md:aspect-[340/420]">
              <Image
                src={withBase(profile.photo)}
                alt={profile.nameJa}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== 仕事サムネ ===== */}
      <section className="w-full px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-start justify-between gap-6">
            <FadeIn>
              <Link
                href="/works"
                className="font-mincho text-muted hover:text-ink inline-flex items-center gap-2 text-[12px] tracking-[0.2em] transition-colors duration-300 md:[text-orientation:upright] md:[writing-mode:vertical-rl]"
              >
                成果物をもっと見る
              </Link>
            </FadeIn>
            <FadeIn className="flex justify-end">
              <Link href="/works" aria-label="仕事ページへ">
                <VerticalHeading text="仕事" note="これまでの仕事" />
              </Link>
            </FadeIn>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-12 md:mt-16">
            {works.map((work, i) => (
              <FadeIn
                key={work.slug}
                delay={i * 0.08}
                className="flex w-full justify-center sm:w-[46%] lg:w-[300px]"
              >
                <WorkCard work={work} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== お問い合わせ ===== */}
      <ContactCTA />
    </>
  );
}
