import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const RootRedirect = () => {
  let target: "es" | "en" = "es";
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem("lang");
    if (stored === "en" || stored === "es") {
      target = stored;
    } else {
      const nav = (window.navigator.languages?.[0] || window.navigator.language || "es").toLowerCase();
      target = nav.startsWith("es") ? "es" : "en";
    }
  }
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  return <Navigate to={`/${target}${hash}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/es" element={<Index />} />
            <Route path="/en" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsApp />
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
