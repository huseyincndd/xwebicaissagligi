import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import LayoutWrapper from "../components/LayoutWrapper";
import JsonLd from "../components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kılıçoğlu OSGB - Hatay'ın En Güvenilir İş Sağlığı ve Güvenliği Hizmetleri",
    template: "%s | Kılıçoğlu OSGB Hatay"
  },
  description: "Hatay'ın lider OSGB'si Kılıçoğlu OSGB. İş sağlığı ve güvenliği, risk değerlendirmesi, İSG eğitimleri, sağlık taramaları. Hatay OSGB hizmetleri, Hatay iş güvenliği danışmanlığı için bize ulaşın.",
  keywords: [
    "Hatay OSGB",
    "OSGB Hatay",
    "Kılıçoğlu OSGB Hatay",
    "İş Sağlığı ve Güvenliği Hatay",
    "İSG Hatay",
    "İSG Hizmetleri Hatay",
    "Risk Değerlendirmesi Hatay",
    "İSG Eğitimleri Hatay",
    "Sağlık Taramaları Hatay",
    "İş Güvenliği Hatay",
    "İş Sağlığı Hatay",
    "Hatay İş Güvenliği",
    "Hatay İSG Hizmetleri",
    "Hatay İş Sağlığı",
    "Hatay OSGB Firması",
    "Hatay'da OSGB hizmeti",
    "Hatay iş sağlığı danışmanlığı"
  ],
  authors: [{ name: "Kılıçoğlu OSGB" }],
  creator: "Kılıçoğlu OSGB",
  publisher: "Kılıçoğlu OSGB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kilicogluosgb.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://kilicogluosgb.com',
    title: 'Kılıçoğlu OSGB - Hatay İş Sağlığı ve Güvenliği Hizmetleri',
    description: 'Hatay\'ın güvenilir OSGB\'si Kılıçoğlu OSGB. İş sağlığı ve güvenliği, risk değerlendirmesi, İSG eğitimleri, sağlık taramaları.',
    siteName: 'Kılıçoğlu OSGB',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kılıçoğlu OSGB - Hatay İş Sağlığı ve Güvenliği',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kılıçoğlu OSGB - Hatay İş Sağlığı ve Güvenliği Hizmetleri',
    description: 'Hatay\'ın güvenilir OSGB\'si Kılıçoğlu OSGB. İş sağlığı ve güvenliği hizmetleri.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
