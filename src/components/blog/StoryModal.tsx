import { useEffect, useState } from "react";
import type { CarouselStory } from "./StoriesCarousel";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryModalProps {
  story: CarouselStory;
  onClose: () => void;
}

const StoryModal = ({ story, onClose }: StoryModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImageIndex((idx) => {
            const next = idx + 1;
            if (next >= story.images.length) {
              onClose();
              return 0;
            }
            return next;
          });
          return 0;
        }
        return prev + 100 / 30;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story.images.length, onClose]);

  useEffect(() => {
    setProgress(0);
  }, [currentImageIndex]);

  const handleNext = () => {
    if (currentImageIndex < story.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleProgressClick = (index: number) => {
    setCurrentImageIndex(index);
    setProgress(0);
  };

  const title = story.city || story.title || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[420px] aspect-[9/16]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        <div
          className="relative w-full h-full rounded-3xl overflow-hidden bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0">
            <img
              src={story.images[currentImageIndex]}
              alt={title}
              className="w-full h-full object-cover blur-lg opacity-50"
            />
          </div>

          <div className="relative w-full h-full flex flex-col">
            <div className="flex gap-1 p-3">
              {story.images.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => handleProgressClick(index)}
                >
                  <div
                    className="h-full transition-all duration-100 story-progress-gradient"
                    style={{
                      width:
                        index === currentImageIndex
                          ? `${progress}%`
                          : index < currentImageIndex
                            ? "100%"
                            : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 relative">
              <img
                src={story.images[currentImageIndex]}
                alt={title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm opacity-90">{story.text}</p>
              </div>
            </div>

            <div className="absolute inset-0 flex">
              <div className="flex-1 cursor-pointer" onClick={handlePrev} />
              <div className="flex-1 cursor-pointer" onClick={handleNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;