import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, TrendingUp, Shield, CheckCircle, AlertCircle } from "lucide-react";

const PoletovbolsheAviaproisshestviy = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Полётов больше, авиапроисшествий — нет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему полётов стало больше, а авиапроисшествий — нет</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Авиация — одна из самых безопасных отраслей транспорта в мире. Несмотря на постоянный рост количества полётов, статистика показывает, что число авиапроисшествий остаётся стабильно низким, а по некоторым показателям даже снижается.
              </p>
              <p className="text-base leading-relaxed">
                Давайте разберёмся, почему так происходит и какие факторы обеспечивают безопасность воздушных перевозок.
              </p>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Статистика говорит сама за себя</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  По данным Международной ассоциации воздушного транспорта (IATA), количество полётов во всём мире постоянно растёт, но количество катастроф и серьёзных инцидентов остаётся на очень низком уровне.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Ключевые факты:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Ежегодно выполняется более 40 миллионов рейсов</li>
                    <li>Вероятность погибнуть в авиакатастрофе составляет примерно 1 к 11 миллионам</li>
                    <li>Для сравнения: вероятность погибнуть в ДТП — 1 к 5000</li>
                    <li>Авиация становится безопаснее с каждым годом</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> По статистике, вы в большей безопасности в самолёте, чем когда идёте по улице или едете в автомобиле.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Технологии */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Современные технологии и системы безопасности</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Системы предотвращения столкновений</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Все современные самолёты оснащены системами TCAS (Traffic Collision Avoidance System), которые автоматически отслеживают воздушное пространство вокруг самолёта и дают команды пилотам для предотвращения столкновений.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Улучшенная навигация</h3>
                  <p className="text-base leading-relaxed mb-3">
                    GPS и другие спутниковые системы навигации обеспечивают точное определение местоположения самолёта в любой момент времени. Это значительно снижает риск потери ориентации и навигационных ошибок.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Системы мониторинга в реальном времени</h3>
                  <p className="text-base leading-relaxed">
                    Современные самолёты передают данные о своём состоянии на землю в реальном времени. Это позволяет авиакомпаниям и диспетчерам отслеживать техническое состояние самолёта и оперативно реагировать на любые проблемы.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Пример:</strong> Системы предупреждения о сдвиге ветра и обледенении помогают пилотам избежать опасных ситуаций ещё до их возникновения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Обучение пилотов */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Строгое обучение и подготовка пилотов</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Пилоты проходят многолетнее обучение и регулярную переподготовку. Современные тренажёры позволяют отрабатывать даже самые редкие и опасные ситуации без риска для жизни.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Требования к пилотам:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Множество часов налета и теоретической подготовки</li>
                    <li>Регулярные медицинские осмотры</li>
                    <li>Постоянное повышение квалификации</li>
                    <li>Симуляция различных аварийных ситуаций</li>
                    <li>Сертификация на каждый тип самолёта</li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  Команды пилотов также проходят специальную подготовку по работе в критических ситуациях и взаимодействию друг с другом (CRM — Crew Resource Management).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Техническое обслуживание */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Тщательное техническое обслуживание</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авиакомпании обязаны соблюдать строгие графики технического обслуживания. Каждый самолёт проходит регулярные проверки — от ежедневных осмотров до глубокой диагностики.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Ежедневные проверки</p>
                      <p className="text-sm text-muted-foreground">
                        Перед каждым полётом проводится тщательный осмотр самолёта специалистами
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Периодическое обслуживание</p>
                      <p className="text-sm text-muted-foreground">
                        Регулярные проверки через определённое количество часов налета или дней эксплуатации
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Глубокое обслуживание</p>
                      <p className="text-sm text-muted-foreground">
                        Полная разборка и проверка всех систем самолёта в специальных ангарах
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Ни один самолёт не вылетает в рейс, если есть малейшие сомнения в его технической исправности. Безопасность всегда приоритетнее коммерческих интересов.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Анализ инцидентов */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Анализ каждого инцидента и извлечение уроков</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Каждое авиапроисшествие, даже незначительное, тщательно расследуется. Выводы этих расследований приводят к изменениям в:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                  <li>Процедурах полётов и технике безопасности</li>
                  <li>Конструкции самолётов и систем безопасности</li>
                  <li>Обучении пилотов и бортпроводников</li>
                  <li>Регулировании воздушного движения</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Пример:</strong> После каждой серьёзной аварии в авиации вводятся новые правила, которые предотвращают повторение подобных ситуаций. Это система постоянного улучшения безопасности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Регулирование */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Строгое международное регулирование</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авиация — одна из самых регулируемых отраслей в мире. Международные организации, такие как ИКАО (ICAO) и IATA, устанавливают единые стандарты безопасности для всех стран.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Области регулирования:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Стандарты проектирования и производства самолётов</li>
                    <li>Требования к подготовке и лицензированию пилотов</li>
                    <li>Правила технического обслуживания</li>
                    <li>Стандарты управления воздушным движением</li>
                    <li>Требования к безопасности на земле</li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  Национальные авиационные власти строго следят за соблюдением этих стандартов и могут запретить полёты авиакомпаний, которые не соответствуют требованиям безопасности.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Заключение */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Вывод</h2>
              <p className="text-base leading-relaxed mb-4">
                Рост числа полётов не приводит к увеличению авиапроисшествий благодаря комплексному подходу к безопасности:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Современные технологии и системы безопасности</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Высококвалифицированные и хорошо обученные пилоты</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Тщательное техническое обслуживание самолётов</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Анализ инцидентов и постоянное улучшение</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Строгие международные стандарты и регулирование</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-6">
                <p className="text-sm leading-relaxed">
                  <strong>Результат:</strong> Авиация остаётся самым безопасным видом транспорта, и с каждым годом становится ещё безопаснее, несмотря на рост пассажиропотока.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoletovbolsheAviaproisshestviy;
