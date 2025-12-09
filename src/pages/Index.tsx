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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RecommendedTrainsSection />
        <RoutesSection />
        <EventsSection />
        <InspirationSection />
        <TestimonialsSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;