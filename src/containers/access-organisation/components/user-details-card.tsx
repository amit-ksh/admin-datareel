"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

interface UserDetails {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: "active" | "inactive";
}

interface UserDetailsCardProps {
  user: UserDetails;
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-foreground">
            User Details
          </span>
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 font-medium px-3 py-1 rounded-full text-xs flex items-center gap-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
            ACTIVE
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              Name
            </p>
            <p className="text-sm font-semibold text-foreground">{user.name}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              Email
            </p>
            <p className="text-sm font-semibold text-foreground">
              {user.email}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              Role
            </p>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-sm font-bold text-blue-600">
                {user.role}
              </span>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              Last Login
            </p>
            <p className="text-sm font-semibold text-foreground">
              {user.lastLogin}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
