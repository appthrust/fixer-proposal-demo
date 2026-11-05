"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { chat, chatMaxWaitSeconds } from "@/app/content";

type Citation = {
  documentId: string;
  title: string;
  url?: string;
  chunkIndex: number;
  text: string;
};

type Connection = "checking" | "connected" | "disconnected";
type Phase = "idle" | "waiting" | "streaming" | "done" | "error";
type ErrorCode = keyof typeof chat.errors;
type ChatError = { code: ErrorCode; detail?: string };

type ChatPanelProps = {
  /** Knowledge の公開画面。null ならリンクを出さない。 */
  knowledgePublicUrl: string | null;
  inferenceLabel: string;
};

export function ChatPanel({ knowledgePublicUrl, inferenceLabel }: ChatPanelProps) {
  const [connection, setConnection] = useState<Connection>("checking");
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<ChatError | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [finishedSeconds, setFinishedSeconds] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const busy = phase === "waiting" || phase === "streaming";
  const canAsk = connection === "connected" && !busy;
  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000));

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/ask/status", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { connected: false }))
      .then((body: { connected?: boolean }) => {
        setConnection(body.connected ? "connected" : "disconnected");
      })
      .catch(() => {
        if (!controller.signal.aborted) setConnection("disconnected");
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!busy) return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function ask(rawQuery: string) {
    const query = rawQuery.trim();
    if (!query || !canAsk) return;

    const controller = new AbortController();
    abortRef.current = controller;
    const started = Date.now();
    setQuestion(query);
    setAnswer("");
    setCitations([]);
    setError(null);
    setFinishedSeconds(null);
    setStartedAt(started);
    setNow(started);
    setPhase("waiting");

    const fail = (code: ErrorCode, detail?: string) => {
      // Operators can read the failure code in the browser console; customers see plain copy only.
      if (detail) console.warn(`[ask] ${code}: ${detail}`);
      setError({ code, detail });
      setPhase("error");
    };
    const finish = () => {
      setFinishedSeconds(Math.round((Date.now() - started) / 1000));
      setPhase("done");
    };

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const body = (await response.json().catch(() => ({}))) as { error?: string; status?: number; reason?: string };
        if (body.error === "knowledge_not_connected") {
          setConnection("disconnected");
          fail("knowledge_not_connected");
          return;
        }
        const code = body.error && body.error in chat.errors ? (body.error as ErrorCode) : "knowledge_upstream_error";
        fail(code, [`HTTP ${body.status ?? response.status}`, body.reason].filter(Boolean).join(" · "));
        return;
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      let text = "";
      let settled = false;

      while (!settled) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer = (buffer + value).replace(/\r\n/g, "\n");
        let boundary = buffer.indexOf("\n\n");
        while (boundary !== -1 && !settled) {
          const event = parseEvent(buffer.slice(0, boundary));
          buffer = buffer.slice(boundary + 2);
          boundary = buffer.indexOf("\n\n");
          if (!event) continue;

          if (event.name === "citation") {
            const hit = parseJSON<Citation>(event.data);
            if (hit) {
              setCitations((previous) =>
                previous.some((c) => c.documentId === hit.documentId && c.chunkIndex === hit.chunkIndex)
                  ? previous
                  : [...previous, hit],
              );
            }
          } else if (event.name === "token") {
            const piece = parseJSON<{ text?: string }>(event.data)?.text ?? "";
            if (piece) {
              if (text === "") setPhase("streaming");
              text += piece;
              setAnswer(text);
            }
          } else if (event.name === "done") {
            settled = true;
            finish();
          } else if (event.name === "error") {
            settled = true;
            const body = parseJSON<{ error?: string }>(event.data);
            fail("answer_failed", body?.error);
          }
        }
      }

      if (settled) {
        await reader.cancel().catch(() => undefined);
      } else if (text === "") {
        fail("network");
      } else {
        finish();
      }
    } catch {
      fail(controller.signal.aborted ? "cancelled" : "network");
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void ask(input);
    }
  }

  function askExample(example: string) {
    setInput(example);
    void ask(example);
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="sticky top-14 z-20 flex flex-wrap items-center justify-between gap-2 rounded-t-2xl border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 print:static">
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-600/30">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {chat.inferenceBadge(inferenceLabel)}
        </p>
        <ConnectionPill connection={connection} />
      </div>

      <div className="p-4 sm:p-6">
        {connection === "disconnected" ? (
          <p className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {chat.disconnectedNotice}
          </p>
        ) : null}

        <p className="text-xs text-slate-500">{chat.corpusNote}</p>

        <div className="mt-4">
          <p id="chat-examples-label" className="text-sm font-semibold text-slate-700">
            {chat.examplesLabel}
          </p>
          <ul aria-labelledby="chat-examples-label" className="mt-2 grid gap-2 md:grid-cols-3">
            {chat.examples.map((example) => (
              <li key={example}>
                <button
                  type="button"
                  onClick={() => askExample(example)}
                  disabled={!canAsk}
                  className="h-full w-full rounded-xl bg-blue-50 px-4 py-3 text-left text-sm text-blue-900 ring-1 ring-inset ring-blue-200 transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:ring-slate-200"
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="mt-5">
          <label htmlFor="chat-input" className="text-sm font-semibold text-slate-700">
            {chat.inputLabel}
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end">
            <textarea
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              maxLength={1000}
              placeholder={chat.inputPlaceholder}
              disabled={connection !== "connected"}
              className="min-h-[3.5rem] flex-1 resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-sm placeholder:text-slate-400 focus:border-blue-700 focus:outline-2 focus:outline-blue-700/30 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => abortRef.current?.abort()}
                className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                {chat.cancel}
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canAsk || input.trim() === ""}
                className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {chat.submit}
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-500">{chat.waitHint}</p>
          {knowledgePublicUrl ? (
            <div className="mt-3 flex flex-col gap-2 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-600">{chat.knowledgeLink.help}</p>
              <KnowledgeLink url={knowledgePublicUrl} text={question || input} />
            </div>
          ) : null}
        </form>

        {phase !== "idle" ? (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-xs font-semibold text-slate-500">{chat.questionLabel}</p>
            <p className="mt-1 font-bold text-slate-900">{question}</p>

            <div role="status" aria-live="polite" className="mt-4 text-sm">
              {busy ? (
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-800">
                    <span aria-hidden="true" className="size-3 animate-spin rounded-full border-2 border-blue-700 border-t-transparent motion-reduce:animate-none" />
                    <span className="tabular-nums">{chat.elapsed(elapsed)}</span>
                    <span>·</span>
                    <span>{phase === "waiting" ? chat.waiting : chat.streaming}</span>
                  </p>
                  <div aria-hidden="true" className="mt-2 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-700 transition-[width] duration-300 motion-reduce:transition-none"
                      style={{ width: `${Math.min(100, (elapsed / chatMaxWaitSeconds) * 100)}%` }}
                    />
                  </div>
                  {elapsed > chatMaxWaitSeconds ? (
                    <p className="mt-2 text-amber-900">{chat.slowNotice}</p>
                  ) : null}
                </div>
              ) : null}
              {phase === "done" && finishedSeconds !== null ? (
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                  {chat.doneMessage(finishedSeconds)}
                </p>
              ) : null}
            </div>

            {answer || phase === "done" ? (
              <div className="mt-4" aria-busy={busy}>
                <p className="text-xs font-semibold text-slate-500">{chat.answerLabel}</p>
                <div className="mt-1 rounded-xl bg-slate-50 px-4 py-3 text-slate-900">
                  {answer ? <AnswerText text={answer} /> : <p className="text-slate-500">{chat.emptyAnswer}</p>}
                </div>
              </div>
            ) : null}

            {error ? (
              <div role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                <p className="font-semibold">{chat.errors[error.code]}</p>
                {knowledgePublicUrl && error.code !== "cancelled" && error.code !== "invalid_request" ? (
                  <div className="mt-3">
                    <KnowledgeLink url={knowledgePublicUrl} text={question} />
                  </div>
                ) : null}
              </div>
            ) : null}

            {citations.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-semibold text-slate-500">{chat.citationsLabel}</p>
                <ol className="mt-2 grid gap-3 md:grid-cols-2">
                  {citations.map((citation, index) => (
                    <li
                      key={`${citation.documentId}-${citation.chunkIndex}`}
                      className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold tabular-nums text-white"
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900">{citation.title}</p>
                        <p className="mt-1 line-clamp-4 text-sm text-slate-600">{citation.text}</p>
                        {citation.url && /^https?:\/\//.test(citation.url) ? (
                          <a
                            href={citation.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-xs font-semibold text-blue-700 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-blue-700"
                          >
                            {chat.openSource}
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Knowledge の画面を新しいタブで開く。質問文があればクリップボードに写しておく（画面側に質問を渡す URL は無い）。 */
function KnowledgeLink({ url, text }: { url: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const query = text.trim();
  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          if (!query || !navigator.clipboard) return;
          navigator.clipboard.writeText(query).then(
            () => setCopied(true),
            () => setCopied(false),
          );
        }}
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-blue-800 ring-1 ring-inset ring-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        {chat.knowledgeLink.label}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      </a>
      {copied ? (
        <p role="status" className="text-xs text-emerald-800">
          {chat.knowledgeLink.copied}
        </p>
      ) : null}
    </div>
  );
}

function ConnectionPill({ connection }: { connection: Connection }) {
  const styles: Record<Connection, { pill: string; dot: string }> = {
    checking: { pill: "bg-slate-100 text-slate-700 ring-slate-400/30", dot: "bg-slate-400" },
    connected: { pill: "bg-emerald-50 text-emerald-800 ring-emerald-600/30", dot: "bg-emerald-500" },
    disconnected: { pill: "bg-amber-50 text-amber-900 ring-amber-600/40", dot: "bg-amber-500" },
  };
  return (
    <p
      role="status"
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[connection].pill}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${styles[connection].dot}`} />
      {chat.status[connection]}
    </p>
  );
}

/** LLM の回答に含まれる簡単な Markdown（見出し・箇条書き・太字）だけを整形する。 */
function AnswerText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, index) => {
        const key = `${index}`;
        const bullet = line.match(/^\s*(?:[-*・]|\d+\.)\s+(.*)$/);
        if (bullet) {
          return (
            <p key={key} className="flex gap-2 pl-1">
              <span aria-hidden="true" className="text-blue-700">
                ・
              </span>
              <span>{inline(bullet[1])}</span>
            </p>
          );
        }
        const heading = line.match(/^#{1,6}\s+(.*)$/);
        if (heading) {
          return (
            <p key={key} className="pt-1 font-bold">
              {inline(heading[1])}
            </p>
          );
        }
        if (line.trim() === "") return <div key={key} aria-hidden="true" className="h-1" />;
        return <p key={key}>{inline(line)}</p>;
      })}
    </div>
  );
}

function inline(line: string): ReactNode[] {
  return line.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

function parseEvent(raw: string): { name: string; data: string } | null {
  let name = "message";
  const data: string[] = [];
  for (const line of raw.split("\n")) {
    if (line.startsWith(":")) continue;
    if (line.startsWith("event:")) name = line.slice(6).trim();
    else if (line.startsWith("data:")) data.push(line.slice(5).replace(/^ /, ""));
  }
  return data.length > 0 || name !== "message" ? { name, data: data.join("\n") } : null;
}

function parseJSON<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
