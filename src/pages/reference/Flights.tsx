import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Flights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/flights" className="hover:text-primary">Самолёты</Link>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
          Справочная информация об авиабилетах
        </h1>

        {/* Sections */}
        <div className="space-y-12 max-w-4xl">
          {/* Section 1: Покупка авиабилета */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Покупка авиабилета
            </h2>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground">
                  Раздел в разработке
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: Вопросы после покупки */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Вопросы после покупки
            </h2>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground">
                  Раздел в разработке
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Частые вопросы */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Частые вопросы
            </h2>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground">
                  Раздел в разработке
                </span>
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="pt-8 border-t">
            <p className="text-muted-foreground mb-2">
              Не нашли ответа на вопрос?
            </p>
            <p className="text-muted-foreground">
              Напишите нам:{" "}
              <a
                href="mailto:flights@tudasuda.ru"
                className="text-primary hover:underline"
              >
                flights@tudasuda.ru
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Flights;

