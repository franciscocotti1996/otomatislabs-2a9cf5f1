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
  const ogImage =
    "https://storage.googleapis.com/gpt-engineer-file-uploads/NapTWNYi0RSobKtZq6ILtQo0m2I2/social-images/social-1780964625231-logo-13_(1).webp";
  const title =
    lang === "es"
      ? "Otomatis Labs — Chatbots Multicanal & Agentes de IA"
      : "Otomatis Labs — Multichannel Chatbots & AI Agents";
  const description =
    lang === "es"
      ? "Chatbots multicanal y agentes de IA que automatizan atención, ventas y operaciones. Integraciones con WhatsApp, web, CRM y e-commerce."
      : "Multichannel chatbots and AI agents that automate support, sales and operations. Integrations with WhatsApp, web, CRM and e-commerce.";
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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Otomatis Labs" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={title} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Otomatis Labs",
            url: canonical,
            inLanguage: lang,
            description,
            publisher: { "@type": "Organization", name: "Otomatis Labs", url: siteUrl },
          })}
        </script>
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
