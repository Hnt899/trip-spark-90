import { Button } from "@/components/ui/button";
import { NewsItem, TipData } from "@/data/blogData";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface WideHighlightCardProps {
  data: NewsItem | TipData;
  buttonText?: string;
  noRounded?: boolean;
  hideButton?: boolean;
}

const WideHighlightCard = ({ data, buttonText, noRounded = false, hideButton = false }: WideHighlightCardProps) => {
  const displayButtonText = buttonText || data.buttonText || 'Подробнее';
  const hasUrl = 'url' in data && data.url;
  
  const content = (
    <div className={`relative w-full flex flex-col md:flex-row items-stretch overflow-hidden min-h-[200px] md:h-[230px] bg-primary ${noRounded ? '' : 'rounded-3xl'}`}>
      {/* Блок с изображением */}
      <div className={`w-full md:w-1/3 md:min-w-[220px] h-48 md:h-auto relative ${noRounded ? 'wide-card-image-no-rounded' : 'wide-card-image'}`}>
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Блок текста */}
      <div className="flex-1 p-6 md:p-8 md:pl-12 flex flex-col justify-center text-primary-foreground">
        <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-sm md:text-base opacity-90 mb-4 line-clamp-3">
          {data.description}
        </p>
        {!hideButton && (
          hasUrl ? (
            <Button 
              className="w-fit bg-white hover:bg-white/90 text-primary"
              size="sm"
              asChild
            >
              <Link to={data.url!}>
                {displayButtonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button 
              className="w-fit bg-white hover:bg-white/90 text-primary"
              size="sm"
            >
              {displayButtonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )
        )}
      </div>
    </div>
  );

  return content;
};

export default WideHighlightCard;

