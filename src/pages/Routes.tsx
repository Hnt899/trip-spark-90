import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Routes = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-20">
        <h1 className="text-4xl font-bold mb-6">Маршруты</h1>
        <p className="text-lg text-muted-foreground">
          Страница с маршрутами находится в разработке.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Routes;