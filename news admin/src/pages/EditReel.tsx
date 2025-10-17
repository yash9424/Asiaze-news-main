import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function EditReel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("Current Reel Title");
  const [caption, setCaption] = useState("Current summary text, limited to 60 words.");
  const [fullArticleLink, setFullArticleLink] = useState("https://currentarticlelink.com");
  const [category, setCategory] = useState("Current Category");
  const [language, setLanguage] = useState("EN");
  const [tags, setTags] = useState<string[]>(["Tag1", "Tag2", "Tag3"]);
  const [sourceName, setSourceName] = useState("Current Source Name");
  const [duration, setDuration] = useState("00:02:30");
  const [featured, setFeatured] = useState(true);
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpdate = () => {
    // Handle update logic
    navigate("/all-reels");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Reel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Reel Title/Headline</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Summary/Caption</Label>
              <Textarea
                id="caption"
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full-article-link">Full Article Link</Label>
              <Input
                id="full-article-link"
                value={fullArticleLink}
                onChange={(e) => setFullArticleLink(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={category} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder={language} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EN">EN</SelectItem>
                  <SelectItem value="HI">HI</SelectItem>
                  <SelectItem value="BN">BN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Current Video</Label>
              <div className="bg-muted rounded-lg p-12 text-center">
                <p className="text-muted-foreground">Video Preview</p>
              </div>
              <Button variant="default" className="w-full rounded-full">
                Replace Video
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Current Thumbnail</Label>
              <div className="bg-muted rounded-lg p-12 text-center">
                <p className="text-muted-foreground">Thumbnail Preview</p>
              </div>
              <Button variant="default" className="w-full rounded-full">
                Replace Thumbnail
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-name">Source Name</Label>
              <Input
                id="source-name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Featured/Breaking</Label>
              <Switch checked={featured} onCheckedChange={setFeatured} />
            </div>

            <div className="flex items-center justify-between">
              <Label>Enable Comments</Label>
              <Switch checked={commentsEnabled} onCheckedChange={setCommentsEnabled} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate("/all-reels")} className="rounded-full px-8">
            Cancel
          </Button>
          <Button onClick={handleUpdate} className="rounded-full px-8">
            Update
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
