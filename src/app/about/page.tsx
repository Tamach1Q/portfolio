import type { Metadata } from "next";
import Image from "next/image";
import { profile, timeline } from "@/data/about";
import VerticalHeading from "@/components/VerticalHeading";
import FadeIn from "@/components/FadeIn";
import { withBase } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "自己紹介 | 町田 昂優 — Portfolio",
  description:
    "町田昂優のプロフィール・略歴・Mission / Vision / Concept。神山まるごと高専在学中の機械学習エンジニア。",
};

export default function AboutPage() {
  return (
    <>
      {/* ===== 自己紹介 ===== */}
      <section className="w-full px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-10 md:flex-row md:justify-between md:gap-12">
          {/* 写真 */}
          <FadeIn className="order-2 w-full md:order-1 md:w-[360px]">
            <div className="border-hairline relative aspect-[363/509] w-full overflow-hidden border">
              <Image
                src={withBase(profile.photo)}
                alt={profile.nameJa}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* 本文 */}
          <FadeIn delay={0.1} className="order-3 max-w-full md:order-2">
            <p className="font-mincho text-ink max-w-prose text-[13px] leading-[2.1] tracking-[0.05em] md:max-h-[480px] md:max-w-none md:text-[14px] md:leading-[2.4] md:[text-orientation:mixed] md:[writing-mode:vertical-rl]">
              {profile.introFull}
            </p>
          </FadeIn>

          {/* 見出し + 名前 */}
          <FadeIn className="order-1 flex items-start gap-6 md:order-3">
            <div className="writing-vertical-upright font-mincho flex items-start gap-2">
              <span className="text-ink-strong text-2xl tracking-[0.2em] md:text-[28px]">
                {profile.nameJa}
              </span>
              <span className="text-muted text-[11px] tracking-[0.2em]">
                {profile.nameReading}
              </span>
            </div>
            <VerticalHeading text="自己紹介" />
          </FadeIn>
        </div>
      </section>

      {/* ===== 略歴 ===== */}
      <section className="border-hairline w-full border-t px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-12 md:flex-row md:justify-between md:gap-16">
          <FadeIn>
            <VerticalHeading text="略歴" />
          </FadeIn>

          <div className="flex-1 md:max-w-[640px]">
            {/* 年表 */}
            <FadeIn>
              <ul className="border-hairline border-t">
                {timeline.map((t) => (
                  <li
                    key={t.date}
                    className="border-hairline flex items-baseline gap-5 border-b py-4 md:gap-8"
                  >
                    <span className="font-garamond text-ink-strong w-20 shrink-0 text-[15px] tracking-[0.08em] md:text-[16px]">
                      {t.date}
                    </span>
                    <span className="font-mincho text-ink text-[14px] tracking-[0.05em] md:text-[15px]">
                      {t.label}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* 略歴文 */}
            <FadeIn delay={0.1}>
              <p className="font-mincho text-ink mt-10 text-[13px] leading-[2.1] tracking-[0.05em] md:text-[14px]">
                {profile.bio}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== 私の軸（未公開） ===== */}
      <section className="border-hairline flex min-h-[360px] w-full items-center justify-center border-t px-6 py-20 md:min-h-[480px] md:px-12 md:py-28">
        <FadeIn className="w-full text-center">
          <span className="font-garamond text-muted text-sm tracking-[0.35em] md:text-base">
            coming soon...
          </span>
        </FadeIn>
      </section>
    </>
  );
}
