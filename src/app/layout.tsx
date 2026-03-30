import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("https://example.com");

export const metadata: Metadata = {
  title: "EDDGE — AI learning platform for students",
  description:
    "AI-powered education for Indian students: instant doubt solving, smart exam prep, mock tests, and personalized analytics.",
  metadataBase: siteUrl,
  openGraph: {
    type: "website",
    title: "EDDGE — AI learning platform for students",
    description:
      "AI-powered education for Indian students: instant doubt solving, smart exam prep, mock tests, and personalized analytics.",
    images: [
      {
        url: "/eddge-logo.png",
        width: 1200,
        height: 630,
        alt: "EDDGE logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDDGE — AI learning platform for students",
    description:
      "AI-powered education for Indian students: instant doubt solving, smart exam prep, mock tests, and personalized analytics.",
    images: ["/eddge-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- vendored Webflow bundle */}
        <link rel="stylesheet" href="/css/lifer-webflow.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/lifer-head-styles.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
        />
        <link rel="icon" href="/new.ico" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning>
        <Script id="lifer-webflow-preamble" strategy="beforeInteractive">
          {`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);window.Webflow=window.Webflow||[];window.Webflow.push(function(){window.scrollTo(0,0)});`}
        </Script>
        {children}
      </body>
    </html>
  );
}
