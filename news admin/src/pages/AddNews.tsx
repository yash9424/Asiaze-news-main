import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function AddNews() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="headline" className="text-base font-semibold">
                  Headline
                </Label>
                <Input
                  id="headline"
                  placeholder="Enter headline (max 100 chars)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="summary" className="text-base font-semibold">
                  Summary
                </Label>
                <Textarea
                  id="summary"
                  placeholder="Enter summary (max ~60 words)"
                  className="mt-2 min-h-32"
                />
                <p className="text-sm text-muted-foreground mt-1">0/60 words</p>
              </div>

              <div>
                <Label htmlFor="article-link" className="text-base font-semibold">
                  Full Article Link
                </Label>
                <Input
                  id="article-link"
                  placeholder="Enter full article link"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-semibold">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Politics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language" className="text-base font-semibold">
                  Language
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="EN" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="hin">HIN</SelectItem>
                    <SelectItem value="ben">BEN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags" className="text-base font-semibold">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Type to add tags"
                  className="mt-2"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upload & Metadata */}
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Upload Image</Label>
              <Card className="mt-2">
                <CardContent className="p-6">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-muted rounded">
                      <div className="text-center text-muted-foreground">
                        <Upload className="mx-auto h-12 w-12 mb-2" />
                        <p className="text-sm">No image uploaded</p>
                      </div>
                    </div>
                  )}
                  <label htmlFor="image-upload">
                    <Button className="w-full mt-4" asChild>
                      <span>Upload/Replace Image</span>
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Label htmlFor="source" className="text-base font-semibold">
                Source
              </Label>
              <Input
                id="source"
                placeholder="Enter source"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="timestamp" className="text-base font-semibold">
                Timestamp
              </Label>
              <Input
                id="timestamp"
                type="datetime-local"
                defaultValue="2023-10-05T10:30"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="secondary">Save as Draft</Button>
          <Button>Publish</Button>
          <Button variant="outline">Cancel</Button>
          
        </div>
      </div>
    </DashboardLayout>
  );
}
