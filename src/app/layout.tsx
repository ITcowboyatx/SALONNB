import type { Metadata } from "next";
import { business, seoKeywords } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: "Salon NB | Hair Salon in New Braunfels, TX",
    template: "%s | Salon NB",
  },
  description:
    "Contact Salon NB, a warm modern hair salon in New Braunfels for extensions, highlights, full color, haircuts, bridal hair, wedding makeup, and shampoo styles.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Salon NB | Hair Salon in New Braunfels, TX",
    description:
      "Good Folks, Good Vibes, the Best Hair. Contact a locally rooted New Braunfels salon for color, extensions, highlights, bridal hair, makeup, and haircuts.",
    url: business.domain,
    siteName: business.name,
    images: [
      {
        url: "/images/salon-nb-building.png",
        alt: "Salon NB building exterior in New Braunfels",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon NB | Hair Salon in New Braunfels, TX",
    description:
      "Contact Salon NB for extensions, highlights, color, cuts, bridal hair, and makeup in New Braunfels.",
    images: ["/images/salon-nb-building.png"],
  },
  icons: {
    icon: "/images/salon-nb-logo.png",
    apple: "/images/salon-nb-logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
