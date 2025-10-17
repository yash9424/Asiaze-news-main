import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAndroidBackButton } from "./hooks/useAndroidBackButton";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Preferences from "./pages/Preferences";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import Reels from "./pages/Reels";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SavedArticles from "./pages/SavedArticles";
import Category from "./pages/Category";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import Sports from "./pages/Sports";
import TechTrends from "./pages/TechTrends";
import Rewards from "./pages/Rewards";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useAndroidBackButton();
  
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/reels" element={<Reels />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/saved-articles" element={<SavedArticles />} />
      <Route path="/category/:name" element={<Category />} />
      <Route path="/article" element={<Article />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/tech-trends" element={<TechTrends />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
