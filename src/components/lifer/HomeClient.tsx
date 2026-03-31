"use client";

import dynamic from "next/dynamic";

const LiferRuntime = dynamic(
  () =>
    import("@/components/lifer/LiferRuntime").then((m) => ({
      default: m.LiferRuntime,
    })),
  { ssr: true, loading: () => null }
);

export function HomeClient({ initialHtml }: { initialHtml: string }) {
  return <LiferRuntime initialHtml={initialHtml} />;
}
