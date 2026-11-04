// エクセディ様向けご提案ページの文言。
// 文言の修正はこのファイルだけで完結するようにしている（コンポーネント側に文言を書かない）。

export type FeatureStatus = "available" | "developing" | "planned";

export const statusLabels: Record<FeatureStatus, string> = {
  available: "提供中",
  developing: "開発中",
  planned: "計画中",
};

export type NavItem = {
  id: string;
  label: string;
};

export type SectionHeading = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
};

export type Hero = {
  customer: string;
  title: string;
  date: string;
  thesis: string;
  coexistence: string;
  flow: { role: string; product: string; text: string }[];
  presenter: string;
};

export type Fact = {
  value: string;
  label: string;
  note: string;
  source: string;
};

export type SourceRef = {
  id: string;
  label: string;
  date: string;
  url: string;
};

export type Evidence = {
  fact: string;
  ref: string;
  locator?: string;
};

export type ChallengeBasis = "stated" | "inferred";

export type Challenge = {
  id: string;
  title: string;
  body: string;
  basis: ChallengeBasis;
  evidence: Evidence[];
  inference: string;
  why: string;
};

export type Chip = {
  label: string;
  status?: FeatureStatus;
};

export type MappingRow = {
  challengeId: string;
  proposal: string;
  chips: Chip[];
};

export type ArchitectureDiagram = {
  boundaryTitle: string;
  boundaryFuture: string;
  dataStays: string;
  controlPlaneTitle: string;
  controlPlaneItems: string[];
  deliver: string;
  mainClusterTitle: string;
  businessApp: string;
  toolBuilder: string;
  knowledge: string;
  embedding: string;
  directory: string;
  overseasCluster: string;
  moreClusters: string;
  egressStatus: string;
  egress: string;
  allowed: string[];
  blocked: string[];
};

export type ArchitectureContent = {
  title: string;
  description: string;
  diagram: ArchitectureDiagram;
  valueProps: { title: string; body: string }[];
};

export type Feature = {
  name: string;
  description: string;
  status: FeatureStatus;
  note?: string;
};

export type ProposalPackage = {
  key: string;
  name: string;
  recommended: boolean;
  audience: string;
  summary: string;
  points: string[];
  pocExamples: string[];
};

export type CrossCutting = {
  title: string;
  body: string;
  steps: string[];
};

/** Excel → 業務アプリ化の分担表。1 行 = 1 つの仕事。 */
export type DivisionRow = {
  task: string; // 例: アプリを作る
  department: string; // 部門側がすること
  platform: string; // 基盤（AppThrust）側がすること
  status?: FeatureStatus; // 省略時は available
};

export type DivisionContent = {
  labels: { task: string; department: string; platform: string };
  rows: DivisionRow[];
  note: string; // 表の下の補足
};

/** 活用例。テンプレ/デモ/計画を同じカード形式で並べる。 */
export type UseCase = {
  name: string;
  excelBefore: string; // 置き換える Excel 管理の例
  appAfter: string; // アプリにすると何が変わるか
  kind: "template" | "demo" | "planned";
  url?: string; // demo のときの URL
};

export type UseCasesContent = {
  kindLabels: Record<UseCase["kind"], string>;
  labels: { open: string; nowAvailable: string; planned: string };
  items: UseCase[];
  dataUse: {
    title: string;
    available: string[]; // 今できるデータ活用
    planned: string[]; // 未提供・計画中（正直に）
  };
};

/** 既存ノーコード（kintone 等）との違い。言い過ぎ禁止、factcheck 済みの範囲のみ。 */
export type ComparisonRow = {
  aspect: string;
  nocode: string; // 一般的なノーコード/kintone
  appthrust: string;
  advantage: "appthrust" | "nocode" | "even";
};

export type ComparisonContent = {
  title: string;
  labels: { aspect: string; nocode: string; appthrust: string; advantage: string };
  rows: ComparisonRow[];
  note: string;
};

export type TimelinePhase = {
  label: string;
  period?: string;
  items: string[];
  highlight: boolean;
};

export type PocTerms = {
  plan: string;
  environment: string;
  includes: string[];
};

export type PricingTerms = {
  planName: string;
  basePrice: number;
  includedApps: number;
  perAppPrice: number;
  annualDiscountPercent: number;
  taxNote: string;
  includes: string[];
  notes: string[];
  community: { name: string; price: string; note: string };
  referenceApps: number[];
  calculator: { min: number; max: number; defaultApps: number };
};

export type NextStep = {
  title: string;
  body: string;
};

export const ui = {
  brand: "AppThrust",
  brandFor: "エクセディ様 ご提案",
  navAria: "ページ内の目次",
  skipLink: "本文へスキップ",
  source: "出典",
  statusSummaryAria: "提供状況の内訳",
};

// ---------------------------------------------------------------------------

export const navItems: NavItem[] = [
  { id: "current", label: "現状" },
  { id: "division", label: "分担" },
  { id: "usecases", label: "活用例" },
  { id: "mapping", label: "課題と対応" },
  { id: "about", label: "AppThrust とは" },
  { id: "features", label: "提供状況" },
  { id: "packages", label: "パッケージ" },
  { id: "poc", label: "PoC" },
  { id: "pricing", label: "料金" },
  { id: "next", label: "次のステップ" },
  { id: "company", label: "ご提案元" },
];

export const hero: Hero = {
  customer: "株式会社エクセディ様",
  title: "エクセディ様向け AppThrust ご提案",
  date: "2026-10-26",
  thesis:
    "各部門が Excel で管理している業務を、現場が自分で作り・運用できる業務アプリに置き換え、データを活用できる状態にする基盤",
  coexistence:
    "まず、部門ごとの Excel 台帳を業務アプリにして、散らばったファイルをアプリのデータベースにまとめます。そのうえで、全社でご活用中の Lightblue はそのまま残し、役割を分けます。Lightblue では人が AI に聞く。AppThrust では業務アプリが AI を呼び、その結果を現場の作業に組み込みます。",
  flow: [
    {
      role: "現場が作る",
      product: "Builder Console",
      text: "テンプレートと日本語の指示で、Excel の台帳を業務アプリにする。データはアプリごとの PostgreSQL に入る",
    },
    {
      role: "基盤が運ぶ",
      product: "AppThrust",
      text: "更新・権限・監視・ロールバックは基盤が持ち、部門はアプリの中身だけを持つ",
    },
    {
      role: "AI を呼ぶ",
      product: "Knowledge",
      text: "業務アプリが登録や判定の途中で Knowledge を検索する。人が AI に聞く場は Lightblue のまま、役割を分ける",
    },
  ],
  presenter: "AppThrust（株式会社クラフトマンソフトウェア）",
};

export const currentSection: SectionHeading = {
  id: "current",
  eyebrow: "01",
  title: "エクセディ様の現状（公開情報より）",
  lead: "公開資料から、エクセディ様の取り組みと、次に向き合われるであろう課題を整理しました。",
};

export const facts: Fact[] = [
  {
    value: "26 カ国 58 社",
    label: "グループ拠点",
    note: "生産拠点は 13 カ国",
    source: "QUICK 企業価値研究所レポート 2026-08",
  },
  {
    value: "500 ID",
    label: "生成 AI を全社導入済み",
    note: "2026 年 4 月から本格運用、海外関係会社へ展開中",
    source: "Lightblue プレスリリース 2026-06",
  },
  {
    value: "約 24 万時間",
    label: "年間の業務削減（試算）",
    note: "PC 保有社員の生成 AI 利用率 90% 超",
    source: "JDX 全国ワークスタイル変革大賞 2026",
  },
  {
    value: "0.9% → 30%",
    label: "新製品売上比率",
    note: "2025 年度実績 → 2030 年度目標",
    source: "決算説明会資料 2025/3 期",
  },
  {
    value: "SAP S/4HANA on AWS",
    label: "基幹システム",
    note: "2022 年 1 月に 12 拠点を一斉切替",
    source: "NEC 導入事例",
  },
];

