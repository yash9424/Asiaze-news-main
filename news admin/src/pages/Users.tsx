import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const Users = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  
  // Mock data - replace with actual data from your API
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@example.com",
      phone: "+1234567890",
      role: "Admin",
      status: "Active",
      dateRegistered: "2023-05-12",
    },
    {
      id: 2,
      name: "Robert Smith",
      email: "robert.smith@email.com",
      phone: "+1234567890",
      role: "User",
      status: "Active",
      dateRegistered: "2023-04-15",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1987654321",
      role: "Moderator",
      status: "Blocked",
      dateRegistered: "2023-04-25",
    },
    {
      id: 4,
      name: "Samantha Green",
      email: "samantha.green@email.com",
      phone: "+1123456789",
      role: "User",
      status: "Inactive",
      dateRegistered: "2023-03-15",
    },
    {
      id: 5,
      name: "Emily Brown",
      email: "emily.brown@email.com",
      phone: "+1987654321",
      role: "User",
      status: "Active",
      dateRegistered: "2022-11-22",
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Manage Users</h1>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          onClick={() => navigate("/add-user")}
        >
          + Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <Input
            type="search"
            placeholder="Search by name, email, or phone..."
            className="w-full lg:max-w-md"
          />
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Select>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="User Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email/Phone</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date Registered</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{user.email}</div>
                    <div className="text-gray-500">{user.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.role === "Admin"
                        ? "bg-red-500 text-white"
                        : user.role === "Moderator"
                        ? "bg-gray-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.status === "Active"
                        ? "bg-green-500 text-white"
                        : user.status === "Blocked"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{user.dateRegistered}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <Eye className="h-4 w-4 text-black" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                    >
                      <Edit className="h-4 w-4 text-black" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t bg-gray-50 flex gap-2">
          <Button 
            variant="destructive" 
            size="sm"
            disabled={selectedUsers.length === 0}
            className="bg-red-600 hover:bg-red-700"
          >
            Block Users
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled={selectedUsers.length === 0}
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            Unblock Users
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            disabled={selectedUsers.length === 0}
            className="bg-red-700 hover:bg-red-800"
          >
            Delete Users
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="ml-auto bg-green-500 text-white hover:bg-green-600 border-green-500"
          >
            USER EXPORT
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
