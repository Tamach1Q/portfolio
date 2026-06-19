import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { works, getWork, getNextWork } from "@/data/works";
import WorkDetail from "@/components/WorkDetail";

// 4ページを静的書き出し
export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Not Found" };
  return {
    title: `${work.title} | 町田 昂優 — Portfolio`,
    description: work.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const next = getNextWork(slug);
  return <WorkDetail work={work} next={next} />;
}
