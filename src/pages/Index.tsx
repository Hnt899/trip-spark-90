import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageCmsProvider } from "@/contexts/PageCmsContext";
import { useMergedPublishedPage } from "@/hooks/usePageContent";
import { renderPageSections } from "@/components/cms/PageSectionRenderer";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { content, isLoading } = useMergedPublishedPage("home");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden />
      </div>
    );
  }

  return (
    <PageCmsProvider pageKey="home" content={content}>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="hero-under-header">{renderPageSections("home", content)}</main>
        <Footer />
      </div>
    </PageCmsProvider>
  );
};

export default Index;
