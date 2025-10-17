import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  languageLabels: string;
  status: "Active" | "Inactive";
  visibility: boolean;
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Politics",
    languageLabels: "English: Politics, Hindi: राजनीति, Bengali: রাজনীতি",
    status: "Active",
    visibility: true,
  },
  {
    id: 2,
    name: "Sports",
    languageLabels: "English: Sports, Hindi: खेल, Bengali: ক্রীড়া",
    status: "Inactive",
    visibility: true,
  },
  {
    id: 3,
    name: "Business",
    languageLabels: "English: Business, Hindi: व्यापार, Bengali: ব্যবসা",
    status: "Active",
    visibility: true,
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", languageLabels: "" });

  const handleAddCategory = () => {
    if (formData.name && formData.languageLabels) {
      const newCategory: Category = {
        id: categories.length + 1,
        name: formData.name,
        languageLabels: formData.languageLabels,
        status: "Active",
        visibility: true,
      };
      setCategories([...categories, newCategory]);
      setFormData({ name: "", languageLabels: "" });
      setIsAddOpen(false);
    }
  };

  const handleEditCategory = () => {
    if (selectedCategory && formData.name && formData.languageLabels) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id
            ? { ...cat, name: formData.name, languageLabels: formData.languageLabels }
            : cat
        )
      );
      setFormData({ name: "", languageLabels: "" });
      setIsEditOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const toggleVisibility = (id: number) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, visibility: !cat.visibility } : cat
      )
    );
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, languageLabels: category.languageLabels });
    setIsEditOpen(true);
  };

  const openAddDialog = () => {
    setFormData({ name: "", languageLabels: "" });
    setIsAddOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <Button onClick={openAddDialog} className="rounded-full">
            + Add Category
          </Button>
        </div>

        <div className="bg-card rounded-lg border">
          <div className="grid grid-cols-[2fr,3fr,1fr,1fr,1fr] gap-4 p-4 border-b bg-muted/50 font-semibold">
            <div>Category Name</div>
            <div>Language Labels</div>
            <div>Status</div>
            <div>Visibility</div>
            <div>Actions</div>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-[2fr,3fr,1fr,1fr,1fr] gap-4 p-4 border-b items-center"
            >
              <div className="font-medium">{category.name}</div>
              <div className="text-sm text-muted-foreground">{category.languageLabels}</div>
              <div>
                <Badge variant={category.status === "Active" ? "default" : "secondary"}
                  className={category.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}>
                  {category.status}
                </Badge>
              </div>
              <div>
                <Switch
                  checked={category.visibility}
                  onCheckedChange={() => toggleVisibility(category.id)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditDialog(category)}
                  className="text-foreground hover:text-primary"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language-labels">Language Labels</Label>
              <Input
                id="language-labels"
                placeholder="Enter language labels"
                value={formData.languageLabels}
                onChange={(e) => setFormData({ ...formData, languageLabels: e.target.value })}
              />
            </div>
            <Button onClick={handleAddCategory} className="w-auto px-8 rounded-full">
              Add Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name">Category Name</Label>
              <Input
                id="edit-category-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-language-labels">Language Labels</Label>
              <Input
                id="edit-language-labels"
                value={formData.languageLabels}
                onChange={(e) => setFormData({ ...formData, languageLabels: e.target.value })}
              />
            </div>
            <Button onClick={handleEditCategory} className="w-auto px-8 rounded-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
