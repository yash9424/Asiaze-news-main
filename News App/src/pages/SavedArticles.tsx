import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Share2, Search, Home, User, Video } from "lucide-react";

const savedArticles = [
  {
    id: 1,
    title: "Breaking News: Major Event Unfolds",
    description: "This is a preview of the article content, providing a glimpse into the full story. Stay tuned for more details...",
    image: "/Group 6.png",
  },
  {
    id: 2,
    title: "In-Depth Analysis: Economic Trends",
    description: "Explore the latest insights and trends in the economic sector. This article dives deep into...",
    image: "/Group 7.png",
  },
  {
    id: 3,
    title: "Lifestyle: Tips for a Healthier Living",
    description: "Discover simple yet effective strategies to enhance your lifestyle and well-being in this comprehensive guide...",
    image: "/Group 8.png",
  },
];

const SavedArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(savedArticles);

  const handleUnsave = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 sm:left-6">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Saved Articles</h1>
      </div>

      {articles.length > 0 ? (
        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-border"
            >
              <div
                onClick={() => navigate("/article")}
                className="cursor-pointer"
              >
                <div className="relative h-40 sm:h-48 bg-muted">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 sm:p-6 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {article.description}
                  </p>
                </div>
              </div>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-end gap-3 sm:gap-4">
                <button
                  onClick={() => handleUnsave(article.id)}
                  className="text-primary"
                >
                  <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 fill-primary" />
                </button>
                <button className="text-foreground">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6 flex items-center justify-center">
            <div className="text-5xl sm:text-6xl">📑</div>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg">No saved articles yet</p>
        </div>
      )}

      {/* Bottom Image */}
      <div className="px-4 sm:px-6 pb-24 pt-12 flex flex-col items-center">
        <img src="/Group 16.png" alt="Advertisement" className="w-32 sm:w-40 h-auto" />
        <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4">No saved articles yet</p>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          </button>
          <button onClick={() => navigate("/reels")} className="flex flex-col items-center gap-1">
            <Video className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedArticles;
