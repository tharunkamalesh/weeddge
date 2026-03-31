import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weeddge - Best Online Learning Platform for CBSE & ICSE Students",
  description:
    "Weeddge is a smart online learning platform for CBSE and ICSE students. Get personalized tutoring, exam preparation, and AI-powered study support.",
  keywords: [
    "online learning India",
    "CBSE preparation",
    "ICSE study platform",
    "student tutoring app",
    "education platform India",
  ],
  metadataBase: new URL("https://weeddge.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Weeddge Learning Platform",
    description: "Every student deserves a tutor that never clocks out.",
    url: "https://weeddge.com",
    images: [
      {
        url: "/eddge-logo.png",
        width: 1200,
        height: 630,
        alt: "Weeddge logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weeddge Learning Platform",
    description: "Smart tutoring for students",
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
