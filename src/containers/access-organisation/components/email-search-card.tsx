"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Mail } from "lucide-react";

interface EmailSearchCardProps {
  email: string;
  onEmailChange: (value: string) => void;
  onFetch: () => void;
}

export function EmailSearchCard({
  email,
  onEmailChange,
  onFetch,
}: EmailSearchCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label
            htmlFor="user-email"
            className="text-sm font-medium text-foreground"
          >
            User Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="user-email"
              type="email"
              placeholder="name@company.com"
              className="pl-9"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onFetch()}
            />
          </div>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={onFetch}
        >
          <Search className="mr-2 h-4 w-4" />
          Fetch Organisations
        </Button>
      </CardContent>
    </Card>
  );
}
