'use client'

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

      {/* News letter section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
