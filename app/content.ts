// 株式会社FIXER様向けご提案ページの文言。
// 文言の修正はこのファイルだけで完結するようにしている（コンポーネント側に文言を書かない）。

export type FeatureStatus = "verified" | "available" | "developing" | "planned";

export const statusLabels: Record<FeatureStatus, string> = {
  verified: "検証済み",
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
  gaixer: {
    title: string;
    summary: string;
    layersLabel: string;
    layers: { name: string; role: string }[];
    facts: { title: string; body: string }[];
    source: string;
  };
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
  appthrustZone: string;
  gaixerZone: string;
  gaixerTag: string;
  app: { title: string; sub: string };
  knowledge: { title: string; sub: string };
  embedding: { title: string; sub: string };
  gateway: { title: string; sub: string[] };
  directCall: string;
  llm: { tag: string; title: string; sub: string };
  apiGateway: { title: string; sub: string };
  gaixerLlm: { title: string; sub: string };
  repoint: [string, string];
  logs: { appthrust: string; gaixer: string };
  caption: string;
};

export type ConnectionForm = {
  key: string;
  name: string;
  status: string;
  summary: string;
};

export type OnpremDiagram = {
  title: string;
  boundary: string;
  dataStays: string;
  host: { title: string; sub: string };
  pmc: { title: string; spec: string; items: string[] };
  worker: { title: string; spec: string; items: string[] };
  join: [string, string];
  pgx: { title: string; sub: string; items: string[] };
  aiCall: [string, string];
  customer: { title: string; items: string[] };
  registry: { title: string; sub: string; note: [string, string] };
  caption: string;
};

export type OnpremContent = {
  title: string;
  lead: string;
  diagram: OnpremDiagram;
  specs: {
    title: string;
    labels: { item: string; value: string; status: string };
    rows: { item: string; value: string; status: FeatureStatus }[];
    note: string;
  };
  requirements: { title: string; items: { title: string; body: string }[] };
};

