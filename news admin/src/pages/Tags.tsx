import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

interface Tag {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  dateCreated: string;
}

const initialTags: Tag[] = [
  { id: 1, name: "Breaking", status: "Active", dateCreated: "2023-10-01" },
  { id: 2, name: "Trending", status: "Inactive", dateCreated: "2023-09-15" },
  { id: 3, name: "Elections", status: "Active", dateCreated: "2023-08-20" },
];

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState("");

  const handleAddTag = () => {
    if (tagName.trim()) {
      const newTag: Tag = {
        id: tags.length + 1,
        name: tagName,
        status: "Active",
        dateCreated: new Date().toISOString().split("T")[0],
      };
      setTags([...tags, newTag]);
      setTagName("");
      setIsAddOpen(false);
    }
  };

  const handleEditTag = () => {
    if (selectedTag && tagName.trim()) {
      setTags(tags.map((tag) => (tag.id === selectedTag.id ? { ...tag, name: tagName } : tag)));
      setTagName("");
      setIsEditOpen(false);
      setSelectedTag(null);
    }
  };

  const handleDelete = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const openEditDialog = (tag: Tag) => {
    setSelectedTag(tag);
    setTagName(tag.name);
    setIsEditOpen(true);
  };

  const openAddDialog = () => {
    setTagName("");
    setIsAddOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Tags</h1>
          <Button onClick={openAddDialog} className="rounded-full">
            + Add Tag
          </Button>
        </div>

        <div className="bg-card rounded-lg border">
          <div className="grid grid-cols-[3fr,2fr,2fr,1fr] gap-4 p-4 border-b bg-muted/50 font-semibold">
            <div>Tag Name</div>
            <div>Status</div>
            <div>Date Created</div>
            <div>Actions</div>
          </div>

          {tags.map((tag) => (
            <div
              key={tag.id}
              className="grid grid-cols-[3fr,2fr,2fr,1fr] gap-4 p-4 border-b items-center"
            >
              <div className="font-medium">{tag.name}</div>
              <div>
                <Badge
                  variant={tag.status === "Active" ? "default" : "secondary"}
                  className={
                    tag.status === "Active"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }
                >
                  {tag.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">{tag.dateCreated}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditDialog(tag)}
                  className="text-primary hover:text-primary/80"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="text-primary hover:text-destructive"
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
            <DialogTitle>Add New Tag</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name">Enter tag name</Label>
              <Input
                id="tag-name"
                placeholder="Enter tag name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button onClick={handleAddTag} className="rounded-full">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-tag-name">Edit tag name</Label>
              <Input
                id="edit-tag-name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button onClick={handleEditTag} className="rounded-full">
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
