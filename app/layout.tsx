import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { seoConfig } from "@/lib/seo-config";
import StructuredData from "@/components/StructuredData";
import GradientBackground from "@/components/ui/GradientBackground";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: `${seoConfig.name} | ${seoConfig.title}`,
    template: `%s | ${seoConfig.name}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.author,
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: `${seoConfig.name} | ${seoConfig.title}`,
    title: `${seoConfig.name} | ${seoConfig.title}`,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.ogImage.url,
        width: seoConfig.ogImage.width,
        height: seoConfig.ogImage.height,
        alt: seoConfig.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${seoConfig.name} | ${seoConfig.title}`,
    description: seoConfig.description,
    images: [seoConfig.ogImage.url],
    creator: seoConfig.social.twitter || undefined,
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
  verification: {
    // Add your verification codes after deploying
    google: undefined, // Add Google Search Console verification
    // yandex: undefined,
    // bing: undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="person" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${manrope.variable} ${syne.variable} antialiased bg-background text-foreground`}
      >
        <GradientBackground />
        <div className="fixed inset-0 z-50 pointer-events-none opacity-5 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />
        {children}
      </body>
    </html>
  );
}
