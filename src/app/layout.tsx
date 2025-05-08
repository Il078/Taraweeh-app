import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import { AudioProvider } from '@/lib/AudioContext';
import PersistentPlayer from '@/components/ui/PersistentPlayer';
import AddToHomePrompt from '@/components/ui/AddToHomePrompt';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taraweeh Recitations Archive",
  description: "Listen to Taraweeh recitations from Makkah and Madinah (1426-1442)",
  manifest: "/manifest.json",
  themeColor: "#15803d",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Taraweeh App"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Listen to Taraweeh recitations from the Two Sacred Mosques" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <title>Taraweeh Recitations</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AudioProvider>
          <Header />
          <main className="min-h-screen pb-16 bg-green-50/30">
            {children}
          </main>
          <PersistentPlayer />
          <AddToHomePrompt />
          <footer className="bg-green-700 p-4 text-center text-white text-sm">
            <p>Audio courtesy of QuranicAudio.com | {new Date().getFullYear()}</p>
          </footer>
        </AudioProvider>

        {/* Service Worker Registration */}
        <Script src="/register-sw.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
