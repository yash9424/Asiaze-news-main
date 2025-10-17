import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: true,
    dateRegistered: ""
  });

  const [loginHistory] = useState([
    { timestamp: "2023-10-10 10:00 AM", device: "Chrome on Windows 10" },
    { timestamp: "2023-09-28 09:45", device: "Safari on iOS" },
    { timestamp: "2023-09-20 14:30", device: "Firefox on MacOS" }
  ]);

  useEffect(() => {
    const mockUser = {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "1234567890",
      role: "User",
      status: false,
      dateRegistered: "2021-07-16"
    };
    setFormData(mockUser);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating user:", formData);
    navigate("/users");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile & Edit</h1>
        
        <div className="bg-white rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* First Row - Name, Email, Phone */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full"
                  placeholder="john.smith@example.com"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full"
                  placeholder="1234567890"
                />
              </div>
            </div>

            {/* Second Row - Role, Status, Date Registered */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Status</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                  />
                  <div className={`w-4 h-4 rounded-full ${formData.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Date Registered</Label>
                <Input
                  value={formData.dateRegistered}
                  readOnly
                  className="w-full bg-gray-50"
                  placeholder="2021-07-16"
                />
              </div>
            </div>

            {/* Login History Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Login History</h2>
              <div className="border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 py-3 font-medium text-gray-700">
                  <div>Timestamp</div>
                  <div>Device</div>
                </div>
                {loginHistory.map((login, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                    <div className="text-gray-600">{login.timestamp}</div>
                    <div className="text-gray-600">{login.device}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/users")}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditUser;