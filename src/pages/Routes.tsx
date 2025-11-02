import RoutesHeader from "@/components/RoutesHeader";
import Footer from "@/components/Footer";
import HeroRoutes from "@/components/sections/HeroRoutes";
import RoutesHeroSection from "@/components/sections/RoutesHeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import BloggersSection from "@/components/sections/BloggersSection";
import RegionsRoutesSection from "@/components/sections/RegionsRoutesSection";
import PhotographersSection from "@/components/sections/PhotographersSection";

const Routes = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroRoutes />
        <RoutesHeroSection />
        <RegionsRoutesSection />
        <ProcessSection />
        <BloggersSection />
        <PhotographersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Routes;
