import type { Metadata } from "next";

import "./globals.css";
import PageLayout from "./_components/pageLayout/PageLayout";

import { Inter } from 'next/font/google'

export const inter = Inter({
subsets: ['latin'],
display: 'swap',
variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "Les réfugiés",
  description: "C'est dans l'épure et le silence des camps d'Oldenburg que l'idée a germé. Pas de bruit superflu, juste l'essentiel : la voix, le rythme, la survie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth!" data-scroll-behavior="smooth" lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
