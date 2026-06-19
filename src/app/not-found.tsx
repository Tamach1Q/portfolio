import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-garamond text-ink-strong text-5xl tracking-[0.2em]">
        404
      </p>
      <p className="font-mincho text-ink text-[14px] tracking-[0.1em]">
        お探しのページは見つかりませんでした。
      </p>
      <Link
        href="/"
        className="font-garamond text-muted hover:text-ink mt-2 text-[12px] tracking-[0.25em] transition-colors duration-300"
      >
        &larr; BACK TO HOME
      </Link>
    </section>
  );
}
