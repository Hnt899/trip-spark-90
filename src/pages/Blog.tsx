import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-20">
        <h1 className="text-4xl font-bold mb-6">Блог</h1>
        <p className="text-lg text-muted-foreground">
          Блог находится в разработке.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;