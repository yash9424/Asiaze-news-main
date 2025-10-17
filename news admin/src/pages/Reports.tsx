import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck, FileText, Video } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

const Reports = () => {
  const topArticles = [
    { title: "Breaking News", views: "1,234", likes: "567", shares: "98" },
    { title: "Tech Innovations", views: "1,000", likes: "450", shares: "123" },
    { title: "Market Updates", views: "950", likes: "400", shares: "110" }
  ];

  const topReels = [
    { title: "Viral Dance", views: "5,678", likes: "2,345", comments: "1,234" },
    { title: "Funny Pets", views: "4,500", likes: "2,100", comments: "1,000" },
    { title: "Cooking Hacks", views: "4,000", likes: "1,800", comments: "900" }
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Active Users</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">567</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Total Articles</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">89</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Video className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Total Reels</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 300 150">
                {/* Y-axis */}
                <line x1="20" y1="20" x2="20" y2="140" stroke="#374151" strokeWidth="1"/>
                {/* X-axis */}
                <line x1="20" y1="140" x2="280" y2="140" stroke="#374151" strokeWidth="1"/>
                
                {/* Y-axis labels */}
                <text x="15" y="25" fontSize="10" fill="#6b7280" textAnchor="end">1000</text>
                <text x="15" y="50" fontSize="10" fill="#6b7280" textAnchor="end">800</text>
                <text x="15" y="75" fontSize="10" fill="#6b7280" textAnchor="end">600</text>
                <text x="15" y="100" fontSize="10" fill="#6b7280" textAnchor="end">400</text>
                <text x="15" y="125" fontSize="10" fill="#6b7280" textAnchor="end">200</text>
                <text x="15" y="145" fontSize="10" fill="#6b7280" textAnchor="end">0</text>
                
                {/* X-axis labels */}
                <text x="50" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">Jan</text>
                <text x="100" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">Mar</text>
                <text x="150" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">May</text>
                <text x="200" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">Jul</text>
                <text x="250" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">Sep</text>
                
                {/* Gray upward trending line */}
                <path d="M 20 130 L 40 125 L 60 120 L 80 115 L 100 110 L 120 105 L 140 100 L 160 95 L 180 90 L 200 85 L 220 80 L 240 75 L 260 70 L 280 65" 
                      fill="none" stroke="#9ca3af" strokeWidth="2"/>
                
                {/* Red fluctuating line */}
                <path d="M 20 140 L 40 135 L 60 130 L 80 135 L 100 125 L 120 130 L 140 120 L 160 125 L 180 115 L 200 120 L 220 110 L 240 115 L 260 105 L 280 110" 
                      fill="none" stroke="#ef4444" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement by Content Type</h3>
            <div className="h-48 relative">
              <div className="absolute left-16 top-4 right-4 bottom-8 flex flex-col justify-center space-y-3">
                <div className="flex items-center">
                  <div className="bg-gray-400 h-6 w-20"></div>
                  <div className="bg-red-500 h-6 w-40"></div>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-400 h-6 w-20"></div>
                  <div className="bg-red-500 h-6 w-2"></div>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-400 h-6 w-20"></div>
                  <div className="bg-red-500 h-6 w-24"></div>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-400 h-6 w-20"></div>
                  <div className="bg-red-500 h-6 w-32"></div>
                </div>
              </div>
              {/* Y-axis labels */}
              <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-center space-y-3 text-xs text-gray-600">
                <span>Articles</span>
                <span>Videos</span>
                <span>Images</span>
                <span>Reels</span>
              </div>
              {/* X-axis labels */}
              <div className="absolute bottom-2 left-16 right-4 flex justify-between text-xs text-gray-600">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
            <div className="h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full" style={{
                  background: `conic-gradient(#ef4444 0deg 270deg, #9ca3af 270deg 360deg)`
                }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Distribution</h3>
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 300 150">
                {/* Y-axis */}
                <line x1="30" y1="20" x2="30" y2="120" stroke="#374151" strokeWidth="1"/>
                {/* X-axis */}
                <line x1="30" y1="120" x2="280" y2="120" stroke="#374151" strokeWidth="1"/>
                
                {/* Y-axis labels */}
                <text x="25" y="25" fontSize="10" fill="#6b7280" textAnchor="end">100</text>
                <text x="25" y="45" fontSize="10" fill="#6b7280" textAnchor="end">75</text>
                <text x="25" y="65" fontSize="10" fill="#6b7280" textAnchor="end">50</text>
                <text x="25" y="85" fontSize="10" fill="#6b7280" textAnchor="end">25</text>
                <text x="25" y="125" fontSize="10" fill="#6b7280" textAnchor="end">0</text>
                
                {/* Bars */}
                <rect x="40" y="60" width="12" height="60" fill="#9ca3af"/>
                <rect x="40" y="40" width="12" height="20" fill="#ef4444"/>
                
                <rect x="65" y="80" width="12" height="40" fill="#9ca3af"/>
                <rect x="65" y="70" width="12" height="10" fill="#ef4444"/>
                
                <rect x="90" y="60" width="12" height="60" fill="#9ca3af"/>
                <rect x="90" y="30" width="12" height="30" fill="#ef4444"/>
                
                <rect x="115" y="70" width="12" height="50" fill="#9ca3af"/>
                <rect x="115" y="45" width="12" height="25" fill="#ef4444"/>
                
                <rect x="140" y="75" width="12" height="45" fill="#9ca3af"/>
                <rect x="140" y="60" width="12" height="15" fill="#ef4444"/>
                
                <rect x="165" y="50" width="12" height="70" fill="#9ca3af"/>
                <rect x="165" y="115" width="12" height="5" fill="#ef4444"/>
                
                <rect x="190" y="75" width="12" height="45" fill="#9ca3af"/>
                <rect x="190" y="50" width="12" height="25" fill="#ef4444"/>
                
                <rect x="215" y="70" width="12" height="50" fill="#9ca3af"/>
                <rect x="215" y="55" width="12" height="15" fill="#ef4444"/>
                
                {/* X-axis labels */}
                <text x="46" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">EN</text>
                <text x="71" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">ES</text>
                <text x="96" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">FR</text>
                <text x="121" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">DE</text>
                <text x="146" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">IT</text>
                <text x="171" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">PT</text>
                <text x="196" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">RU</text>
                <text x="221" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">ZH</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Top 10 Articles</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Likes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shares</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topArticles.map((article, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{article.views}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{article.likes}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{article.shares}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Top 10 Reels</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Likes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topReels.map((reel, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{reel.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reel.views}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reel.likes}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reel.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex justify-end gap-3">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Export as PDF
          </Button>
          <Button variant="outline">
            Export as CSV
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;