import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function EditNews() {
  const [tags, setTags] = useState<string[]>(["Breaking", "World", "Local"]);
  const [imagePreview] = useState("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df");

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">Edit News</h1>

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
                  defaultValue="Pre-filled Headline"
                  placeholder="Enter headline (max 100 chars)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="summary" className="text-base font-semibold">
                  Summary <span className="font-normal text-muted-foreground">(60 words max)</span>
                </Label>
                <Textarea
                  id="summary"
                  defaultValue="Pre-filled summary text with word counter visible."
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
                  defaultValue="https://existing-article-link.com"
                  placeholder="Enter full article link"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-semibold">
                  Category
                </Label>
                <Select defaultValue="politics">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
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
                <Select defaultValue="en">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={tag === "Breaking" ? "bg-primary" : "bg-muted text-foreground"}
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upload & Metadata */}
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Current Image</Label>
              <Card className="mt-2">
                <CardContent className="p-0">
                  <img
                    src={imagePreview}
                    alt="Current news"
                    className="w-full h-48 object-cover rounded-t"
                  />
                  <div className="p-4">
                    <Button className="w-full">Replace Image</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Label htmlFor="source" className="text-base font-semibold">
                Source
              </Label>
              <Input
                id="source"
                defaultValue="Existing Source"
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
                defaultValue="2023-10-14T10:00"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button>Update</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
