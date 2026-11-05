// 株式会社FIXER様向けご提案ページの文言。
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
  recipient: string;
  title: string;
  date: string;
  thesis: string;
  coexistence: string;
  flow: { role: string; product: string; text: string }[];
  presenter: string;
};

export type BackgroundContent = {
  proposal: { label: string; quote: string; note: string };
  understanding: { label: string; summary: string };
  points: { title: string; body: string }[];
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

export type BuiltinApp = {
  name: string;
  role: string;
  status: FeatureStatus;
};

export type BuiltinAppsContent = {
  title: string;
  lead: string;
  items: BuiltinApp[];
  note: string;
};

export type ConnectionDiagram = {
  title: string;
  boundary: string;
  noInternet: string;
  user: string;
  app: { title: string; sub: string };
  knowledge: { title: string; sub: string };
  embedding: { title: string; sub: string };
  gateway: { title: string; sub: string[] };
  directCall: string;
  llm: { tag: string; title: string; sub: string };
  gaixer: { tag: string; title: string; sub: string };
  caption: string;
};

export type ConnectionContent = {
  diagram: ConnectionDiagram;
  points: { title: string; body: string }[];
  confirm: { title: string; items: string[]; note: string };
};

export type PartnershipOption = {
  key: string;
  name: string;
  summary: string;
  points: { label: string; value: string }[];
  fit: string;
};

export type PartnershipContent = {
  options: PartnershipOption[];
  priceReference: {
    title: string;
    plan: string;
    lines: { label: string; value: string }[];
    note: string;
  };
};

export type RoleRow = {
  area: string;
  fixer: string;
  appthrust: string;
};

export type RolesContent = {
  labels: { area: string; fixer: string; appthrust: string };
  rows: RoleRow[];
  note: string;
};

export type QuestionItem = {
  topic: string;
  question: string;
  why: string;
};

export type PocPlan = {
  title: string;
  goal: string;
  rows: { label: string; value: string }[];
};

export type NextStep = {
  title: string;
  body: string;
};

export const ui = {
  brand: "AppThrust",
  brandFor: "株式会社FIXER様 ご提案",
  navAria: "ページ内の目次",
  skipLink: "本文へスキップ",
};

// ---------------------------------------------------------------------------

export const navItems: NavItem[] = [
  { id: "background", label: "背景" },
  { id: "about", label: "AppThrust とは" },
  { id: "connection", label: "技術接続" },
  { id: "demo", label: "ライブデモ" },
  { id: "partnership", label: "協業の形" },
  { id: "roles", label: "役割分担" },
  { id: "questions", label: "確認したいこと" },
  { id: "next", label: "次のステップ" },
  { id: "company", label: "ご提案元" },
];

export const hero: Hero = {
  customer: "株式会社FIXER",
  recipient: "馬場 光史 様",
  title: "Sovereign GaiXer × AppThrust 協業のご提案",
  date: "2026-11-05",
  thesis:
    "情報を外に出せない企業に、オンプレミスの生成 AI と業務アプリ基盤をセットで届ける",
  coexistence:
    "Sovereign GaiXer が「社内で動く生成 AI」を担い、AppThrust が「その AI を使う業務アプリを部門ごとに作り・公開し・運用する基盤」を担います。AppThrust の AI 機能は OpenAI 互換のエンドポイントに接続する設計のため、推論先を GaiXer にすれば、同じ仕組みのまま閉域で動きます。",
  flow: [
    {
      role: "AI を動かす",
      product: "Sovereign GaiXer（FIXER）",
      text: "お客様の環境の中で生成 AI を動かす。質問文も文書も外に出さない",
    },
    {
      role: "AI につなぐ",
      product: "AI Gateway（AppThrust）",
      text: "Project 内の AI 利用はすべて Gateway を通り、GaiXer の OpenAI 互換 API へ送られる",
    },
    {
      role: "業務で使う",
      product: "業務アプリ・Knowledge（AppThrust）",
      text: "社内文書の検索・回答や、部門ごとの業務アプリが、GaiXer を推論先として動く",
    },
  ],
  presenter: "株式会社クラフトマンソフトウェア 森 怜峰",
};

// --- 01 背景 ---------------------------------------------------------------

export const backgroundSection: SectionHeading = {
  id: "background",
  eyebrow: "01",
  title: "背景",
  lead: "CEATEC 2026 の会場で頂いたご提案を、私たちは次のように受け止めています。",
};

export const background: BackgroundContent = {
  proposal: {
    label: "CEATEC でのご提案",
    quote: "貴社アプリケーションをオフロードして、Sovereign GaiXer に組み入れる",
    note: "AppThrust を GaiXer の上で動かし、GaiXer の提供価値の一部として届けるというお話と理解しています。",
  },
  understanding: {
    label: "私たちの理解",
    summary:
      "情報を外に出せない企業に、オンプレミスの生成 AI と業務アプリ基盤をセットで届ける。",
  },
  points: [
    {
      title: "AI だけでは業務は変わらない",
      body: "社内で生成 AI が動いても、それを使う業務アプリがなければ、使い道は「人がチャットで聞く」にとどまります。",
    },
    {
      title: "業務アプリにも同じ閉域が要る",
      body: "AI が閉域で動いていても、業務アプリやナレッジ検索が外部 SaaS にあれば、データは結局外に出ます。両方を同じ環境に置く必要があります。",
    },
    {
      title: "部門ごとに作り、安全に運ぶ",
      body: "情シスがすべてを作るのではなく、部門が業務アプリを作り、権限・更新・監視は基盤が担う。この部分を AppThrust が受け持ちます。",
    },
  ],
};

// --- 02 AppThrust とは -----------------------------------------------------

export const aboutSection: SectionHeading = {
  id: "about",
  eyebrow: "02",
  title: "AppThrust とは",
  lead: "業務アプリを部門ごとに安全に量産・公開するための基盤です。お客様の環境の中に導入し、アプリ・ナレッジ・AI 呼び出しを環境内で完結させます。",
};

export const architecture: ArchitectureContent = {
  title: "AppThrust の構成",
  description:
    "お客様の環境の中に、管理画面と部門ごとのクラスタを置きます。各クラスタでは業務アプリ、Builder Console、Knowledge（RAG）、AI Gateway と LLM、Directory/SSO が動作し、アプリのデータ・ナレッジの保管、埋め込み処理、回答の生成まで環境内で完結します。外部への通信は Egress 制御で許可した宛先に限ります。",
  diagram: {
    boundaryTitle: "お客様の環境",
    boundaryFuture: "（閉域・オンプレミス）",
    dataStays: "データは環境内",
    controlPlaneTitle: "管理画面（AppThrust）",
    controlPlaneItems: ["基盤・アプリ配送", "SSO・権限", "AI 利用ポリシー", "監査ログ"],
    deliver: "配送",
    mainClusterTitle: "業務クラスタ（部門 A）",
    businessApp: "業務アプリ",
    toolBuilder: "Builder Console",
    knowledge: "Knowledge（RAG）",
    embedding: "AI Gateway・LLM",
    directory: "Directory / SSO",
    overseasCluster: "業務クラスタ（部門 B）",
    moreClusters: "業務クラスタ ×N",
    egress: "Egress 制御・監査",
    allowed: ["許可した", "宛先のみ"],
    blocked: ["許可外の宛先", "遮断"],
    egressStatus: "",
  },
  valueProps: [
    {
      title: "データは環境内で完結",
      body: "業務アプリのデータ、ナレッジ、埋め込み（ベクトル化）、回答の生成まで、お客様の環境の中で動作します。",
    },
    {
      title: "部門がつくり、基盤が運ぶ",
      body: "テンプレートと日本語の指示で業務アプリを作成・公開。更新・権限・監視・ロールバックは基盤が担います。",
    },
    {
      title: "1 つの管理画面で全部門を運用",
      body: "部門ごとの Project・クラスタを 1 つの管理画面で管理し、基盤ソフトウェアを一括で配送します。",
    },
    {
      title: "AI 利用のルールを基盤で管理",
      body: "使える AI モデルを許可リストで定め、Project 内の AI 呼び出しはすべて AI Gateway を通して記録します。",
    },
  ],
};

export const builtinApps: BuiltinAppsContent = {
  title: "Project に入れて使う built-in apps",
  lead: "各 Project に、次の部品をアプリと同じ手順で導入できます。本日のデモ Project にも導入済みです。",
  items: [
    {
      name: "Builder Console",
      role: "テンプレートと日本語の指示で業務アプリを作り、公開する",
      status: "available",
    },
    {
      name: "Directory",
      role: "社員・組織・グループを管理し、アプリの利用権限に使う",
      status: "available",
    },
    {
      name: "Knowledge",
      role: "社内文書を取り込み、検索と根拠付きの回答を返す（RAG）",
      status: "available",
    },
    {
      name: "AI Gateway",
      role: "Project 内の AI 呼び出しの唯一の入口。OpenAI 互換で、推論先へ振り分ける",
      status: "available",
    },
    {
      name: "LLM",
      role: "クラスタ内で動く生成 LLM（gemma3:4b、CPU）。外部 API を使わない",
      status: "available",
    },
    {
      name: "Embedding",
      role: "文書のベクトル化をクラスタ内で行う（EmbeddingGemma、CPU）",
      status: "available",
    },
  ],
  note: "「提供中」は当社の開発環境（appthrust.ink）で稼働している機能を指します。オンプレミスへの導入は開発中（1 ホスト構成で確認済み、複数ホスト構成は検証中）、GPU での推論は開発中です。",
};

// --- 03 技術接続 -----------------------------------------------------------

export const connectionSection: SectionHeading = {
  id: "connection",
  eyebrow: "03",
  title: "技術接続: AppThrust の AI は GaiXer に向けられる",
  lead: "AppThrust の中で AI を使う部品は、すべて Project 内の AI Gateway を経由します。Gateway は OpenAI 互換のエンドポイントに要求を送るため、推論先を差し替えるだけで、同じ経路のまま GaiXer で動きます。",
};

export const connection: ConnectionContent = {
  diagram: {
    title: "AI 呼び出しの経路",
    boundary: "お客様の環境（閉域）",
    noInternet: "外部インターネットへの経路なし",
    user: "利用者",
    app: { title: "業務アプリ", sub: "本ページのデモ" },
    knowledge: { title: "Knowledge", sub: "検索・回答（RAG）" },
    embedding: { title: "Embedding", sub: "ベクトル化（クラスタ内）" },
    gateway: { title: "AI Gateway", sub: ["OpenAI 互換", "モデル許可・呼び出し記録"] },
    directCall: "アプリから直接も呼べる",
    llm: { tag: "本日のデモ", title: "llm（同梱）", sub: "gemma3:4b・CPU" },
    gaixer: { tag: "FIXER 環境", title: "Sovereign GaiXer", sub: "OpenAI 互換 API" },
    caption:
      "利用者の質問は業務アプリから Knowledge に渡り、Knowledge が社内文書を検索したうえで AI Gateway に回答の生成を依頼します。Gateway は登録された推論先（本日は Project 内の llm、FIXER 環境では GaiXer）に送ります。どの段階でも外部インターネットには出ません。",
  },
  points: [
    {
      title: "入口は 1 つ",
      body: "Knowledge の回答生成も、業務アプリからの AI 呼び出しも、Project 内の AI Gateway を通ります。推論先の資格情報を持つのは Gateway だけです。",
    },
    {
      title: "推論先は OpenAI 互換で差し替え",
      body: "Gateway は OpenAI 互換の /v1/chat/completions を話します。本日のデモは同梱の llm（gemma3:4b、CPU）が推論先です。GaiXer の OpenAI 互換 API を推論先として登録すれば、アプリ側を変えずに同じ経路で動きます。",
    },
    {
      title: "使うモデルと記録は基盤で管理",
      body: "どのモデルを使ってよいかを許可リストで定め、Gateway が呼び出しごとに推論先・モデル・結果を記録します。GaiXer を使う場合も同じ管理がかかります。",
    },
  ],
  confirm: {
    title: "確認させてください",
    items: [
      "GaiXer は OpenAI 互換の /v1/chat/completions（ストリーミング応答を含む）を持っていますか",
      "GaiXer は OpenAI 互換の /v1/embeddings を持っていますか（持たない場合、ベクトル化は AppThrust 同梱の Embedding で行えます）",
      "API の認証方式（API キー、mTLS など）と、クラスタから到達できるネットワーク上の位置",
    ],
    note: "GaiXer を推論先として登録する設定の手順は、PoC で一緒に確認します（要確認）。",
  },
};

// --- 04 ライブデモ ---------------------------------------------------------

export const demoSection: SectionHeading = {
  id: "demo",
  eyebrow: "04",
  title: "ライブデモ: 社内文書に聞く",
  lead: "このページ自体が AppThrust 上の業務アプリです。架空の社内文書を Knowledge に取り込んであり、質問すると、Project 内の AI Gateway を通して、クラスタ内の LLM で回答を生成します。質問文も文書も外部に送りません。",
};

/** チャットの待ち時間の上限の目安（CPU 推論の実測で初回 135〜174 秒）。 */
export const chatMaxWaitSeconds = 180;

/** 推論先バッジの既定値。配信先ごとに env `DEMO_INFERENCE_LABEL` で差し替える。 */
export const defaultInferenceLabel = "Project 内 llm（gemma3:4b）";

export const chat = {
  inferenceBadge: (label: string) => `推論先: ${label}／外部送信なし`,
  status: {
    checking: "接続を確認中",
    connected: "Knowledge 接続済み",
    disconnected: "Knowledge 未接続",
  },
  disconnectedNotice:
    "この環境では Knowledge が未接続のため、回答できません。Project で Knowledge との接続が整うと、ここから質問できます。",
  corpusNote:
    "取り込んである文書: 架空の製造業「ミナト精機株式会社」の社内規程・点検手順・FAQ など 7 本（すべて架空です）",
  examplesLabel: "例の質問",
  examples: [
    "ロボット溶接機RW-240の月次点検で、トルク確認する箇所と規定値は？",
    "海外クラウドへのアップロードは誰の承認が必要？ 機密情報と公開資料で違いはある？",
    "税抜30万円ちょうどの購入では、何社の相見積が必要？",
  ],
  inputLabel: "質問",
  inputPlaceholder: "社内規程や手順について質問してください（Enter で送信、Shift+Enter で改行）",
  submit: "質問する",
  cancel: "中止",
  questionLabel: "質問",
  answerLabel: "回答",
  citationsLabel: "回答の根拠（Knowledge の検索結果）",
  openSource: "文書を開く",
  waiting: "クラスタ内で推論中",
  streaming: "回答を生成中",
  elapsed: (seconds: number) => `経過 ${seconds} 秒（最大 ${chatMaxWaitSeconds} 秒ほど）`,
  slowNotice: "いつもより時間がかかっています。このままお待ちいただくか、Knowledge の画面でもお試しいただけます。",
  doneMessage: (seconds: number) => `回答まで ${seconds} 秒（クラスタ内で推論）`,
  waitHint: `回答まで数十秒〜${chatMaxWaitSeconds / 60} 分ほどかかることがあります（初めての質問ほど長くなります）。`,
  emptyAnswer: "回答が返りませんでした。質問を変えてお試しください。",
  errors: {
    knowledge_not_connected: "Knowledge 未接続のため回答できません。",
    knowledge_auth_failed: "このページからの回答経路を準備中です。Knowledge の画面でお試しください。",
    knowledge_upstream_error: "このページからの回答経路を準備中です。Knowledge の画面でお試しください。",
    invalid_request: "質問を入力してください（1,000 文字まで）。",
    answer_failed: "このページからの回答経路を準備中です。Knowledge の画面でお試しください。",
    network: "通信が途中で切れました。もう一度お試しいただくか、Knowledge の画面でお試しください。",
    cancelled: "回答の生成を中止しました。",
  },
  knowledgeLink: {
    label: "Knowledge の画面で開く",
    help: "Knowledge の画面（ログインが必要）でも、同じ文書・同じ LLM に質問できます。「クエリ」に質問を入れて「質問する」を押してください。",
    copied: "質問文をコピーしました。Knowledge の画面の「クエリ」に貼り付けて「質問する」を押してください。",
  },
};

// --- 05 協業の形 -----------------------------------------------------------

export const partnershipSection: SectionHeading = {
  id: "partnership",
  eyebrow: "05",
  title: "協業の形",
  lead: "2 つの形を考えています。どちらが GaiXer の販売の仕方に合うか、ご意見をお聞かせください。",
};

export const partnership: PartnershipContent = {
  options: [
    {
      key: "A",
      name: "再販",
      summary: "FIXER 様が AppThrust を GaiXer とあわせてお客様に販売する形です。",
      points: [
        { label: "契約", value: "お客様 ⇄ FIXER 様 ⇄ 当社" },
        { label: "価格", value: "定価に対するパートナー価格（料率は要相談）" },
        { label: "製品名", value: "AppThrust のまま" },
      ],
      fit: "GaiXer と AppThrust を、それぞれの製品として提案する場合に向きます。",
    },
    {
      key: "B",
      name: "OEM",
      summary: "AppThrust を GaiXer に同梱し、GaiXer の機能の一部として届ける形です。",
      points: [
        { label: "契約", value: "お客様 ⇄ FIXER 様。当社とは FIXER 様が契約" },
        { label: "価格", value: "GaiXer 同梱の定額ライセンス（金額は要相談）" },
        { label: "製品名", value: "GaiXer の一部として提供（表記は要相談）" },
      ],
      fit: "CEATEC で伺った「GaiXer に組み入れる」形に近い案です。",
    },
  ],
  priceReference: {
    title: "定価（参考）",
    plan: "AppThrust Enterprise ベータ価格",
    lines: [
      { label: "基本料", value: "150,000 円/月（5 アプリ込み）" },
      { label: "追加アプリ", value: "29,800 円/アプリ/月" },
      { label: "年契約", value: "10% 引き" },
    ],
    note: "金額はすべて税抜です。パートナー価格・OEM ライセンス額は、想定されるお客様の規模を伺ったうえでご提示します。",
  },
};

// --- 06 役割分担 -----------------------------------------------------------

export const rolesSection: SectionHeading = {
  id: "roles",
  eyebrow: "06",
  title: "役割分担",
  lead: "お客様の窓口は FIXER 様、製品の技術は当社が支える形を考えています。",
};

export const roles: RolesContent = {
  labels: { area: "項目", fixer: "FIXER 様", appthrust: "当社（クラフトマンソフトウェア）" },
  rows: [
    {
      area: "お客様窓口・一次サポート",
      fixer: "問い合わせの受付、切り分け、既知の対処",
      appthrust: "FIXER 様向けの手順書・FAQ の提供",
    },
    {
      area: "二次サポート",
      fixer: "当社へのエスカレーション",
      appthrust: "製品の不具合調査・修正、回避策の提示",
    },
    {
      area: "導入",
      fixer: "FIXER 様が実施、または当社と共同で実施",
      appthrust: "導入手順の提供、初期案件の同行・技術支援",
    },
    {
      area: "GaiXer との接続",
      fixer: "GaiXer 側のエンドポイント・認証の用意",
      appthrust: "AI Gateway の接続設定と検証",
    },
    {
      area: "製品の更新",
      fixer: "お客様への更新案内・実施判断",
      appthrust: "更新版の提供、更新手順と互換性の情報",
    },
  ],
  note: "SLA（応答時間・対応時間帯など）は、FIXER 様向けに別途定義します。",
};

// --- 07 確認したいこと -----------------------------------------------------

export const questionsSection: SectionHeading = {
  id: "questions",
  eyebrow: "07",
  title: "確認したいこと",
  lead: "協業の形と PoC の範囲を決めるために、次の点を伺えますか。",
};

export const questions: QuestionItem[] = [
  {
    topic: "GaiXer の基盤",
    question: "GaiXer はベアメタル、VM、Kubernetes のどれの上で動いていますか。",
    why: "AppThrust を同じ基盤に載せるか、隣に置くかが決まります。",
  },
  {
    topic: "OpenAI 互換 API",
    question: "/v1/chat/completions と /v1/embeddings を、OpenAI 互換で提供していますか。",
    why: "AI Gateway からそのまま接続できるかが決まります。",
  },
  {
    topic: "同梱アプリとの重なり",
    question: "GaiXer に同梱している業務アプリは、どのようなものがありますか。",
    why: "「AppThrust は基盤、FIXER 様のアプリもその上で動く」という整理で重ならないか確かめます。",
  },
  {
    topic: "想定顧客の規模",
    question: "想定されるお客様の業種・人数・部門数・拠点数はどのくらいですか。",
    why: "構成（ホスト台数）と、パートナー価格・OEM ライセンスの考え方が決まります。",
  },
];

// --- 08 次のステップ -------------------------------------------------------

export const nextSection: SectionHeading = {
  id: "next",
  eyebrow: "08",
  title: "次のステップ",
  lead: "まず技術接続を確かめ、そのうえで協業の条件を詰めることを提案します。",
};

export const pocPlan: PocPlan = {
  title: "技術接続の PoC",
  goal: "GaiXer のエンドポイントに AI Gateway を向け、Knowledge の回答を GaiXer で生成できることを確かめる。",
  rows: [
    { label: "期間", value: "2〜4 週" },
    { label: "環境", value: "GaiXer の検証環境、または当社の検証環境から GaiXer に接続（要相談）" },
    { label: "確かめること", value: "回答の生成、ストリーミング応答、呼び出し記録、応答時間" },
    { label: "条件", value: "要相談" },
  ],
};

export const nextSteps: NextStep[] = [
  {
    title: "確認事項の回答",
    body: "07 の確認事項（基盤・API・同梱アプリ・規模）を伺い、接続方式を決めます。",
  },
  {
    title: "技術接続の PoC",
    body: "GaiXer に AI Gateway を向け、本日のデモと同じ回答を GaiXer で生成します（2〜4 週）。",
  },
  {
    title: "協業条件の合意",
    body: "再販か OEM か、価格と役割分担・SLA を決め、最初のお客様への提案に進みます。",
  },
];

export const contact = {
  lead: "お問い合わせ",
  name: "代表取締役 森 怜峰",
  company: "株式会社クラフトマンソフトウェア（AppThrust）",
};

// --- 09 ご提案元 -----------------------------------------------------------

export const companySection: SectionHeading = {
  id: "company",
  eyebrow: "09",
  title: "ご提案元について",
  lead: "AppThrust を開発・提供する株式会社クラフトマンソフトウェアの概要です。",
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
    "本資料の内容は 2026-11-05 時点のものです。提供状況・価格は変更される場合があります。",
  copyright: "© AppThrust（株式会社クラフトマンソフトウェア）",
};
