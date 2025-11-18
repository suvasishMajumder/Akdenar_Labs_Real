'use client'

import Footer from "@/components/home/Footer";
import NewsletterSection from "@/components/home/NewsLetter";
import ServicesSection from "@/components/home/ServiceSection";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="bg-bg-primary ">
      <section className=" w-full pt-22 px-6 md:px-10 lg:px-20 text-center flex justify-center items-center flex-col">

        {/* Main Heading */}
        <h2 className="text-3xl mt-10 md:text-4xl lg:text-5xl tracking-tight leading-14 text-gray-900 max-w-5xl mx-auto">
          All the services
        </h2>

        {/* Subheading */}
        <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-6">
          Explore our recent innovations where creativity meets technology — delivering impactful digital solutions that drive growth, enhance user experience, and set new industry standards.
        </p>

      </section>
      <div className="mt-1">
        <ServicesSection />
      </div>

      {/* News letter section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
