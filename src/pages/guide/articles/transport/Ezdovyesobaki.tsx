import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Snowflake, MapPin, Heart, Info } from "lucide-react";

const Ezdovyesobaki = () => {
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
          <Link to="/guide" className="hover:text-primary">Транспорт</Link>
          <span>/</span>
          <span>Ездовые собаки</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ездовые собаки</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ездовые собаки — это уникальный вид транспорта, который веками использовался в северных регионах для передвижения по снегу и льду. Это традиционный способ путешествия в Арктике, Сибири и других регионах с суровым климатом.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Dog className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Породы ездовых собак</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Хаски — одна из самых известных пород</li>
                  <li>Аляскинские маламуты</li>
                  <li>Самоедские собаки</li>
                  <li>Чукотские ездовые</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Использование сегодня</h2>
              </div>
              <p className="text-base leading-relaxed">
                Сегодня ездовые собаки используются не только в традиционных регионах, но и для туризма, спорта и культурных мероприятий. Катание на собачьих упряжках стало популярным развлечением и способом знакомства с северными традициями.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ezdovyesobaki;