export const challengesHeading = {
  title: "公開情報から見える 6 つの論点",
  lead: "公開情報から、次の 6 点が論点になると考えています。各項目に「公開情報で確認できる事実」「そこからの弊社の見立て」「ご提案につながる理由」を分けて記しました。認識が異なる点は、ぜひご指摘ください。",
};

export const challengeLabels = {
  stated: "公開情報に明示",
  inferred: "弊社の推定",
  evidence: "公開情報で確認できる事実",
  inference: "弊社の見立て",
  why: "ご提案につながる理由",
  sources: "参照した公開情報",
};

export const sourceRefs: SourceRef[] = [
  {
    id: "lightblue",
    label: "Lightblue プレスリリース「エクセディ、法人向け AI エージェントを全社導入」",
    date: "2026-06-23",
    url: "https://www.lightblue-tech.com/news/exedy/",
  },
  {
    id: "jdx",
    label: "JDX 全国ワークスタイル変革大賞 2026 近畿大会 奨励賞（PR TIMES）",
    date: "2026-10-15",
    url: "https://prtimes.jp/main/html/rd/p/000000179.000115435.html",
  },
  {
    id: "quick",
    label: "QUICK 企業価値研究所 企業レポート（野村 IR 配信）",
    date: "2026-08-25",
    url: "https://www.nomura-ir.co.jp/ja/qnresearch/report_7278/main/00/teaserItems1/00/link/qnresearch_7278.pdf",
  },
  {
    id: "ir",
    label: "2025 年 3 月期 決算説明会資料（エクセディ）",
    date: "2025-04-25",
    url: "https://www.exedy.com/ja/assets/pdf/stockholder/FY2024_FinancialStatement.pdf",
  },
  {
    id: "nec",
    label: "NEC 導入事例「SAP S/4HANA を AWS 上の HEC へ」",
    date: "2022",
    url: "https://jpn.nec.com/sap/case/exedy/index.html",
  },
  {
    id: "xtech",
    label: "日経 xTECH「グーグル並みに見やすい部品メーカーの技術情報システム」",
    date: "2017-03-30",
    url: "https://xtech.nikkei.com/dm/atcl/feature/15/122200045/032900024/",
  },
  {
    id: "kintone",
    label: "エクセディ物流 kintone 導入事例（ペパコミ）",
    date: "2025-11",
    url: "https://pepacomi.com/case/casestudy_logistics_company",
  },
  {
    id: "optage",
    label: "OPTAGE 導入事例（情報系システムのクラウド移行）",
    date: "2017",
    url: "https://optage.co.jp/business/case/company34.html",
  },
  {
    id: "neibo",
    label: "Neibo 戸田市役所 実証（エクセディ 新事業ニュース）",
    date: "2025-07-11",
    url: "https://www.exedy.com/newbiz/news_story/20250711",
  },
];

export const challenges: Challenge[] = [
  {
    id: "knowledge",
    title: "ナレッジの分散と属人化",
    body: "熱処理・設備保全・品質・災害事例など、部門ごとに形式知化したい知見が数多くあります。",
    basis: "stated",
    evidence: [
      {
        fact: "生成 AI エージェントを 2026 年 4 月から全社 500 ID で本格運用。活用テーマとして、開発（熱処理技術者の知識）、基幹事業（設備修理履歴による保全）、品質保証（判定会議の事前レビュー）、安全環境（災害事例のナレッジ化）を公表。導入動機は「技術・ノウハウの形式知化と継承」。",
        ref: "lightblue",
      },
      {
        fact: "約 300 件の改善事例を検索する社内アプリを整備。DX 人材を 7 段階で定義し、社内 DX アワードを運営。",
        ref: "jdx",
      },
      {
        fact: "技術文書の横断検索システム「EXPRESS」を 2017 年に自社開発し、約 600 人が利用、情報収集工数を 1/3 に。",
        ref: "xtech",
      },
    ],
    inference:
      "形式知化したい対象が熱処理・保全・品質・安全と部門ごとに並列で存在し、2017 年の EXPRESS から 2026 年の生成 AI まで「探す・継承する」投資を一貫して続けておられます。ナレッジの置き場と更新の担い手が部門横断の論点として続いている、と見ています。",
    why:
      "部門ごとに Knowledge コレクションを分け、文書の取り込みとベクトル化を社内で完結させる構成は、「部門ごと」「社外に出せない技術情報」という 2 条件に合わせたものです。Lightblue は人が聞く入口として残し、AppThrust では不具合登録や問い合わせ受付などの業務アプリが、処理の途中で同じ種類の知見を自動で検索して使います。",
  },
  {
    id: "workflow",
    title: "AI チャットの次は「フロー付き業務アプリ」",
    body: "問い合わせの受付→回答→記録→営業への通知を RPA と組み合わせて実現されています。部門ごとに安全に量産できる基盤が次の論点です。",
    basis: "inferred",
    evidence: [
      {
        fact: "アフターマーケット国内営業部で、電話 2 回線・3 名で対応していた問い合わせを「受付→回答送信→記録」まで自動化して 1 名に。蓄積データを AI と RPA で分析し、営業担当へメール配信。",
        ref: "jdx",
      },
      {
        fact: "PC 保有社員の生成 AI 利用率 90% 超、年間約 24 万時間の業務削減（試算）。",
        ref: "jdx",
      },
      {
        fact: "部門別のノーコード AI アシスタントを作成し、営業本部 100 ID 先行 → 全本部 → 海外関係会社へ展開中。",
        ref: "lightblue",
      },
    ],
    inference:
      "受賞事例は AI チャット単体ではなく、受付・記録・通知という「フロー」を RPA で継ぎ足して成立しています。同じ形を他部門が作る場合、RPA・権限・データ保管を部門ごとに個別に組むことになり、2 本目以降の量産と保守が論点になると推定しています。",
    why:
      "テンプレートから業務アプリを公開し、部門グループで権限を切り、データベースを同じ Project 内に持つ Builder Console / Tool Builder を提案するのは、「2 本目以降を安全に量産する」共通基盤が必要になる、という読みに基づきます。",
  },
  {
    id: "data",
    title: "機密データとクラウド LLM の両立",
    body: "OEM の図面・仕様・原価など、社外に出せないデータを生成 AI で扱うには、送信先の制御が欠かせません。",
    basis: "inferred",
    evidence: [
      {
        fact: "事業等のリスクとして、サイバー攻撃によるシステム障害・機密情報の流出・サプライチェーン中断を明記。",
        ref: "quick",
        locator: "リスク項目",
      },
      {
        fact: "2017 年の情報系クラウド移行時に「自社でのセキュリティ確保は限界に近づいていた」と説明。",
        ref: "optage",
      },
      {
        fact: "全社導入した AI エージェントは Gemini / Claude / GPT を切り替えて使う SaaS 型。",
        ref: "lightblue",
      },
    ],
    inference:
      "OEM の図面・仕様・原価を預かる立場と、クラウド LLM を全社で使う現状が並ぶと、「どのデータをどの送信先に出してよいか」の判断が利用者個人に委ねられやすくなります。これはリスク項目に挙げられた機密流出と直結する、と見ています。CEATEC で「データを外に出さない」点にご関心をいただいたことも、この見立ての根拠です。",
    why:
      "Project 単位の AI 利用ポリシー、クラスタ内 LLM、監査ログを組み合わせるのは、送信先を「人の注意」ではなく「仕組み」で決めるためです。埋め込みと回答生成をクラスタ内で完結させれば、機密区分の文書を外部 LLM に出さない運用ができます。",
  },
  {
    id: "newbiz",
    title: "新事業のサービス運用体制",
    body: "Neibo の「ノーコードで動作指示できるクラウドベースのプラットフォーム」など、ソフトウェアサービスを自社で運用する体制づくりが求められます。",
    basis: "stated",
    evidence: [
      {
        fact: "中期経営計画「変革 / REVOLUTION 2026」で、2030 年度に新製品売上 1,000 億円（比率 30%）を掲げる。2025 年度の新製品比率実績は 0.9%。",
        ref: "ir",
        locator: "p.6–8",
      },
      {
        fact: "スマートロボット Neibo は「ノーコードで動作指示できるクラウドベースのプラットフォーム」を構想し、基幹システム EXPRESS の自社開発で培ったデザイン力を活かすと説明。戸田市役所で実証。",
        ref: "ir",
        locator: "p.35",
      },
      {
        fact: "アナリスト評: 「自動車メーカーの仕様に応える受け身の体質。自動車産業以外では顧客要望・品質要求・量産までの時間軸が異なり、独自製品を生み出す体制が課題」。",
        ref: "quick",
        locator: "p.38",
      },
      {
        fact: "新事業の研究開発費増により「その他」セグメントは 2027 年 3 月期 1Q に営業赤字 16 億円。",
        ref: "quick",
        locator: "p.53",
      },
    ],
    inference:
      "ハードウェア製品の量産と、クラウドサービスの継続運用（更新・認証・監視・顧客ごとの隔離）では、必要な体制が異なります。新事業の人員と費用が限られるなかで、運用基盤を自前で一から作る負担が論点になると見ています。",
    why:
      "Neibo のクラウド側を AppThrust 上で運用する提案は、プレビュー環境・段階的リリース・API キー発行・監査といった「サービス運用の定型部分」を基盤に任せ、ロボット固有の価値に人員を集中していただくためです。",
  },
  {
    id: "global",
    title: "26 カ国 58 社への横展開",
    body: "限られた人員で、拠点ごとにアプリと権限を届け、運用し続ける仕組みが必要です。",
    basis: "inferred",
    evidence: [
      {
        fact: "グループは 26 カ国 58 社、生産拠点 13 カ国。従業員は 13,491 人（2017/3）から 10,970 人（2026/3）へ。米国現地法人の清算、中国 2 拠点での早期退職を実施。",
        ref: "quick",
        locator: "p.5, 79",
      },
      {
        fact: "基幹システム SAP S/4HANA を AWS 上の HEC へ移行し、2022 年 1 月に 12 拠点を一斉切替（NEC 経由）。",
        ref: "nec",
      },
      {
        fact: "AI エージェントは国内全本部に続いて海外関係会社へ展開中。",
        ref: "lightblue",
      },
    ],
    inference:
      "拠点数に対して情報システム部門の人員が増えにくい構造のなかで、業務アプリも AI も海外拠点へ広げようとされています。拠点ごとに個別導入・個別運用すると、人員ではなく仕組みが上限になると推定しています。",
    why:
      "1 つの管理画面から拠点クラスタを管理し、同じテンプレート・リポジトリから各拠点の Project へ導入し、拠点ごとに SSO とグループを設定する構成を提案するのは、「国内で検証したものをそのまま拠点へ配る」経路を最初から持つためです。",
  },
  {
    id: "ops",
    title: "「運用を誰が持つか」",
    body: "「ノーコードならすぐできる」という期待に対し、設計・検証・運用の担い手を先に決めることが鍵になります。",
    basis: "stated",
    evidence: [
      {
        fact: "エクセディ物流が kintone で発注業務（1 日 270 便、Excel と FAX）を内製化。過去に Excel アドインの独自開発が頓挫（約 200 万円）。現場談「ノーコードだからすぐできると上層部に期待されるが、設計力・検証が不可欠」。",
        ref: "kintone",
      },
      {
        fact: "基幹（SAP）は NEC 経由で運用、情報系は 2017 年にクラウドへ移行。",
        ref: "nec",
      },
      {
        fact: "DX 人材を 7 段階で定義し、社内 DX アワードで内製の取り組みを表彰。",
        ref: "jdx",
      },
    ],
    inference:
      "内製（kintone、EXPRESS）とベンダー委託（SAP）の両方の経験をお持ちで、それぞれに成功と失敗があります。アプリを「作る」ことより、「誰が更新・権限・監視・障害対応を持ち続けるか」が次の投資判断の前提になる、と見ています。",
    why:
      "更新・権限・監視・ロールバックをプラットフォーム側が担い、部門は業務ロジックだけを持つ分担を提案するのは、この「運用の担い手」を先に固定するためです。Issue を起点に AI が実装・検証して PR を出す仕組みも、小さな改修で人手を待たない運用を前提にしています。",
  },
];

