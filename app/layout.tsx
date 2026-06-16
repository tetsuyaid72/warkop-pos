import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { themeScript } from "@/components/theme-provider";
import "./globals.css";
import { Providers } from "@/components/providers";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warung Coffee — Kasir modern untuk warung kopi",
  description:
    "Sistem kasir POS modern yang dirancang khusus untuk warung kopi Indonesia. Setup 15 menit, bayar sekali, langsung pakai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{themeScript}</Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
