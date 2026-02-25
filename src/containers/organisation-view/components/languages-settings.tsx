import { Globe2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LanguagesSettingsProps {
  isEditing: boolean;
}

export function LanguagesSettings({ isEditing }: LanguagesSettingsProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-blue-500" />
          Languages
        </CardTitle>
        <CardDescription>
          Supported languages for video generation and localization in this organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="px-3 py-1">English (US)</Badge>
          <Badge variant="secondary" className="px-3 py-1">English (UK)</Badge>
          <Badge variant="secondary" className="px-3 py-1">Spanish (Spain)</Badge>
          <Badge variant="secondary" className="px-3 py-1">French (France)</Badge>
          <Badge variant="secondary" className="px-3 py-1">German</Badge>
          {isEditing && (
            <Badge variant="outline" className="px-3 py-1 border-dashed cursor-pointer hover:bg-muted text-muted-foreground">
              + Add Language
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
