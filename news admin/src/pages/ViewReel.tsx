import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";

export default function ViewReel() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/all-reels")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-black">
              <CardContent className="p-0 relative aspect-[9/16] max-h-[600px]">
                {/* Video Player Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="text-center text-white">
                    <p className="text-xl mb-2">Video Player</p>
                    <p className="text-sm opacity-75">Reel content would display here</p>
                  </div>
                </div>

                {/* Interaction Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                  <h2 className="text-xl font-bold mb-2">Reel Headline</h2>
                  <p className="text-sm mb-2">This is a sample caption for the reel preview.</p>
                  <p className="text-xs opacity-75">Source Name • 2 hours ago</p>
                  <div className="h-1 bg-primary rounded-full w-full mt-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metadata Section */}
          <div>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Reel Metadata</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">Title:</h3>
                    <p className="text-muted-foreground">Sample Reel Title</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Caption:</h3>
                    <p className="text-muted-foreground">
                      This is a detailed caption for the reel, providing more context and information.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Full Article Link:</h3>
                    <a href="#" className="text-primary hover:underline">
                      Read full article
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Category:</h3>
                    <p className="text-muted-foreground">Entertainment</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Language:</h3>
                    <p className="text-muted-foreground">English</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Tag1</Badge>
                      <Badge>Tag2</Badge>
                      <Badge>Tag3</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Source & Duration:</h3>
                    <p className="text-muted-foreground">News Network • 2 min read</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Status:</h3>
                    <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={() => navigate(`/edit-reel/${id}`)} className="flex-1 rounded-full">
                    Edit Reel
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/all-reels")} className="flex-1 rounded-full">
                    Back to All Reels
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