export const mappingSection: SectionHeading = {
  id: "mapping",
  eyebrow: "05",
  title: "課題と AppThrust の対応",
  lead: "6 つの課題それぞれに、AppThrust の機能で対応します。",
};

export const mappingLabels = {
  challenge: "エクセディ様の課題",
  proposal: "AppThrust のご提案",
};

export const mapping: MappingRow[] = [
  {
    challengeId: "knowledge",
    proposal:
      "熱処理資料・設備修理履歴・災害事例などを部門ごとの Knowledge にまとめ、社内で埋め込み（ベクトル化）します。業務アプリは登録や判定の途中でこの Knowledge を検索し、過去の原因・対策の候補を画面に出します。",
    chips: [{ label: "Knowledge（RAG）" }, { label: "Embedding（ローカル）" }],
  },
  {
    challengeId: "workflow",
    proposal:
      "問い合わせの受付→回答→記録→営業への通知を 1 本の業務アプリにまとめ、部門ご自身で改修できるようにします。",
    chips: [
      { label: "Builder Console" },
      { label: "Tool Builder" },
      { label: "Directory" },
    ],
  },
  {
    challengeId: "data",
    proposal:
      "機密データを扱う Project では、利用できる AI モデルをポリシーで限定し、呼び出しを監査記録します。回答の生成までクラスタ内の LLM で完結でき、質問文・文書を外部に送りません。許可先以外への通信は Project 単位の Egress 制御で遮断します（Cilium ネットワーク構成のクラスタが前提）。",
    chips: [
      { label: "AI 利用ポリシー" },
      { label: "ローカル LLM" },
      { label: "監査ログ" },
      { label: "Egress 制御" },
    ],
  },
  {
    challengeId: "newbiz",
    proposal:
      "Neibo 向けクラウドサービスを AppThrust 上で運用。プレビュー環境、段階的リリース、API キー発行を備えます。GPU 推論（GPU ノードプール・vLLM 推論アプリ）と、機器ごとに隔離された状態を持つエージェント（Sandboxed Actor）は実装済みで、実環境での検証を進めています。",
    chips: [
      { label: "プレビュー環境" },
      { label: "Access Key" },
      { label: "Sandboxed Actor", status: "developing" },
      { label: "GPU 推論", status: "developing" },
    ],
  },
  {
    challengeId: "global",
    proposal:
      "1 つの管理画面から各拠点のクラスタを管理し、基盤を一括配送。業務アプリは拠点ごとの Project に同じテンプレート・リポジトリから導入し、拠点ごとに SSO とグループを設定できます。",
    chips: [{ label: "マルチクラスタ管理" }, { label: "SSO（拠点ごと）" }],
  },
  {
    challengeId: "ops",
    proposal:
      "更新・権限・監視・ロールバックはプラットフォームが担います。Issue を起点に AI が隔離環境で実装・検証して PR を作るため、小さな改修は人手を待ちません。",
    chips: [{ label: "Issue 駆動の AI 開発" }, { label: "Builder Console" }],
  },
];

