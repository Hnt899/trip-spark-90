import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TransferWidget from "@/components/transfer/TransferWidget";
import { CalendarCheck, MapPin, ShieldCheck } from "lucide-react";

/**
 * Отдельная страница подбора трансфера (taxi.ts-trip.ru).
 * Шапка и подвал — те же компоненты, что на основном сайте,
 * виджет — тот же TransferWidget, что был во вкладке на главной.
 */
const Taxi = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Трансфер и такси"
        description="Индивидуальный трансфер из аэропорта, с вокзала или до отеля: фиксированная цена, встреча с табличкой, бронирование онлайн."
      />
      <Header />
      <main className="pt-[calc(var(--site-header-height)+2rem)] pb-16 md:pt-[calc(var(--site-header-height)+3rem)]">
        <div className="container max-w-4xl">
          <h1 className="heading-gradient text-3xl font-bold tracking-tight md:text-4xl">
            Трансфер
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Заказ индивидуального трансфера из аэропорта, с вокзала или до отеля.
            Укажите откуда и куда — сервис покажет варианты с ценой и временем в пути.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-border md:p-3">
            <TransferWidget />
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            <li className="rounded-xl border border-border bg-card p-4">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-2 text-sm font-medium text-foreground">Откуда угодно</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Аэропорт, вокзал или адрес в городе.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-4">
              <CalendarCheck className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-2 text-sm font-medium text-foreground">Онлайн-бронирование</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Машина закрепляется заранее, без звонков.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-4">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-2 text-sm font-medium text-foreground">Цена известна сразу</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Стоимость видна до подтверждения заказа.
              </p>
            </li>
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">
            Бронирование выполняет партнёр — KiwiTaxi. Оплата и условия поездки
            указаны на этапе оформления заказа.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Taxi;
