/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { useEffect } from "react";
import { HomeClient } from "@/components/lifer/HomeClient";

export default function Page() {
  useEffect(() => {
    const targetId = "Contact-section";

    const tryScroll = (): boolean => {
      const el = document.getElementById(targetId);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (tryScroll()) return;

    const obs = new MutationObserver(() => {
      if (tryScroll()) obs.disconnect();
    });

    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return <HomeClient />;
}
