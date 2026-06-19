import type { Metadata } from "next";
import { EB_Garamond, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTopButton from "@/components/PageTopButton";
import BackgroundTexture from "@/components/BackgroundTexture";

// 欧文: EB Garamond（見出し・英字ラベル）
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

// 和文・明朝（Apple端末以外用フォールバック）
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// 和文・ゴシック（注釈など補助用）
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "町田 昂優 | Akihiro Machida — Portfolio",
  description:
    "機械学習エンジニア 町田昂優のポートフォリオ。データ分析・AI実装・ロボット開発の制作実績。",
  openGraph: {
    title: "町田 昂優 | Akihiro Machida — Portfolio",
    description:
      "機械学習エンジニア 町田昂優のポートフォリオ。データ分析・AI実装・ロボット開発の制作実績。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${ebGaramond.variable} ${notoSerifJP.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="bg-paper text-ink font-mincho flex min-h-full flex-col">
        <BackgroundTexture />
        <Header />
        <main className="flex-1">{children}</main>
        <PageTopButton />
        <Footer />
      </body>
    </html>
  );
}
