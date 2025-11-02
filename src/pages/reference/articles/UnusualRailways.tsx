import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UnusualRailways = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Необычные железные дороги</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Необычные железные дороги</h1>
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

export default UnusualRailways;

