# 町田 昂優 ポートフォリオ / Akihiro Machida — Portfolio

機械学習エンジニア・町田昂優のポートフォリオサイト。oniguili.jp 系の「余白・縦書きと横書きの混在・明朝体の上品さ」を意識した、明朝中心のミニマルなデザイン。

## 技術スタック

- **Next.js 16**（App Router）/ **TypeScript**
- **Tailwind CSS v4**（CSSベースのトークン設定。`src/app/globals.css`）
- **Framer Motion**（控えめなスクロールフェードイン・ホバー演出）
- フォント: ヒラギノ明朝 → **Noto Serif JP**（フォールバック）/ 欧文 **EB Garamond** / 補助 Noto Sans JP（`next/font/google`）
- デプロイ: **Github Pages** 

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
   - `category` は `WORK_CATEGORIES`（データ分析 / AI実装 / ゲーム開発）から選ぶ。
     `/works` のフィルターのタブと件数はこの値から自動生成される。
     軸を増やしたいときは `WORK_CATEGORIES` に足すだけでよい。
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

`src/components/ContactForm.tsx` の `sendContact()` から **Formspree** へ POST し、
メールに転送する。静的書き出し（サーバーなし）のため、送信は外部サービスへ直接投げている。

送信先は環境変数 `NEXT_PUBLIC_FORMSPREE_ENDPOINT` で指定する。

- ローカル: プロジェクト直下に `.env.local` を作り
  `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx` と記述
- 本番: GitHub リポジトリの Settings → Secrets and variables → Actions に
  `FORMSPREE_ENDPOINT` を登録（`.github/workflows/deploy.yml` がビルド時に渡す）

未設定でもビルドは通り、その場合フォームは `mailto:` にフォールバックする。
ネットワークエラーで送信に失敗したときも同様にメーラーへ退避するので、
「押しても何も起きない」状態にはならない。

## 生成AIの活用について

神山まるごと高専「生成AIの活用に関するガイドライン」に基づき、本リポジトリにおける
生成AIの使用範囲を以下に開示する。

### 使用ツール

| 項目 | 内容 |
|---|---|
| ツール | Claude Code（CLI） |
| モデル | Claude Opus 4.8 |
| 使用日 | 2026年6月18日〜19日、2026年7月24日 |

### AIを使用した範囲：コードの実装

サイトの実装コードは、対話形式で指示を出しながら生成・修正した。該当するコミットには
`Co-Authored-By: Claude Opus 4.8` を付与しているため、`git log` から作業単位で追跡できる。

| 実装 | 概要 |
|---|---|
| サイト本体の構築 | Figma のデザインをもとに Next.js（App Router）+ Tailwind CSS で実装 |
| GitHub Actions | 静的書き出し → GitHub Pages への自動デプロイ設定 |
| カテゴリ絞り込み | `src/components/WorksFilter.tsx` |
| お問い合わせ転送 | `src/components/ContactForm.tsx` の Formspree 連携 |

指示したプロンプトの例:

- 「Figma のこのデザインを Next.js で実装して。GitHub Pages にデプロイしたい」
- 「/works にカテゴリで絞り込むフィルター機能を追加して」
- 「mailto ではなく実際にメールへ転送されるようにして」

### AIを使用していない範囲

- **デザイン**: 2025年度の課題として Figma で自作したものを設計原案としている
- **掲載文章**: 自己紹介文、各プロジェクトの「課題 / アプローチ / 結果」の本文、
  略歴年表は、すべて自身の経験に基づき執筆した

### 出力の検証

AIの出力をそのまま採用せず、以下を自身で確認したうえで反映している。

- `npm run build` および `npm run lint` の通過
- Chrome / Safari での表示崩れの確認、スマートフォン幅・PC幅での動作確認
- 掲載する実績・数値が事実と一致しているかの確認

最終的な成果物の内容については、自身の判断と責任において公開している。
