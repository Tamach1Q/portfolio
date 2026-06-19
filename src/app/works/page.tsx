import type { Metadata } from "next";
import { works } from "@/data/works";
import WorkCard from "@/components/WorkCard";
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

          <div className="mt-14 flex flex-wrap justify-center gap-x-[60px] gap-y-[60px] lg:mt-20 lg:gap-x-[94px] lg:gap-y-[94px]">
            {works.map((work, i) => (
              <FadeIn
                key={work.slug}
                delay={i * 0.08}
                className="flex w-full justify-center sm:w-[46%] lg:w-[356px]"
              >
                <WorkCard work={work} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
