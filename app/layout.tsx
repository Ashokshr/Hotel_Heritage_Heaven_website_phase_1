import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { EnquiryModalProvider } from "@/components/providers/EnquiryModalProvider";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import { SITE_CONFIG } from "@/lib/constants";
import { buildOrganizationSchema } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Premium Mountain Stays in Himachal Pradesh`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ["Heritage Heaven Hotels", "McLeod Ganj hotel", "Dharamshala hotel", "Rosewood Inn", "Himachal Pradesh hotels"],
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }}
        />
      </head>
      <body className="font-sans">
        <GoogleAnalytics />
        <EnquiryModalProvider>
          <SiteChrome>{children}</SiteChrome>
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
