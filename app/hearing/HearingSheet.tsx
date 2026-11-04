"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hearing, type HearingSection, type Question } from "./content";

type Status = "open" | "done" | "hold";

type Answer = {
  status: Status;
  picks: string[];
  note: string;
};

type Timer = {
  /** Accumulated milliseconds while not running. */
  elapsedMs: number;
  /** Epoch ms when running started; null when paused. */
  runningSince: number | null;
};

type SheetState = {
  answers: Record<string, Answer>;
  timers: Record<string, Timer>;
  followUp: string;
};

const STORAGE_KEY = "exedy-hearing-v1";

const emptyAnswer: Answer = { status: "open", picks: [], note: "" };
const emptyTimer: Timer = { elapsedMs: 0, runningSince: null };

function loadState(): SheetState {
  if (typeof window === "undefined") {
    return { answers: {}, timers: {}, followUp: "" };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: {}, timers: {}, followUp: "" };
    const parsed = JSON.parse(raw) as Partial<SheetState>;
    return {
      answers: parsed.answers ?? {},
      timers: parsed.timers ?? {},
      followUp: parsed.followUp ?? "",
    };
  } catch {
    return { answers: {}, timers: {}, followUp: "" };
  }
}

function timerElapsed(timer: Timer, now: number): number {
  return timer.elapsedMs + (timer.runningSince ? now - timer.runningSince : 0);
}

