import type { Metadata } from "next";
import {
  DM_Sans,
  DM_Serif_Display,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "PhewPhew — Live Demo (Payload Inspector)",
  description: "Explore the exact data PhewPhew sends to the Anthropic API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${syne.variable} ${dmSerif.variable} ${jetBrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
