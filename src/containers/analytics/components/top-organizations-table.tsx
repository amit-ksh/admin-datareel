import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Organization {
  id: string;
  name: string;
  joinDate: string;
  usage: string;
  videos: string;
  views: string;
  feedback: string;
  logoUrl?: string;
  externalLink?: string;
}

const dummyData: Organization[] = [
  {
    id: "#1234",
    name: "Acme org",
    joinDate: "1 Jan 2026",
    usage: "10000",
    videos: "5K",
    views: "50K",
    feedback: "3.9/5",
    logoUrl: "",
    externalLink: "#",
  },
  // Add more dummy rows if needed
];

export function TopOrganizationsTable() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-handwriting">
          Top Organisation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] text-base font-medium">
                Organisation
              </TableHead>
              <TableHead className="text-base font-medium">
                Join at
              </TableHead>
              <TableHead className="text-base font-medium">
                Usage
              </TableHead>
              <TableHead className="text-base font-medium">
                Videos
              </TableHead>
              <TableHead className="text-base font-medium">
                Views
              </TableHead>
              <TableHead className="text-base font-medium">
                Feedback
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((org) => (
              <TableRow key={org.id} className="h-20">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-black">
                      <AvatarImage src={org.logoUrl} alt={org.name} />
                      <AvatarFallback className="bg-white text-black font-bold text-xl">
                        {org.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center font-bold text-lg">
                        {org.name}
                        {org.externalLink && (
                          <ExternalLink className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {org.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-lg font-medium">{org.joinDate}</TableCell>
                <TableCell className="text-lg font-medium">
                   {org.usage}
                </TableCell>
                <TableCell className="text-lg font-bold">{org.videos}</TableCell>
                <TableCell className="text-lg font-bold">{org.views}</TableCell>
                <TableCell className="text-lg font-bold">{org.feedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
