"use client";

import dynamic from "next/dynamic";

const LiferRuntime = dynamic(
  () =>
    import("@/components/lifer/LiferRuntime").then((m) => ({
      default: m.LiferRuntime,
    })),
  { ssr: false, loading: () => null }
);

export function HomeClient() {
  return <LiferRuntime />;
}
