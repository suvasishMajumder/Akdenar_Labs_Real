"use client";

import { useEffect } from "react"; // ⭐ ADDED

import HeroSection from "@/components/about/HeroSection";
import OurStorySection from "@/components/about/OurStory";
import TeamCarousel from "@/components/about/TeamCarousal";
import ValuesSection from "@/components/about/ValueSection";
import CareersSection from "@/components/about/CareerSection";
import NewsletterSection from "@/components/home/NewsLetter";
import Footer from "@/components/home/Footer";

export default function Page() {
  /* ------------------------------------------------------
     ⭐ 1. SEO: Dynamic Title + Meta Description
  ------------------------------------------------------- */
  useEffect(() => {
    document.title = "About Us | Akdenar Labs";

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute(
      "content",
      "Learn about Akdenar Labs — our mission, story, team, values, and vision. We are a global digital innovation company delivering technology solutions that accelerate growth."
    );
  }, []);

  /* ------------------------------------------------------
     ⭐ 2. JSON-LD: Breadcrumb + AboutPage Schema + Organization Schema
  ------------------------------------------------------- */
  useEffect(() => {
    /* Breadcrumb Schema */
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
          item: "https://labs.akdenar.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://labs.akdenar.com/about",
        },
      ],
    });

    /* About Page Schema */
    const aboutSchema = document.createElement("script");
    aboutSchema.type = "application/ld+json";
    aboutSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Akdenar Labs",
      url: "https://labs.akdenar.com/about",
      description:
        "Learn about Akdenar Labs — our mission, team, story, and values. We innovate through technology and deliver world-class digital solutions.",
    });

    /* Organization Schema */
    const organizationSchema = document.createElement("script");
    organizationSchema.type = "application/ld+json";
    organizationSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Akdenar Labs",
      url: "https://labs.akdenar.com",
      logo: "https://labs.akdenar.com/logo.svg",
      sameAs: [
        "https://www.linkedin.com/company/akdenar",
        "https://twitter.com/",
        "https://instagram.com/",
      ],
    });

    document.head.appendChild(breadcrumb);
    document.head.appendChild(aboutSchema);
    document.head.appendChild(organizationSchema);

    return () => {
      document.head.removeChild(breadcrumb);
      document.head.removeChild(aboutSchema);
      document.head.removeChild(organizationSchema);
    };
  }, []);

  /* ------------------------------------------------------
     ⭐ 3. UI (unchanged)
  ------------------------------------------------------- */
  return (
    <div className="w-full h-full">
      <HeroSection />
      <OurStorySection />
      <ValuesSection />
      <TeamCarousel />
      <CareersSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
