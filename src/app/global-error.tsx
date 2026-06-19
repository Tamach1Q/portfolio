"use client"; // エラーバウンダリは Client Component である必要がある

// global-error は root layout を置き換えるため、自前で html/body を持つ。
export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          background: "#fdfdfc",
          color: "#1a1a1a",
          fontFamily:
            '"Hiragino Mincho ProN", "Noto Serif JP", serif',
          letterSpacing: "0.08em",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 500 }}>
          問題が発生しました。
        </h2>
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            border: "1px solid #1a1a1a",
            background: "transparent",
            color: "#1a1a1a",
            padding: "0.6rem 2rem",
            fontSize: "0.8rem",
            letterSpacing: "0.25em",
            cursor: "pointer",
          }}
        >
          RETRY
        </button>
      </body>
    </html>
  );
}
