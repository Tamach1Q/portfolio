// GitHub Pages のプロジェクトページ（/<repo> 配下）対応。
// next/image は unoptimized 時に basePath を src へ付与しないため、
// public 配下の画像パスにはこのヘルパーで明示的に basePath を前置する。
// （<Link> や _next 資産、ローカル開発時=空 は自動で正しく動く）
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** public 配下の絶対パスに basePath を前置する */
export function withBase(path: string): string {
  return `${basePath}${path}`;
}
