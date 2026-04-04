import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { flightsArticles } from "@/data/flightsArticles";
import { FlightArticleBody } from "@/components/reference/FlightArticleBody";

const FlightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = flightsArticles.find((a) => a.path === `/reference/flights/${slug}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container pt-24 md:pt-32 pb-12">
          <p className="text-muted-foreground mb-4">Статья не найдена.</p>
          <Link to="/reference/flights" className="text-primary hover:underline">
            Вернуться к разделу «Самолёты»
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 md:pt-32 pb-12 max-w-4xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/reference" className="hover:text-primary">
            Справочная
          </Link>
          <span>/</span>
          <Link to="/reference/flights" className="hover:text-primary">
            Самолёты
          </Link>
          <span>/</span>
          <span className="text-foreground">{article.title}</span>
        </div>

        <h1 className="heading-gradient text-3xl md:text-4xl font-bold tracking-tight mb-8">
          {article.title}
        </h1>

        <FlightArticleBody slug={slug!} />
      </main>
      <Footer />
    </div>
  );
};

export default FlightArticle;
