import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogosCarousel from "@/components/LogosCarousel";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import SolutionsSection from "@/components/SolutionsSection";
import ServicesSection from "@/components/ServicesSection";
import ConversationalCommerceSection from "@/components/ConversationalCommerceSection";
import ProcessSection from "@/components/ProcessSection";

import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import LinkedInSection from "@/components/LinkedInSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LogosCarousel />
      <PartnersSection />
      <StatsSection />
      <SolutionsSection />
      <ServicesSection />
      <ConversationalCommerceSection />
      <ProcessSection />
      
      <FAQSection />
      <CTASection />
      <LinkedInSection />
      <Footer />
    </div>
  );
};

export default Index;
