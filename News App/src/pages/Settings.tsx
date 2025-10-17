import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Info, FileText, Bell, Languages, Search, Home as HomeIcon, User, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"EN" | "HIN" | "BEN">("EN");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 sm:left-6">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Language */}
      <div className="bg-white flex-1">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center gap-3">
          <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          <span className="text-sm sm:text-base text-foreground font-medium flex-1">Language</span>
          <div className="flex items-center gap-2">
            {(["EN", "HIN", "BEN"] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                className={`${
                  language === lng ? "bg-primary text-white" : "bg-muted text-foreground"
                } px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold`}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>

        {/* Category Preferences */}
        <button
          onClick={() => navigate("/preferences")}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center gap-3"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 text-foreground">{/* icon via CSS utility class from list style */}</div>
          <span className="text-sm sm:text-base text-foreground font-medium flex-1">Category Preferences</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </button>

        {/* Notifications */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center gap-3">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          <span className="text-sm sm:text-base text-foreground font-medium flex-1">Notifications</span>
          <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
        </div>

        {/* Privacy Policy */}
        <button className="w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center gap-3">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          <span className="text-sm sm:text-base text-foreground font-medium flex-1 text-left">Privacy Policy</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </button>

        {/* Terms & Conditions */}
        <button className="w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center gap-3">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          <span className="text-sm sm:text-base text-foreground font-medium flex-1 text-left">Terms & Conditions</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </button>

        {/* About Us */}
        <button className="w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex items-center gap-3">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          <span className="text-sm sm:text-base text-foreground font-medium flex-1 text-left">About Us</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Logout Button */}
      <div className="px-4 sm:px-6 pb-6 pt-4">
        <Button onClick={() => navigate("/login")} className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full">
          Logout
        </Button>
      </div>

      {/* Bottom Navigation (same as Profile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1">
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

export default Settings;


