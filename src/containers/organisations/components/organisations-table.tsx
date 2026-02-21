import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Star, ArrowUpDown } from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Organisation {
  id: string;
  name: string;
  joinDate: string;
  usage: {
    type?: string;
    provider?: string;
  };
  videos: string;
  views: string;
  lastVideoCreated?: string;
  feedback: string;
  logoUrl?: string;
  externalLink?: string;
  avatarColorClass: string;
}

const dummyData: Organisation[] = [
  {
    id: "#1234",
    name: "Acme org",
    joinDate: "1 Jan 2026",
    usage: {
      type: "Lipsync",
      provider: "Elevenlabs"
    },
    videos: "5K",
    views: "50K",
    lastVideoCreated: "20 Feb 2026",
    feedback: "3.9/5",
    logoUrl: "",
    externalLink: "#",
    avatarColorClass: "bg-blue-500 text-white"
  },
  {
      id: "#5678",
      name: "Vertex AI",
      joinDate: "12 Feb 2026",
      usage: {
        type: "Lipsync",
      },
      videos: "1.2K",
      views: "15K",
      lastVideoCreated: "19 Feb 2026",
      feedback: "4.8/5",
      logoUrl: "",
      externalLink: "#",
      avatarColorClass: "bg-emerald-500 text-white"
    },
    {
      id: "#8821",
      name: "Skyline Corp",
      joinDate: "5 Mar 2026",
      usage: {
        provider: "Elevenlabs"
      },
      videos: "8.4K",
      views: "120K",
      lastVideoCreated: "15 Feb 2026",
      feedback: "4.2/5",
      logoUrl: "",
      externalLink: "#",
      avatarColorClass: "bg-orange-500 text-white"
    }
];

export function OrganisationsTable() {
  return (
    <Card className="w-full border shadow-none rounded-lg overflow-hidden p-0 bg-card">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">
                Organisation
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer select-none hover:text-foreground">
                  Join at
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>
              <TableHead>
                Usage
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer select-none hover:text-foreground">
                  Videos
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>
              <TableHead>
                Views
              </TableHead>
              <TableHead>
                Last Video
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer select-none hover:text-foreground">
                  Feedback
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((org) => (
              <TableRow key={org.id} className="h-20">
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 border-none`}>
                      <AvatarImage src={org.logoUrl} alt={org.name} />
                      <AvatarFallback className={`${org.avatarColorClass} font-semibold text-sm`}>
                         {org.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center font-bold text-sm text-foreground">
                        {org.name}
                        {org.externalLink && (
                          <a href={org.externalLink} target="_blank" rel="noopener noreferrer" className="ml-1.5 text-muted-foreground hover:text-foreground transition-colors">
                              <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {org.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">{org.joinDate}</TableCell>
                <TableCell>
                   <div className="flex flex-col gap-1.5 items-start">
                       {org.usage.type && (
                         <div className="bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium rounded-sm">
                           {org.usage.type}
                         </div>
                       )}
                       {org.usage.provider && (
                         <div className="bg-purple-50 text-purple-700 px-2 py-0.5 text-xs font-medium rounded-sm">
                           {org.usage.provider}
                         </div>
                       )}
                   </div>
                </TableCell>
                <TableCell className="text-sm font-bold text-foreground">{org.videos}</TableCell>
                <TableCell className="text-sm font-bold text-foreground">{org.views}</TableCell>
                <TableCell className="text-sm font-medium text-foreground">{org.lastVideoCreated || "N/A"}</TableCell>
                <TableCell className="text-sm font-bold text-foreground">
                  <div className="flex items-center gap-1.5">
                    {org.feedback}
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 border-none" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination Footer */}
        <TablePagination 
          currentPage={1}
          pageSize={3}
          totalItems={24}
          entityName="organisations"
          className="border-t"
        />
      </CardContent>
    </Card>
  );
}
