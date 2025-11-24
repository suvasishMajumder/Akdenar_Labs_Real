"use client";

import { useEffect } from "react";

import CareersSection from "@/components/about/CareerSection";
import CareerHero from "@/components/career/CareerHero";
import FAQSection from "@/components/Get-In-Touch/FAQ";
import Footer from "@/components/home/Footer";

// If you have your jobs list imported:
import { infoAboutJobs } from "@/data/infoAboutJobs"; // ⭐ NEEDED for Job List Schema

export default function Page() {

  /* ------------------------------------------------------
     ⭐ SEO: Title + Meta Description
  ------------------------------------------------------- */
  useEffect(() => {
    document.title = "Careers | Akdenar Labs";

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Explore exciting career opportunities at Akdenar Labs. Join our team of innovators and build the future of digital solutions."
    );
  }, []);

  /* ------------------------------------------------------
     ⭐ JSON-LD: Breadcrumb + Job Item List
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
          name: "Careers",
          item: "https://labs.akdenar.com/career",
        },
      ],
    });

    // Job List Schema
    const jobsSchema = document.createElement("script");
    jobsSchema.type = "application/ld+json";
    jobsSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Job Openings at Akdenar Labs",
      itemListElement: infoAboutJobs.map((job, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: job.title,
        url: `https://labs.akdenar.com/career/${job.slug}`,
      })),
    });

    document.head.appendChild(breadcrumb);
    document.head.appendChild(jobsSchema);

    return () => {
      document.head.removeChild(breadcrumb);
      document.head.removeChild(jobsSchema);
    };
  }, []);

  /* ------------------------------------------------------
     UI (unchanged)
  ------------------------------------------------------- */
  return (
    <>
      <CareerHero />
      <CareersSection />
      <FAQSection />
      <Footer />
    </>
  );
}
