import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Trains = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
          Справочная информация о ж/д билетах
        </h1>

        {/* Sections */}
        <div className="space-y-12 max-w-4xl">
          {/* Section 1: Покупка ж/д билета */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Покупка ж/д билета
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/reference/trains/documents-for-purchase"
                  className="text-primary hover:underline"
                >
                  Документы для покупки билетов
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/how-to-buy"
                  className="text-primary hover:underline"
                >
                  Как купить ж/д билет
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/how-to-pay"
                  className="text-primary hover:underline"
                >
                  Как оплатить ж/д билет
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/pay-later"
                  className="text-primary hover:underline"
                >
                  Как оплатить билет позже
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/pre-order"
                  className="text-primary hover:underline"
                >
                  Как сделать предзаказ ж/д билетов
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/no-tickets"
                  className="text-primary hover:underline"
                >
                  Что делать, если билетов нет
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/how-to-get-ticket"
                  className="text-primary hover:underline"
                >
                  Как получить ж/д билет
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/printed-ticket"
                  className="text-primary hover:underline"
                >
                  Как получить билет в печатном виде
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/auto-fill-passenger-data"
                  className="text-primary hover:underline"
                >
                  Автоматический ввод данных пассажиров
                </Link>
              </li>
            </ul>
          </section>

          {/* Section 2: Вопросы после покупки */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Вопросы после покупки
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/reference/trains/electronic-registration"
                  className="text-primary hover:underline"
                >
                  Электронная регистрация
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/change-after-payment"
                  className="text-primary hover:underline"
                >
                  Можно ли что-то изменить в билете после оплаты
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/what-needed-for-boarding"
                  className="text-primary hover:underline"
                >
                  Что нужно для посадки в поезд
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/how-to-return-ticket"
                  className="text-primary hover:underline"
                >
                  Как вернуть билет на поезд
                </Link>
              </li>
            </ul>
          </section>

          {/* Section 3: Частые вопросы */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Частые вопросы
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/reference/trains/train-schedule"
                  className="text-primary hover:underline"
                >
                  Как узнать расписание, маршрут, график поезда
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/check-tickets-availability"
                  className="text-primary hover:underline"
                >
                  Как узнать, есть ли билеты на поезд и сколько они стоят
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/profile-purpose"
                  className="text-primary hover:underline"
                >
                  Для чего нужен профиль GoTrip
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/card-payment-failed"
                  className="text-primary hover:underline"
                >
                  Что делать, если оплата пластиковой картой не проходит
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/refund-to-card"
                  className="text-primary hover:underline"
                >
                  Почему деньги возвращаются на карту, которой оплачен заказ
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/buy-whole-compartment"
                  className="text-primary hover:underline"
                >
                  Можно ли выкупить целое купе
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/suburban-trains"
                  className="text-primary hover:underline"
                >
                  Как купить билеты на скорые пригородные поезда
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/sports-equipment"
                  className="text-primary hover:underline"
                >
                  Как провезти в поезде спортивный или туристический инвентарь
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/cheap-tickets"
                  className="text-primary hover:underline"
                >
                  Как купить дешёвые ж/д билеты
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/passport-issues"
                  className="text-primary hover:underline"
                >
                  Что делать при отсутствии, замене или утере паспорта
                </Link>
              </li>
            </ul>
          </section>

          {/* Section 4: Правила перевозки и нормативные документы */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Правила перевозки и нормативные документы
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/reference/trains/ticket-order-rules"
                  className="text-primary hover:underline"
                >
                  Правила заказа ж/д билетов
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/children-benefits"
                  className="text-primary hover:underline"
                >
                  Льготы для детей в поездах
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/luggage-rules"
                  className="text-primary hover:underline"
                >
                  Правила перевозки багажа
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/animals-rules"
                  className="text-primary hover:underline"
                >
                  Правила перевозки животных в поезде
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/regulatory-acts"
                  className="text-primary hover:underline"
                >
                  Нормативные акты
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/public-offer"
                  className="text-primary hover:underline"
                >
                  Публичная оферта раздела Ж/д билеты
                </Link>
              </li>
            </ul>
          </section>

          {/* Section 5: О поездах */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              О поездах
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/reference/trains/sapsan"
                  className="text-primary hover:underline"
                >
                  Сапсан
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/train-types"
                  className="text-primary hover:underline"
                >
                  Какие бывают вагоны и поезда
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/carriage-schemes"
                  className="text-primary hover:underline"
                >
                  Схемы вагонов ЖД
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/train-composition-schemes"
                  className="text-primary hover:underline"
                >
                  Схемы составов ЖД и расположение вагонов
                </Link>
              </li>
            </ul>
          </section>

          {/* Section 6: Полезные статьи */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Полезные статьи
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/reference/trains/seasonal-coefficients"
                  className="text-primary hover:underline"
                >
                  Сезонные коэффициенты РЖД
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/crimea-by-train"
                  className="text-primary hover:underline"
                >
                  Как добраться в Крым на поезде
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/ticket-sales-periods"
                  className="text-primary hover:underline"
                >
                  Сроки продаж билетов
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/ticket-on-form"
                  className="text-primary hover:underline"
                >
                  Билет на бланке
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/new-year-travel"
                  className="text-primary hover:underline"
                >
                  Поезд в Новый год. Идеи путешествий на новогодние праздники
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/may-holidays"
                  className="text-primary hover:underline"
                >
                  Куда поехать на майские праздники
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/buy-ticket-tips"
                  className="text-primary hover:underline"
                >
                  Как купить билет на поезд: наши советы
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/tilting-carriages"
                  className="text-primary hover:underline"
                >
                  Где ходят поезда с наклоняющимися при повороте вагонами
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/unusual-railways"
                  className="text-primary hover:underline"
                >
                  Необычные железные дороги
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/time-zones"
                  className="text-primary hover:underline"
                >
                  Часовые пояса и их связь с ЖД
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/railway-facts"
                  className="text-primary hover:underline"
                >
                  Интересные факты о ж/д
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/ticket-availability"
                  className="text-primary hover:underline"
                >
                  Наличие ж/д билетов
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/russian-railways-history"
                  className="text-primary hover:underline"
                >
                  История железных дорог России
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/russian-stations"
                  className="text-primary hover:underline"
                >
                  Вокзалы России
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/moscow-stations"
                  className="text-primary hover:underline"
                >
                  Вокзалы Москвы
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/spb-stations"
                  className="text-primary hover:underline"
                >
                  Вокзалы Санкт-Петербурга
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/restaurant-cars"
                  className="text-primary hover:underline"
                >
                  Поезда с вагонами-ресторанами
                </Link>
              </li>
              <li>
                <Link
                  to="/reference/trains/eating-on-train"
                  className="text-primary hover:underline"
                >
                  Как поесть в поезде: все способы
                </Link>
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="pt-8 border-t">
            <p className="text-muted-foreground mb-2">
              Не нашли ответа на вопрос?
            </p>
            <p className="text-muted-foreground">
              Напишите нам:{" "}
              <a
                href="mailto:railway@gotrip.ru"
                className="text-primary hover:underline"
              >
                railway@gotrip.ru
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trains;

