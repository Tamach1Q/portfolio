# 町田 昂優 ポートフォリオ / Akihiro Machida — Portfolio

機械学習エンジニア・町田昂優のポートフォリオサイト。oniguili.jp 系の「余白・縦書きと横書きの混在・明朝体の上品さ」を意識した、明朝中心のミニマルなデザイン。

## 技術スタック

- **Next.js 16**（App Router）/ **TypeScript**
- **Tailwind CSS v4**（CSSベースのトークン設定。`src/app/globals.css`）
- **Framer Motion**（控えめなスクロールフェードイン・ホバー演出）
- フォント: ヒラギノ明朝 → **Noto Serif JP**（フォールバック）/ 欧文 **EB Garamond** / 補助 Noto Sans JP（`next/font/google`）
- デプロイ: **Vercel** 想定

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（静的書き出し）
npm run start    # 本番サーバ
```

## ページ構成

| パス | 内容 |
|---|---|
| `/` | ホーム（FV → 自己紹介概要 → 仕事サムネ → お問い合わせ） |
| `/about` | 自己紹介（写真・自己紹介文・略歴年表・Mission/Vision/Concept） |
| `/works` | 仕事一覧（プロジェクト4枚のサムネ） |
| `/works/[slug]` | プロジェクト詳細（テンプレ1つ＋データ切替。`generateStaticParams` で静的生成） |
| `/contact` | お問い合わせフォーム |

## データ駆動設計（拡張性の核）

プロジェクト情報は `src/data/works.ts` の `works` 配列に集約。一覧も詳細もこのデータを読むだけ。
自己紹介の文章・年表・MVC は `src/data/about.ts`。

### 新しい仕事を追加する手順

1. `src/data/works.ts` の `works` 配列にオブジェクトを1つ追加（`slug` は一意に）。
   - 配列の順序がそのまま詳細ページの **NEXT →** の順送り順になる。
2. `public/works/` にサムネ画像（`<slug>-thumb.png`）とヒーロー画像（`<slug>-hero.png`）を置く。
3. 以上。`/works` 一覧にも `/works/<slug>` にも自動で反映される。

## ディレクトリ

```
src/
├─ app/
│  ├─ layout.tsx        # 全ページ共通。フォント読込・Header/Footer/PageTop
│  ├─ page.tsx          # / ホーム
│  ├─ globals.css       # Tailwind v4 トークン（色・フォント・縦書きユーティリティ）
│  ├─ global-error.tsx  # ルートエラーバウンダリ
│  ├─ not-found.tsx     # カスタム404
│  ├─ about/ works/ contact/
├─ components/          # Header / Footer / PageTopButton / FadeIn /
│                       # VerticalHeading / WorkCard / WorkDetail /
│                       # ChallengeBlock / ContactCTA / ContactForm
└─ data/                # works.ts / about.ts
public/
├─ works/               # 各プロジェクトの thumb / hero 画像
└─ profile.jpg          # 自己紹介の人物写真
```

## お問い合わせフォームについて

現状は送信先サービスを繋いでいないため、`src/components/ContactForm.tsx` の `sendContact()` で
`mailto:` を起動してメーラーをプリフィルする実装。実際に受信したくなったら、この関数だけを
Formspree / Resend / Route Handler（`app/api/contact/route.ts`）に差し替えれば良い。

## 既知の TODO

- ヘッダーの Facebook / Twitter のURLは未設定（`src/components/Header.tsx` の `socialLinks` を要差し替え）。
- 自己紹介の Mission / Vision / Concept 本文は暫定（`src/data/about.ts` の `axis`）。
- 仕事詳細の画像はサムネを流用中。専用のヒーロー画像があれば `public/works/<slug>-hero.png` を差し替え。

## デプロイ（Vercel）

1. GitHub にリポジトリを作って push。
2. vercel.com で GitHub 連携 → リポジトリ選択 → デフォルト設定で Deploy。
3. 以後 `main` に push するたび自動デプロイ。
