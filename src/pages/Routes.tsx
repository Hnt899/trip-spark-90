import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSEO } from "@/hooks/useSEO";
import { PageCmsProvider } from "@/contexts/PageCmsContext";
import { useMergedPublishedPage } from "@/hooks/usePageContent";
import { renderPageSections } from "@/components/cms/PageSectionRenderer";
import { Loader2 } from "lucide-react";

const Routes = () => {
  const seo = useSEO("routes");
  const { content, isLoading } = useMergedPublishedPage("routes");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden />
      </div>
    );
  }

  return (
    <PageCmsProvider pageKey="routes" content={content}>
      <SEO title={seo.title} description={seo.description} />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="hero-under-header">{renderPageSections("routes", content)}</main>
        <Footer />
      </div>
    </PageCmsProvider>
  );
};

export default Routes;
