import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/Auth/SessionProviderWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlausibleProvider from "next-plausible";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Stats",
  description:
    "Access your Spotify stats without any subscriptions, no hidden fees, and absolutely no BS. We prioritize your privacy—your data stays yours, always.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <head>
          <PlausibleProvider
            domain="spotify-stats.aydenjahola.com"
            customDomain="https://plausible.aydenjahola.com"
            trackOutboundLinks={true}
            trackFileDownloads={true}
            taggedEvents={true}
            selfHosted={true}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <SpeedInsights />
          <Footer />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
