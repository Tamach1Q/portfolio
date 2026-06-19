import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "お問い合わせ | 町田 昂優 — Portfolio",
  description: "町田昂優へのお仕事のご依頼・お問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <section className="w-full px-6 pt-16 pb-24 md:px-12 md:pt-24 md:pb-32">
      <div className="mx-auto max-w-[900px]">
        <FadeIn>
          <p className="font-mincho text-ink mb-16 text-center text-[14px] tracking-[0.1em] md:mb-20 md:text-[15px]">
            お仕事のご依頼はお問い合わせフォームよりご連絡ください。
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
