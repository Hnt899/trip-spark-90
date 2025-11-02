import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import karelia from "@/assets/karelia.jpg";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";
import armenia from "@/assets/armenia.jpg";

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

const PhotographersSection = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="py-20 bg-[#eef0f8]">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Наши фотографы
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photographers.map((photographer, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={photographer.avatar} alt={photographer.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(photographer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{photographer.name}</div>
                    <div className="text-sm text-muted-foreground">{photographer.handle}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographersSection;

