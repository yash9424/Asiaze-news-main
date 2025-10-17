import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

const PushNotifications = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    link: "",
    audience: "all",
    category: "",
    language: "",
    timing: "now"
  });

  const [pastNotifications] = useState([
    {
      title: "New Update Released",
      audience: "All Users",
      status: "Sent",
      dateTime: "2023-10-25 14:30"
    },
    {
      title: "Election Updates",
      audience: "Politics",
      status: "Scheduled",
      dateTime: "2023-10-26 09:00"
    },
    {
      title: "Sports Highlights",
      audience: "Sports",
      status: "Draft",
      dateTime: "2023-10-24 17:00"
    },
    {
      title: "Tech News",
      audience: "Technology",
      status: "Sent",
      dateTime: "2023-10-23 11:45"
    },
    {
      title: "Finance Tips",
      audience: "Finance",
      status: "Sent",
      dateTime: "2023-10-22 08:20"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending notification:", formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent": return "text-green-600";
      case "Scheduled": return "text-blue-600";
      case "Draft": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Notification Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Notification</h1>
            
            <div className="bg-white rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full"
                  />
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="Message Body (max 200 chars)"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    maxLength={200}
                    className="w-full min-h-[100px] resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {formData.message.length}/200
                  </div>
                </div>

                <div>
                  <Input
                    placeholder="Link (optional)"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Audience Selector</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="all" 
                        name="audience" 
                        value="all"
                        checked={formData.audience === "all"}
                        onChange={(e) => setFormData({...formData, audience: e.target.value})}
                      />
                      <Label htmlFor="all">All Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="category" 
                        name="audience" 
                        value="category"
                        checked={formData.audience === "category"}
                        onChange={(e) => setFormData({...formData, audience: e.target.value})}
                      />
                      <Label htmlFor="category">By Category</Label>
                    </div>
                  </div>
                  
                  
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Politics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input type="radio" id="language" name="selector" />
                    <Label htmlFor="language">By Language</Label>
                  </div>
                  <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="EN" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">EN</SelectItem>
                      <SelectItem value="es">ES</SelectItem>
                      <SelectItem value="fr">FR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex space-x-6 mb-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="now" 
                        name="timing" 
                        value="now"
                        checked={formData.timing === "now"}
                        onChange={(e) => setFormData({...formData, timing: e.target.value})}
                      />
                      <Label htmlFor="now">Send Now</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="later" 
                        name="timing" 
                        value="later"
                        checked={formData.timing === "later"}
                        onChange={(e) => setFormData({...formData, timing: e.target.value})}
                      />
                      <Label htmlFor="later">Schedule for Later</Label>
                    </div>
                  </div>
                  
                  
                  <Input
                    type="input"
                    className="w-full mt-2"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6"
                  >
                    Send Notification
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6"
                  >
                    Save as Draft
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Past Notifications Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Past Notifications</h1>
            
            <div className="bg-white rounded-lg">
              <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-semibold text-gray-700 text-sm">
                <div>Title</div>
                <div>Audience</div>
                <div>Status</div>
                <div>Date & Time</div>
                <div>Actions</div>
              </div>
              
              {pastNotifications.map((notification, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 text-sm">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-gray-600">{notification.audience}</div>
                  <div className={getStatusColor(notification.status)}>{notification.status}</div>
                  <div className="text-gray-600">{notification.dateTime}</div>
                  <div className="space-y-1">
                    <div className="text-blue-600 cursor-pointer hover:underline">View Resend</div>
                    <div className="text-red-600 cursor-pointer hover:underline">Delete</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PushNotifications;