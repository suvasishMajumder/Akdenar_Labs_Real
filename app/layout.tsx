import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akdenar Labs",
  description:
    "Akdenar Labs delivers end-to-end digital solutions including web & mobile app development, cloud & DevOps, AI/ML automation, cybersecurity, digital marketing & SEO, UI/UX design, video editing, QA testing, graphic design, and content writing. Serving 25+ industries including healthcare, banking, retail, automotive, energy, manufacturing, aerospace, insurance, and life sciences with cutting-edge technology transformation, data analytics, IoT, smart manufacturing, supply chain optimization, and sustainability solutions.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Suspense fallback={<PageLoader />}>
          <Navbar />

          {children}
        </Suspense>
      </body>
    </html>
  );
}
