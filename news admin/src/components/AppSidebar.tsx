import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Plus,
  List,
  Tag,
  Folder,
  Video,
  Users,
  UserCheck,
  Bell,
  Send,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClass = (active: boolean) =>
    active
      ? "bg-black text-white font-medium"
      : "text-white hover:bg-black hover:text-white";

  return (
    <Sidebar className="border-r-0" style={{backgroundColor: '#DC143C'}}>
      <SidebarContent className="scrollbar-hide overflow-y-auto" style={{backgroundColor: '#DC143C', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
        {/* Logo */}
        <div className="px-6 py-6 text-center">
          <img src="/White_Logo.png" alt="Asiaze" className="h-10 mx-auto" />
        </div>

        {/* Dashboard Overview */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={getNavClass(isActive("/dashboard"))}>
                <NavLink to="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard (overview)</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Manage News */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-white hover:bg-black hover:text-white">
                  <Newspaper className="h-4 w-4" />
                  <span>Manage News</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/add-news"))}>
                    <NavLink to="/add-news">
                      <Plus className="h-4 w-4" />
                      <span>Add News</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/all-news"))}>
                    <NavLink to="/all-news">
                      <List className="h-4 w-4" />
                      <span>All News List</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/categories"))}>
                    <NavLink to="/categories">
                      <Folder className="h-4 w-4" />
                      <span>Categories</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/tags"))}>
                    <NavLink to="/tags">
                      <Tag className="h-4 w-4" />
                      <span>Tags Management</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Manage Reels */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-white hover:bg-black hover:text-white">
                  <Video className="h-4 w-4" />
                  <span>Manage Reels</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/add-reel"))}>
                    <NavLink to="/add-reel">
                      <Plus className="h-4 w-4" />
                      <span>Add Reel</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/all-reels"))}>
                    <NavLink to="/all-reels">
                      <List className="h-4 w-4" />
                      <span>All Reels List</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Users Management */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-white hover:bg-black hover:text-white">
                  <Users className="h-4 w-4" />
                  <span>Users Management</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/users"))}>
                    <NavLink to="/users">
                      <Users className="h-4 w-4" />
                      <span>User List</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/block-users"))}>
                    <NavLink to="/block-users">
                      <UserCheck className="h-4 w-4" />
                      <span>Block/Unblock Users</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Notifications */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-white hover:bg-black hover:text-white">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/push-notifications"))}>
                    <NavLink to="/push-notifications">
                      <Send className="h-4 w-4" />
                      <span>Push Notifications</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={getNavClass(isActive("/past-notifications"))}>
                    <NavLink to="/past-notifications">
                      <Clock className="h-4 w-4" />
                      <span>Past Notifications</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Reports / Analytics */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={getNavClass(isActive("/reports"))}>
                <NavLink to="/reports">
                  <BarChart3 className="h-4 w-4" />
                  <span>Reports / Analytics</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Setting */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={getNavClass(isActive("/settings"))}>
                <NavLink to="/settings">
                  <Settings className="h-4 w-4" />
                  <span>Setting</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Footer */}
      <SidebarFooter className="border-t" style={{backgroundColor: '#DC143C', borderTopColor: '#B91C3C'}}>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-black hover:text-white"
              onClick={() => {
                // Handle logout
                console.log("Logout clicked");
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
