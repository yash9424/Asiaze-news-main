import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Bell, Search, Home, User, Video } from "lucide-react";
import { Input } from "@/components/ui/input";

const articles = [
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
    title: "Thrilling Soccer Match Concludes with Dramatic Finale",
    description: "A match that kept fans on the edge of their seats...",
    source: "ESPN",
    time: "2 hours ago",
    image: "/Group 10.png",
  },
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const article = articles.find(a => a.id === Number(articleId)) || articles[0];
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [hasResults] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center gap-2 sm:gap-3">
        <button onClick={() => navigate("/search")}>
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <form onSubmit={handleSearch} className="flex-1">
          <Input
            type="text"
            placeholder="User's search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 sm:h-12 rounded-full px-4 sm:px-6 bg-white border-border text-sm sm:text-base"
          />
        </form>
        <button onClick={() => navigate("/notifications")}>
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </button>
      </div>

      {hasResults ? (
        <div className="flex flex-col min-h-[calc(100vh-180px)]">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div
              onClick={() => navigate("/article")}
              className="bg-white rounded-3xl overflow-hidden border border-border cursor-pointer"
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
          </div>
          <div className="flex-1 flex flex-col justify-end items-center pb-6">
            <img src="/Group 11.png" alt="Advertisement" className="w-40 sm:w-48 h-auto" />
            <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4">No results found</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6">
          <div className="w-48 h-48 mb-8 flex items-center justify-center">
            <div className="text-muted-foreground text-6xl">🔍</div>
          </div>
          <p className="text-muted-foreground text-lg">No results found</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
          </button>
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
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

export default SearchResults;
