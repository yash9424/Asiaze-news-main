import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Home as HomeIcon, User, Video } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = ["My State", "Sports", "Business", "Technology", "Politics"];

const searchArticles = [
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

const Search = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("My State");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Bar */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background sticky top-0 z-10">
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 sm:h-12 rounded-full px-4 sm:px-6 bg-white border-border text-sm sm:text-base"
          />
        </form>
      </div>

      {/* Categories */}
      <div className="overflow-x-auto px-4 sm:px-6 pb-3 sm:pb-4 hide-scrollbar border-b border-border">
        <div className="flex gap-4 sm:gap-6 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                if (category === "Sports") navigate("/sports");
              }}
              className={`pb-2 whitespace-nowrap font-semibold text-sm sm:text-base transition-colors ${
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

      {/* Articles */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {searchArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate(`/search-results?id=${article.id}`)}
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
          <button className="flex flex-col items-center gap-1">
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

export default Search;
