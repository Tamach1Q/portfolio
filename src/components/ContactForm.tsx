"use client";

import { useState } from "react";

const EMAIL = "akihiro77akihiro@gmail.com";

type Fields = {
  company: string;
  name: string;
  tel: string;
  email: string;
  message: string;
};

const initial: Fields = {
  company: "",
  name: "",
  tel: "",
  email: "",
  message: "",
};

/**
 * 送信処理。第一段階では mailto: でメーラーをプリフィルする。
 * 後で Formspree / Resend / Route Handler に差し替えやすいよう、ここ1関数に閉じている。
 */
async function sendContact(fields: Fields): Promise<void> {
  const subject = encodeURIComponent(
    `【お問い合わせ】${fields.company || fields.name}様`,
  );
  const body = encodeURIComponent(
    [
      `会社名: ${fields.company}`,
      `お名前: ${fields.name}`,
      `電話番号: ${fields.tel}`,
      `Email: ${fields.email}`,
      "",
      "ご要件:",
      fields.message,
    ].join("\n"),
  );
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "font-mincho text-ink w-full bg-transparent py-2 text-[15px] tracking-[0.04em] outline-none placeholder:text-muted/60";
const rowBase =
  "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 border-b border-hairline pb-3";
const labelBase =
  "font-mincho text-ink text-[13px] tracking-[0.15em] sm:w-28 sm:shrink-0";

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "お名前を入力してください。";
    if (!fields.email.trim()) next.email = "Email を入力してください。";
    else if (!emailRe.test(fields.email))
      next.email = "Email の形式が正しくありません。";
    if (!fields.message.trim()) next.message = "ご要件を入力してください。";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    await sendContact(fields);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="border-hairline mx-auto max-w-[760px] border px-8 py-16 text-center">
        <p className="font-mincho text-ink-strong text-lg tracking-[0.1em]">
          メーラーを起動しました。
        </p>
        <p className="font-mincho text-ink mt-4 text-[14px] leading-[2]">
          内容をご確認のうえ送信してください。
          <br />
          起動しない場合は{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-ink underline underline-offset-4"
          >
            {EMAIL}
          </a>{" "}
          まで直接ご連絡ください。
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(initial);
            setStatus("idle");
          }}
          className="font-garamond text-muted hover:text-ink mt-8 text-[12px] tracking-[0.25em] transition-colors duration-300"
        >
          &larr; BACK
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-[760px]">
      <div className="space-y-9">
        <div>
          <div className={rowBase}>
            <label htmlFor="company" className={labelBase}>
              会社名
            </label>
            <input
              id="company"
              type="text"
              value={fields.company}
              onChange={update("company")}
              className={inputBase}
            />
          </div>
        </div>

        <div>
          <div className={rowBase}>
            <label htmlFor="name" className={labelBase}>
              お名前
            </label>
            <input
              id="name"
              type="text"
              value={fields.name}
              onChange={update("name")}
              aria-invalid={!!errors.name}
              className={inputBase}
            />
          </div>
          {errors.name && <FieldError msg={errors.name} />}
        </div>

        <div>
          <div className={rowBase}>
            <label htmlFor="tel" className={labelBase}>
              電話番号
            </label>
            <input
              id="tel"
              type="tel"
              value={fields.tel}
              onChange={update("tel")}
              className={inputBase}
            />
          </div>
        </div>

        <div>
          <div className={rowBase}>
            <label htmlFor="email" className={labelBase}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={fields.email}
              onChange={update("email")}
              aria-invalid={!!errors.email}
              className={inputBase}
            />
          </div>
          {errors.email && <FieldError msg={errors.email} />}
        </div>

        <div>
          <label
            htmlFor="message"
            className="font-mincho text-ink mb-3 block text-[13px] tracking-[0.15em]"
          >
            ご要件
          </label>
          <textarea
            id="message"
            rows={7}
            value={fields.message}
            onChange={update("message")}
            aria-invalid={!!errors.message}
            className="border-hairline font-mincho text-ink focus:border-ink w-full border bg-transparent p-4 text-[15px] leading-[1.9] tracking-[0.04em] outline-none transition-colors"
          />
          {errors.message && <FieldError msg={errors.message} />}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-ink-strong text-paper font-mincho hover:bg-ink inline-flex h-12 w-56 items-center justify-center text-[15px] tracking-[0.3em] transition-colors duration-300 disabled:opacity-50"
        >
          {status === "sending" ? "送信中…" : "送る"}
        </button>
      </div>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="font-gothic mt-2 text-[12px] tracking-[0.04em] text-red-600">
      {msg}
    </p>
  );
}