export const aboutSection: SectionHeading = {
  id: "about",
  eyebrow: "06",
  title: "AppThrust とは",
  lead: "エクセディ様の AWS アカウント内に導入する、業務アプリと AI の実行基盤です。",
};

export const architecture: ArchitectureContent = {
  title: "AppThrust の構成",
  description:
    "エクセディ様の AWS アカウント（将来はオンプレミス）の中に、管理画面と拠点ごとのクラスタを置きます。各クラスタでは業務アプリ、Knowledge（RAG）、ローカルの Embedding と LLM、Tool Builder、Directory/SSO が動作し、アプリのデータ・ナレッジの保管、埋め込み処理、回答の生成までアカウント内で完結します。外部 LLM を使う場合は AI 利用ポリシーで許可したモデルに限り、Egress 制御が許可先以外への通信を遮断します。",
  diagram: {
    boundaryTitle: "エクセディ様の AWS アカウント",
    boundaryFuture: "（将来: オンプレミス）",
    dataStays: "保管・埋め込みは社内",
    controlPlaneTitle: "管理画面（AppThrust）",
    controlPlaneItems: ["基盤・アプリ配送", "SSO・権限", "AI 利用ポリシー", "監査ログ"],
    deliver: "配送",
    mainClusterTitle: "拠点クラスタ（国内）",
    businessApp: "業務アプリ",
    toolBuilder: "Tool Builder",
    knowledge: "Knowledge（RAG）",
    embedding: "Embedding（ローカル）",
    directory: "Directory / SSO",
    overseasCluster: "拠点クラスタ（海外）",
    moreClusters: "拠点クラスタ ×N",
    egress: "Egress 制御・監査",
    allowed: ["許可された", "外部 LLM のみ"],
    blocked: ["許可外の宛先", "遮断"],
    egressStatus: "",
  },
  valueProps: [
    {
      title: "保管と埋め込みは御社アカウント内",
      body: "業務アプリのデータ、ナレッジ、埋め込み（ベクトル化）、回答の生成まで、エクセディ様の AWS アカウント内で動作します。外部 LLM を使う場合も、許可したモデルに限って送信します。",
    },
    {
      title: "現場がつくり、基盤が運ぶ",
      body: "テンプレートから業務アプリを作成・公開。更新・権限・監視・ロールバックはプラットフォームが担います。",
    },
    {
      title: "1 つの管理画面から全拠点を運用",
      body: "国内外の拠点クラスタを 1 つの管理画面で管理し、基盤を一括配送。国内で検証したアプリは、同じリポジトリから海外拠点の Project へ導入できます。",
    },
    {
      title: "AI 利用のルールを基盤で管理",
      body: "利用できる AI モデルと、データ分類に応じた利用制限をポリシーで定め、AI 開発ワークスペースと Knowledge を含む AI 通信に適用し、監査ログを保持します。",
    },
  ],
};

export const featuresSection: SectionHeading = {
  id: "features",
  eyebrow: "07",
  title: "機能と提供状況",
  lead: "2026-10-26 時点の提供状況です。「提供中」は当社の開発環境（appthrust.ink）で稼働している機能を指し、エクセディ様の環境への導入は PoC で確認します。開発中・計画中の機能も、そのままお示しします。",
};

export const featureTableLabels = {
  name: "機能",
  description: "内容",
  status: "提供状況",
};

export const features: Feature[] = [
  {
    name: "Builder Console",
    description:
      "テンプレートから業務アプリを作成・公開。権限を持つ担当者は、対応データベース（PostgreSQL）のデータを画面から閲覧・編集できます。",
    status: "available",
    note: "CEATEC で展示。デモ環境では作成から公開まで約 10 分",
  },
  {
    name: "Internal Tool Builder",
    description:
      "同じプロジェクト内の PostgreSQL と対応アドオン（Directory・Knowledge・Builder Console）を束ねた業務ツールを構築。Directory のグループで利用・編集権限を管理します。",
    status: "available",
  },
  {
    name: "Knowledge（RAG）",
    description:
      "Notion 連携と Markdown 本文の取り込み、ハイブリッド検索、質問応答 API。業務アプリから Access Key 経由で呼び出せます。",
    status: "available",
    note: "Notion 連携は認証設定が必要。質問応答はクラスタ内 LLM と外部 LLM（API キー）のどちらでも",
  },
  {
    name: "Embedding（ベクトル化）",
    description:
      "クラスタ内で完結（EmbeddingGemma、CPU で動作）。ベクトル化のために文書を外部 API へ送信しません。",
    status: "available",
  },
  {
    name: "生成 LLM の完全ローカル実行",
    description:
      "回答の生成もクラスタ内の LLM（CPU）で完結し、質問文・文書を外部に送りません。応答は約 2 分（GPU 構成で短縮予定）。",
    status: "available",
    note: "外部 LLM を使う構成も選べます",
  },
  {
    name: "Egress 制御（Project 単位の許可先制御）",
    description:
      "Project ごとに通信の許可先（FQDN / CIDR）を画面・API・SDK から宣言し、それ以外への通信を Project 内の全ワークロードと AI 開発ワークスペースで遮断します。拒否された通信は Project の画面で確認できます。",
    status: "available",
    note: "Cilium ネットワーク構成のクラスタが前提（新規導入時に選択）",
  },
  {
    name: "隔離実行（サンドボックス）",
    description:
      "gVisor による隔離実行環境。AI 開発ワークスペース・隔離プロファイルを指定したアプリ・関数を、ほかのワークロードから切り離して実行します。",
    status: "available",
  },
  {
    name: "Sandboxed Actor",
    description:
      "利用者・機器ごとに隔離された、状態を持つ AI エージェントの実行環境。Dashboard / API / CLI から作成でき、gVisor 隔離と宣言した通信先のみ許可する Egress 制御を備えます。",
    status: "developing",
    note: "実装済み（検証クラスタで確認）。デモ環境への配備は準備中",
  },
  {
    name: "SSO・監査ログ（Enterprise）",
    description:
      "お客様の IdP と OIDC または SAML 2.0 で連携する SSO、SCIM によるユーザー・グループの自動同期（作成・無効化・トークン更新）、監査ログの保存・保持期間設定。",
    status: "available",
    note: "OIDC / SAML 2.0 / SCIM 2.0（Entra ID プリセット）",
  },
  {
    name: "AI 利用ポリシー",
    description:
      "利用できる AI プロバイダ・モデルの許可リストと、データ分類に応じた利用制限。AI 開発ワークスペースと Knowledge を含む全 AI 通信に適用され、呼び出しを監査記録します（会話内容の保存は方針で選択）。",
    status: "available",
  },
  {
    name: "Issue 駆動の AI 開発",
    description:
      "GitHub Issue にラベルを付けると、AI が隔離環境で実装・指定コマンドで検証し、PR を作成します。",
    status: "available",
    note: "開発環境で連続動作を確認済み",
  },
  {
    name: "マルチクラスタ管理・基盤配送",
    description:
      "1 つの管理画面から複数の拠点クラスタを管理し、基盤ソフトウェアを一括配送します。業務アプリは拠点ごとの Project に配送し、同一アプリの複数拠点同時配送は開発中です。",
    status: "available",
    note: "デモ環境では 1 管理画面で 6 クラスタを運用",
  },
  {
    name: "GPU スケジューリング",
    description:
      "GPU ノードプール（NVIDIA g5 / g6）の宣言、NVIDIA デバイスプラグインの自動配備、vLLM 推論アプリ、推論エンドポイント一覧と vLLM メトリクスの API。GPU はオプションで、標準構成は CPU ノードです。",
    status: "developing",
    note: "実装済み。GPU 実機での稼働検証は未実施",
  },
  {
    name: "オンプレミス導入",
    description:
      "お客様の物理 / 仮想サーバー（Linux、SSH 接続）への導入。管理画面と拠点クラスタを同じ CLI で構築します。",
    status: "developing",
    note: "1 ホスト（32 GiB）構成で導入を確認済み。複数ホスト構成の検証中。現在のご提案は AWS アカウント内への導入",
  },
];

