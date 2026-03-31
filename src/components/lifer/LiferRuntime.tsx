"use client";

import { useEffect, useRef } from "react";

type RuntimeStep =
  | { type: "external"; src: string }
  | { type: "inline"; code: string };

const INJECT_ATTR = "data-lifer-runtime";

function loadExternalScript(
  src: string,
  injected: HTMLScriptElement[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    const exists = Array.from(document.querySelectorAll("script[src]")).some(
      (node) => (node as HTMLScriptElement).src === src
    );
    if (exists) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.setAttribute(INJECT_ATTR, "1");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(s);
    injected.push(s);
  });
}

function runInlineScript(code: string, injected: HTMLScriptElement[]): void {
  const s = document.createElement("script");
  s.setAttribute(INJECT_ATTR, "1");
  s.textContent = code;
  document.body.appendChild(s);
  injected.push(s);
}

export function LiferRuntime({ initialHtml }: { initialHtml?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Avoid hydration mismatch if initialHtml is present
    if (initialHtml && el.innerHTML === "") {
      el.innerHTML = initialHtml;
    }

    let cancelled = false;
    const injectedScripts: HTMLScriptElement[] = [];
    const ac = new AbortController();

    function cleanupInjectedScripts() {
      for (const node of injectedScripts) {
        node.remove();
      }
      injectedScripts.length = 0;
    }

    (async () => {
      try {
        // If we don't have initialHtml, we fetch it (fallback)
        if (!initialHtml) {
          const htmlRes = await fetch("/lifer-body.html", {
            signal: ac.signal,
          });
          const html = await htmlRes.text();
          if (cancelled) return;
          el.innerHTML = html;
        }

        const runtimeRes = await fetch("/lifer-runtime.json", {
          signal: ac.signal,
        });
        const steps = (await runtimeRes.json()) as RuntimeStep[];
        if (cancelled) return;

        for (let i = 0; i < steps.length; i++) {
          if (cancelled) return;
          const step = steps[i];
          try {
            if (step.type === "external") {
              await loadExternalScript(step.src, injectedScripts);
            } else {
              runInlineScript(step.code, injectedScripts);
            }
          } catch (err) {
            console.error(`[LiferRuntime] Step ${i} failed:`, err);
          }
        }
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        console.error("[LiferRuntime]", e);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
      cleanupInjectedScripts();
      // On unmount, clear content to avoid stale state
      if (el) el.innerHTML = "";
    };
  }, [initialHtml]);

  return (
    <div
      ref={rootRef}
      id="lifer-mount"
      className="lifer-mount"
      dangerouslySetInnerHTML={{ __html: initialHtml || "" }}
      suppressHydrationWarning
    />
  );
}
