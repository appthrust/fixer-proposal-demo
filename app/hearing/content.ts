export type Priority = "must" | "nice";

export type Question = {
  id: string;
  text: string;
  priority: Priority;
  /** Why we ask: which challenge / decision this feeds. */
  why: string;
  /** Quick-pick answers; free text is always available. */
  choices?: string[];
};

export type HearingSection = {
  id: string;
  title: string;
  minutes: number;
  intent: string;
  questions: Question[];
};

export const hearing = {
  title: "ヒアリングシート",
  subtitle: "株式会社エクセディ様 初回商談",
  date: "2026-10-27",
  lead: "「拝察する 6 つの課題」の当否を確かめ、PoC の条件と意思決定の経路を把握します。★ は最優先。所要 40 分。",
  avoid: [
    "料金交渉（提案ページの料金欄を見せて反応だけ見る）",
    "現行ベンダーの不満を引き出そうとすること",
  ],
  labels: {
    progress: "回答済み",
    must: "★ 最優先",
    all: "すべて",
    filterLabel: "表示",
    status: { open: "未", done: "済", hold: "保留" },
    answer: "回答メモ",
    answerPlaceholder: "聞いたことをそのまま。評価は後で。",
    why: "聞く理由",
    plan: "予定",
    elapsed: "経過",
    start: "開始",
    pause: "一時停止",
    resume: "再開",
    reset: "すべてリセット",
    resetConfirm: "回答・メモ・タイマーをすべて消します。よろしいですか？",
    copy: "Markdown をコピー",
    copied: "コピーしました",
    print: "印刷",
    summary: "まとめ",
    unanswered: "未回答の ★",
    holdList: "保留",
    followUp: "次回までの宿題",
    followUpPlaceholder: "持ち帰り事項、送る資料、次回の同席者など",
    minutes: "分",
    back: "提案ページへ戻る",
    avoidTitle: "聞かないこと",
    saved: "この端末に自動保存",
  },
  sections: [
    {
      id: "opening",
      title: "冒頭",
      minutes: 5,
      intent: "関心の本命と、社内での検討の広がりを掴む。",
      questions: [
        {
          id: "ceatec-focus",
          text: "CEATEC でどの部分に目が留まりましたか。",
          priority: "must",
          why: "提案の重心（データ非外部送信 / 自社で作る / 全社展開）を決める。",
          choices: ["データを外に出さない", "自社で作れる", "全社・拠点展開", "価格", "その他"],
        },
        {
          id: "who-knows",
          text: "社内で、誰が・どこまで今回の検討を共有していますか。",
          priority: "must",
          why: "個人の調査か部門課題かで、次回の進め方が変わる。",
          choices: ["森様個人", "情シス内", "部門横断", "役員まで"],
        },
      ],
    },
    {
      id: "current",
      title: "現状の AI・業務アプリ基盤",
      minutes: 10,
      intent: "課題 1・2 の当否。AI チャットの「次」に困っていることを特定する。",
      questions: [
        {
          id: "ai-next",
          text: "AI エージェントの利用率 90% の「次」に困っていることは何ですか。",
          priority: "must",
          why: "課題 2（フロー付き業務アプリ）の仮説検証。",
          choices: ["回答精度", "権限・閲覧範囲", "記録が残らない", "外部送信の不安", "部門ごとの個別要望", "特に困っていない"],
        },
        {
          id: "inquiry-app-owner",
          text: "受賞した「問い合わせ 受付→回答→記録→通知」は誰が作り、誰が保守していますか。2 本目は作れましたか。",
          priority: "must",
          why: "課題 6（運用を誰が持つか）の実態。量産の壁がどこにあるか。",
          choices: ["情シスが作成・保守", "部門が作成・保守", "外部ベンダー", "2 本目は未着手"],
        },
        {
          id: "kintone",
          text: "kintone は本体でも使っていますか。使っている場合、何が限界ですか。",
          priority: "nice",
          why: "ノーコード経験の有無と、ノーコードで足りない領域の把握。",
          choices: ["本体でも利用", "物流のみ", "未利用"],
        },
        {
          id: "express",
          text: "技術文書検索 EXPRESS は現役ですか。生成 AI と繋いでいますか。",
          priority: "nice",
          why: "課題 1（ナレッジ）の既存資産。Knowledge 取り込み候補。",
          choices: ["現役・AI 未連携", "現役・AI 連携済み", "縮小・廃止"],
        },
        {
          id: "erp-integration",
          text: "SAP / EXPLANNER / intra-mart との連携要件はありますか。読み取りだけで足りますか。",
          priority: "nice",
          why: "PoC の技術範囲と、基幹連携の難度を見積もる。",
          choices: ["読み取りのみ", "書き込みも必要", "連携不要", "未定"],
        },
      ],
    },
    {
      id: "data",
      title: "機密データと AI",
      minutes: 10,
      intent: "課題 3 の深掘り。線引きの有無と、守られ方を確認する。",
      questions: [
        {
          id: "data-boundary",
          text: "生成 AI に入れてはいけないデータの線引きは明文化されていますか。誰が決めていますか。",
          priority: "must",
          why: "AI 利用ポリシー機能の適用先。決裁者の特定。",
          choices: ["明文化あり", "慣習のみ", "なし", "検討中"],
        },
        {
          id: "data-enforcement",
          text: "その線引きは今どう守られていますか。",
          priority: "must",
          why: "ルール周知のみなら Egress 制御・監査ログが刺さる。",
          choices: ["ルール周知のみ", "技術的制御あり", "ログ監査あり", "わからない"],
        },
        {
          id: "oem-security",
          text: "OEM からセキュリティ要件（SOC2、ISMS、クラウド利用申告）を受けていますか。",
          priority: "nice",
          why: "弊社 ISMS / Pマークの位置づけと、提出書類の準備。",
          choices: ["受けている", "受けていない", "一部 OEM のみ"],
        },
        {
          id: "cloud-constraint",
          text: "クラウドは AWS 前提でよいですか。オンプレ要件のある拠点・データはありますか。",
          priority: "nice",
          why: "導入先（御社 AWS / オンプレ）の決定。",
          choices: ["AWS でよい", "一部オンプレ必須", "他クラウド", "未定"],
        },
        {
          id: "gpu",
          text: "GPU を自社で持つ意向はありますか。CPU 推論の遅さは許容できますか。",
          priority: "nice",
          why: "ローカル LLM の構成とコスト。",
          choices: ["GPU を持ちたい", "CPU で可", "外部 LLM 併用で可"],
        },
      ],
    },
    {
      id: "org",
      title: "組織と運用",
      minutes: 8,
      intent: "課題 5・6。作る人と運用する人、拠点展開の主体を掴む。",
      questions: [
        {
          id: "it-capacity",
          text: "情報システム部の規模と、アプリ基盤を運用できる人数は。「作る人」と「運用する人」は分かれていますか。",
          priority: "must",
          why: "プラットフォームが担う範囲（更新・権限・監視）の設計。",
          choices: ["兼任・数名", "専任チームあり", "外部委託中心"],
        },
        {
          id: "who-builds",
          text: "部門に自分でアプリを作らせたいですか。それとも情シスが集中管理したいですか。",
          priority: "must",
          why: "Builder Console の権限モデル（部門グループ / 中央管理）。",
          choices: ["部門で作らせたい", "情シス集中", "ハイブリッド", "未定"],
        },
        {
          id: "global-rollout",
          text: "海外 58 社への展開は情シス主導ですか、各社任せですか。SSO は統一されていますか。",
          priority: "nice",
          why: "マルチクラスタ・拠点ごと SSO 提案の前提。",
          choices: ["本社主導・SSO 統一", "本社主導・SSO 未統一", "各社任せ"],
        },
        {
          id: "dx-builders",
          text: "DX 人材 7 段階で「アプリを作れる」層は何人いますか。",
          priority: "nice",
          why: "Tool Builder の初期利用者数。研修計画。",
        },
        {
          id: "neibo-ops",
          text: "新事業（Neibo）のクラウド側は誰が運用する想定ですか。",
          priority: "nice",
          why: "課題 4。サービス運用基盤の提案先。",
          choices: ["内製", "外部委託", "未定"],
        },
      ],
    },
    {
      id: "poc",
      title: "PoC の条件",
      minutes: 5,
      intent: "最初の一歩を具体化する。",
      questions: [
        {
          id: "poc-target",
          text: "最初に試すなら、どの部門の・どの業務ですか。",
          priority: "must",
          why: "PoC スコープ。候補: 問い合わせ受付の 2 本目、熱処理ナレッジ、判定会議事前レビュー。",
          choices: ["問い合わせ受付（2 本目）", "熱処理ナレッジ", "判定会議 事前レビュー", "設備修理履歴", "その他"],
        },
        {
          id: "poc-data",
          text: "PoC に使えるデータは出せますか。",
          priority: "must",
          why: "匿名化データか、ダミーのみかで PoC の説得力が変わる。",
          choices: ["匿名化した実データ", "ダミーのみ", "要社内確認"],
        },
        {
          id: "poc-success",
          text: "PoC の成功条件は何ですか。",
          priority: "nice",
          why: "受け入れ基準を先に合意する。",
          choices: ["時間削減", "回答精度", "部門が自分で直せた", "セキュリティ要件を満たした"],
        },
        {
          id: "poc-env",
          text: "PoC 環境は御社 AWS アカウント内が必須ですか。弊社環境で可ですか。",
          priority: "nice",
          why: "環境準備の期間と費用。",
          choices: ["御社 AWS 必須", "弊社環境で可", "未定"],
        },
        {
          id: "poc-resource",
          text: "期間と担当リソース（担当者 1 名 × 週何時間）は。",
          priority: "nice",
          why: "PoC 計画（4 週）の実現性。",
        },
      ],
    },
    {
      id: "decision",
      title: "意思決定",
      minutes: 2,
      intent: "次のアクションの相手と期限を確定する。",
      questions: [
        {
          id: "decision-maker",
          text: "導入判断は誰が行いますか。予算年度はいつ切れますか。",
          priority: "must",
          why: "決裁経路と提案時期。",
          choices: ["情シス部長", "経営戦略推進本部", "役員会", "未定"],
        },
        {
          id: "alternatives",
          text: "比較検討している他社・製品はありますか。",
          priority: "nice",
          why: "差別化ポイントの調整。",
          choices: ["Dify", "Copilot Studio", "kintone 拡張", "SIer 提案", "なし"],
        },
        {
          id: "next-attendees",
          text: "次回、誰を同席させるべきですか。",
          priority: "nice",
          why: "次回アポの設計。",
        },
      ],
    },
  ] satisfies HearingSection[],
};
