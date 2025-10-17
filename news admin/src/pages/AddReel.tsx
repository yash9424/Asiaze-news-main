import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Upload } from "lucide-react";

export default function AddReel() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [fullArticleLink, setFullArticleLink] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState<string[]>(["#Politics", "#Finance", "#Entertainment"]);
  const [featured, setFeatured] = useState(true);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setVideoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = () => {
    // Handle publish logic
    navigate("/all-reels");
  };

  const handleSaveDraft = () => {
    // Handle save draft logic
    navigate("/all-reels");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Add Reel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Reel Title/Headline</Label>
              <Input
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Summary/Caption</Label>
              <Textarea
                id="caption"
                placeholder="Enter summary"
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full-article-link">Full Article Link</Label>
              <Input
                id="full-article-link"
                placeholder="Enter URL"
                value={fullArticleLink}
                onChange={(e) => setFullArticleLink(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Politics" />
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
                  <SelectValue placeholder="EN" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="hi">HI</SelectItem>
                  <SelectItem value="bn">BN</SelectItem>
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
              <Label>Upload Video</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {videoPreview ? (
                  <div className="space-y-2">
                    <video src={videoPreview} className="w-full max-h-64 object-cover rounded" controls />
                    <Button variant="outline" onClick={() => setVideoPreview(null)}>
                      Remove Video
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Drag & drop video here or click to browse</p>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Thumbnail (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {thumbnailPreview ? (
                  <div className="space-y-2">
                    <img src={thumbnailPreview} alt="Thumbnail" className="w-full max-h-32 object-cover rounded" />
                    <Button variant="outline" onClick={() => setThumbnailPreview(null)}>
                      Remove Thumbnail
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload thumbnail</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Featured</Label>
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
          <Button variant="outline" onClick={handleSaveDraft} className="rounded-full px-8">
            Save Draft
          </Button>
          <Button onClick={handlePublish} className="rounded-full px-8">
            Publish
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
