import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ViewNews() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - News Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Image */}
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
              alt="Breaking News"
              className="w-full h-96 object-cover rounded-lg"
            />

            {/* Article Title */}
            <h1 className="text-3xl font-bold">Breaking News: Major Event in the City</h1>

            {/* Article Summary */}
            <p className="text-muted-foreground leading-relaxed">
              This is a short summary of the news article, providing a brief overview of the major
              event happening in the city, limited to approximately 60 words to give a quick insight
              for readers.
            </p>

            {/* Tap to open indicator */}
            <div className="flex items-center gap-4 py-4 border-y">
              <span className="text-sm text-muted-foreground ">
                Tap to open full article
              </span>
              <Bookmark className="h-5 w-5 text-muted-foreground ml-auto" />
              <Share2 className="h-5 w-5 text-muted-foreground" />

            </div>
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Headline</h3>
                  <p className="text-muted-foreground">Breaking News: Major Event in the City</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">Summary</h3>
                  <p className="text-muted-foreground">
                    This section contains the summary of the news article, providing a concise
                    description of the event, limited to approximately 60 words for quick reading.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">Full Article Link</h3>
                  <a href="#" className="text-primary hover:underline">
                    Read Full Article
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">Category</h3>
                  <p className="text-muted-foreground">Politics</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">Language</h3>
                  <p className="text-muted-foreground">English</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">Source</h3>
                  <p className="text-muted-foreground">ASIAZE News Network</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">Timestamp</h3>
                  <p className="text-muted-foreground">October 14, 2023 10:00 AM</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" onClick={() => navigate("/edit-news/1")}>
                    Edit News
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => navigate("/all-news")}>
                    Back to All News
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
