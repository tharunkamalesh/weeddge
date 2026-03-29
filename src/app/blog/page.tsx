import Link from "next/link";

export default function BlogPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <p>
        The live site does not publish a separate Blog URL; this route is a
        placeholder for your own content.
      </p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
