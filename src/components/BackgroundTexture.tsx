// Figma「背景」パーツの再現。
// 1440px デザイン上、中央に 834px 幅の用紙テクスチャ帯が縦いっぱいに繰り返されている
// （x=303, width=834）。左右の余白はフラットな紙色（body の bg-paper）。
// 全ページ共通なので layout.tsx で一度だけ描画し、固定レイヤーとして全コンテンツの背面に敷く。
// テクスチャはシームレスな微細斜線なので fixed + repeat-y でページ長に関わらず必ず覆える。
import { withBase } from "@/lib/base-path";

// basePath（GitHub Pages のサブパス）配下でもテクスチャを読めるよう接頭辞を付ける。
// next/image や <Link> は自動で basePath が付くが、CSS の url() は付かないため手動で付与。
export default function BackgroundTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 flex justify-center"
    >
      <div
        className="h-full w-full max-w-[834px]"
        style={{
          backgroundImage: `url(${withBase("/paper-texture.png")})`,
          backgroundRepeat: "repeat-y",
          backgroundPosition: "top center",
          backgroundSize: "100% auto",
        }}
      />
    </div>
  );
}
