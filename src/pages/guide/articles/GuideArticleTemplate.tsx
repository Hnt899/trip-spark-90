import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface GuideArticleProps {
  title: string;
  category: string;
  categoryName: string;
}

const GuideArticleTemplate = ({ title, category, categoryName }: GuideArticleProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/guide" className="hover:text-primary">Путеводитель</Link>
          <span>/</span>
          <span>{categoryName}</span>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground">
            Информация находится в разработке.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideArticleTemplate;