export const packagesSection: SectionHeading = {
  id: "packages",
  eyebrow: "08",
  title: "ご提案パッケージ",
  lead: "ご担当部門に合わせて、3 つの入り口をご用意しました。",
};

export const packageLabels = {
  recommended: "推奨",
  audience: "対象部門",
  content: "内容",
  poc: "PoC 例",
};

export const packages: ProposalPackage[] = [
  {
    key: "A",
    name: "現場 DX の受け皿",
    recommended: true,
    audience: "情報システム部・DX 推進部門",
    summary:
      "Lightblue で見つけた知見を、部門ごとの業務アプリに組み込んで現場に届けます。",
    points: [
      "基本料（5 アプリ込み）の範囲で始められます",
      "Lightblue との住み分け: Lightblue は人が AI に聞く場、AppThrust は業務アプリが AI を呼んで結果を現場に配る基盤",
      "Lightblue のナレッジとの連携方法は、ヒアリングで確認させてください",
    ],
    pocExamples: [
      "製造現場の不具合・改善管理（本日のデモ。部署別 Excel の共通アプリ化）",
      "アフター営業の問い合わせ対応アプリの再構築",
      "熱処理 または 設備保全ナレッジの Knowledge ＋ 業務アプリ",
    ],
  },
  {
    key: "B",
    name: "データを外に出さない AI",
    recommended: false,
    audience: "情報システム部・セキュリティ部門",
    summary:
      "埋め込み（ベクトル化）も回答の生成もクラスタ内で実行でき、質問文・文書を外部に送りません。外部 LLM を使う場合はデータ分類ごとに許可先を限定・監査し、許可先以外への通信は遮断します。",
    points: [
      "埋め込みと生成 LLM のローカル実行は提供中です（CPU 構成では応答に約 2 分、GPU 構成で短縮予定）",
      "AI 利用ポリシー・Egress 制御・監査ログは提供中です",
    ],
    pocExamples: ["データ分類ごとの AI 利用ルールと監査ログの検証"],
  },
  {
    key: "C",
    name: "新事業のサービス基盤",
    recommended: false,
    audience: "戦略事業本部",
    summary:
      "Neibo のクラウドプラットフォームを、運用基盤をゼロから作らずに AppThrust 上に構築します。",
    points: [
      "プレビュー環境、段階的リリース、API キー発行を標準で利用できます",
      "GPU 推論と、ロボットごとに隔離された状態を持つエージェント（Sandboxed Actor）は実装済みで、実環境での検証を共同で進めます",
    ],
    pocExamples: ["Neibo 向けクラウドサービスの試作"],
  },
];

export const crossCutting: CrossCutting = {
  title: "横断: マルチクラスタ",
  body: "A・C いずれのパッケージでも、国内で検証したアプリを同じリポジトリから海外拠点の Project へ導入し、1 つの管理画面で全拠点を運用する形につなげます。",
  steps: ["国内で PoC", "国内拠点で本番", "海外拠点へ展開"],
};

export const pocSection: SectionHeading = {
  id: "poc",
  eyebrow: "09",
  title: "PoC プラン",
  lead: "2〜3 カ月で 2 つのアプリを検証し、次の展開を判断いただける形にします。",
};

export const pocTimeline: TimelinePhase[] = [
  {
    label: "準備",
    items: [
      "御社 AWS アカウント内に AppThrust を導入",
      "アプリのデータ・ナレッジは御社アカウント内に保管",
    ],
    highlight: false,
  },
  {
    label: "PoC",
    period: "2〜3 カ月・2 アプリ",
    items: [
      "アプリ 1: アフター営業 問い合わせ対応（受付→回答→記録→営業へ通知）",
      "アプリ 2: 技術ナレッジ検索（熱処理 または 設備保全）。埋め込みは社内で実行",
    ],
    highlight: true,
  },
  {
    label: "評価",
    items: ["PoC の効果と運用体制を振り返り、本番展開の範囲を決定"],
    highlight: false,
  },
  {
    label: "次段",
    items: ["ローカル LLM の高速化（GPU 導入時）", "海外拠点への展開", "Neibo 基盤"],
    highlight: false,
  },
];

export const pocTerms: PocTerms = {
  plan: "AppThrust Enterprise ベータ（基本料 150,000 円/月・5 アプリ込み・年契約 10% 引き）",
  environment: "御社 AWS アカウント内に導入",
  includes: ["SSO", "監査ログ", "導入・移行支援", "応答時間付きサポート"],
};

export const pocTermsLabels = {
  title: "PoC のご契約形態",
  plan: "プラン",
  environment: "環境",
  includes: "含まれるもの",
};

export const pricingSection: SectionHeading = {
  id: "pricing",
  eyebrow: "10",
  title: "料金",
  lead: "アプリ数に応じたシンプルな料金です。ベータ価格は契約期間中据え置きます。",
};

export const pricing: PricingTerms = {
  planName: "AppThrust Enterprise（セルフホスト）ベータ価格",
  basePrice: 150_000,
  includedApps: 5,
  perAppPrice: 29_800,
  annualDiscountPercent: 10,
  taxNote: "価格はすべて税抜です。",
  includes: [
    "SSO（OIDC / SAML 2.0）と SCIM によるユーザー同期",
    "監査ログのエクスポート・保持",
    "応答時間付きサポート",
    "導入・移行支援",
  ],
  notes: [
    "1 アプリ = 本番環境 1 本（コンポーネント 10 個 / 32 vCPU まで）。上限を超える分はアプリ数に換算します",
    "Excel 1 枚 = 1 アプリではありません。関連する複数の台帳を 1 つのアプリ（コンポーネント 10 個まで）にまとめられます",
    "ベータ価格は契約期間中据え置き",
  ],
  community: {
    name: "Community",
    price: "無料",
    note: "2026 年 11〜12 月公開予定",
  },
  // 参考価格の目安: 5 = 基本料の範囲（PoC〜最初の部門）、10 = 複数部門、30 = 全社・拠点展開
  referenceApps: [5, 10, 30],
  calculator: { min: 1, max: 50, defaultApps: 10 },
};

export const pricingLabels = {
  base: "基本料",
  baseUnit: "円/月",
  includedSuffix: "アプリ込み",
  perApp: "追加アプリ",
  perAppUnit: "円/アプリ/月",
  annual: "年契約",
  annualSuffix: "% 引き",
  includes: "含まれるもの",
  referenceTitle: "参考価格",
  referenceApps: "アプリ数",
  monthly: "月額",
  yearly: "年額（年契約 10% 引き）",
  calculatorTitle: "料金シミュレーション",
  calculatorAppsLabel: "アプリ数",
  appsUnit: "アプリ",
  yen: "円",
  extra: "追加",
  taxExcluded: "税抜",
};

export const nextSection: SectionHeading = {
  id: "next",
  eyebrow: "11",
  title: "次のステップ",
};

export const nextSteps: NextStep[] = [
  {
    title: "ヒアリング",
    body: "対象部門と PoC テーマ、AWS アカウントの管理体制、GPU のご利用状況、Lightblue との連携方針などをお伺いします。",
  },
  {
    title: "PoC 提案・お見積り",
    body: "ヒアリング内容をもとに、PoC の対象アプリ・期間・お見積りをご提示します。",
  },
  {
    title: "PoC 開始",
    body: "御社 AWS アカウント内に導入し、2〜3 カ月で 2 つのアプリを検証します。",
  },
];

export const contact = {
  lead: "お問い合わせ",
  name: "AppThrust 代表 森",
  company: "AppThrust（株式会社クラフトマンソフトウェア）",
};

