import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DocumentsForPurchase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Документы для покупки билетов</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Документы для покупки билетов</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground">
            Информация о необходимых документах находится в разработке.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentsForPurchase;

