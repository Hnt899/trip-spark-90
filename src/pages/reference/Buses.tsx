import { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { busesArticles } from "@/data/busesArticles";

const Buses = () => {
  const groupedArticles = useMemo(() => {
    const grouped: Record<string, typeof busesArticles> = {};
    busesArticles.forEach((article) => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 md:pt-32 pb-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">
            Справочная
          </Link>
          <span>/</span>
          <Link to="/reference/buses" className="hover:text-primary">
            Автобусы
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
          Справочная информация об автобусных билетах
        </h1>

        <div className="space-y-12 max-w-4xl">
          {Object.entries(groupedArticles).map(([category, articles]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
              <ul className="space-y-3">
                {articles.map((article) => (
                  <li key={article.path}>
                    <Link to={article.path} className="text-primary hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="pt-8 border-t">
            <p className="text-muted-foreground mb-2">Не нашли ответа на вопрос?</p>
            <p className="text-muted-foreground">
              Напишите нам:{" "}
              <a href="mailto:buses@tudasuda.ru" className="text-primary hover:underline">
                buses@tudasuda.ru
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Buses;