export type ConnectionContent = {
  formA: ConnectionForm;
  diagram: ConnectionDiagram;
  onprem: OnpremContent;
  match: {
    title: string;
    labels: { gaixer: string; appthrust: string };
    rows: { gaixer: string; appthrust: string }[];
    note: string;
  };
  formB: ConnectionForm & {
    stackLabel: string;
    stack: { layer: string; content: string; highlight: boolean }[];
    verify: { title: string; items: { title: string; body: string }[] };
    note: string;
  };
  split: {
    title: string;
    lead: string;
    columns: { key: "gaixer" | "appthrust" | "overlap"; title: string; items: string[] }[];
    note: string;
  };
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
  details: string[];
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
    "Sovereign GaiXer が「社内で動く生成 AI とその共通部分（LLM の制御・安全対策・ユーザー管理・監査ログ）」を担い、AppThrust が「その AI を使う業務アプリを部門ごとに作り・公開し・運用する基盤」を担います。AppThrust の AI 呼び出しは AI Gateway に集まっているため、接続先を GaiXer の API 窓口に向ければ、業務アプリを変えずに社内 LAN の中で動きます。",
  flow: [
    {
      role: "AI を動かす",
      product: "Sovereign GaiXer（FIXER）",
      text: "お客様の環境の中で生成 AI を動かす。質問文も文書も外に出さない",
    },
    {
      role: "AI につなぐ",
      product: "AI Gateway（AppThrust）",
      text: "Project 内の AI 利用はすべて Gateway を通り、接続先を GaiXer の API 窓口に向けて送られる",
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
  lead: "CEATEC 2026 の会場で頂いたご提案と、公開情報から読み取った Sovereign GaiXer の姿を、私たちは次のように受け止めています。",
};

export const background: BackgroundContent = {
  proposal: {
    label: "CEATEC でのご提案",
    quote: "貴社アプリケーションをオフロードして、Sovereign GaiXer に組み入れる",
    note: "GaiXer は、AI-OS が LLM の制御や安全対策を引き受け、業務アプリはアプリストアから届ける製品です。そのストアの「作り手」として AppThrust を位置づけるお話と理解しています。",
  },
  understanding: {
    label: "私たちの理解",
    summary:
      "GaiXer アプリストアの作り手（業務ソフトメーカー・パートナー枠）として、AppThrust で作った業務アプリを GaiXer のお客様に届ける。",
  },
  gaixer: {
    title: "Sovereign GaiXer の要点",
    summary:
      "社内 LAN に 1 本つなぐだけで使える、オンプレミスの生成 AI アプライアンスです。インターネット接続は不要で、社内データを外に送らずに AI 処理が本体の中で完結します。",
    layersLabel: "4 つの層",
    layers: [
      { name: "PGX（筐体）", role: "Lenovo ThinkStation PGX。NVIDIA Blackwell、128GB unified memory" },
      { name: "Sovereign GaiXer（AI-OS）", role: "LLM の制御、安全対策、ユーザー管理、監査ログ。RAG（社内文書連携）は標準機能" },
      { name: "GaiXer アプリストア", role: "FIXER・販売パートナー・導入企業・業務ソフトメーカーがアプリを登録して届ける" },
      { name: "業務アプリ", role: "チャット、議事録、プレゼン資料作成、医療向け SOAP など" },
    ],
    facts: [
      {
        title: "アプライアンス",
        body: "一括買い切り 3,806,400 円（税別）、生成回数や利用人数による追加課金なし。出荷後 1〜2 営業日で届き、3 年保証付き。",
      },
      {
        title: "API 窓口",
        body: "社内システムから呼べる一本の窓口（LLM ゲートウェイ）。クラウド型生成 AI と同じ呼び出し方に対応し、接続先を本体に向け変えるだけ。利用者管理・監査ログはここで一括。",
      },
      {
        title: "アプリストア",
        body: "お客様ごとに AI 基盤を構築・保守しなくても AI-OS が引き受け、作り手はストアからオンプレへアプリを届けられる。",
      },
    ],
    source: "出典: sovereign.gaixer.com（トップページ、製品解説シリーズ第 6・8・10 回）2026-11-05 閲覧",
  },
  points: [
    {
      title: "共通部分は AI-OS が引き受ける",
      body: "LLM の制御・安全対策・ユーザー管理・監査ログは GaiXer が持ちます。アプリの作り手は、業務の中身に集中できます。",
    },
    {
      title: "ストアの価値は作り手の数で決まる",
      body: "社内で生成 AI が動いても、使う業務アプリがなければ使い道は「人がチャットで聞く」にとどまります。作り手が増えるほど、選べるアプリが増えます。",
    },
    {
      title: "AppThrust は業務アプリの作り手",
      body: "AppThrust は、業務アプリを部門ごとに作り・公開し・運用する基盤です。GaiXer の AI を使う業務アプリを、閉域のまま届けることを目指します。",
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
  title: "技術接続: 2 つの接続形",
  lead: "AppThrust もお客様の社内（オンプレミス）で動かす想定です。AppThrust の中で AI を使う部品は、すべて Project 内の AI Gateway を経由します。GaiXer とのつなぎ方は 2 つ考えられます。まず形 A（隣に置く）で接続を確かめ、形 B（同梱）は PoC の結果で判断することを提案します。",
};

export const connection: ConnectionContent = {
  formA: {
    key: "A",
    name: "隣に置く",
    status: "まずこの形で（本日のデモと同じ経路）",
    summary:
      "同じ社内 LAN の x86 ホストで AppThrust を動かし、AI Gateway の接続先を GaiXer の API 窓口に向けます。業務アプリと Knowledge は変えません。本日のデモは同梱の llm（gemma3:4b、CPU）が推論先で、FIXER 様の環境ではそこが GaiXer に替わります。",
  },
  diagram: {
    title: "形 A: AI 呼び出しの経路",
    boundary: "お客様の社内 LAN",
    noInternet: "AI 呼び出しは社外に出ない",
    user: "利用者",
    appthrustZone: "AppThrust（社内の x86 ホスト）",
    gaixerZone: "PGX · Sovereign GaiXer",
    gaixerTag: "FIXER 環境",
    app: { title: "業務アプリ", sub: "本ページのデモ" },
    knowledge: { title: "Knowledge", sub: "検索・回答（RAG）" },
    embedding: { title: "Embedding", sub: "ベクトル化" },
    gateway: { title: "AI Gateway", sub: ["接続先を登録", "モデル許可・呼び出し記録"] },
    directCall: "アプリから直接も呼べる",
    llm: { tag: "本日のデモ", title: "llm（同梱）", sub: "gemma3:4b・CPU" },
    apiGateway: { title: "API 窓口", sub: "LLM ゲートウェイ" },
    gaixerLlm: { title: "LLM（PGX 内）", sub: "推論エンジン vLLM / Ollama 等" },
    repoint: ["接続先を", "向け変える"],
    logs: {
      appthrust: "記録: AI Gateway の呼び出し記録（AppThrust 側）",
      gaixer: "記録: API 窓口の監査ログ（GaiXer 側）",
    },
    caption:
      "利用者の質問は業務アプリから Knowledge に渡り、Knowledge が社内文書を検索したうえで AI Gateway に回答の生成を依頼します。Gateway は登録された接続先に送ります。本日は同じ Project 内の llm、FIXER 様の環境では GaiXer の API 窓口で、その先は PGX の中の LLM です。AI 呼び出しの経路はすべて社内 LAN の中にあり、外部インターネットには出ません。呼び出しの記録は AppThrust 側と GaiXer 側の両方に残ります。",
  },
  onprem: {
    title: "形 A の中身: AppThrust のオンプレ配置",
    lead: "お客様の LAN の中に、AppThrust の管理クラスタ（PMC）と、業務アプリを動かすワーカーホストを置きます。ワーカーはお客様の Linux ホスト（VM またはベアメタル、x86_64）を SSH で登録し、k0s を入れて参加させます。各 Project の制御プレーンは管理クラスタの上で動きます（k0smotron の hosted control plane）。",
    diagram: {
      title: "AppThrust のオンプレ配置（最小構成）と GaiXer",
      boundary: "お客様の社内 LAN",
      dataStays: "推論・業務データは社外に出ない",
      host: { title: "x86 ホスト 1 台", sub: "x86_64・32 GiB（VM 2 つ）" },
      pmc: {
        title: "管理クラスタ（PMC）VM",
        spec: "8 vCPU / 20 GiB / 100 GiB SSD",
        items: ["管理画面・基盤の配送", "各 Project の制御プレーン", "MetalLB（LAN 内 VIP）"],
      },
      worker: {
        title: "ワーカー VM",
        spec: "4 vCPU / 8 GiB / 40 GiB 以上",
        items: ["k0s ワーカー", "業務アプリ・Knowledge", "AI Gateway"],
      },
      join: ["SSH で登録", "k0s で参加"],
      pgx: {
        title: "PGX · Sovereign GaiXer",
        sub: "FIXER 環境",
        items: ["API 窓口", "LLM（PGX 内）"],
      },
      aiCall: ["AI 呼び出し", "（LAN 内）"],
      customer: {
        title: "お客様に用意いただくもの",
        items: ["権威 DNS", "LAN 内の VIP 範囲", "TLS 発行者（自社 CA 可）"],
      },
      registry: {
        title: "OCI レジストリ",
        sub: "ghcr.io",
        note: ["初期のイメージ取得", "（要検討）"],
      },
      caption:
        "最小構成は x86 ホスト 1 台（32 GiB）に VM を 2 つ置き、管理クラスタとワーカーに分けます。業務アプリ・Knowledge・AI Gateway はワーカーで動き、AI 呼び出しは同じ LAN の GaiXer の API 窓口に向かいます。社外への通信は、導入・更新時に OCI レジストリ（ghcr.io）からイメージを取得する経路だけで、この扱いは要検討です。",
    },
    specs: {
      title: "構成とスペック",
      labels: { item: "項目", value: "内容", status: "状態" },
      rows: [
        {
          item: "最小構成",
          value: "x86_64 ホスト 1 台・32 GiB に VM 2 つ（管理クラスタ VM + ワーカー VM）",
          status: "verified",
        },
        {
          item: "管理クラスタ VM",
          value: "8 vCPU / 20 GiB / 100 GiB SSD。単一ノードの k3s、管理画面、各 Project の制御プレーン",
          status: "verified",
        },
        {
          item: "ワーカー VM",
          value: "4 vCPU / 8 GiB / 40 GiB 以上。k0s ワーカー、業務アプリ",
          status: "verified",
        },
        {
          item: "検証結果",
          value: "2026-10-18 受入。1 Project・5 アプリ・2 時間の負荷で、エラー 0",
          status: "verified",
        },
        {
          item: "複数ホスト・HA・本番プロファイル",
          value: "ワーカーホストを増やす構成、冗長化、本番向けの設定",
          status: "developing",
        },
      ],
      note: "Project のストレージとマネージド DB は、32 GiB の受入検証の範囲外です（要確認）。",
    },
    requirements: {
      title: "お客様の環境に必要なもの",
      items: [
        { title: "ホスト", body: "SSH で到達できる Linux ホスト（VM またはベアメタル、x86_64）" },
        { title: "DNS", body: "お客様が権威 DNS を持ち、AppThrust 用のレコードを作成（external モード）" },
        { title: "VIP 範囲", body: "LAN 内で MetalLB に割り当てる IP アドレスの範囲" },
        { title: "TLS 発行者", body: "証明書の発行者。お客様の CA も使えます" },
        {
          title: "インターネット",
          body: "導入時は OCI レジストリ（ghcr.io）からのイメージ取得が必要です。エアギャップ（レジストリミラー）は v1 の対象外のため要相談です。",
        },
      ],
    },
  },
  match: {
    title: "GaiXer の API 窓口と AppThrust の AI Gateway は、つなぎ方が合う",
    labels: { gaixer: "GaiXer の API 窓口（公開情報）", appthrust: "AppThrust の AI Gateway" },
    rows: [
      {
        gaixer: "「クラウド型生成 AI と同じ呼び出し方に対応」",
        appthrust: "OpenAI 互換の推論先（provider）を登録して呼ぶ。GaiXer の窓口が OpenAI 互換で呼べるかは要確認",
      },
      {
        gaixer: "「接続先を本体に向け変えるだけ」",
        appthrust: "業務アプリ・Knowledge は変えず、Gateway に登録した推論先だけを API 窓口に替える",
      },
      {
        gaixer: "利用者管理・監査ログは API 窓口で一括",
        appthrust: "Gateway も呼び出しごとに推論先・モデル・結果を記録。両側に記録が残る",
      },
      {
        gaixer: "混み合えば 2 台目を同じ LAN に置くと自動で協調",
        appthrust: "Gateway の接続先は 1 つの窓口のままで済む想定（2 台構成時の窓口の見え方は要確認）",
      },
    ],
    note: "GaiXer 側の記載は sovereign.gaixer.com（製品解説シリーズ第 6・10 回）より。",
  },
  formB: {
    key: "B",
    name: "同梱する（ストアアプリとして）",
    status: "PoC で判断",
    summary:
      "PGX 1 台の上に AppThrust を載せ、GaiXer アプリストアから配ります。サーバを 1 台足さずに済む一方、ARM の CPU と、LLM と共有する 128GB のメモリの上で動かすことになるため、次の点を確かめてから判断します。",
    stackLabel: "PGX 1 台の中の構成（想定）",
    stack: [
      { layer: "業務アプリ", content: "AppThrust で作った業務アプリ", highlight: true },
      { layer: "GaiXer アプリストア", content: "AppThrust をストアアプリとして配布", highlight: true },
      { layer: "Sovereign GaiXer（AI-OS）", content: "LLM の制御・安全対策・ユーザー管理・監査ログ", highlight: false },
      { layer: "PGX（筐体）", content: "ARM 20 コア、128GB を LLM と共有、DGX OS", highlight: false },
    ],
    verify: {
      title: "要検証",
      items: [
        { title: "arm64 対応", body: "AppThrust の ARM（arm64）での稼働は未検証です。動作確認済みは x86_64 の単一ホスト（32 GiB）です。" },
        { title: "1 台に収める構成", body: "k0s ワーカーは管理クラスタと同じ OS に同居できないため、1 台構成は「管理クラスタの VM + ワーカー」になります。DGX OS（Ubuntu ベース）の上で VM を分け、k3s / k0s を動かせるか確かめます。" },
        { title: "LLM とのメモリ配分", body: "AppThrust の最小構成は VM 2 つに計 28 GiB（20 + 8 GiB）を割り当てます。128GB の unified memory を LLM と分け合って足りるかを測ります。" },
        { title: "ストアのアプリ形式", body: "ストアアプリがコンテナで配れるのか、どの形式なら AppThrust を載せられるかを伺います。" },
        { title: "AI-OS との統合", body: "AI-OS のユーザー管理・監査ログと、AppThrust の SSO（OIDC）・記録をどうつなぐかを決めます。" },
      ],
    },
    note: "形 A で接続と業務の流れを確かめてから、形 B に進むかを PoC の結果で判断します。",
  },
  split: {
    title: "GaiXer が引き受けるもの / AppThrust が引き受けるもの",
    lead: "どちらの形でも、分担は次のとおりと考えています。",
    columns: [
      {
        key: "gaixer",
        title: "GaiXer が引き受けるもの",
        items: [
          "LLM の制御（推論エンジン）",
          "安全対策（ハルシネーション・プロンプトインジェクション・個人情報の検知）",
          "ユーザー管理",
          "監査ログ",
        ],
      },
      {
        key: "appthrust",
        title: "AppThrust が引き受けるもの",
        items: [
          "業務アプリの作成・公開",
          "部門別のアクセス権限",
          "アプリのデータベース",
          "RAG の文書管理（Knowledge）",
        ],
      },
      {
        key: "overlap",
        title: "重なるところ",
        items: [
          "ユーザー管理: AI-OS のユーザー管理 と AppThrust の Directory / SSO",
          "監査: API 窓口の監査ログ と AI Gateway の呼び出し記録",
          "RAG: GaiXer 標準の社内文書連携 と AppThrust の Knowledge",
        ],
      },
    ],
    note: "重なるところは、どちらを正とするかを PoC で決めます。",
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
  lead: "3 つの形を考えています。GaiXer の売り方に合うものを、組み合わせも含めてご意見をお聞かせください。",
};

export const partnership: PartnershipContent = {
  options: [
    {
      key: "1",
      name: "アプリストアの作り手",
      summary: "AppThrust で作った業務アプリを、GaiXer アプリとしてストアに登録・販売する形です。",
      points: [
        { label: "作り手の枠", value: "業務ソフトメーカー、または販売パートナーの枠" },
        { label: "届け方", value: "GaiXer アプリストアから、お客様のオンプレへ" },
        { label: "前提", value: "ストアのアプリ形式と、登録の条件・時期（要確認。公開情報ではパートナー相談で案内）" },
      ],
      fit: "CEATEC で伺った「GaiXer に組み入れる」に最も近い案です。技術面は 03 の形 B とストアの形式の確認結果によります。",
    },
    {
      key: "2",
      name: "基盤の再販 / OEM",
      summary: "FIXER 様が AppThrust そのものをお客様に届ける形です。お客様の部門が、自分たちで業務アプリを作れるようになります。",
      points: [
        { label: "再販", value: "お客様 ⇄ FIXER 様 ⇄ 当社。定価に対するパートナー価格（料率は要相談）。製品名は AppThrust のまま" },
        { label: "OEM", value: "FIXER 様の製品の一部として提供する定額ライセンス（金額・表記は要相談）" },
        { label: "接続", value: "03 の形 A（同じ LAN の x86 ホストに AppThrust をオンプレ配置）から始められる" },
      ],
      fit: "GaiXer を入れたお客様が、部門ごとに業務アプリを増やしていきたい場合に向きます。",
    },
    {
      key: "3",
      name: "クラウド側（ハイブリッド）",
      summary: "FIXER 様の cloud.config（24/365 マネージド）で Azure 上の AppThrust を運用し、お客様社内の GaiXer をオンプレの推論先にする形です。",
      points: [
        { label: "運用", value: "Azure 上の AppThrust を cloud.config で FIXER 様が運用" },
        { label: "推論", value: "お客様社内の GaiXer を AI Gateway の推論先に登録" },
        { label: "要確認", value: "Azure での AppThrust の稼働確認（要検証）、Azure と社内 LAN をつなぐ閉域接続の方式。業務アプリのデータは Azure 側に置くことになる" },
      ],
      fit: "社内にサーバを増やしたくないお客様や、FIXER 様の運用サービスとあわせて提案する場合に向きます。",
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
      fixer: "API 窓口の接続情報・認証の用意",
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
  lead: "接続形・協業の形・PoC の範囲を決めるために、次の点を伺えますか。",
};

export const questions: QuestionItem[] = [
  {
    topic: "API 窓口の仕様",
    question: "API 窓口は、OpenAI 互換の形で呼べますか。",
    details: [
      "OpenAI 互換の /v1/chat/completions と /v1/embeddings の有無",
      "認証の方式（API キー / ユーザーごとのトークン）",
      "提供しているモデルと、コンテキスト長",
      "ストリーミング応答の有無",
    ],
    why: "形 A で、AI Gateway の推論先としてそのまま登録できるかが決まります。/v1/embeddings がない場合、ベクトル化は AppThrust 同梱の Embedding で行えます。",
  },
  {
    topic: "アプリストアの登録形式",
    question: "AppThrust 製のアプリを、どの形式でストアに登録できますか。",
    details: [
      "コンテナか、Web アプリか",
      "AI-OS のユーザー管理との SSO の方法",
      "監査ログへの書き込み口",
      "登録の条件と時期",
    ],
    why: "協業の形 1（ストアの作り手）と、接続形 B（同梱）が成り立つかが決まります。",
  },
  {
    topic: "リソース",
    question: "PGX の上で、アプリにどれだけ資源を回せますか。",
    details: [
      "PGX 1 台の 128GB のうち、LLM 以外のアプリに回せる量",
      "複数台構成のとき、アプリをどの機体に置くか",
    ],
    why: "形 B で AppThrust を同梱できるか、何台の構成からお勧めするかが決まります。",
  },
  {
    topic: "導入先のネットワーク",
    question: "想定するお客様の LAN で、AppThrust の導入に必要なものを用意できますか。",
    details: [
      "導入・更新時に OCI レジストリ（ghcr.io）からイメージを取得する経路",
      "権威 DNS へのレコード作成、LAN 内の VIP 範囲、TLS 発行者（自社 CA 可）",
    ],
    why: "外部レジストリへ出られない（エアギャップ必須の）お客様は、v1 の対象外のため個別のご相談になります。",
  },
  {
    topic: "販路",
    question: "FIXER 様は、AppThrust をどの形で扱うのがよいですか。",
    details: [
      "再販 / OEM / cloud.config でのクラウド運用のどれか（組み合わせも含む）",
      "想定するお客様（極小〜中堅の製造業、医療、法務など）と、その規模",
    ],
    why: "05 のどの形で進めるかと、パートナー価格・OEM ライセンスの考え方が決まります。",
  },
];

// --- 08 次のステップ -------------------------------------------------------

export const nextSection: SectionHeading = {
  id: "next",
  eyebrow: "08",
  title: "次のステップ",
  lead: "まず形 A で技術接続を確かめ、そのうえで協業の条件を詰めることを提案します。",
};

export const pocPlan: PocPlan = {
  title: "技術接続の PoC（形 A）",
  goal: "AI Gateway を GaiXer の API 窓口に向け、本日の Knowledge デモをそのまま GaiXer で通す。",
  rows: [
    { label: "期間", value: "2〜4 週" },
    {
      label: "環境",
      value: "GaiXer の 2 週間無料トライアル環境（申込・審査あり。提供形態は要確認）、または FIXER 様社内の PGX。AppThrust は同じ LAN の x86 ホスト（最小構成 32 GiB）にオンプレ配置する",
    },
    {
      label: "確かめること",
      value: "回答の生成、ストリーミング応答、両側の記録（Gateway の呼び出し記録 / API 窓口の監査ログ）、応答時間",
    },
    { label: "形 B の判断材料", value: "arm64 で AppThrust が動くか、LLM と並べたときのメモリ配分（できる範囲で）" },
  ],
};

export const nextSteps: NextStep[] = [
  {
    title: "確認事項の回答",
    body: "07 の確認事項（API 窓口・ストアの登録形式・リソース・導入先のネットワーク・販路）を伺い、PoC の範囲を決めます。",
  },
  {
    title: "技術接続の PoC",
    body: "形 A で AI Gateway を API 窓口に向け、本日の Knowledge デモを GaiXer で通します（2〜4 週）。形 B に進むかもここで判断します。",
  },
  {
    title: "協業条件の合意",
    body: "ストアの作り手・基盤の再販 / OEM・クラウド運用のどれで進めるか、価格と役割分担・SLA を決め、最初のお客様への提案に進みます。",
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
