import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Settings, MapPin, Search, Home as HomeIcon, User, Video, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 sm:left-6">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          AB
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Alex Brown</h2>
        <p className="text-sm sm:text-base text-muted-foreground">alex.brown@example.com</p>
      </div>

      {/* Menu Items */}
      <div className="px-4 sm:px-6 space-y-1 flex-1">
        <button
          onClick={() => navigate("/saved-articles")}
          className="w-full bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-border flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base text-foreground font-medium">Saved Articles</span>
        </button>

        <button
          onClick={() => navigate("/rewards")}
          className="w-full bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-border flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base text-foreground font-medium">Reward Points</span>
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="w-full bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-border flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base text-foreground font-medium">Settings</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-border flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-foreground font-medium">Your State :</span>
            <span className="text-sm sm:text-base text-primary font-semibold">West Bengal</span>
          </div>
        </button>
      </div>

      {/* Logout Button */}
      <div className="px-4 sm:px-6 pb-6 pt-8">
        <Button
          onClick={() => navigate("/login")}
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full"
        >
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
          </button>
          <button onClick={() => navigate("/reels")} className="flex flex-col items-center gap-1">
            <Video className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
