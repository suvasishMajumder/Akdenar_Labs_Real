"use client";

import { useEffect } from "react";               // ⭐ ADDED
import Footer from "@/components/home/Footer";
import NewsletterSection from "@/components/home/NewsLetter";
import ServicesSection from "@/components/home/ServiceSection";

export default function Page() {

  /* ------------------------------------------------------
     ⭐ 1. SEO: Dynamic Title + Meta Description
  ------------------------------------------------------- */
  useEffect(() => {
    document.title = "Services | Akdenar Labs";  // ⭐ ADDED

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Explore all services offered by Akdenar Labs — including Web Development, Cloud & DevOps, UI/UX, AI, Digital Marketing, QA, and more."
    );                                           // ⭐ ADDED
  }, []);

  /* ------------------------------------------------------
     ⭐ 2. SEO: Breadcrumb + Services ItemList JSON-LD
  ------------------------------------------------------- */
  useEffect(() => {
    // Breadcrumb Schema
    const breadcrumb = document.createElement("script");
    breadcrumb.type = "application/ld+json";
    breadcrumb.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://labs.akdenar.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://labs.akdenar.com/services",
        },
      ],
    });

    // Services List Schema
    const servicesList = document.createElement("script");
    servicesList.type = "application/ld+json";
    servicesList.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Our Services",
      itemListElement: [1,2,3,4,5,6,7,8,9].map((n) => ({
        "@type": "ListItem",
        position: n,
      })),
    });

    document.head.appendChild(breadcrumb);
    document.head.appendChild(servicesList);

    return () => {
      document.head.removeChild(breadcrumb);
      document.head.removeChild(servicesList);
    };
  }, []);

  /* ------------------------------------------------------
     UI (unchanged)
  ------------------------------------------------------- */
  return (
    <div className="bg-bg-primary">
      <section className="w-full pt-22 px-6 md:px-10 lg:px-20 text-center flex justify-center items-center flex-col">

        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Services We Offer
          </h2>
          <div className="w-50 h-1 bg-[#7F56D9] mx-auto mt-4 rounded-full"></div>
        </div>

        <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-6">
          Explore our recent innovations where creativity meets technology — delivering impactful digital solutions that drive growth, enhance user experience, and set new industry standards.
        </p>
      </section>

      <div>
        <ServicesSection />
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
