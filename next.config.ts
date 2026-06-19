import type { NextConfig } from "next";

// GitHub Pages のプロジェクトページ（https://<user>.github.io/<repo>/）配下に
// 置くためのパス接頭辞。CI では actions/configure-pages の base_path を
// NEXT_PUBLIC_BASE_PATH に渡す。ローカル開発（未設定）では空＝ルート。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // GitHub Pages 用に静的書き出し（out/ を生成）
  output: "export",
  // 静的ホスティングには next/image の最適化サーバーが無いため無効化
  // （画像は事前に最適化済みなので実害なし）
  images: { unoptimized: true },
  // 静的ホストでディレクトリ index.html を解決させる
  trailingSlash: true,
  // 親ディレクトリの lockfile を誤検出しないよう、このプロジェクトをルートに固定
  turbopack: {
    root: __dirname,
  },
  // basePath は値があるときだけ設定（空文字は Next がエラーにするため）
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