function formatMinutes(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function toMarkdown(state: SheetState, now: number): string {
  const lines: string[] = [
    `# ${hearing.title} — ${hearing.subtitle}（${hearing.date}）`,
    "",
  ];
  for (const section of hearing.sections) {
    const t = state.timers[section.id] ?? emptyTimer;
    lines.push(
      `## ${section.title}（予定 ${section.minutes} 分 / 実績 ${formatMinutes(timerElapsed(t, now))}）`,
      "",
    );
    for (const q of section.questions) {
      const a = state.answers[q.id] ?? emptyAnswer;
      const mark = a.status === "done" ? "x" : " ";
      const star = q.priority === "must" ? "★ " : "";
      const hold = a.status === "hold" ? "（保留）" : "";
      lines.push(`- [${mark}] ${star}${q.text}${hold}`);
      if (a.picks.length) lines.push(`  - 選択: ${a.picks.join(" / ")}`);
      if (a.note.trim()) {
        for (const l of a.note.trim().split("\n")) lines.push(`  - ${l}`);
      }
    }
    lines.push("");
  }
  if (state.followUp.trim()) {
    lines.push(`## ${hearing.labels.followUp}`, "", state.followUp.trim(), "");
  }
  return lines.join("\n");
}

export function HearingSheet() {
  const [state, setState] = useState<SheetState>(loadState);
  const [mustOnly, setMustOnly] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef<number | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const anyRunning = useMemo(
    () => Object.values(state.timers).some((t) => t.runningSince !== null),
    [state.timers],
  );

  useEffect(() => {
    if (!anyRunning) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [anyRunning]);

  const update = useCallback((id: string, patch: Partial<Answer>) => {
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [id]: { ...(s.answers[id] ?? emptyAnswer), ...patch } },
    }));
  }, []);

  const toggleTimer = useCallback((sectionId: string) => {
    const stamp = Date.now();
    setNow(stamp);
    setState((s) => {
      const timers: Record<string, Timer> = {};
      for (const [id, t] of Object.entries(s.timers)) {
        timers[id] = t.runningSince
          ? { elapsedMs: t.elapsedMs + (stamp - t.runningSince), runningSince: null }
          : t;
      }
      const current = timers[sectionId] ?? emptyTimer;
      const wasRunning = (s.timers[sectionId] ?? emptyTimer).runningSince !== null;
      timers[sectionId] = wasRunning
        ? current
        : { elapsedMs: current.elapsedMs, runningSince: stamp };
      return { ...s, timers };
    });
  }, []);

  const resetAll = () => {
    if (!window.confirm(hearing.labels.resetConfirm)) return;
    setState({ answers: {}, timers: {}, followUp: "" });
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(toMarkdown(state, Date.now()));
    setCopied(true);
    if (copiedTimeout.current) window.clearTimeout(copiedTimeout.current);
    copiedTimeout.current = window.setTimeout(() => setCopied(false), 1500);
  };

  const allQuestions = hearing.sections.flatMap((s) => s.questions);
  const visibleQuestions = (section: HearingSection) =>
    mustOnly ? section.questions.filter((q) => q.priority === "must") : section.questions;
  const doneCount = allQuestions.filter((q) => state.answers[q.id]?.status === "done").length;
  const mustQuestions = allQuestions.filter((q) => q.priority === "must");
  const mustDone = mustQuestions.filter((q) => state.answers[q.id]?.status === "done").length;
  const unansweredMust = mustQuestions.filter((q) => (state.answers[q.id]?.status ?? "open") !== "done");
  const held = allQuestions.filter((q) => state.answers[q.id]?.status === "hold");
  const totalPlanned = hearing.sections.reduce((a, s) => a + s.minutes, 0);
  const totalElapsed = hearing.sections.reduce(
    (a, s) => a + timerElapsed(state.timers[s.id] ?? emptyTimer, now),
    0,
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">
      <header className="pt-10">
        <Link href="/" className="text-sm text-blue-700 underline-offset-2 hover:underline print:hidden">
          ← {hearing.labels.back}
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{hearing.subtitle} · {hearing.date}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{hearing.title}</h1>
            <p className="mt-2 max-w-2xl text-slate-600">{hearing.lead}</p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={copyMarkdown}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              {copied ? hearing.labels.copied : hearing.labels.copy}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {hearing.labels.print}
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              {hearing.labels.reset}
            </button>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-20 -mx-4 mt-6 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 print:static print:border-0">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex min-w-[14rem] flex-1 items-center gap-3">
            <span className="whitespace-nowrap text-slate-600">
              {hearing.labels.progress}{" "}
              <strong className="tabular-nums text-slate-900">
                {doneCount}/{allQuestions.length}
              </strong>
              <span className="ml-2 text-slate-500">
                ★ <span className="tabular-nums">{mustDone}/{mustQuestions.length}</span>
              </span>
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
              <div
                className="h-full rounded-full bg-blue-700 transition-[width]"
                style={{ width: `${(doneCount / allQuestions.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="whitespace-nowrap text-slate-600">
            {hearing.labels.elapsed}{" "}
            <strong className={`tabular-nums ${totalElapsed > totalPlanned * 60_000 ? "text-red-700" : "text-slate-900"}`}>
              {formatMinutes(totalElapsed)}
            </strong>
            <span className="text-slate-500"> / {totalPlanned}:00</span>
          </span>
          <label className="flex cursor-pointer items-center gap-2 print:hidden">
            <input
              type="checkbox"
              checked={mustOnly}
              onChange={(e) => setMustOnly(e.target.checked)}
              className="size-4 accent-blue-700"
            />
            <span className="text-slate-700">{hearing.labels.must}のみ</span>
          </label>
          <span className="text-xs text-slate-400 print:hidden">{hearing.labels.saved}</span>
        </div>
      </div>

      <ol className="mt-8 space-y-10">
        {hearing.sections.map((section, index) => {
          const timer = state.timers[section.id] ?? emptyTimer;
          const elapsed = timerElapsed(timer, now);
          const over = elapsed > section.minutes * 60_000;
          const running = timer.runningSince !== null;
          const questions = visibleQuestions(section);
          if (questions.length === 0) return null;
          return (
            <li key={section.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <h2 className="flex items-baseline gap-3 text-xl font-bold text-slate-900">
                  <span className="text-sm font-semibold tabular-nums text-blue-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                  <span className="text-sm font-normal text-slate-500">
                    {hearing.labels.plan} {section.minutes}
                    {hearing.labels.minutes}
                  </span>
                </h2>
                <div className="flex items-center gap-3 print:hidden">
                  <span className={`font-mono text-sm tabular-nums ${over ? "text-red-700" : "text-slate-700"}`}>
                    {formatMinutes(elapsed)}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleTimer(section.id)}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                      running
                        ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                    }`}
                  >
                    {running
                      ? hearing.labels.pause
                      : elapsed > 0
                        ? hearing.labels.resume
                        : hearing.labels.start}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{section.intent}</p>
              <ul className="mt-4 space-y-3">
                {questions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    answer={state.answers[q.id] ?? emptyAnswer}
                    onChange={(patch) => update(q.id, patch)}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5 break-inside-avoid">
        <h2 className="text-lg font-bold text-slate-900">{hearing.labels.summary}</h2>
        <div className="mt-3 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-600">
              {hearing.labels.unanswered}{" "}
              <span className="tabular-nums">({unansweredMust.length})</span>
            </h3>
            {unansweredMust.length === 0 ? (
              <p className="mt-1 text-sm text-emerald-700">すべて回答済み</p>
            ) : (
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-800">
                {unansweredMust.map((q) => (
                  <li key={q.id}>{q.text}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-600">
              {hearing.labels.holdList} <span className="tabular-nums">({held.length})</span>
            </h3>
            {held.length === 0 ? (
              <p className="mt-1 text-sm text-slate-500">なし</p>
            ) : (
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-800">
                {held.map((q) => (
                  <li key={q.id}>{q.text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-600">{hearing.labels.followUp}</span>
          <textarea
            value={state.followUp}
            onChange={(e) => setState((s) => ({ ...s, followUp: e.target.value }))}
            placeholder={hearing.labels.followUpPlaceholder}
            rows={4}
            className="mt-1.5 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-slate-600">{hearing.labels.avoidTitle}</h3>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {hearing.avoid.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

const statusStyles: Record<Status, string> = {
  open: "border-slate-300 bg-white text-slate-600",
  done: "border-emerald-600 bg-emerald-600 text-white",
  hold: "border-amber-500 bg-amber-500 text-white",
};

function QuestionCard({
  question,
  answer,
  onChange,
}: {
  question: Question;
  answer: Answer;
  onChange: (patch: Partial<Answer>) => void;
}) {
  const togglePick = (choice: string) => {
    const picks = answer.picks.includes(choice)
      ? answer.picks.filter((p) => p !== choice)
      : [...answer.picks, choice];
    onChange({ picks, status: picks.length || answer.note.trim() ? "done" : answer.status });
  };
  const setNote = (note: string) => {
    onChange({
      note,
      status:
        answer.status === "hold" ? "hold" : note.trim() || answer.picks.length ? "done" : "open",
    });
  };

  return (
    <li
      className={`rounded-xl border p-4 transition-colors ${
        answer.status === "done"
          ? "border-emerald-200 bg-emerald-50/40"
          : answer.status === "hold"
            ? "border-amber-200 bg-amber-50/40"
            : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 gap-1 print:hidden" role="group" aria-label="状態">
          {(["open", "done", "hold"] as Status[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ status: s })}
              aria-pressed={answer.status === s}
              className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${
                answer.status === s ? statusStyles[s] : "border-slate-200 bg-white text-slate-400 hover:text-slate-700"
              }`}
            >
              {hearing.labels.status[s]}
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-900">
            {question.priority === "must" && (
              <span className="mr-1 text-amber-500" aria-label="最優先">
                ★
              </span>
            )}
            {question.text}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {hearing.labels.why}: {question.why}
          </p>
          {question.choices && (
            <div className="mt-3 flex flex-wrap gap-1.5 print:hidden">
              {question.choices.map((c) => {
                const on = answer.picks.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => togglePick(c)}
                    aria-pressed={on}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      on
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}
          {answer.picks.length > 0 && (
            <p className="mt-2 hidden text-sm text-slate-800 print:block">選択: {answer.picks.join(" / ")}</p>
          )}
          <textarea
            value={answer.note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={hearing.labels.answerPlaceholder}
            rows={2}
            aria-label={hearing.labels.answer}
            className="mt-3 w-full resize-y rounded-md border border-slate-200 bg-white p-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 print:min-h-16 print:border-dashed"
          />
        </div>
      </div>
    </li>
  );
}
