import { EventData } from "@/data/blogData";
import { cn } from "@/lib/utils";

interface EventTileProps {
  data: EventData;
  className?: string;
}

const EventTile = ({ data, className }: EventTileProps) => {
  const handleClick = () => {
    if (data.url) {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group",
        className
      )}
      onClick={handleClick}
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Текст поверх фотографии */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 md:p-6 flex flex-col justify-end items-center text-white text-center"
      >
        <h3 className="text-lg md:text-xl font-bold mb-1 line-clamp-2">{data.title}</h3>
        <p className="text-sm opacity-90 mb-2 line-clamp-2">{data.description}</p>
        <div className="text-xs font-medium">
          <span>{data.city}</span>
          <span className="mx-2">•</span>
          <span>{data.date}</span>
        </div>
      </div>
    </div>
  );
};

export default EventTile;

