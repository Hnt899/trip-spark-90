import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Leaf, Info, Shield, X } from "lucide-react";

const Etochtozaborschevik = () => {
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
          <Link to="/guide" className="hover:text-primary">Фишки России</Link>
          <span>/</span>
          <span>Это что за борщевик</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Борщевик: опасное растение, которое заполонило Россию</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Борщевик Сосновского — это огромное растение, которое можно встретить по всей России. Оно было завезено в СССР как кормовое растение, но быстро вышло из-под контроля и стало настоящим бедствием. Борщевик не только захватывает поля и обочины дорог, но и опасен для человека.
              </p>
              <p className="text-base leading-relaxed">
                Растение может достигать высоты 3-4 метра, имеет огромные листья и белые цветы. Оно очень быстро размножается и вытесняет местные растения. Но главная опасность борщевика — это его сок, который вызывает сильные ожоги при контакте с кожей.
              </p>
            </CardContent>
          </Card>

          {/* Что такое борщевик */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое борщевик Сосновского</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Борщевик Сосновского (Heracleum sosnowskyi) — это многолетнее растение семейства зонтичных, которое было выведено в 40-х годах XX века в СССР как кормовое растение для скота. Его родина — Кавказ, откуда он был завезён в другие регионы страны.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Растение очень быстро растёт и может достигать высоты 3-4 метра. У него огромные листья (до 1 метра в диаметре), толстый стебель и большие соцветия в виде зонтиков с белыми цветами. Одно растение может дать до 70 тысяч семян, которые разносятся ветром на большие расстояния.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2 text-red-900">Важно знать:</p>
                <p className="text-sm leading-relaxed text-red-800">
                  Борщевик Сосновского не следует путать с обычным борщевиком сибирским, который растёт в Сибири и не опасен. Опасный борщевик имеет огромные размеры и белые цветы.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Борщевик очень агрессивен и быстро захватывает новые территории. Он вытесняет местные растения, создавая непроходимые заросли. Растение устойчиво к холоду, засухе и химическим средствам, что делает борьбу с ним очень сложной.
              </p>
            </CardContent>
          </Card>

          {/* Опасность для человека */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Чем опасен борщевик</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Главная опасность борщевика — это его сок, который содержит фуранокумарины. Эти вещества вызывают фотосенсибилизацию — повышение чувствительности кожи к ультрафиолетовому излучению. При контакте с соком и последующем воздействии солнечного света на коже появляются сильные ожоги.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ожоги от борщевика могут быть очень серьёзными: появляются волдыри, которые превращаются в тёмные пятна и могут оставаться на коже месяцами или даже годами. В тяжёлых случаях могут остаться шрамы. Особенно опасен борщевик для детей и людей с чувствительной кожей.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Симптомы ожога борщевиком:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Покраснение кожи через несколько часов после контакта</li>
                  <li>Образование волдырей через 1-2 дня</li>
                  <li>Сильный зуд и боль</li>
                  <li>Тёмные пятна на коже, которые могут оставаться месяцами</li>
                  <li>В тяжёлых случаях — повышение температуры и недомогание</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Опасно не только трогать растение, но и находиться рядом с ним в солнечную погоду — мельчайшие капли сока могут попасть на кожу и вызвать ожоги. Особенно опасно это для глаз.
              </p>
            </CardContent>
          </Card>

          {/* Что делать при контакте */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что делать при контакте с борщевиком</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Если вы случайно прикоснулись к борщевику, нужно немедленно промыть место контакта большим количеством воды с мылом. Затем нужно защитить это место от солнечного света — закрыть одеждой или наложить повязку. Нельзя выходить на солнце с открытым участком кожи, который контактировал с борщевиком.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Если появились ожоги, нужно обратиться к врачу. Нельзя самостоятельно вскрывать волдыри — это может привести к инфицированию. Врач назначит соответствующее лечение, которое может включать мази, антибиотики и другие препараты.
              </p>
              <p className="text-base leading-relaxed">
                Для предотвращения ожогов нужно избегать контакта с борщевиком. Если вы видите это растение, не приближайтесь к нему, особенно в солнечную погоду. Детям нужно объяснить опасность этого растения и научить его распознавать.
              </p>
            </CardContent>
          </Card>

          {/* Как бороться */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как бороться с борщевиком</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Борьба с борщевиком — это сложная задача, требующая системного подхода. Растение очень живучее и может размножаться даже из маленького кусочка корня. Простое скашивание не помогает — растение быстро отрастает и даёт новые побеги.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Эффективные методы борьбы включают выкапывание корней, использование гербицидов, закрытие участков плотным материалом (чёрной плёнкой), чтобы перекрыть доступ света. Важно уничтожать растения до цветения, чтобы они не дали семена.
              </p>
              <p className="text-base leading-relaxed">
                В некоторых регионах России созданы специальные программы по борьбе с борщевиком. Владельцы земельных участков обязаны уничтожать борщевик на своей территории. Это важно, чтобы остановить распространение растения и защитить людей от опасности.
              </p>
            </CardContent>
          </Card>

          {/* Интересные факты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">История появления</h3>
                  <p className="text-base leading-relaxed">
                    Борщевик Сосновского был завезён в СССР в 40-х годах XX века как кормовое растение. Предполагалось, что он станет хорошим кормом для скота, но быстро выяснилось, что молоко коров, питающихся борщевиком, становится горьким.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Скорость распространения</h3>
                  <p className="text-base leading-relaxed">
                    Борщевик очень быстро распространяется — одно растение может дать до 70 тысяч семян, которые разносятся ветром на расстояние до нескольких километров. За год площадь, занятая борщевиком, может увеличиться в несколько раз.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Борьба в России</h3>
                  <p className="text-base leading-relaxed">
                    В России борщевик признан опасным растением, и во многих регионах действуют программы по его уничтожению. Владельцы земельных участков могут быть оштрафованы, если не уничтожают борщевик на своей территории.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Etochtozaborschevik;
