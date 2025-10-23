// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL('https://quizgarden.ai'),
  title: {
    default: 'Free AI Quiz Maker: Create Custom Practice Quizzes in Seconds',
    template: "%s | QuizGarden",
  },
  applicationName: "QuizGarden",
  description: "Build, share, and take interactive AI-powered quizzes on any topic—fast, free, and fun!",
  keywords: [
    "AI quiz maker",
    "interactive quizzes",
    "online quiz generator",
    "education technology",
    "student quizzes",
    "teacher resources"
  ],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: 'https://quizgarden.ai',
    languages: {
      'en-US': 'https://quizgarden.ai',
    }
  },

  verification: {
    google: 'hwKt5ERIuWcLBXZqVX3tJSuqW_JQ6aglT9Ipt__TiDc',
  },

  openGraph: {
    title: 'Free AI Quiz Maker: Create Custom Practice Quizzes in Seconds',
    description: 'Build, share, and take interactive AI-powered quizzes on any topic—fast, free, and fun!',
    url: 'https://quizgarden.ai',
    siteName: 'QuizGarden',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://quizgarden.ai/images/og/quizgarden-preview.png',
        width: 1200,
        height: 630,
        alt: 'QuizGarden preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@QuizGardenApp',
    title: 'Free AI Quiz Maker: Create Custom Practice Quizzes in Seconds',
    description: 'Build, share, and take interactive AI-powered quizzes on any topic—fast, free, and fun!',
    images: ['https://quizgarden.ai/images/og/quizgarden-preview.png'],
  },

  icons: {
    icon: '/images/favicons/favicon-32x32.png',
    shortcut: '/images/favicons/favicon-16x16.png',
    apple: '/images/favicons/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}