import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://weeddge.com"),
  applicationName: "EDDGE",
  alternates: {
    canonical: "https://weeddge.com",
  },
  title: "EDDGE – AI Learning Platform for CBSE & ICSE Students",
  description:
    "AI-powered learning platform for Indian students with smart exam prep, mock tests, and personalized analytics.",
  icons: {
    icon: "/new.ico",
    shortcut: "/new.ico",
    apple: "/new.ico",
  },
  openGraph: {
    title: "EDDGE – AI Learning Platform",
    description: "AI-powered education platform for students in India",
    url: "https://weeddge.com",
    siteName: "EDDGE",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EDDGE – AI Learning Platform",
    description: "AI-powered education platform for students in India",
    images: ["/og.png"],
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
