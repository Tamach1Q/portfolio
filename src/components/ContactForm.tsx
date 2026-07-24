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

// Formspree のフォームエンドポイント（https://formspree.io/f/xxxxxxxx）。
// 静的書き出しのためサーバーを持てないので、送信は外部サービスへ直接 POST する。
// ビルド時に埋め込まれる値なので、未設定ならビルド結果には空文字が入る。
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

/** 本文を1つのテキストにまとめる（メール本文・mailto 双方で使う） */
function buildBody(fields: Fields): string {
  return [
    `会社名: ${fields.company || "（未記入）"}`,
    `お名前: ${fields.name}`,
    `電話番号: ${fields.tel || "（未記入）"}`,
    `Email: ${fields.email}`,
    "",
    "ご要件:",
    fields.message,
  ].join("\n");
}

/** メーラーを開く（Formspree 未設定時・送信失敗時の退避経路） */
function openMailer(fields: Fields): void {
  const subject = encodeURIComponent(
    `【お問い合わせ】${fields.company || fields.name}様`,
  );
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(
    buildBody(fields),
  )}`;
}

/**
 * 送信処理。Formspree 経由でメールに転送する。
 * エンドポイント未設定・ネットワーク失敗時は mailto へフォールバックし、
 * 「押したのに何も起きない」状態を作らない。
 */
async function sendContact(fields: Fields): Promise<"sent" | "mailto"> {
  if (!ENDPOINT) {
    openMailer(fields);
    return "mailto";
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        会社名: fields.company,
        お名前: fields.name,
        電話番号: fields.tel,
        email: fields.email, // Formspree が返信先として解釈するキー
        ご要件: fields.message,
        _subject: `【お問い合わせ】${fields.company || fields.name}様`,
      }),
    });
    if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
    return "sent";
  } catch {
    openMailer(fields);
    return "mailto";
  }
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
  // sent = Formspree が受理 / mailto = メーラーへ退避した
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">(
    "idle",
  );

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
    setStatus(await sendContact(fields));
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div className="border-hairline mx-auto max-w-[760px] border px-8 py-16 text-center">
        <p className="font-mincho text-ink-strong text-lg tracking-[0.1em]">
          {status === "sent"
            ? "お問い合わせを送信しました。"
            : "メーラーを起動しました。"}
        </p>
        <p className="font-mincho text-ink mt-4 text-[14px] leading-[2]">
          {status === "sent" ? (
            <>
              内容を確認のうえ、折り返しご連絡いたします。
              <br />
              お急ぎの場合は{" "}
            </>
          ) : (
            <>
              内容をご確認のうえ送信してください。
              <br />
              起動しない場合は{" "}
            </>
          )}
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
