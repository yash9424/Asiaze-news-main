import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, Home as HomeIcon, User, Video } from "lucide-react";

const sportsArticles = [
  {
    id: 1,
    title: "Thrilling Soccer Match Concludes with Dramatic Finale",
    description: "A match that kept fans on the edge of their seats...",
    source: "ESPN",
    time: "2 hours ago",
    image: "/Group 9.png",
  },
  {
    id: 2,
    title: "Formula 1: A Race to Remember in Monaco",
    description: "The streets of Monaco witnessed a spectacular race...",
    source: "BBC Sport",
    time: "3 hours ago",
    image: "/Group 10.png",
  },
  {
    id: 3,
    title: "Grand Slam Victory: Tennis Prodigy Shines Bright",
    description: "Young talent takes the world by storm with a stunning victory...",
    source: "Reuters",
    time: "5 hours ago",
    image: "/Group 12.png",
  },
];

const Sports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 sm:left-6">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Sports</h1>
      </div>

      {/* Articles */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
        {sportsArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate("/article")}
            className="bg-white rounded-3xl overflow-hidden border border-border cursor-pointer hover:shadow-md transition-shadow"
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
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </button>
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
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

export default Sports;


