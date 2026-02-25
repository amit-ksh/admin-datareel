import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

export function DangerZone() {
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const organizationName = "Acme Inc.";

  return (
    <Card className="border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-500 flex items-center gap-2">
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground">
              Permanently remove this organization and all its data. This action cannot be undone.
            </p>
          </div>
          
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="shrink-0 bg-white hover:bg-red-50 text-red-600 border border-red-200 dark:bg-transparent dark:border-red-800 dark:text-red-500 dark:hover:bg-red-950/50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Organisation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-500 text-xl">
                  <AlertTriangle className="w-5 h-5" />
                  Delete Organisation
                </DialogTitle>
                <DialogDescription className="pt-2">
                  Are you sure you want to delete <span className="font-semibold text-foreground">{organizationName}</span>? This action cannot be undone and will permanently delete all associated data, projects, and assets.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">
                    Please type <span className="font-bold select-none">{organizationName}</span> to confirm.
                  </Label>
                  <Input 
                    id="org-name"
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                    placeholder={organizationName}
                    className="border-red-200 focus-visible:ring-red-500"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  disabled={deleteInput !== organizationName}
                >
                  Yes, delete organization
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
