import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import armenia from "@/assets/images/cities/armenia.jpg";

interface Photographer {
  name: string;
  handle: string;
  avatar: string;
  image: string;
}

const photographers: Photographer[] = [
  {
    name: "Андрей Белавин",
    handle: "@ted.ns",
    avatar: "https://i.pravatar.cc/150?img=13",
    image: karelia,
  },
  {
    name: "Сергей Шандин",
    handle: "@pictotravel",
    avatar: "https://i.pravatar.cc/150?img=14",
    image: moscow,
  },
  {
    name: "Георгий Шпикалов",
    handle: "@george_shpikalov",
    avatar: "https://i.pravatar.cc/150?img=15",
    image: stPetersburg,
  },
  {
    name: "Сергей Крылов",
    handle: "@skrylov_official",
    avatar: "https://i.pravatar.cc/150?img=16",
    image: kazan,
  },
  {
    name: "Константин Парфеньев",
    handle: "@parfenevk",
    avatar: "https://i.pravatar.cc/150?img=17",
    image: novgorod,
  },
  {
    name: "Дмитрий Огнев",
    handle: "@timonich",
    avatar: "https://i.pravatar.cc/150?img=18",
    image: armenia,
  },
];

// Константы для настройки анимации
const ANIMATION_DURATION = 30; // секунды на полный цикл
const CARD_WIDTH = 240; // ширина карточки в пикселях
const CARD_GAP = 24; // отступ между карточками в пикселях

const PhotographersSection = () => {
  // Дублируем массив для seamless loop (3 раза для плавности)
  const duplicatedPhotographers = [...photographers, ...photographers, ...photographers];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="text-white/60 tracking-[0.28em] text-xs md:text-sm uppercase">
            Photographers
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            Наши фотографы
          </h2>
          <p className="text-white/75 mt-3 max-w-2xl">
            Живые кадры, реальная Россия и авторские точки зрения — выбирай, чьи фото вдохновляют.
          </p>
        </div>
      </div>

      {/* Верхний ряд - движется вправо */}
      <div className="relative overflow-hidden mb-6">
        <div
          className="flex marquee-right"
          style={{
            width: "fit-content",
            animationDuration: `${ANIMATION_DURATION}s`,
          }}
        >
          {duplicatedPhotographers.map((photographer, index) => (
            <div
              key={`top-${index}`}
              className="flex-shrink-0 group cursor-pointer"
              style={{
                width: `${CARD_WIDTH}px`,
                marginRight: `${CARD_GAP}px`,
              }}
            >
              <div className="relative h-64 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-sm font-semibold truncate">
                    {photographer.name}
                  </div>
                  <div className="text-white/70 text-xs truncate">
                    {photographer.handle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Нижний ряд - движется влево */}
      <div className="relative overflow-hidden">
        <div
          className="flex marquee-left"
          style={{
            width: "fit-content",
            animationDuration: `${ANIMATION_DURATION}s`,
          }}
        >
          {duplicatedPhotographers.map((photographer, index) => (
            <div
              key={`bottom-${index}`}
              className="flex-shrink-0 group cursor-pointer"
              style={{
                width: `${CARD_WIDTH}px`,
                marginRight: `${CARD_GAP}px`,
              }}
            >
              <div className="relative h-64 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-sm font-semibold truncate">
                    {photographer.name}
                  </div>
                  <div className="text-white/70 text-xs truncate">
                    {photographer.handle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographersSection;

