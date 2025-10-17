import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Heart, Bookmark } from "lucide-react";

const Article = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-foreground uppercase">asiaze</h1>
        <button>
          <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </button>
      </div>

      {/* Article Content */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 pb-24 sm:pb-28">
        {/* Featured Image */}
        <div className="relative h-48 sm:h-64 bg-muted rounded-3xl overflow-hidden mb-4 sm:mb-6">
          <img src="/Group 5.png" alt="Article" className="w-full h-full object-cover" />
        </div>

        {/* Article Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
          Breakthrough in Renewable Energy: The Future Looks Bright
        </h1>

        {/* Article Meta */}
        <p className="text-muted-foreground text-xs sm:text-sm mb-2">
          A new era of sustainable energy solutions is emerging, promising a cleaner and more efficient future.
        </p>
        <div className="text-muted-foreground text-xs mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
          Source: TechCrunch | Published: April 1, 2023, 10:00 AM
        </div>

        {/* Article Body */}
        <div className="prose prose-sm sm:prose-lg max-w-none space-y-3 sm:space-y-4 text-foreground mb-6 sm:mb-8">
          <p className="leading-relaxed text-sm sm:text-base">
            In recent years, the renewable energy sector has seen unprecedented growth and innovation, driven by advancements in technology and increased awareness of environmental issues. Read
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            Numerous companies are investing heavily in solar, wind, and other renewable sources, aiming to reduce dependency on fossil fuels. The potential for job creation and economic growth is substantial, with experts predicting a significant shift in global energy dynamics.
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            As the world moves towards a greener future, the role of renewable energy becomes increasingly vital. Explore how governments are supporting this transition.
          </p>
        </div>

        {/* Spacer for fixed footer is handled via pb-28 on container */}
      </div>

      {/* Fixed Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex items-center justify-center gap-6 sm:gap-10 py-3 sm:py-4">
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
              <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
