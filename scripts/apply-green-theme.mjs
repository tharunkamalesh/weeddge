/**
 * Rethemes Webflow-export gradients from purple/lavender/gold → EDDGE green.
 * Run: node scripts/apply-green-theme.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function apply(fileRel, pairs) {
  const fp = path.join(root, fileRel);
  let s = fs.readFileSync(fp, "utf8");
  const orig = s;
  for (const [a, b] of pairs) {
    if (!s.includes(a)) continue;
    s = s.split(a).join(b);
  }
  if (s !== orig) {
    fs.writeFileSync(fp, s);
    console.log("Updated", fileRel);
  } else {
    console.log("No changes", fileRel);
  }
}

/** Longer / exact strings first */
const htmlPairs = [
  [
    "linear-gradient(90deg, #2B58E0 0%, #D638A9 21.88%, #982FD8 60.57%, #FFBB37 100%)",
    "linear-gradient(90deg, #004D40 0%, #00695C 21.88%, #2E7D32 60.57%, #AED581 100%)",
  ],
  [
    "linear-gradient(90deg, #2b58e0, #d638a9 22%, #982fd8 61%, #ffbb37)",
    "linear-gradient(90deg, #004d40, #00695c 22%, #2e7d32 61%, #aed581)",
  ],
  [
    "linear-gradient(216deg, #ffe7c5 2%, #fff4e499 22%, #fff0 34%), linear-gradient(48deg, #dcafff 2%, #f1deff66 13%, #fff0 29%)",
    "linear-gradient(216deg, #dcedc8 2%, #f1f8e999 22%, #fff0 34%), linear-gradient(48deg, #b9f6ca 2%, #c8e6c966 13%, #fff0 29%)",
  ],
  [
    "background: linear-gradient(34deg, rgba(220, 175, 255, 1), rgba(220, 175, 255, .2) 10%, rgba(220, 175, 255, 0) 20%);",
    "background: linear-gradient(34deg, rgba(129, 199, 132, 1), rgba(129, 199, 132, .2) 10%, rgba(129, 199, 132, 0) 20%);",
  ],
  [
    "rgba(220, 175, 255, 0.25) 84%, #DCAFFF 96%",
    "rgba(129, 199, 132, 0.35) 84%, #81C784 96%",
  ],
  [
    "background: linear-gradient(250deg, rgba(255, 255, 255, 0) 77%, rgba(220, 175, 255, 1) 95%),",
    "background: linear-gradient(250deg, rgba(255, 255, 255, 0) 77%, rgba(129, 199, 132, 0.9) 95%),",
  ],
  ["rgba(70, 20, 50, 0.1)", "rgba(16, 56, 32, 0.12)"],
];

const hexPairs = [
  ["#F4E4FF", "#E8F5E9"],
  ["#f4e4ff", "#e8f5e9"],
  ["#FFF2DD", "#F1F8E9"],
  ["#fff2dd", "#f1f8e9"],
  ["#F3F0FF", "#E8F5E9"],
  ["#f3f0ff", "#e8f5e9"],
  ["#8F01FF", "#1B5E20"],
  ["#9104FD", "#2E7D32"],
  ["#9205FE", "#2E7D32"],
  ["#950AF7", "#1B5E20"],
  ["#A030D3", "#00695C"],
  ["#9E71D2", "#43A047"],
  ["#FDB83B", "#81C784"],
  ["#FDB83C", "#7CB342"],
  ["#FDB83F", "#7CB342"],
  ["#FDB73D", "#7CB342"],
  ["#FEB83E", "#8BC34A"],
  ["#FEB940", "#8BC34A"],
  ["#FFBB38", "#AED581"],
  ["#FFBB37", "#AED581"],
  ["#ffbb37", "#aed581"],
  ["#FCB73E", "#C5E1A5"],
  ["#DCAFFF", "#B9F6CA"],
  ["#FFE7C5", "#DCEDC8"],
  ["#7F30FF", "#2E7D32"],
  ["#FF4880", "#66BB6A"],
  ["#FF8000", "#4CAF50"],
  ["#FAECEE", "#E8F5E9"],
];

apply("public/lifer-body.html", [...htmlPairs, ...hexPairs]);

apply("public/css/lifer-webflow.css", [
  ["--base-color-brand--bg-gradient-lavender: #f4e4ff;", "--base-color-brand--bg-gradient-lavender: #e8f5e9;"],
  [
    "background-image: linear-gradient(216deg, #ffe7c5 2%, #fff4e499 22%, #fff0 34%), linear-gradient(48deg, #dcafff 2%, #f1deff66 13%, #fff0 29%);",
    "background-image: linear-gradient(216deg, #dcedc8 2%, #f1f8e999 22%, #fff0 34%), linear-gradient(48deg, #b9f6ca 2%, #c8e6c966 13%, #fff0 29%);",
  ],
  [
    "background-image: linear-gradient(90deg, #f4e4ff, #fff2dd);",
    "background-image: linear-gradient(90deg, #e8f5e9, #f1f8e9);",
  ],
  [
    "background-image: linear-gradient(90deg, #2b58e0, #d638a9 22%, #982fd8 61%, #ffbb37);",
    "background-image: linear-gradient(90deg, #004d40, #00695c 22%, #2e7d32 61%, #aed581);",
  ],
]);

console.log("Done.");
