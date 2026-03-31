import { HomeClient } from "@/components/lifer/HomeClient";
import fs from "fs";
import path from "path";

export default function Home() {
  const filePath = path.join(process.cwd(), "public", "lifer-body.html");
  const initialHtml = fs.readFileSync(filePath, "utf8");
  return <HomeClient initialHtml={initialHtml} />;
}
