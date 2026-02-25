import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { TablePagination } from "@/components/ui/table-pagination";
import { Search, Filter, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";


export function ActiveProjectsTable() {
  const activeProjects = [
    {
      id: "1",
      initials: "MT",
      name: "Marketing Tooling",
      totalVideos: 124,
      totalDuration: 2_23_234, // in seconds
      avgDuration: 1800,
      approvalRate: 80,
      feedback: 4.8,
      avatarColor: "bg-blue-100 text-blue-700"
    },
    {
      id: "2",
      initials: "OB",
      name: "Onboarding Flow",
      totalVideos: 89,
      totalDuration: 2_23_234,
      avgDuration: 2509,
      approvalRate: 80,
      feedback: 4.5,
      avatarColor: "bg-purple-100 text-purple-700"
    },
    {
      id: "3",
      initials: "AS",
      name: "Ad Series A/B",
      totalVideos: 210,
      totalDuration: 2_23_234,
      avgDuration: 1063,
      approvalRate: 80,
      feedback: 4.9,
      avatarColor: "bg-red-100 text-red-700"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Active Projects Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <h3 className="text-lg font-bold">Active Projects</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-9 bg-muted/30 border-transparent focus-visible:ring-1 focus-visible:border-primary shadow-none h-9"
            />
          </div>
          <Button variant="outline" className="gap-2 h-9 shadow-none border">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Card className="w-full border shadow-none rounded-xl overflow-hidden p-0 bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px] pl-6 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Project
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Total Videos
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Total Duration
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Approval Rate
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Viewer Sattification
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeProjects.map((project) => (
                <TableRow key={project.id} className="h-16">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded bg-transparent">
                        <AvatarFallback className={`${project.avatarColor} font-bold text-xs rounded uppercase`}>
                          {project.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-sm text-foreground">
                        {project.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {project.totalVideos}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground">{formatDuration(project.totalDuration)}</span>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted font-normal text-xs px-2 py-0 border-none shadow-none">
                        {formatDuration(project.avgDuration)} avg
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      {project.approvalRate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 border-none" />
                      {project.feedback}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <TablePagination 
            currentPage={1}
            pageSize={3}
            totalItems={12}
            entityName="projects"
            className="border-t py-2 bg-card"
          />
        </CardContent>
      </Card>
    </div>
  );
}
