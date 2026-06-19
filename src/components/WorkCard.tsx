import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";
import { withBase } from "@/lib/base-path";

// 一覧用サムネ。ホバーで画像をわずかに拡大しつつ、ラベルのオーバーレイをフェードイン。
export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block w-full sm:w-[46%] lg:w-[356px]"
    >
      <div className="border-hairline relative aspect-[356/264] w-full overflow-hidden border bg-white">
        <Image
          src={withBase(work.thumbnail)}
          alt={work.thumbnailLabel}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 356px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* ホバーオーバーレイ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-strong/0 opacity-0 transition-all duration-500 group-hover:bg-ink-strong/55 group-hover:opacity-100">
          <span className="font-mincho text-paper text-lg tracking-[0.15em]">
            {work.thumbnailLabel}
          </span>
          <span className="font-garamond text-paper text-[11px] tracking-[0.3em]">
            VIEW &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