export const companySection: SectionHeading = {
  id: "company",
  eyebrow: "12",
  title: "ご提案元について",
  lead: "AppThrust を開発・提供する株式会社クラフトマンソフトウェアの概要です。御社の機密情報をお預かりする前提として、認証と体制を先にお示しします。",
};

export const company = {
  name: "株式会社クラフトマンソフトウェア",
  nameEn: "Craftsman Software, Inc.",
  tagline: "インフラからアプリケーションまで、設計・実装・運用のすべてに責任を持つエンジニアリング企業",
  certifications: [
    {
      label: "ISMS / ISO 27001",
      number: "IS735461",
      body: "情報セキュリティマネジメントシステムの第三者認証。お客様の情報資産の機密性・完全性・可用性を、方針・運用・是正の仕組みで維持します。",
    },
    {
      label: "プライバシーマーク",
      number: "17004154",
      body: "個人情報の取り扱いに関する第三者認証。Directory など従業員情報を扱う機能は、この運用のもとで提供します。",
    },
  ],
  facts: [
    { label: "設立", value: "2013 年 10 月 15 日" },
    { label: "社員数", value: "47 名（2026 年 9 月時点）" },
    { label: "資本金", value: "23,006,940 円（準備金含む）" },
    { label: "本社", value: "東京都板橋区赤塚 8-10-2-701" },
    { label: "神田オフィス", value: "東京都千代田区神田須田町 1-24-4 THE CROSS 神田 2 階" },
    { label: "代表", value: "代表取締役 森 怜峰" },
  ],
  business: [
    "自社プロダクト AppThrust の開発・提供",
    "システムインフラの設計・構築・監視・運用とその自動化",
    "ソフトウェア開発、システム構築、運用",
    "ソフトウェアテスト自動化、開発コンサルティング",
  ],
  customers: [
    "本田技研工業株式会社",
    "株式会社NTTドコモ",
    "株式会社リクルートキャリア",
    "株式会社セプテーニ・オリジナル",
    "株式会社アッカ・インターナショナル",
  ],
  labels: {
    certifications: "認証",
    overview: "会社概要",
    business: "事業内容",
    customers: "主要取引先（順不同・敬称略）",
    source: "出典: craftsman-software.com/company、情報セキュリティ基本方針",
  },
};

export const footer = {
  disclaimer:
    "本資料の内容は 2026-10-26 時点のものです。提供状況は変更される場合があります。",
  copyright: "© AppThrust（株式会社クラフトマンソフトウェア）",
};

// ---------------------------------------------------------------------------
// 新セクション（2026-10-26 メール要望への対応）。

export const divisionSection: SectionHeading = {
  id: "division",
  eyebrow: "02",
  title: "Excel 管理を業務アプリにするときの分担",
  lead: "Excel の台帳を業務アプリにすると、「作る」「運用する」「管理する」仕事が生まれます。部門が持つことと、基盤（AppThrust）が持つことを、次のように分けます。",
};

export const division: DivisionContent = {
  labels: { task: "すること", department: "部門", platform: "AppThrust（基盤）" },
  rows: [
    {
      task: "アプリを作る",
      department:
        "テンプレートを選び、いまの Excel の列や運用ルールをもとに、作りたいアプリを日本語で指示する。",
      platform:
        "テンプレートからアプリのコード（Next.js + PostgreSQL）を非公開の GitHub リポジトリに作り、ビルドして公開 URL まで出す。デモ環境では約 10 分。",
    },
    {
      task: "画面や項目を直す",
      department:
        "管理画面の「AI で直す」に日本語で指示する、または GitHub Issue に書く。直った画面を確認する。",
      platform:
        "AI がコードを修正し、ビルドして配送する。Issue にラベルを付けると、AI が実装・検証して PR を作る。",
    },
    {
      task: "公開範囲と利用者を決める",
      department:
        "アプリの持ち主として、公開範囲（自分のみ・グループ・全社・公開）、持ち主グループ、メンバーを決める。",
      platform: "決めた範囲に合わせて利用者を制御する。人とグループは Directory で管理する。",
    },
    {
      task: "データを見る・直す",
      department:
        "アプリの持ち主と持ち主グループの管理者が、管理画面のデータタブから行を閲覧・修正する。項目の追加など構造を変えるときは、変更内容を確認する。",
      platform:
        "アプリごとの PostgreSQL を御社の Project 内で動かす。構造の変更は DatabaseChange として記録してから適用する。",
    },
    {
      task: "更新・監視・障害対応",
      department: "使っていて気づいた不具合を、管理画面の AI への指示や Issue で伝える。",
      platform: "基盤ソフトウェアの更新、アプリの監視、障害時の対応を担う。",
    },
    {
      task: "バックアップ・ロールバック",
      department: "変更を取り消すかどうか、いつの状態に戻すかを判断する。",
      platform:
        "アプリを前のバージョンに戻す（データは戻らない）。AWS 上では、アプリの PostgreSQL のスナップショットを既定で取得し、復元は基盤の担当者が行う。",
    },
    {
      task: "アカウント・SSO",
      department: "情報システム部が、御社 IdP との連携方法と、グループの持ち方を決める。",
      platform:
        "OIDC / SAML 2.0 による SSO と、SCIM によるユーザー・グループの同期を提供する（Enterprise）。",
    },
    {
      task: "新しい拠点へ配る",
      department: "国内で使ったアプリを、どの拠点で使うかを決める。",
      platform:
        "拠点の Project で、同じリポジトリから同じアプリを導入し、拠点ごとに SSO とグループを設定する。同じアプリを複数拠点へ同時に配る機能は開発中。拠点クラスタは 1 つの管理画面で管理する。",
    },
  ],
  note: "「ノーコードならすぐできる」という期待について、正直にお伝えします。AppThrust でも、どの項目を持つか、どの順で承認するか、何をもって正しく動いているとするか、という設計と検証は部門に残ります。基盤が引き受けるのは、その後の更新・権限・監視・障害対応です。PoC では導入・移行支援として、最初のアプリの設計と検証をご一緒します。",
};

export const useCasesSection: SectionHeading = {
  id: "usecases",
  eyebrow: "03",
  title: "活用例",
  lead: "AppThrust は正式提供前のため、お客様の導入事例はまだありません。代わりに、Builder Console に用意しているひな形、本日のデモ、PoC で作る候補を、置き換える Excel 管理の例と並べてお示しします。",
};

