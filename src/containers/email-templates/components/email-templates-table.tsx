"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/table-pagination";
import { Eye, CheckCircle, XCircle, Code, LayoutTemplate } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailTemplate {
  id: string;
  orgName: string;
  orgLogoUrl?: string;
  orgColorClass: string;
  templateName: string;
  type: string;
  subject: string;
  status: "verified" | "pending" | "rejected";
  htmlBody: string;
}

const dummyData: EmailTemplate[] = [
  {
    id: "tpl-1",
    orgName: "Acme org",
    orgLogoUrl: "",
    orgColorClass: "bg-blue-500 text-white",
    templateName: "Welcome Email",
    type: "Onboarding",
    subject: "Welcome to Acme Corp!",
    status: "verified",
    htmlBody: `<!DOCTYPE html>\n<html>\n<body style="font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #f9f9f9;">\n<h1 style="color: #333;">Welcome!</h1>\n<p>We are thrilled to have you here.</p>\n<button style="background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Get Started</button>\n</body>\n</html>`
  },
  {
    id: "tpl-2",
    orgName: "Vertex AI",
    orgLogoUrl: "",
    orgColorClass: "bg-emerald-500 text-white",
    templateName: "Password Reset",
    type: "Security",
    subject: "Reset your password",
    status: "pending",
    htmlBody: `<!DOCTYPE html>\n<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 40px;"><h2 style="color: #d9534f;">Password Reset Request</h2><p>Click the link below to reset your password.</p><a href="#" style="color: #007bff; font-weight: bold;">Reset Password</a></body></html>`
  },
  {
    id: "tpl-3",
    orgName: "Skyline Corp",
    orgLogoUrl: "",
    orgColorClass: "bg-orange-500 text-white",
    templateName: "Monthly Newsletter",
    type: "Marketing",
    subject: "Your October Update from Skyline",
    status: "rejected",
    htmlBody: `<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; padding: 20px;"><div style="background: #eee; padding: 20px; border-radius: 8px;"><h3>Monthly Updates</h3><p>Here is what happened this month...</p></div></body></html>`
  }
];

export function EmailTemplatesTable() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const handleReviewClick = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsReviewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0"><LayoutTemplate className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="border-0"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="w-full border rounded-lg overflow-hidden p-0 bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] pl-6">Organisation</TableHead>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((tpl) => (
                <TableRow key={tpl.id} className="h-20">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-none">
                        <AvatarImage src={tpl.orgLogoUrl} alt={tpl.orgName} />
                        <AvatarFallback className={`${tpl.orgColorClass} font-semibold text-sm`}>
                          {tpl.orgName.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">
                          {tpl.orgName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {tpl.templateName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium bg-muted/50 text-muted-foreground border-transparent">
                      {tpl.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={tpl.subject}>
                    {tpl.subject}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(tpl.status)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReviewClick(tpl)}
                      className="border-primary/20 hover:bg-primary/5 text-primary"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <TablePagination 
            currentPage={1}
            pageSize={3}
            totalItems={dummyData.length}
            entityName="templates"
            className="border-t"
          />
        </CardContent>
      </Card>

      <ReviewTemplateDialog 
        open={isReviewDialogOpen} 
        onOpenChange={setIsReviewDialogOpen} 
        template={selectedTemplate} 
      />
    </>
  );
}

function ReviewTemplateDialog({ 
  open, 
  onOpenChange, 
  template 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  template: EmailTemplate | null;
}) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl w-full h-[95vh] sm:h-[90vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="flex-none">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{template.templateName}</DialogTitle>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="font-medium px-2 py-0.5 bg-muted rounded-md">{template.type}</span>
                <span className="text-xl">•</span>
                <span className="font-mono font-medium text-xs">Subject:</span>
                <span className="text-foreground font-medium">{template.subject}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 mt-4 border rounded-md overflow-hidden flex flex-col bg-muted/30">
          <Tabs defaultValue="preview" className="flex-1 min-h-0 flex flex-col w-full">
            <div className="border-b bg-background px-4 py-2 flex items-center justify-between z-10 shrink-0">
              <span className="text-sm font-semibold text-muted-foreground">Content Viewer</span>
              <TabsList className="h-8 p-0.5 bg-muted">
                <TabsTrigger value="preview" className="text-xs px-3 py-1 data-[state=active]:bg-background data-[state=active]">
                  <LayoutTemplate className="w-3.5 h-3.5 mr-1.5" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="raw" className="text-xs px-3 py-1 data-[state=active]:bg-background data-[state=active]">
                  <Code className="w-3.5 h-3.5 mr-1.5" />
                  Raw HTML
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="preview" className="flex-1 m-0 min-h-0 data-[state=active]:flex flex-col p-4 bg-gray-50/50">
              <div className="flex-1 border rounded-md bg-white overflow-hidden relative">
                <iframe
                  srcDoc={template.htmlBody}
                  title={`${template.templateName} Preview`}
                  className="absolute inset-0 w-full h-full border-0 bg-white"
                  sandbox="allow-same-origin"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="raw" className="flex-1 m-0 min-h-0 data-[state=active]:flex flex-col p-0">
              <ScrollArea className="flex-1 size-full">
                <div className="p-4 size-full">
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-all bg-card border rounded-md p-4">
                    {template.htmlBody}
                  </pre>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="mt-6 flex-none sm:justify-between items-center w-full">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6">
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="destructive" className="px-6" onClick={() => onOpenChange(false)}>
              Reject
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6" onClick={() => onOpenChange(false)}>
               Approve Template
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
