import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDDGE — AI learning platform for students",
  description:
    "AI-powered education for Indian students: instant doubt solving, smart exam prep, mock tests, and personalized analytics.",
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
        <link
          rel="shortcut icon"
          href="https://cdn.prod.website-files.com/66a3e3bd14091f433acdfb36/66a3edf7832ac7ba941c2e4c_favicon.ico"
          type="image/x-icon"
        />
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
