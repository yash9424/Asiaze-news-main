import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Home as HomeIcon, User, Video, Bookmark, Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["My Feed", "Videos", "Business", "Tech", "Finance", "Entertainment"];

const newsArticles = [
  {
    id: 1,
    title: "Emerging Technologies in Urban Development",
    description:
      "Discover how emerging technologies are reshaping our urban landscapes, from smart cities to sustainable architecture. Explore innovative solutions that redefine urban living.",
     image: "/Group 3.png",
    time: "Few hours ago",
    source: "ASIAZE",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("My Feed");
  const [showRefresh, setShowRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-center">
          <img src="/Group 15.png" alt="asiaze" className="h-8 sm:h-10 w-auto" />
        </div>

        {/* Categories */}
        <div className="overflow-x-auto px-4 sm:px-6 pb-2 sm:pb-3 hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  if (category === "Tech") {
                    navigate("/tech-trends");
                    return;
                  }
                  if (category !== "My Feed" && category !== "Videos") {
                    navigate(`/category/${category}`);
                  }
                }}
                className={`pb-2 whitespace-nowrap font-medium text-sm sm:text-base transition-colors ${
                  activeCategory === category
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Breaking News Banner */}
        <div className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-sm sm:text-base">
            <span className="font-semibold">Breaking News:</span> Major updates from around the world...
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Refresh Button */}
        {showRefresh && (
          <div className="flex justify-center">
            <Button
              variant="secondary"
              className="rounded-full gap-2 bg-foreground text-background hover:bg-foreground/90 text-sm sm:text-base h-10 sm:h-auto px-4 sm:px-6"
              onClick={() => setShowRefresh(false)}
            >
              <RefreshCw className="w-4 h-4" />
              Load New Feed
            </Button>
          </div>
        )}

        {/* News Card */}
        {newsArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate("/article")}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border cursor-pointer"
          >
            <div className="relative h-64 sm:h-80 bg-muted">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex gap-2">
                <button className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-2 sm:space-y-3 relative pb-12 sm:pb-14">
              <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                {article.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {article.description}
              </p>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span>{article.time}</span>
                <span>•</span>
                <span>{article.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button className="flex flex-col items-center gap-1">
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/reels")} className="flex flex-col items-center gap-1">
            <Video className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
