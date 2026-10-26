import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, ChevronRight } from "lucide-react";
import person1 from "@/assets/images/people/просто сотрудник 1.jpg";
import person2 from "@/assets/images/people/просто сотрудник 2.jpg";
import person3 from "@/assets/images/people/просто сотрудник 3.jpg";
import person4 from "@/assets/images/people/просто сотрудник 4.jpg";
import person5 from "@/assets/images/people/просто сотрудник 5.jpg";
import person6 from "@/assets/images/people/просто сотрудник 6.jpg";
import person7 from "@/assets/images/people/просто сотрудник 7.jpg";
import person8 from "@/assets/images/people/просто сотрудник 8.jpg";
import person9 from "@/assets/images/people/просто сотрудник 9.jpg";
import person10 from "@/assets/images/people/просто сотрудник 10.jpg";
import person11 from "@/assets/images/people/просто сотрудник 11.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import trainInterior from "@/assets/images/transport/train-interior.jpg";
import baikal1 from "@/assets/images/routes/байкал1.jpg";
import baikal2 from "@/assets/images/routes/байкал 2.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import vladivostok1 from "@/assets/images/routes/владивосток 1.jpg";
import vladivostok2 from "@/assets/images/routes/владивосток 2.jpg";
import kaliningrad1 from "@/assets/images/routes/калиниград 1.jpg";
import kaliningrad2 from "@/assets/images/routes/калиниград 2.jpg";
import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import sochi from "@/assets/images/cities/armenia.jpg";
import белыеНочи from "@/assets/images/events/белые ночи.jpg";
import { useMergedPublishedPage } from "@/hooks/usePageContent";
import { getSectionFields, mediaOrFallback } from "@/lib/pageContentMerge";
import type { TestimonialsFields, TestimonialsItemFields } from "@/types/pageContent";

const testimonialsData = [
  // ... СЮДА скопируй свой массив testimonialsData (11 отзывов с review)
  // Он у тебя есть в текущем файле — просто скопируй.
];

const TestimonialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { content } = useMergedPublishedPage("home");

  const hardcoded = testimonialsData.find((t) => t.id === Number(id));

  const cmsItem = useMemo(() => {
    const fields = getSectionFields<TestimonialsFields>(content, "testimonials");
    const items = Array.isArray(fields.items) ? fields.items : [];
    return items.find((item: TestimonialsItemFields) => String(item.id) === String(id));
  }, [content, id]);

  const testimonial = useMemo(() => {
    if (!hardcoded && !cmsItem) return null;

    const base = hardcoded || {
      id: Number(id) || 0,
      name: cmsItem?.name || "",
      avatar: "",
      route: cmsItem?.route || "",
      date: cmsItem?.date || "",
      photos: [] as string[],
      review: "",
    };

    if (!cmsItem) return base;

    const gallery =
      Array.isArray(cmsItem.gallery) && cmsItem.gallery.length > 0
        ? cmsItem.gallery.filter((g): g is string => typeof g === "string" && g.trim().length > 0)
        : cmsItem.photo
          ? [cmsItem.photo]
          : [];

    const photos =
      gallery.length > 0
        ? gallery.map((g, i) => mediaOrFallback(g, base.photos[i] || base.photos[0] || g))
        : base.photos;

    return {
      ...base,
      name: cmsItem.name || base.name,
      avatar: mediaOrFallback(cmsItem.avatar, base.avatar),
      route: cmsItem.route || base.route,
      date: cmsItem.date || base.date,
      photos,
      review: cmsItem.body || cmsItem.text || base.review,
      routeRefId: cmsItem.routeRefId || "",
      routeTitle: cmsItem.routeTitle || "",
      routeSubtitle: cmsItem.routeSubtitle || "",
      routeImage: cmsItem.routeImage || "",
      routeUrl: cmsItem.routeUrl || "",
    };
  }, [hardcoded, cmsItem, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-4xl pt-24 pb-12 md:pt-32">
          <div className="text-center">
            <h1 className="heading-gradient text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Отзыв не найден
            </h1>
            <Button onClick={() => navigate(-1)}>Назад</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl pt-24 pb-12 md:pt-32">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
          {/* Заголовок и информация об авторе */}
          <div className="mb-8 pb-6 border-b">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <h1 className="heading-gradient text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {testimonial.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{testimonial.route}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Фотографии */}
          {testimonial.photos && testimonial.photos.length > 0 && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonial.photos.map((photo, index) => (
                <div key={index} className="rounded-2xl overflow-hidden">
                  <img
                    src={photo}
                    alt={`Фото из путешествия ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Текст отзыва */}
          <div className="prose prose-lg max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {testimonial.review}
            </div>
          </div>

          {/* ← ПЛАШКА МАРШРУТА */}
          {testimonial.routeUrl && testimonial.routeTitle && (
            <div className="mt-8 pt-6 border-t border-border/40">
              <a
                href={testimonial.routeUrl}
                onClick={(e) => {
                  if (!testimonial.routeUrl.startsWith("http")) {
                    e.preventDefault();
                    navigate(testimonial.routeUrl);
                  }
                }}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-muted/30 p-4 hover:bg-muted/60 hover:border-primary/40 transition-all"
              >
                {testimonial.routeImage && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={testimonial.routeImage}
                      alt={testimonial.routeTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-foreground">
                    {testimonial.routeTitle}
                  </p>
                  {testimonial.routeSubtitle && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.routeSubtitle}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialDetail;