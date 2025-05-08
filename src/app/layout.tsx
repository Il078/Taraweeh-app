import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Header />
        <main className="min-h-screen pb-16 bg-green-50/30">
          {children}
        </main>
        <footer className="bg-green-700 p-4 text-center text-white text-sm">
          <p>Audio courtesy of QuranicAudio.com | {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
