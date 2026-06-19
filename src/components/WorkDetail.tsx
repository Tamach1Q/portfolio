import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";
import FadeIn from "@/components/FadeIn";
import ChallengeBlock from "@/components/ChallengeBlock";
import { withBase } from "@/lib/base-path";

// プロジェクト詳細の本体。データ1件＋次プロジェクトを受け取り、テンプレートを描画する。
export default function WorkDetail({
  work,
  next,
}: {
  work: Work;
  next: Work;
}) {
  return (
    <article className="mx-auto w-full max-w-[1000px] px-6 pt-16 pb-10 md:px-12 md:pt-24">
      {/* ヒーロー画像 */}
      <FadeIn>
        <div className="border-hairline relative aspect-[16/10] w-full overflow-hidden border bg-white">
          <Image
            src={withBase(work.heroImage)}
            alt={work.title}
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 1000px"
            className="object-contain p-6 md:p-10"
          />
        </div>
      </FadeIn>

      {/* タイトル・概要・スタック */}
      <FadeIn className="mt-12 md:mt-16">
        <h1 className="font-mincho text-ink-strong border-hairline border-b pb-5 text-2xl tracking-[0.08em] md:text-[28px]">
          {work.title}
        </h1>

        <p className="font-mincho text-ink mt-7 max-w-3xl text-[14px] leading-[2.1] tracking-[0.05em] md:text-[15px]">
          {work.summary}
        </p>

        <dl className="font-garamond text-ink mt-8 space-y-2 text-[13px] leading-relaxed tracking-[0.04em] md:text-[14px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="text-muted shrink-0 sm:w-28">Languages</dt>
            <dd>{work.stack.languages}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="text-muted shrink-0 sm:w-28">Libraries</dt>
            <dd>{work.stack.libraries}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="text-muted shrink-0 sm:w-28">Techniques</dt>
            <dd>{work.stack.techniques}</dd>
          </div>
        </dl>
      </FadeIn>

      {/* 挿絵（内容写真）。タイトル・概要・スタックの下、課題の上に置く */}
      {work.illustration && (
        <FadeIn className="mt-12 md:mt-16">
          <div className="border-hairline relative aspect-[1500/780] w-full max-w-2xl overflow-hidden border">
            <Image
              src={withBase(work.illustration)}
              alt={`${work.title} の様子`}
              fill
              sizes="(max-width: 1000px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        </FadeIn>
      )}

      {/* 課題 / アプローチ / 結果 */}
      <div className="mt-16 space-y-14 md:mt-20 md:space-y-16">
        <ChallengeBlock variant="challenge" body={work.challenge} />
        <ChallengeBlock variant="approach" body={work.approach} />
        <ChallengeBlock variant="result" body={work.result} />
      </div>

      {/* NEXT → / GitHub → */}
      <div className="border-hairline mt-16 flex items-center justify-between border-t pt-8 md:mt-20">
        {work.githubUrl ? (
          <a
            href={work.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-garamond text-ink hover:text-muted text-sm tracking-[0.2em] transition-colors duration-300"
          >
            GitHub &rarr;
          </a>
        ) : (
          <span />
        )}
        <Link
          href={`/works/${next.slug}`}
          className="font-garamond text-ink group inline-flex items-center gap-2 text-sm tracking-[0.2em] transition-colors duration-300 hover:text-muted"
        >
          <span className="text-muted text-[11px]">NEXT</span>
          <span className="font-mincho tracking-[0.1em]">{next.thumbnailLabel}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
