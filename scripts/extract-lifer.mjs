import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcPath = path.join(root, "reference", "lifer-source.html");
const html = fs.readFileSync(srcPath, "utf8");

const jqueryMarker = '<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js';
const bodyIdx = html.indexOf("<body>");
const bodyInnerStart = html.indexOf(">", bodyIdx) + 1;
const scriptStart = html.indexOf(jqueryMarker);
const bodyInner = html.slice(bodyInnerStart, scriptStart);
fs.writeFileSync(path.join(root, "public", "lifer-body.html"), bodyInner);

const headStart = html.indexOf("<head>");
const headEnd = html.indexOf("</head>");
const head = html.slice(headStart, headEnd + 7);
const styleBlocks = [];
let pos = 0;
while (true) {
  const s = head.indexOf("<style", pos);
  if (s === -1) break;
  const gt = head.indexOf(">", s);
  const e = head.indexOf("</style>", gt);
  if (e === -1) break;
  styleBlocks.push(head.slice(gt + 1, e));
  pos = e + 8;
}
fs.writeFileSync(
  path.join(root, "public", "css", "lifer-head-styles.css"),
  styleBlocks.join("\n\n/* --- */\n\n")
);

const tail = html.slice(scriptStart);
const ordered = [];
let i = 0;
const tailLen = tail.length;
while (i < tailLen) {
  const m = tail.indexOf("<script", i);
  if (m === -1) break;
  const close = tail.indexOf("</script>", m);
  if (close === -1) break;
  const block = tail.slice(m, close + 9);
  if (/src\s*=/.test(block)) {
    const srcMatch = block.match(/src\s*=\s*"([^"]+)"/);
    if (srcMatch) ordered.push({ type: "external", src: srcMatch[1] });
  } else {
    const inner = block.replace(/^<script[^>]*>/, "").replace(/<\/script>\s*$/i, "");
    if (inner.trim()) ordered.push({ type: "inline", code: inner.trim() });
  }
  i = close + 9;
}

function patchInline(code) {
  let c = code.trim();
  const dcFunction = /^document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*function\s*\(\)\s*\{/;
  const dcArrow = /^document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*\(\)\s*=>\s*\{/;
  const dcEvent = /^document\.addEventListener\(\s*["']DOMContentLoaded["']\s*,\s*function\s*\(\s*event\s*\)\s*\{/;
  const jqReady = /^\$\(document\)\.ready\(function\s*\(\)\s*\{/;

  if (dcFunction.test(c)) {
    c = c.replace(dcFunction, "(function(){");
    if (c.endsWith("});")) c = c.slice(0, -3) + "})();";
    return c;
  }
  if (dcArrow.test(c)) {
    c = c.replace(dcArrow, "(()=>{");
    if (c.endsWith("});")) c = c.slice(0, -3) + "})();";
    return c;
  }
  if (dcEvent.test(c)) {
    c = c.replace(dcEvent, "(function(event){");
    if (c.endsWith("});")) c = c.slice(0, -3) + "})();";
    return c;
  }
  if (jqReady.test(c)) {
    c = c.replace(jqReady, "(function(){");
    if (c.endsWith("});")) c = c.slice(0, -3) + "})();";
    return c;
  }

  const embedHeroDc =
    /document\.addEventListener\(\s*["']DOMContentLoaded["']\s*,\s*function\s*\(\s*event\s*\)\s*\{/;
  if (embedHeroDc.test(c)) {
    c = c.replace(embedHeroDc, "(function(event){");
    const t = c.trimEnd();
    if (t.endsWith("});")) c = t.slice(0, -3) + "})();";
  }

  return c;
}

const patchedOrdered = ordered.map((item) => {
  if (item.type !== "inline") return item;
  let code = patchInline(item.code);
  if (code.includes("new Splide")) {
    code = code.replace(
      /const fraction = document\.getElementById\("review-fraction"\);\s*/,
      'const fraction = document.getElementById("review-fraction"); if (!fraction) return; '
    );
  }
  return { type: "inline", code };
});

/** DOMContentLoaded → IIFE makes Splide init run immediately; Splide must load first. */
function moveSplideScriptsBeforeInit(steps) {
  function isSplideCoreSrc(src) {
    return (
      src.includes("@splidejs/splide") &&
      src.includes("splide.min.js") &&
      !src.includes("splide-extension")
    );
  }
  function isSplideExtSrc(src) {
    return src.includes("splide-extension-auto-scroll");
  }

  const pulled = [];
  const withoutSplide = steps.filter((s) => {
    if (
      s.type === "external" &&
      (isSplideCoreSrc(s.src) || isSplideExtSrc(s.src))
    ) {
      pulled.push(s);
      return false;
    }
    return true;
  });

  if (pulled.length === 0) {
    return steps;
  }

  const core = pulled.find((p) => isSplideCoreSrc(p.src));
  const ext = pulled.find((p) => isSplideExtSrc(p.src));
  const orderedPulled = [core, ext].filter(Boolean);

  const initIdx = withoutSplide.findIndex(
    (s) => s.type === "inline" && s.code.includes("new Splide")
  );
  if (initIdx === -1) {
    return steps;
  }

  return [
    ...withoutSplide.slice(0, initIdx),
    ...orderedPulled,
    ...withoutSplide.slice(initIdx),
  ];
}

const finalOrdered = moveSplideScriptsBeforeInit(patchedOrdered);

fs.writeFileSync(
  path.join(root, "public", "lifer-runtime.json"),
  JSON.stringify(finalOrdered)
);

const externalOnly = ordered.filter((x) => x.type === "external").length;
const inlineOnly = ordered.filter((x) => x.type === "inline").length;
console.log("Wrote public/lifer-body.html, public/css/lifer-head-styles.css, public/lifer-runtime.json");
console.log("Ordered steps:", ordered.length, "(external:", externalOnly, "inline:", inlineOnly + ")");
