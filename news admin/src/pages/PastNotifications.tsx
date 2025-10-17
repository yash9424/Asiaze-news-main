import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

const PastNotifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Notification Title 1",
      audience: "All Users",
      status: "Sent",
      dateTime: "2023-10-01 10:00 AM",
      sentBy: "admin123"
    },
    {
      id: 2,
      title: "Notification Title 2",
      audience: "Category Name",
      status: "Scheduled",
      dateTime: "2023-10-02 11:00 AM",
      sentBy: "admin456"
    },
    {
      id: 3,
      title: "Notification Title 3",
      audience: "Language",
      status: "Draft",
      dateTime: "2023-10-03 12:00 PM",
      sentBy: "admin789"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">Sent</span>;
      case "Scheduled":
        return <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">Scheduled</span>;
      case "Draft":
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">Draft</span>;
      default:
        return <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Past Notifications</h1>
          
          <div className="flex gap-4">
            <Input
              placeholder="Search notifications by title..."
              className="w-64"
            />
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Audience: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="users">All Users</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="language">Language</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status: Sent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-semibold text-gray-700">
            <div>Title</div>
            <div>Audience</div>
            <div>Status</div>
            <div>Date & Time</div>
            <div>Sent By</div>
            <div>Actions</div>
          </div>
          
          {notifications.map((notification) => (
            <div key={notification.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center">
              <div className="font-medium text-gray-900">{notification.title}</div>
              <div className="text-gray-600">{notification.audience}</div>
              <div>{getStatusBadge(notification.status)}</div>
              <div className="text-gray-600">{notification.dateTime}</div>
              <div className="text-gray-600">{notification.sentBy}</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50">
                  <Eye className="h-4 w-4 text-blue-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-50">
                  <RotateCcw className="h-4 w-4 text-green-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PastNotifications;