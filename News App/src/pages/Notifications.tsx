import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { Search, Home as HomeIcon, User, Video } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Breaking: Major policy update",
    time: "5m ago",
    isBreaking: true,
  },
  {
    id: 2,
    title: "New Sports Story available",
    time: "1h ago",
    isBreaking: false,
  },
  {
    id: 3,
    title: "Entertainment news: Celebrity interview",
    time: "2h ago",
    isBreaking: false,
  },
  {
    id: 4,
    title: "Finance update: Market trends",
    time: "3h ago",
    isBreaking: false,
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-b border-border flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 sm:left-6">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-border flex items-start gap-3 sm:gap-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <Bell
              className={`w-4 h-4 sm:w-5 sm:h-5 mt-1 ${
                notification.isBreaking ? "text-primary" : "text-foreground"
              }`}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {notification.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-14 sm:h-16 px-4 sm:px-6">
          <button onClick={() => navigate("/search")} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
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

export default Notifications;
