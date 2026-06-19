export type Work = {
  slug: string; // URL とファイル対応。一意
  title: string; // 詳細ページ見出し
  thumbnailLabel: string; // 一覧サムネ用の短い名前
  summary: string; // タイトル下の説明文
  stack: {
    languages: string;
    libraries: string;
    techniques: string;
  };
  challenge: string; // 課題
  approach: string; // アプローチ
  result: string; // 結果
  githubUrl: string | null;
  thumbnail: string; // /public 配下の画像パス
  heroImage: string; // 詳細ページ上部の大きい画像（ロゴ・キービジュアル）
  illustration: string | null; // 課題/アプローチ/結果 の上に置く内容写真（挿絵）。無ければ null
};

// 表示順 = NEXT → の順送り順。配列の順序がそのまま使われる。
export const works: Work[] = [
  {
    slug: "fc-tokushima",
    title: "FC徳島 データ分析PJ",
    thumbnailLabel: "FC徳島",
    summary:
      "FC徳島のデータドリブンサッカーに携わり、GPSデータを用いたACWR理論によるコンディション管理・練習負荷最適化システムの見える化を行いました。",
    stack: {
      languages: "Python 3",
      libraries: "pandas, NumPy, OpenPyXL, Glob, Re",
      techniques: "ETL Automation, Time-Series Analysis, Domain-Aware Imputation",
    },
    challenge:
      "従来、選手のコンディション管理や練習強度の調整は、監督の長年の経験や勘に頼る部分が大きく、客観的な数値基準に基づいたリスク管理が定着していませんでした。また、GPSデバイスから得られる走行データは膨大かつ形式がバラバラであり、手作業での集計・分析には多大な時間がかかっていました。そのため、日々の練習前にデータをフィードバックし、当日のメニューに反映させることが困難な状況でした。",
    approach:
      "この課題に対し、Pythonを用いたエンドツーエンドのデータ分析パイプラインを構築しました。まず、CSVに記述されたGPSログを自動で収集・統合するETL処理を実装。データの前処理においては、単なる機械的な処理ではなく、「試合翌日はリカバリー」「日曜はオフ」といったチーム固有のスケジュールをロジックとしてコードに落とし込み、適切な欠損値補完を行いました。さらに、スポーツ科学の指標であるACWR（Acute:Chronic Workload Ratio）を算出する数理モデルを組み込み、過去28日間の負荷に対する直近の負荷バランスを自動計算してグラフ化し、エクセルで一覧表示する仕組みを開発しました。",
    result:
      "本仕組みの開発により、コーチは練習前に各選手ごとの最適な走行距離とケガのリスクを一目で把握でき、数値に基づいた客観的な負荷調整が可能となりました。結果として、経験則に頼っていたコンディション管理を、データドリブンな意思決定プロセスへと変革することに貢献しました。",
    githubUrl: "https://github.com/Tamach1Q/FCTokuchima-EhimeFC-DataAnalysis",
    thumbnail: "/works/fc-tokushima-thumb.png",
    heroImage: "/works/fc-tokushima-hero.png",
    illustration: "/works/fc-tokushima-illust.jpg",
  },
  {
    slug: "mufg",
    title: "MUFG Data Science Challenge 2025",
    thumbnailLabel: "MUFG",
    summary:
      "中小企業向け融資データに基づき、企業の属性や融資条件から将来的な債務不履行（デフォルト）リスクを予測する分類モデルを構築しました。銀行の融資審査における意思決定支援を想定し、データの不均衡性を考慮した上で、予測精度とモデルの説明可能性の両立に注力しました。",
    stack: {
      languages: "Python 3",
      libraries: "pandas, NumPy, LightGBM, scikit-learn, Optuna",
      techniques: "Stratified K-Fold CV, Financial Feature Engineering, Threshold Optimization",
    },
    challenge:
      "データセットにおけるデフォルト発生率が約12%と非常に低い「不均衡データ」であったため、通常のモデル構築では正解率が伸び悩み、リスクの高いケースを正確に捉えられないという課題がありました。",
    approach:
      "CatBoostやXGBoostなど複数のアルゴリズムを検証・比較し、最終的にカテゴリ変数の扱いに長けたLightGBMを採用しました。精度向上のため、単なる数値の学習だけでなく、政府保証率（Guaranty Rate）や推定月額返済額などのドメイン知識に基づいた特徴量（Feature Engineering）を独自に作成。また、Optunaによるハイパーパラメータの自動最適化と、F1スコアを最大化するための予測閾値の調整を徹底しました。",
    result:
      "30回にわたるモデルの改善と提出を繰り返した結果、最終的にPrivate精度0.6538を達成。Basic Camp部門にて18位にランクインすることができました。",
    githubUrl: "https://github.com/Tamach1Q/MUFG-Data-Scientist-Competiton-2025",
    thumbnail: "/works/mufg-thumb.png",
    heroImage: "/works/mufg-hero.png",
    illustration: "/works/mufg-illust.png",
  },
  {
    slug: "dcon",
    title: "2026全国高等専門学校ディープラーニングコンテスト",
    thumbnailLabel: "DCON",
    summary:
      "高齢者や視覚障害者の買い物を支援する自律走行カートにおいて、ユーザーの自然言語による指示を理解し、適切な行動決定を行うAIシステムを開発。通信環境に依存しない安定性とプライバシー保護のため、NVIDIA Jetson上でのローカルLLM稼働を実現しました。",
    stack: {
      languages: "Python 3",
      libraries: "PyTorch, Transformers (Hugging Face), bitsandbytes, Accelerate, llama-cpp-python",
      techniques: "LLM Quantization (4-bit), Prompt Engineering, Edge AI Optimization, Local Inference",
    },
    challenge:
      "カートに搭載可能な組み込みデバイス（Jetsonなど）は、クラウドサーバーと比較してVRAM容量や計算能力が限られています。そのため、実用的な精度を持つ7BクラスのLLMをそのまま稼働させると、メモリ不足による動作停止や、応答に数秒〜数十秒かかるという「対話の遅延」が最大の課題でした。リアルタイム性が求められる買い物支援において、このラグは致命的でした。",
    approach:
      "モデルの量子化と軽量化による高速推論の実現。モデルの重みを4bitへ量子化することで、精度低下を最小限に抑えつつメモリ使用量を大幅に削減しました。また、エッジ推論に最適化されたライブラリを選定し、JetsonのGPU性能を最大限引き出す構成を構築。さらに、プロンプトエンジニアリングにより、短く明確な出力が得られるようモデルを制御し、後処理の負荷も軽減しました。",
    result:
      "オフライン環境下でのスムーズなリアルタイム対話。インターネット接続がない環境下でも、ユーザーの音声指示に対して即座に応答・判断できるシステムを構築できました。",
    githubUrl: "https://github.com/Tamach1Q/Supermarket-SelfLLM",
    thumbnail: "/works/dcon-thumb.png",
    heroImage: "/works/dcon-hero.png",
    illustration: "/works/dcon-illust.jpg",
  },
  {
    slug: "unletter",
    title: "まるごと祭2025授業模擬店企画 - Unletter",
    thumbnailLabel: "Unletter",
    summary:
      "授業の模擬店企画として、チームで「文字を切って脱出する」アクションゲームを制作・出展しました。CTOとして、コアとなる切断アクションの挙動や、ゲーム進行を管理するシーン遷移システムの構築やコードの構造化を担当。期間内での完成・展示を目指しました。",
    stack: {
      languages: "C#",
      libraries: "Unity Engine, Unity Input System, TextMeshPro",
      techniques: "GameStateによるフラグ/アイテム/通貨管理と通知、コルーチンでのUI・演出の非同期制御",
    },
    challenge:
      "「文字を切る」という独自のゲーム性を追求した結果、物理演算や判定処理の実装難易度が高まりました。それにより、ゲーム進行を司るシーン遷移（ロード処理）の不具合など予期せぬトラブルが多発。チーム開発における進捗共有の遅れも重なり、締切に向けた「機能の絞り込み」と「品質確保」の両立が最大の課題となりました。",
    approach:
      "メインプログラマーとして、ゲームの核となる「切断アクション」の挙動実装を最優先に進めました。開発終盤に発覚したシーン遷移の不具合に対しては、非同期読み込みの導入などによる解決を試行。限られた時間の中で、展示可能な状態に持っていくべく、チームメンバーと連携してバグ修正と最適化に粘り強く取り組みました。",
    result:
      "悔しくも高専祭当日の展示には間に合いませんでしたが、この経験を通じて、工数見積もりの重要性と開発初期におけるスケジューリングとリスクの洗い出しの必要性を痛感しました。単なるコーディング力だけでなく、チーム開発を成功させるためのスケジュール管理や仕様策定の難しさを実体験として学べたことは、次につながる大きな収穫だと感じています。",
    // チーム名 Dotume、作品名 Unletter。リポジトリはチーム名の Dotume。
    githubUrl: "https://github.com/Tamach1Q/Dotume",
    thumbnail: "/works/unletter-thumb.png",
    heroImage: "/works/unletter-hero.png",
    illustration: "/works/unletter-illust.png",
  },
];

// 順送り（NEXT →）のためのヘルパー
export function getNextWork(slug: string): Work {
  const i = works.findIndex((w) => w.slug === slug);
  return works[(i + 1) % works.length]; // 末尾の次は先頭に戻る
}

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
