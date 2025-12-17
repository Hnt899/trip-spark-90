import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const TestimonialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              История путешествия
            </h1>
            <p className="text-muted-foreground text-lg">
              Поделитесь своим опытом и впечатлениями о поездке
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Ваше мнение</h2>
              <p className="text-muted-foreground mb-6">
                Расскажите другим путешественникам о вашем опыте. Ваш отзыв поможет другим сделать правильный выбор.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Ваш отзыв
                  </label>
                  <Textarea
                    placeholder="Напишите о вашем путешествии, что вам понравилось, что можно улучшить, ваши советы другим путешественникам..."
                    className="min-h-[200px] resize-none"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    // Здесь будет логика отправки отзыва
                    alert("Спасибо за ваш отзыв! Он будет опубликован после модерации.");
                  }}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Отправить отзыв
                </Button>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-xl font-semibold mb-3">Почему важно делиться опытом?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Ваш отзыв помогает другим путешественникам принять решение</li>
                <li>• Вы помогаете улучшить сервис TudaSuda</li>
                <li>• Ваш опыт может вдохновить других на путешествие</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialDetail;

