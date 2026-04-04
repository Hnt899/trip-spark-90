import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroRoutes from "@/components/sections/HeroRoutes";
import RoutesHeroSection from "@/components/sections/RoutesHeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import RegionsRoutesSection from "@/components/sections/RegionsRoutesSection";
import PhotographersSection from "@/components/sections/PhotographersSection";
import VerifiedSection from "@/components/sections/VerifiedSection";

const routesPageBackgroundBlobs = (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
    <div
      className="absolute rounded-full blur-3xl"
      style={{
        width: "500px",
        height: "500px",
        left: "-200px",
        top: "20%",
        background: "rgba(138, 112, 248, 0.2)",
      }}
    />
    <div
      className="absolute rounded-full blur-3xl"
      style={{
        width: "400px",
        height: "400px",
        right: "-150px",
        bottom: "20%",
        background: "rgba(107, 92, 230, 0.2)",
      }}
    />
  </div>
);

const Routes = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative bg-gradient-to-br from-[#100A6F] via-[#1a1a3e] to-[#100A6F]">
        {routesPageBackgroundBlobs}
        <main className="hero-under-header relative z-10">
          <HeroRoutes />
          <RoutesHeroSection />
          <RegionsRoutesSection />
          <ProcessSection />
          <PhotographersSection />
          <VerifiedSection omitOuterChrome />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Routes;
