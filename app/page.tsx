"use client";

import { useEffect } from "react";

import BlogSection from "@/components/home/BlogSection";
import DevelopmentLifeCycle from "@/components/home/DevelopmentLifeCycle";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import Industries from "@/components/home/Industries";
import NewsletterSection from "@/components/home/NewsLetter";
import ClientsSection from "@/components/home/OurClient";
import ProjectsSection from "@/components/home/Projects";
import ServiceCarousel from "@/components/home/ServiceCaraousal";
import ServicesSection from "@/components/home/ServiceSection";
import TestimonialCarousel from "@/components/home/Testimonial";
import WhoWeAre from "@/components/home/WhoWeAre";
import WhyUsSection from "@/components/home/WhyUs";

export default function Home() {
  useEffect(() => {
    /* Organization Schema with Logo - Critical for Google Search */
    const organizationSchema = document.createElement("script");
    organizationSchema.type = "application/ld+json";
    organizationSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Akdenar Labs",
      url: "https://labs.akdenar.com",
      logo: "https://labs.akdenar.com/logo.svg",
      description:
        "Akdenar Labs - Innovative Solutions for a Digital World. We deliver cutting-edge technology solutions that accelerate business growth.",
      sameAs: [
        "https://www.linkedin.com/company/akdenar",
        "https://twitter.com/",
        "https://instagram.com/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        url: "https://labs.akdenar.com/get-in-touch",
      },
    });

    /* WebSite Schema */
    const websiteSchema = document.createElement("script");
    websiteSchema.type = "application/ld+json";
    websiteSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Akdenar Labs",
      url: "https://labs.akdenar.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://labs.akdenar.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });

    document.head.appendChild(organizationSchema);
    document.head.appendChild(websiteSchema);

    return () => {
      document.head.removeChild(organizationSchema);
      document.head.removeChild(websiteSchema);
    };
  }, []);

  return (
    <main className="">
      {/* hero section */}
      <HeroSection />

      {/* Who we are section*/}
      <WhoWeAre />

      {/* Service Section */}
      <ServicesSection />

      {/* Development liye cylce section */}
      <DevelopmentLifeCycle />

      {/* Why us section */}
      <WhyUsSection />

      {/* Our client section */}
      <ClientsSection />

      {/* Industries section */}
      <Industries />

      {/* Service Carousel */}
      <ServiceCarousel />

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* Project section */}
      <ProjectsSection />

      {/* Blog section */}
      <BlogSection />

      {/* News letter section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
