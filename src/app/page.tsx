import { HomeClient } from "@/components/lifer/HomeClient";
import fs from "fs";
import path from "path";

export default function Home() {
  const filePath = path.join(process.cwd(), "public", "lifer-body.html");
  const initialHtml = fs.readFileSync(filePath, "utf8");
  return (
    <>
      <div style={{ display: "none" }}>
        <h1>Best Online Learning Platform for CBSE & ICSE Students</h1>
        <p>
          Weeddge is a smart online learning platform for CBSE and ICSE students.
          Get personalized tutoring, exam preparation, and AI-powered study
          support. As a leading education platform in India, Weeddge provides
          comprehensive online learning solutions tailored for student success.
        </p>
      </div>
      <HomeClient initialHtml={initialHtml} />
    </>
  );
}
