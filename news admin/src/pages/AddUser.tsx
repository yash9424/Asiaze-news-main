import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding user:", formData);
    navigate("/users");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New User</h1>
        
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
                  required
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
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            {/* Second Row - Role, Status */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
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
              <div></div>
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
                Add User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddUser;