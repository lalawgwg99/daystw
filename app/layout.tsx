import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "吉日通｜黃曆查詢、吉日篩選與民俗指南",
  description:
    "免費提供農民曆、節慶拜拜指南、神明推薦、命理查詢與點燈祈福指南，繁體中文、準確實用。",
  manifest: "/manifest.json",
  themeColor: "#a4362b",
  appleWebApp: {
    capable: true,
    title: "吉日通",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
