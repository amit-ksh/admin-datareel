import { useState } from "react";
import { Copy, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export function CloneOrganisationDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Copy className="w-4 h-4 mr-2" />
          Clone Organisation
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[425px] p-6 shadow-xl" align="end">
        <PopoverHeader className="mb-6">
          <PopoverTitle className="text-xl font-semibold">Clone Organization</PopoverTitle>
          <p className="text-sm text-muted-foreground mt-1.5">
            Duplicate organization settings and assets.
          </p>
        </PopoverHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Organization</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                <Building2 className="h-4 w-4" />
              </div>
              <Input defaultValue="IndraIVF" className="pl-9 bg-slate-50/50 dark:bg-slate-900/50" />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Settings to clone</Label>
            
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Project clone</Label>
                <span className="text-xs text-muted-foreground">Copy all active project structures</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Video layout</Label>
                <span className="text-xs text-muted-foreground">Preserve custom player dimensions</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Content video</Label>
                <span className="text-xs text-muted-foreground">Include source video files</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Avatar</Label>
                <span className="text-xs text-muted-foreground">Clone organization branding assets</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpen(false)}>
            Clone Organization
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
