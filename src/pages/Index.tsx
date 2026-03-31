import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import RecommendedTrainsSection from "@/components/sections/RecommendedTrainsSection";
import RoutesSection from "@/components/sections/RoutesSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SupportSection from "@/components/sections/SupportSection";
import InspirationSection from "@/components/sections/InspirationSection";
import VerifiedSection from "@/components/sections/VerifiedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="hero-under-header">
        <HeroSection />
        <FeaturesSection surface="light" />
        <RecommendedTrainsSection surface="light" />
        <RoutesSection surface="light" />
        <EventsSection surface="light" />
        <InspirationSection surface="light" />
        <TestimonialsSection surface="light" />
        <SupportSection surface="light" />
        <VerifiedSection surface="light" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;