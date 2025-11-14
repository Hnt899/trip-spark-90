import { InfoCardData } from "@/data/blogData";

interface InfoCardProps {
  data: InfoCardData;
}

const InfoCard = ({ data }: InfoCardProps) => {
  return (
    <div className="h-[750px] rounded-3xl shadow-sm bg-white overflow-hidden flex flex-col">
      {/* Верхняя часть - изображение */}
      <div className="h-[525px] bg-slate-50 flex items-center justify-center">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Нижняя часть - текст */}
      <div className="h-[225px] bg-slate-50 px-6 pt-6 pb-2 flex flex-col justify-center">
        <span className="text-sm font-medium text-muted-foreground mb-2 text-center">{data.type}</span>
        <h3 className="text-2xl font-bold text-foreground mb-3 line-clamp-2 text-center">{data.title}</h3>
        <p className="text-base text-muted-foreground line-clamp-4 flex-1 text-center">{data.description}</p>
      </div>
    </div>
  );
};

export default InfoCard;

