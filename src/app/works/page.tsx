import type { Metadata } from "next";
import { works } from "@/data/works";
import WorksFilter from "@/components/WorksFilter";
import VerticalHeading from "@/components/VerticalHeading";
import ContactCTA from "@/components/ContactCTA";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "仕事 | 町田 昂優 — Portfolio",
  description: "町田昂優のこれまでの制作実績一覧。データ分析・AI実装・ゲーム開発。",
};

export default function WorksPage() {
  return (
    <>
      <section className="w-full px-6 pt-16 pb-12 md:px-12 md:pt-24">
        <div className="mx-auto max-w-[1256px]">
          <FadeIn>
            <VerticalHeading text="仕事" note="これまでの仕事" />
          </FadeIn>

          {/* 絞り込みは状態を持つためクライアント側に切り出している */}
          <WorksFilter works={works} />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
