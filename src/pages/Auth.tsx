import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-20">
        <h1 className="text-4xl font-bold mb-6">Вход / Регистрация</h1>
        <p className="text-lg text-muted-foreground">
          Система авторизации находится в разработке.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;