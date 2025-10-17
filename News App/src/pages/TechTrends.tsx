import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Share2, CornerUpRight } from "lucide-react";

const TechTrends = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Top red bar */}
      <div className="h-1 w-full bg-primary" />

      {/* Hero image (background) */}
      <div
        className="relative h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/Vector.png')" }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Back only (removed top-right icons) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <button onClick={() => navigate(-1)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* Tech badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="bg-primary text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">Tech</span>
        </div>

        {/* Title, meta, and description over image */}
        <div className="absolute bottom-16 sm:bottom-20 left-3 right-3 sm:left-4 sm:right-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            Innovative Tech Trends to Watch in 2023
          </h1>
          <p className="mt-2 text-white/80 text-xs sm:text-sm">By AsiaZe · 2 hours ago</p>
          <p className="mt-2 sm:mt-3 text-white/90 leading-relaxed text-sm sm:text-base">
            Dive into the latest technological advancements that are set to revolutionize industries in 2023. From AI breakthroughs to sustainable tech solutions, explore the innovations shaping our future.
          </p>
        </div>

        {/* Bottom right: three action icons */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 sm:gap-3">
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 flex items-center justify-center">
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 flex items-center justify-center">
            <CornerUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 flex items-center justify-center">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      </div>

      {/* All text is now set over the background image above */}
    </div>
  );
};

export default TechTrends;


