import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Newspaper, Video, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const statsData = [
  { title: "Total Users", value: "1,234", icon: Users },
  { title: "Total Articles", value: "567", icon: Newspaper },
  { title: "Total Reels", value: "89", icon: Video },
  { title: "Total Bookmarks/Shares", value: "345", icon: Bookmark },
];

const dailyActiveUsersData = [
  { day: "Mon", current: 320, previous: 280 },
  { day: "Tue", current: 350, previous: 380 },
  { day: "Wed", current: 400, previous: 420 },
  { day: "Thu", current: 280, previous: 320 },
  { day: "Fri", current: 450, previous: 400 },
  { day: "Sat", current: 380, previous: 340 },
  { day: "Sun", current: 300, previous: 360 },
];

const engagementData = [
  { day: "1", articles: 45, videos: 30 },
  { day: "2", articles: 52, videos: 38 },
  { day: "3", articles: 48, videos: 35 },
  { day: "4", articles: 61, videos: 42 },
  { day: "5", articles: 55, videos: 45 },
  { day: "6", articles: 67, videos: 38 },
  { day: "7", articles: 43, videos: 32 },
  { day: "8", articles: 49, videos: 41 },
  { day: "9", articles: 58, videos: 44 },
  { day: "10", articles: 53, videos: 37 },
  { day: "11", articles: 72, videos: 51 },
  { day: "12", articles: 65, videos: 46 },
];

const latestNews = [
  { title: "News Title", id: 1 },
  { title: "News Title", id: 2 },
  { title: "News Title", id: 3 },
  { title: "News Title", id: 4 },
  { title: "News Title", id: 5 },
];

const latestReels = [
  { title: "Reel Title 1", id: 1 },
  { title: "Reel Title 2", id: 2 },
  { title: "Reel Title 3", id: 3 },
  { title: "Reel Title 4", id: 4 },
  { title: "Reel Title 5", id: 5 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl md:text-3xl font-bold text-primary">Welcome Admin, here's today's overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyActiveUsersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Line type="monotone" dataKey="current" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <Line type="monotone" dataKey="previous" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article/Video Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Bar dataKey="articles" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="videos" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Latest Entries */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest News Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {latestNews.map((news) => (
                  <div key={news.id} className="flex items-center justify-between">
                    <span className="text-sm">{news.title}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Reels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {latestReels.map((reel) => (
                  <div key={reel.id} className="flex items-center justify-between">
                    <span className="text-sm">{reel.title}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
