import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Reel {
  id: number;
  headline: string;
  category: string;
  language: string;
  status: "Published" | "Draft";
  views: number;
  likes: number;
  dateCreated: string;
}

const initialReels: Reel[] = [
  {
    id: 1,
    headline: "Exciting Reel Headline...",
    category: "Entertainment",
    language: "EN",
    status: "Published",
    views: 1234,
    likes: 567,
    dateCreated: "2023-10-01",
  },
  {
    id: 2,
    headline: "Quarterly Finance Update...",
    category: "Finance",
    language: "EN",
    status: "Draft",
    views: 892,
    likes: 234,
    dateCreated: "2023-09-28",
  },
  {
    id: 3,
    headline: "Breaking News: Market Trends...",
    category: "Finance",
    language: "HIN",
    status: "Draft",
    views: 456,
    likes: 789,
    dateCreated: "2023-09-15",
  },
  {
    id: 4,
    headline: "Political Debate Highlights...",
    category: "Politics",
    language: "BEN",
    status: "Published",
    views: 345,
    likes: 789,
    dateCreated: "2023-09-25",
  },
];

export default function AllReelsList() {
  const navigate = useNavigate();
  const [reels, setReels] = useState<Reel[]>(initialReels);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedReels, setSelectedReels] = useState<number[]>([]);

  const toggleSelectReel = (id: number) => {
    setSelectedReels((prev) =>
      prev.includes(id) ? prev.filter((reelId) => reelId !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: number) => {
    setReels(reels.filter((reel) => reel.id !== id));
  };

  const handleBulkPublish = () => {
    setReels(
      reels.map((reel) =>
        selectedReels.includes(reel.id) ? { ...reel, status: "Published" as const } : reel
      )
    );
    setSelectedReels([]);
  };

  const handleBulkUnpublish = () => {
    setReels(
      reels.map((reel) =>
        selectedReels.includes(reel.id) ? { ...reel, status: "Draft" as const } : reel
      )
    );
    setSelectedReels([]);
  };

  const handleBulkDelete = () => {
    setReels(reels.filter((reel) => !selectedReels.includes(reel.id)));
    setSelectedReels([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Reels – All Reels</h1>
          <Button onClick={() => navigate("/add-reel")} className="rounded-full">
            + Add Reel
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search reels by headline or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
            </SelectContent>
          </Select>
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="hi">HI</SelectItem>
              <SelectItem value="bn">BN</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border">
          <div className="grid grid-cols-[50px,2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 p-4 border-b bg-muted/50 font-semibold">
            <div></div>
            <div>Reel Headline</div>
            <div>Category</div>
            <div>Language</div>
            <div>Status</div>
            <div>Views Count</div>
            <div>Likes Count</div>
            <div>Date Created</div>
            <div>Actions</div>
          </div>

          {reels.map((reel) => (
            <div
              key={reel.id}
              className="grid grid-cols-[50px,2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 p-4 border-b items-center"
            >
              <div>
                <Checkbox
                  checked={selectedReels.includes(reel.id)}
                  onCheckedChange={() => toggleSelectReel(reel.id)}
                />
              </div>
              <div className="text-primary font-medium hover:underline cursor-pointer">
                {reel.headline}
              </div>
              <div className="text-sm">{reel.category}</div>
              <div className="text-sm">{reel.language}</div>
              <div>
                <Badge
                  variant={reel.status === "Published" ? "default" : "secondary"}
                  className={
                    reel.status === "Published"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }
                >
                  {reel.status}
                </Badge>
              </div>
              <div className="text-sm">{reel.views.toLocaleString()}</div>
              <div className="text-sm">{reel.likes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{reel.dateCreated}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-reel/${reel.id}`)}
                  className="text-foreground hover:text-primary"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate(`/view-reel/${reel.id}`)}
                  className="text-foreground hover:text-primary"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(reel.id)}
                  className="text-foreground  hover:text-destructive"
                >
                      <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedReels.length > 0 && (
          <div className="flex gap-4 justify-end">
            <Button onClick={handleBulkPublish} className="rounded-full">
              Publish
            </Button>
            <Button onClick={handleBulkUnpublish} variant="outline" className="rounded-full">
              Unpublish
            </Button>
            <Button onClick={handleBulkDelete} variant="outline" className="rounded-full">
              Delete
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