export const useCases: UseCasesContent = {
  kindLabels: { template: "ひな形（提供中）", demo: "本日のデモ", planned: "PoC 候補（計画中）" },
  labels: { open: "デモを開く", nowAvailable: "今できること", planned: "未提供・計画中" },
  items: [
    {
      name: "在庫管理",
      excelBefore: "部品・消耗品の在庫を部署ごとの Excel で数え、月末にまとめて集計する。",
      appAfter: "入出庫をその場で登録し、現在の在庫を全員が同じ画面で見る。",
      kind: "template",
    },
    {
      name: "マスター管理",
      excelBefore: "品番・取引先・設備の一覧が部署ごとに別の Excel にあり、どれが最新か分からなくなる。",
      appAfter: "マスターを 1 か所にまとめ、全員が同じ一覧を参照する。古い版のファイルが残らない。",
      kind: "template",
    },
    {
      name: "申請・承認",
      excelBefore: "申請書を Excel で作ってメールで回し、承認がどこで止まっているかを個別に確かめる。",
      appAfter: "申請から承認までを 1 つの画面で進め、いまの状況を一覧で見る。",
      kind: "template",
    },
    {
      name: "予約・貸出",
      excelBefore: "測定器・治具・会議室の予約を共有の Excel に書き込み、上書きや書き漏れが起きる。",
      appAfter: "空き状況を見て予約し、貸出と返却の記録をアプリに残す。",
      kind: "template",
    },
    {
      name: "製造現場 不具合・改善管理",
      excelBefore: "不具合と改善の記録を部署ごとの Excel で管理しており、部署をまたいだ傾向が見えにくい。",
      appAfter:
        "一覧・登録/編集・詳細・集計を 1 つのアプリにしました（nextjs-postgres テンプレートから作成、架空データ 12 件）。会議中に、管理画面の AI へ「期限超過のラベルと絞り込みを追加して」と指示します。",
      kind: "demo",
      url: "https://quality-issues.pj-da57c2956ce4.appthrust.ink/",
    },
    {
      name: "アフター営業 問い合わせ対応",
      excelBefore: "問い合わせの受付・回答・記録が、担当者ごとのメールと Excel に分かれている。",
      appAfter: "受付から回答・記録までを 1 本のアプリにまとめ、過去の回答を Knowledge で検索する。",
      kind: "planned",
    },
    {
      name: "技術ナレッジ検索（熱処理・設備保全）",
      excelBefore: "熱処理資料や設備の修理履歴が、ファイルサーバーと Excel に散らばっている。",
      appAfter: "資料を Knowledge にまとめて社内で埋め込みを行い、業務アプリから過去の原因・対策を検索する。",
      kind: "planned",
    },
  ],
  dataUse: {
    title: "データ活用について、いまできること・まだできないこと",
    available: [
      "アプリごとに専用の PostgreSQL（御社の Project 内）",
      "アプリの持ち主と持ち主グループの管理者による、管理画面のデータタブからの閲覧・編集",
      "アプリ内の集計画面（デモの集計のように、アプリごとに作る）",
      "在庫管理・マスター管理のひな形では、アプリ内で CSV（UTF-8）の取り込み・書き出しができる",
      "業務アプリから Access Key で Knowledge を呼び出す（他アプリのデータ参照は、参照される側に API を作る）",
    ],
    planned: [
      "Excel ファイル（.xlsx）の直接取り込み、どのアプリでも使える共通の CSV 取り込み・書き出し",
      "複数アプリを横断する BI ダッシュボード・データウェアハウス",
      "メール通知",
      "基幹システム（SAP など）との連携",
    ],
  },
};

export const comparison: ComparisonContent = {
  title: "kintone など既存ノーコードとの違い",
  labels: {
    aspect: "観点",
    nocode: "kintone など既存ノーコード",
    appthrust: "AppThrust",
    advantage: "この観点で優位",
  },
  rows: [
    {
      aspect: "作り方",
      nocode: "画面上で部品を並べて、アプリを組み立てる。",
      appthrust: "テンプレートから始め、日本語の指示で AI がコード（Next.js + PostgreSQL）を書き換える。",
      advantage: "even",
    },
    {
      aspect: "できることの上限",
      nocode: "用意された部品・プラグインの範囲で作る。",
      appthrust:
        "実際のコードなので、画面・処理・他システムとの API 連携まで書ける。その分、変更の確認が必要。",
      advantage: "appthrust",
    },
    {
      aspect: "データの置き場所",
      nocode: "kintone はサイボウズ社のクラウド（SaaS）に保管する。",
      appthrust: "御社 AWS アカウント内の、アプリごとの PostgreSQL に保管する。",
      advantage: "appthrust",
    },
    {
      aspect: "課金単位",
      nocode: "利用者数。kintone スタンダードコースは 1 ユーザーあたり月 1,800 円の水準。",
      appthrust:
        "アプリ数。基本料 150,000 円/月で 5 アプリ、以降 1 アプリ 29,800 円/月。利用者数では増えない。",
      advantage: "even",
    },
    {
      aspect: "改修の担い手",
      nocode: "アプリを組んだ担当者が、画面上で直す。",
      appthrust:
        "部門が日本語で指示し、AI が修正する。コードは GitHub に残り、誰が何を変えたかを追える。",
      advantage: "even",
    },
    {
      aspect: "成熟度・部品数",
      nocode: "長い提供実績と、豊富な部品・プラグイン。エクセディ物流様でも発注業務でご利用中。",
      appthrust: "正式提供前（ベータ）。業務向けひな形は 4 種で、お客様の導入事例はまだない。",
      advantage: "nocode",
    },
  ],
  note: "既存の kintone 活用を置き換えるご提案ではありません。部品の範囲で足りる業務は kintone のまま使い、データを社外に置けない業務や、部品の範囲を超える処理・AI 連携が必要な業務を AppThrust で作る、という併用を想定しています。",
};

// ---------------------------------------------------------------------------
// コラム: DX のためのアーキテクチャ・モダナイゼーション

export type ColumnDiagram = {
  beforeTitle: string;
  beforeItems: string[]; // 個別に並ぶ箱（Excel・RPA・個別ツール…）
  beforeProblems: string[]; // 箱の下に出す問題点（短句）
  afterTitle: string;
  afterLayers: { name: string; items: string[] }[]; // 上から: 業務アプリ層 / 共通基盤層 / 実行基盤層
  afterGains: string[]; // 右に出す効果（短句）
  arrow: string; // 「モダナイゼーション」
};

export type ColumnContent = {
  heading: SectionHeading;
  paragraphs: string[]; // 本文。段落ごと
  diagram: ColumnDiagram;
  diagramCaption: string;
  pullQuote: string; // 強調する一文
  closing: string; // 締め（エクセディ様への接続）
};

export const column: ColumnContent = {
  heading: {
    id: "column",
    eyebrow: "コラム",
    title: "DX に、なぜアーキテクチャの刷新が要るのか",
    lead: "ツールを足すだけでは、データ活用は進みません。業務アプリの「置き場所」そのものを揃える必要があります。",
  },
  paragraphs: [
    "多くの製造業で、DX は「現場の工夫」から始まります。部門ごとの Excel 台帳、メールでの承認、RPA による転記、AI チャットの導入。どれも個別には効果があり、エクセディ様の問い合わせ対応自動化（年間 24 万時間の削減試算）もその成功例です。",
    "ところが、こうした工夫は互いにつながっていません。Excel の列はファイルごとに違い、RPA は画面が変わると止まり、AI チャットの回答は人が読んで転記します。認証・権限・バックアップ・監査も、ツールごとに別々です。2 本目、3 本目と増えるほど、つなぎ直しと保守の負担が増え、データは「あるが、使えない」状態になります。",
    "原因は、個々のツールではなく、それらが載っている土台にあります。土台がないまま積み上げると、業務アプリの数だけ運用が増えます。逆に、認証・データベース・配送・AI 呼び出し・監査を共通の層に下ろし、業務アプリはその上に「同じ作り」で載せると、増やすほど楽になります。これがアーキテクチャのモダナイゼーションです。",
    "刷新といっても、基幹システム（SAP）を作り直す話ではありません。基幹の外側にある、Excel と RPA で回っている業務の置き場所を、共通の土台の上に移すことです。土台は御社のクラウドアカウント内に置き、データは外に出しません。",
  ],
  diagram: {
    beforeTitle: "現状: ツールの積み上げ",
    beforeItems: ["Excel 台帳", "メール承認", "RPA", "AI チャット", "個別 Web ツール"],
    beforeProblems: ["形式がバラバラ", "連携は手作業・転記", "権限・監査がツールごと", "増やすほど保守が増える"],
    afterTitle: "刷新後: 共通の土台の上に業務アプリ",
    afterLayers: [
      { name: "業務アプリ", items: ["不具合管理", "在庫管理", "申請・承認", "問い合わせ対応", "…"] },
      { name: "共通基盤", items: ["認証・権限（SSO / Directory）", "データベース", "AI・Knowledge", "配送・更新・監査"] },
      { name: "実行基盤（御社クラウド内）", items: ["拠点クラスタ ×N", "管理画面"] },
    ],
    afterGains: ["同じ作りで量産", "データが参照できる", "権限・監査は 1 か所", "増やすほど楽になる"],
    arrow: "モダナイゼーション",
  },
  diagramCaption:
    "図: ツールを個別に積み上げる現状と、共通の土台の上に業務アプリを載せる構成。土台（共通基盤・実行基盤）は AppThrust が担い、業務アプリは部門が作ります。",
  pullQuote: "業務アプリを増やすほど運用が重くなるか、楽になるか。差は土台の有無で決まります。",
  closing:
    "エクセディ様が「各部の Excel をユーザー主体の業務アプリに」と考えられているのは、まさにこの土台を求める動きです。AppThrust は、その土台を御社の AWS アカウント内に用意し、業務アプリは現場が作る、という分担をご提案します。",
};

