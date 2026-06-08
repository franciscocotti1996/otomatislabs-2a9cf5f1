import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HeroServicesSection from "@/components/HeroServicesSection";
import LogosCarousel from "@/components/LogosCarousel";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import SolutionsSection from "@/components/SolutionsSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import AIAgentsFAQSection from "@/components/AIAgentsFAQSection";
import ServicesSection from "@/components/ServicesSection";
import ConversationalCommerceSection from "@/components/ConversationalCommerceSection";
import ProcessSection from "@/components/ProcessSection";
import UseCasesSection from "@/components/UseCasesSection";

import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import LinkedInSection from "@/components/LinkedInSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { lang } = useLanguage();
  const siteUrl = "https://otomatislabs.com";
  const canonical = `${siteUrl}/${lang}`;
  const title =
    lang === "es"
      ? "Otomatis Labs — Chatbots Multicanal & Agentes de IA"
      : "Otomatis Labs — Multichannel Chatbots & AI Agents";
  const description =
    lang === "es"
      ? "Otomatis Labs desarrolla chatbots multicanales y soluciones con agentes de IA para automatizar la relación con tus clientes."
      : "Otomatis Labs builds multichannel chatbots and AI agent solutions to automate customer interactions.";
  const ogLocale = lang === "es" ? "es_ES" : "en_US";
  const ogLocaleAlt = lang === "es" ? "en_US" : "es_ES";

  return (
    <div className="min-h-screen">
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/es`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Navbar />
      <HeroSection />
      <HeroServicesSection />
      <LogosCarousel />
      <PartnersSection />
      <StatsSection />
      <SolutionsSection />
      <AIAgentsSection />
      <ServicesSection />
      <ConversationalCommerceSection />
      <ProcessSection />
      <UseCasesSection />
      <FAQSection />
      <CTASection />
      <LinkedInSection />
      <Footer />
    </div>
  );
};

export default Index;
