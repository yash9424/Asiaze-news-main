import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Heart, Bookmark, Share2, ChevronUp } from "lucide-react";

const reelsData = [
  {
    id: 1,
    headline: "Breaking News Headline",
    source: "Source Name",
    time: "5mins ago",
    summary: "This is a captivating summary that provides a brief overview of the video content, ensuring viewers are intrigued to watch more...",
    duration: "00:30 / 01:00",
    likes: "12K",
  },
];

const Reels = () => {
  const navigate = useNavigate();
  const [currentReel] = useState(0);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0">
        <img src="/Group 4.png" alt="Reel" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <button onClick={() => navigate("/home")} className="text-white">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-white lowercase">asiaze</h1>
        <button className="text-white">
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Side Actions */}
      <div className="absolute right-3 sm:right-4 bottom-28 sm:bottom-32 z-10 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col items-center">
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <span className="text-white text-xs mt-1">{reelsData[currentReel].likes}</span>
        </div>
        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
          <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-4 sm:px-6 pt-16 sm:pt-20 pb-4 sm:pb-6">
        <h2 className="text-white text-lg sm:text-xl font-bold mb-2">
          {reelsData[currentReel].headline}
        </h2>
        <div className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3">
          {reelsData[currentReel].source} • {reelsData[currentReel].time}
        </div>
        <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {reelsData[currentReel].summary}
        </p>
        <div className="flex items-center justify-between text-xs">
          <div className="text-white">{reelsData[currentReel].duration}</div>
          <div className="flex items-center gap-1 sm:gap-2 text-white">
            <span className="hidden sm:inline">Swipe up</span>
            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Tap to open article</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reels;
