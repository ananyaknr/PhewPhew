import type { Metadata } from "next";
import {
  DM_Sans,
  DM_Serif_Display,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.10/dist/tf-tflite.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://unpkg.com/tesseract.js@5/dist/tesseract.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${dmSans.variable} ${syne.variable} ${dmSerif.variable} ${jetBrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
