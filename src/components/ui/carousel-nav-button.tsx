import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
  showOnMobile?: boolean;
}

export const CarouselNavButton = ({ 
  direction, 
  onClick, 
  className,
  showOnMobile = false 
}: CarouselNavButtonProps) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md hover:bg-white z-10",
        showOnMobile ? "flex" : "hidden md:flex",
        !className && (isPrev
          ? "left-0 -translate-x-full -ml-4"
          : "right-0 translate-x-full ml-4"),
        className
      )}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-primary" />
    </Button>
  );
};

interface CarouselNavButtonsMobileProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export const CarouselNavButtonsMobile = ({ 
  onPrev, 
  onNext, 
  className 
}: CarouselNavButtonsMobileProps) => {
  return (
    <div className={cn("flex justify-center gap-2 mt-6 lg:hidden", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        className="rounded-full bg-white shadow-md hover:bg-white w-12 h-12 border-0"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        className="rounded-full bg-white shadow-md hover:bg-white w-12 h-12 border-0"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </Button>
    </div>
  );
};

