import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Snowflake, AlertCircle, Info } from "lucide-react";

const Zachemoblivayutsamoletpered = () => {
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
          <span>Зачем обливают самолёт перед вылетом</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Зачем конкретно обливают самолёт перед вылетом</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Обливание самолёта специальной жидкостью перед вылетом — это процедура противообледенительной обработки, которая необходима в холодную погоду для предотвращения образования льда на поверхности самолёта.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем это нужно</h2>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Опасность обледенения:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Лёд увеличивает вес самолёта</li>
                  <li>Нарушает аэродинамику, снижая подъёмную силу</li>
                  <li>Может заблокировать подвижные части (рули, закрылки)</li>
                  <li>Забивает датчики скорости и высоты</li>
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
                <h2 className="text-2xl font-bold">Противообледенительная жидкость</h2>
              </div>
              <p className="text-base leading-relaxed">
                Специальная жидкость содержит вещества, которые препятствуют образованию льда и удаляют уже образовавшийся лёд. Она наносится на критические поверхности самолёта: крылья, хвостовое оперение, двигатели и другие важные части.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Zachemoblivayutsamoletpered;
