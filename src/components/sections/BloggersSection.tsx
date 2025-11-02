import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Blogger {
  name: string;
  followers: string;
  avatar: string;
}

const bloggers: Blogger[] = [
  { name: "Марк Ерёмин", followers: "1 661k", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Записки взлётоголиков", followers: "1 053k", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Голландец в России", followers: "588k", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Путешествия с фотокамерой", followers: "365k", avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "Travel Lerka", followers: "258k", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "Вокруг Светы. Путешествия", followers: "239k", avatar: "https://i.pravatar.cc/150?img=6" },
  { name: "Путешествия и всего по чуть-чуть", followers: "183k", avatar: "https://i.pravatar.cc/150?img=7" },
  { name: "Тревел-блог Дмитрия Кустарниченко", followers: "128k", avatar: "https://i.pravatar.cc/150?img=8" },
  { name: "Глеба и зрелищ", followers: "99k", avatar: "https://i.pravatar.cc/150?img=9" },
  { name: "BEZгида || маршруты от Олега Меркурьева", followers: "48k", avatar: "https://i.pravatar.cc/150?img=10" },
  { name: "Города Побродимы", followers: "32k", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Понаехавшая", followers: "32k", avatar: "https://i.pravatar.cc/150?img=12" },
];

const BloggersSection = () => {
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-muted-foreground">Участники проекта: </span>
            <span className="text-foreground">тревел- и лайфстайл-блогеры</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bloggers.map((blogger, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="font-bold text-foreground text-sm md:text-base">
                  {blogger.name}
                </div>
                <div className="text-primary font-semibold">
                  {blogger.followers} подписчиков
                </div>
                <div className="flex justify-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={blogger.avatar} alt={blogger.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(blogger.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloggersSection;

