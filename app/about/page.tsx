import HeroSection from "@/components/about/HeroSection";
import OurStorySection from "@/components/about/OurStory";
import TeamCarousel from "@/components/about/TeamCarousal";
import ValuesSection from "@/components/about/ValueSection";
import CareersSection from "@/components/about/CareerSection";  
import NewsletterSection from "@/components/home/NewsLetter";
import Footer from "@/components/home/Footer";

export default function Page() {
  return (
    <div className="w-full h-full">
      {/* Hero section */}
      <HeroSection />

      {/* Our story section */}
      <OurStorySection />

      {/* Value section */}
      <ValuesSection />

      {/* Team Carousal */}
      <TeamCarousel />

      {/* Careers Section */}
      <CareersSection />

       {/* News letter section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
