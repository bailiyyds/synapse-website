import { labels } from "@/lib/constants";
import localFont from "next/font/local";
import NoiseOverlay from "@/components/visual/NoiseOverlay";
import type { Metadata } from "next";
import "./globals.css";
const geist = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/geist/files/geist-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/geist/files/geist-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/geist/files/geist-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-geist",
  display: "block",
});
const mono = localFont({
  src: "../node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2",
  variable: "--font-mono",
  display: "block",
});
const serif = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "block",
});
export const metadata: Metadata = {
  title: labels.label15,
  description: labels.label16,
  robots: { index: true, follow: true },
  openGraph: {
    title: labels.label17,
    description: labels.label18,
    type: "website",
    locale: "zh_CN",
  },
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geist.variable} ${mono.variable} ${serif.variable}`}>
        <a href="#main" className="skip-link">
          跳转到主要内容
        </a>
        {children}
        <NoiseOverlay />
      </body>
    </html>
  );
}
