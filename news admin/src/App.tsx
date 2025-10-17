import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllNewsList from "./pages/AllNewsList";
import AddNews from "./pages/AddNews";
import EditNews from "./pages/EditNews";
import ViewNews from "./pages/ViewNews";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import AddReel from "./pages/AddReel";
import EditReel from "./pages/EditReel";
import ViewReel from "./pages/ViewReel";
import AllReelsList from "./pages/AllReelsList";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import PushNotifications from "./pages/PushNotifications";
import PastNotifications from "./pages/PastNotifications";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-news" element={<AllNewsList />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/edit-news/:id" element={<EditNews />} />
          <Route path="/view-news/:id" element={<ViewNews />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/add-reel" element={<AddReel />} />
          <Route path="/edit-reel/:id" element={<EditReel />} />
          <Route path="/view-reel/:id" element={<ViewReel />} />
          <Route path="/all-reels" element={<AllReelsList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/block-users" element={<Dashboard />} />
          <Route path="/push-notifications" element={<PushNotifications />} />
          <Route path="/past-notifications" element={<PastNotifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
