"use client";

import CareersSection from "@/components/about/CareerSection";
import CareerHero from "@/components/career/CareerHero";
import FAQSection from "@/components/Get-In-Touch/FAQ";
import Footer from "@/components/home/Footer";

export default function Page() {
  return (
    <>

      {/* career hero section */}
      <CareerHero />

      {/* Careers Section */}
      <CareersSection />

      {/* FAQ */}
      <FAQSection />

      {/* footer */}
      <Footer />
    </>
  );
}
