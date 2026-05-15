import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#060912",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: { default: "talks", template: "%s · talks" },
  description:
    "Talks är ett säkert digitalt avtalssystem — valv, signering och protokollrum för privatpersoner och plattformar som integrerar via API.",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "talks",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

// TODO(branding): add dedicated 180×180 Apple touch icon + 1200×630 Open Graph art when final brand exports exist.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-obsidian antialiased`}
    >
      <body className="min-h-full bg-obsidian text-titanium">{children}</body>
    </html>
  );
}
