"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type As = "div" | "section" | "li" | "span";

const MOTION = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
} as const;

type FadeInProps = {
  children: ReactNode;
  /** 遅延（秒）。連続要素を少しずつずらしたいとき */
  delay?: number;
  /** 立ち上がりの移動量(px)。控えめに */
  y?: number;
  className?: string;
  as?: As;
};

// スクロールで視界に入ったら、わずかに下から上へ + フェードイン。上品に、一度だけ。
// 安全網: IntersectionObserver が発火しない環境でも必ず表示し、コンテンツが消えたままにならないようにする。
// prefers-reduced-motion を尊重し、動きを好まないユーザーには即時表示。
export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: FadeInProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const visible = inView || fallback || !!reduce;
  const offset = reduce ? 0 : y;
  const MotionTag = MOTION[as];

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: offset }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
