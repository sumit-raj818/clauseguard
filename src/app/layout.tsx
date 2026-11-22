import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClauseGuard AI - Intelligent Contract Risk & Predatory Clause Auditor",
  description:
    "Scan contracts, NDAs, SaaS SLAs, and leases for predatory clauses, uncapped indemnities, and hidden traps using Gemini Flash. Generates instant redlines and negotiation drafts.",
  keywords: [
    "contract analysis",
    "legal AI",
    "Gemini Flash",
    "redline generator",
    "predatory clauses",
    "clause auditor",
    "contract review",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
