import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const onboardingSlides = [

  {
    title: "Stay Updated in Seconds",
    description: "Read short 60-word news summaries instantly",
     image: "/Group.png",
  },
  {
    title: "News in English, Hindi & Bengali",
    description: "Read short 60-word news summaries instantly",
   image: "/Group 1.png",
  },
  {
    title: "Watch Short News Reels Instantly",
    description: "Scroll through quick video updates anytime",
      image: "/Group 2.png",
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8 sm:mb-12 flex items-center justify-center">
          {onboardingSlides[currentSlide].image.startsWith('/') ? (
            <img 
              src={onboardingSlides[currentSlide].image} 
              alt={onboardingSlides[currentSlide].title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-3xl flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Illustration</div>
            </div>
          )}
        </div>

        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 px-2">
          <h2 className="text-[22px] font-bold text-foreground leading-tight whitespace-nowrap">
            {onboardingSlides[currentSlide].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            {onboardingSlides[currentSlide].description}
          </p>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        <div className="flex justify-center gap-2">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            className="w-32 sm:w-40 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full"
          >
            {currentSlide === onboardingSlides.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
