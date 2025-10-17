import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search, Home as HomeIcon, User, Video } from "lucide-react";

const categoryArticles = {
  Sports: [
    {
      id: 1,
      title: "Thrilling Soccer Match Concludes with Dramatic Finale",
      description: "A match that kept fans on the edge of their seats...",
      source: "ESPN",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Formula 1: A Race to Remember in Monaco",
      description: "The streets of Monaco witnessed a spectacular race...",
      source: "BBC Sport",
      time: "3 hours ago",
    },
    {
      id: 3,
      title: "Grand Slam Victory: Tennis Prodigy Shines Bright",
      description: "Young talent takes the world by storm with a stunning victory...",
      source: "Reuters",
      time: "5 hours ago",
    },
  ],
  Business: [
    {
      id: 1,
      title: "Market Update: Tech Stocks Surge",
      description: "Technology sector shows strong growth...",
      source: "Bloomberg",
      time: "1 hour ago",
    },
  ],
  Tech: [
    {
      id: 1,
      title: "AI Revolution: New Breakthroughs Announced",
      description: "Latest developments in artificial intelligence...",
      source: "TechCrunch",
      time: "30 mins ago",
    },
  ],
};

const Category = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const categoryName = name || "Sports";
  const articles = categoryArticles[categoryName as keyof typeof categoryArticles] || categoryArticles.Sports;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-6 py-4 bg-background border-b border-border flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">{categoryName}</h1>
      </div>

      {/* Articles */}
      <div className="px-6 py-6 space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate("/article")}
            className="bg-white rounded-3xl overflow-hidden border border-border cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 bg-muted flex items-center justify-center">
              <div className="text-muted-foreground">Article Image</div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground leading-tight">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {article.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-16 px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
            <HomeIcon className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1">
            <User className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/reels")} className="flex flex-col items-center gap-1">
            <Video className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
