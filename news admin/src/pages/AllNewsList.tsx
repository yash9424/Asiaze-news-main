import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const newsData = [
  {
    id: 1,
    headline: "Breaking: Major Event Unfolds",
    category: "Politics",
    language: "EN",
    status: "Draft",
    dateCreated: "12 Oct 2023",
  },
  {
    id: 2,
    headline: "Entertainment: Film Release",
    category: "Entertainment",
    language: "HIN",
    status: "Published",
    dateCreated: "10 Oct 2023",
  },
  {
    id: 3,
    headline: "Finance: Market Update",
    category: "Finance",
    language: "BEN",
    status: "Draft",
    dateCreated: "08 Oct 2023",
  },
];

export default function AllNewsList() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <h1 className="text-xl md:text-3xl font-bold">Manage News – All News</h1>
          <Button onClick={() => navigate("/add-news")} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add News
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by headline or tags"
            className="w-full sm:max-w-xs"
          />
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="hin">HIN</SelectItem>
              <SelectItem value="ben">BEN</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <hr style={{ height: '4px', backgroundColor: '#E5E7EB', border: 'none' }} />

        {/* Table */}
        <div className="border rounded-lg bg-card overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow >
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className=" text-center">Headline</TableHead>
                <TableHead className=" text-center">Category</TableHead>
                <TableHead className=" text-center">Language</TableHead>
                <TableHead className=" text-center">Status</TableHead>
                <TableHead className=" text-center">Date Created</TableHead>
                <TableHead className=" text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.map((news) => (
                <TableRow key={news.id}>
                  <TableCell >
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium text-center">{news.headline}</TableCell>
                  <TableCell className=" text-center">
                    <Badge className="bg-primary text-primary-foreground">
                      {news.category}
                    </Badge>
                  </TableCell>
                  <TableCell className=" text-center">{news.language}</TableCell>
                  <TableCell className=" text-center">
                    <Badge
                      variant={news.status === "Published" ? "default" : "destructive"}
                      className={
                        news.status === "Published"
                          ? "bg-status-published text-white"
                          : "bg-status-draft text-white"
                      }
                    >
                      {news.status}
                    </Badge>
                  </TableCell>
                  <TableCell className=" text-center">{news.dateCreated}</TableCell>
                  <TableCell className=" ">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary hover:text-white"
                        onClick={() => navigate(`/edit-news/${news.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary hover:text-white"
                        onClick={() => navigate(`/view-news/${news.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary hover:text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
