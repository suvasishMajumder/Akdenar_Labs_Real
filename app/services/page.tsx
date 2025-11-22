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
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-3xl text-4xl font-semibold tracking-tight text-gray-900">
            Services We Offer
          </h2>
          <div className="w-50 h-1 bg-[#7F56D9] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Subheading */}
        <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-6">
          Explore our recent innovations where creativity meets technology — delivering impactful digital solutions that drive growth, enhance user experience, and set new industry standards.
        </p>

      </section>
      <div className="">  
        <ServicesSection />
      </div>

      {/* News letter section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
