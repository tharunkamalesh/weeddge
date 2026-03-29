/* Runtime globals from Webflow / jQuery / GSAP / Splide (loaded via lifer-runtime). */
export {};

declare global {
  interface Window {
    Webflow?: { env: (k: string) => unknown };
    jQuery?: unknown;
    $?: unknown;
    Lenis?: new (options?: object) => {
      start: () => void;
      stop: () => void;
      raf: (time: number) => void;
    };
    lenis?: { start: () => void; stop: () => void; raf: (time: number) => void };
    gsap?: unknown;
    Splide?: new (selector: string, options?: object) => unknown;
  }
}