// ---------------------------------------------------------------------------
// 活用ユースケース（社内業務アプリの先にある活用）。各カードに小さな流れ図を付ける。

export type FlowNodeKind = "person" | "external" | "app" | "ai" | "data" | "platform";

export type FlowNode = {
  label: string; // 10 文字以内を目安
  kind: FlowNodeKind;
  sub?: string; // 補足（小さく）
};

export type ExtendedUseCase = {
  id: string;
  name: string;
  status: FeatureStatus; // available = 提供中の機能だけで組める
  summary: string; // 何をするか 1〜2 文
  basis: string; // エクセディ様の事実との接点
  flow: FlowNode[]; // 左→右の流れ（3〜5 ノード）
  boundaryAfter?: number; // この index のノードまでが「社外」。省略時は境界なし
  caveat?: string; // 未提供部分や前提（正直に）
};

export type ExtendedUseCasesContent = {
  heading: SectionHeading;
  labels: { basis: string; caveat: string; boundary: string; legend: Record<FlowNodeKind, string> };
  items: ExtendedUseCase[];
};

export const extendedUseCases: ExtendedUseCasesContent = {
  heading: {
    id: "ideas",
    eyebrow: "04",
    title: "社内業務アプリの先にある活用",
    lead: "同じ土台の上で、社外との接点、新事業、情報収集まで広げられます。提供状況は機能ごとに正直に記しています。",
  },
  labels: {
    basis: "エクセディ様との接点",
    caveat: "前提・未提供の部分",
    boundary: "社外 | 御社クラウド内",
    legend: { person: "人", external: "社外", app: "業務アプリ", ai: "AI・Knowledge", data: "データ", platform: "基盤" },
  },
  items: [
    {
      id: "supplier-portal",
      name: "取引先・サプライヤー向けポータル",
      status: "available",
      summary: "納期回答、検査成績書の提出、図面変更の通知を、取引先が使う画面として公開します。社内アプリと同じ土台・同じ権限管理で運用します。",
      basis: "26 カ国 58 社のグループと、サプライチェーン中断をリスクに明記されている点。",
      flow: [
        { label: "取引先", kind: "external", sub: "招待された担当者" },
        { label: "ポータル", kind: "app", sub: "公開範囲: 招待制" },
        { label: "納期・成績書", kind: "data" },
        { label: "調達担当", kind: "person", sub: "社内アプリで確認" },
      ],
      boundaryAfter: 0,
      caveat: "取引先の ID は招待制。御社 IdP との SSO 連携は Enterprise。",
    },
    {
      id: "customer-inquiry",
      name: "顧客向け問い合わせ窓口",
      status: "available",
      summary: "受賞された社内の問い合わせ自動化の「入口」を、顧客側にも開きます。Web で受け付け、Knowledge から回答案を作り、記録し、担当営業へ渡します。",
      basis: "アフターマーケット営業の問い合わせ対応自動化（電話 2 回線・3 名 → 1 名）。",
      flow: [
        { label: "顧客", kind: "external" },
        { label: "受付フォーム", kind: "app" },
        { label: "回答案", kind: "ai", sub: "過去の回答を検索" },
        { label: "記録", kind: "data" },
        { label: "担当営業", kind: "person" },
      ],
      boundaryAfter: 0,
      caveat: "メール通知は未提供。担当営業への引き継ぎはアプリ内の一覧か、チャットツール連携で行います。",
    },
    {
      id: "express-next",
      name: "技術文書検索（EXPRESS）の次世代化",
      status: "available",
      summary: "2017 年に自社開発された横断検索を、Knowledge（RAG）で置き換えます。検索に加えて「この寸法の根拠は」といった質問に、文書を引用して答えます。文書は社内に留めます。",
      basis: "EXPRESS: 約 600 人が利用、情報収集工数を 1/3 に。",
      flow: [
        { label: "技術者", kind: "person" },
        { label: "検索・質問", kind: "app" },
        { label: "Knowledge", kind: "ai", sub: "埋め込みは社内 CPU" },
        { label: "技術文書", kind: "data", sub: "図面・仕様・報告書" },
      ],
      caveat: "回答の生成はクラスタ内 LLM（約 2 分）か、許可した外部 LLM のどちらか。検索だけなら外部 LLM は不要。",
    },
    {
      id: "safety-checklist",
      name: "災害事例の共有と作業前チェックリスト",
      status: "available",
      summary: "災害事例を Knowledge に蓄積し、作業前チェックリストのアプリが、作業内容に近い過去の事例を自動で提示します。「業務アプリが AI を呼ぶ」典型です。",
      basis: "Lightblue の活用テーマ「安全環境: 災害事例のナレッジ化」。",
      flow: [
        { label: "作業者", kind: "person", sub: "タブレット" },
        { label: "チェックリスト", kind: "app" },
        { label: "類似事例", kind: "ai", sub: "自動で検索" },
        { label: "災害事例", kind: "data" },
      ],
    },
    {
      id: "internal-ingest",
      name: "社内情報の自動収集と RAG",
      status: "planned",
      summary: "ファイルサーバー・SharePoint・SAP の帳票・設備ログを定期的に取り込み、部門別の Knowledge に整理します。埋め込みは社内で行い、文書を外に出しません。",
      basis: "熱処理・設備保全・品質・安全と、部門ごとに形式知化したい対象が並列に存在する点。",
      flow: [
        { label: "ファイルサーバー", kind: "data", sub: "SharePoint・SAP" },
        { label: "取り込み", kind: "platform", sub: "定期実行" },
        { label: "Knowledge", kind: "ai", sub: "部門別" },
        { label: "業務アプリ", kind: "app" },
      ],
      caveat: "取り込みは現在 Notion 連携と Markdown のみ。ファイルサーバー・SharePoint・SAP のコネクタは計画中。",
    },
    {
      id: "external-agent",
      name: "社外情報の収集エージェント",
      status: "developing",
      summary: "特許公報、規制・法令、競合や OEM の公開情報、サプライヤーのニュースを、許可した宛先だけに通信する隔離エージェントが収集・要約し、Knowledge に蓄積します。要約もローカル LLM で行い、「何を調べているか」を外部に漏らしません。",
      basis: "新事業（ロボット・ドローン）では自動車以外の規制・競合を継続的に追う必要がある点。SaaS 型 AI では調査対象そのものが外部に渡る。",
      flow: [
        { label: "公開情報", kind: "external", sub: "特許・規制・競合" },
        { label: "収集エージェント", kind: "platform", sub: "隔離実行" },
        { label: "要約", kind: "ai", sub: "ローカル LLM" },
        { label: "Knowledge", kind: "data" },
        { label: "企画担当", kind: "person" },
      ],
      boundaryAfter: 0,
      caveat: "Egress 制御・隔離実行・ローカル LLM は提供中。定期実行する隔離エージェント（Sandboxed Actor）は実装済みで検証中。",
    },
  ],
};
