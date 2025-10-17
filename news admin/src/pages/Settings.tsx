import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    logoUpload: "",
    contactEmail: "",
    footerText: "",
    defaultLanguage: "EN",
    enableLanguage: true,
    privacyPolicy: "",
    termsConditions: "",
    aboutUs: "",
    notificationTone: "",
    deliveryType: "Immediate"
  });

  const adminUsers = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Super Admin",
      status: "Active"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings saved:", formData);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        
        {/* Tab Names */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
          <div className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm whitespace-nowrap">
            General Settings
          </div>
          <div className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 whitespace-nowrap">
            Language Settings
          </div>
          <div className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 whitespace-nowrap">
            Policies & Static Pages
          </div>
          <div className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 whitespace-nowrap">
            Admin Users Management
          </div>
          <div className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 whitespace-nowrap">
            Notifications Defaults
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border space-y-8">
          {/* General Settings */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">General Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Site/App Name</Label>
                <Input
                  value={formData.siteName}
                  onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Contact Email</Label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Logo Upload</Label>
              <Input type="file" className="w-full" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Footer Text</Label>
              <Textarea
                value={formData.footerText}
                onChange={(e) => setFormData({...formData, footerText: e.target.value})}
                className="w-full min-h-[100px]"
              />
            </div>
          </div>

          {/* Language Settings */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Language Settings</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Default Language</Label>
                <Select value={formData.defaultLanguage} onValueChange={(value) => setFormData({...formData, defaultLanguage: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">EN</SelectItem>
                    <SelectItem value="ES">ES</SelectItem>
                    <SelectItem value="FR">FR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Enable/Disable Language</Label>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={formData.enableLanguage}
                    onCheckedChange={(checked) => setFormData({...formData, enableLanguage: checked})}
                  />
                  <div className={`w-3 h-3 rounded-full ${formData.enableLanguage ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Policies & Static Pages */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Policies & Static Pages</h2>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Privacy Policy</Label>
              <Textarea
                value={formData.privacyPolicy}
                onChange={(e) => setFormData({...formData, privacyPolicy: e.target.value})}
                className="w-full min-h-[120px]"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Terms & Conditions</Label>
              <Textarea
                value={formData.termsConditions}
                onChange={(e) => setFormData({...formData, termsConditions: e.target.value})}
                className="w-full min-h-[120px]"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">About Us</Label>
              <Textarea
                value={formData.aboutUs}
                onChange={(e) => setFormData({...formData, aboutUs: e.target.value})}
                className="w-full min-h-[120px]"
              />
            </div>
          </div>

          {/* Admin Users Management */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900">Admin Users Management</h2>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
                Add New Admin
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 gap-2 md:gap-4 p-2 md:p-4 border-b bg-gray-50 font-semibold text-gray-700 text-xs md:text-sm">
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
                <div className="text-center">Actions</div>
              </div>
              {adminUsers.map((user, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 md:gap-4 p-2 md:p-4 border-b border-gray-100 last:border-b-0">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-600">{user.email}</div>
                  <div className="text-gray-600">{user.role}</div>
                  <div className="text-gray-600">{user.status}</div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                    <Button variant="outline" size="sm" className="text-xs px-3 py-1">Edit</Button>
                    <Button variant="outline" size="sm" className="text-xs px-3 py-1 text-red-600 hover:text-red-700">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Defaults */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Notifications Defaults</h2>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Default Notification Tone</Label>
              <Textarea
                value={formData.notificationTone}
                onChange={(e) => setFormData({...formData, notificationTone: e.target.value})}
                className="w-full min-h-[100px]"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Default Delivery Type</Label>
              <Select value={formData.deliveryType} onValueChange={(value) => setFormData({...formData, deliveryType: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediate">Immediate</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

