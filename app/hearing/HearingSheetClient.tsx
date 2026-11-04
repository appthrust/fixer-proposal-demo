"use client";

import dynamic from "next/dynamic";

export const HearingSheetClient = dynamic(
  () => import("./HearingSheet").then((m) => m.HearingSheet),
  { ssr: false },
);
