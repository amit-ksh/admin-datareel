import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Eye, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data
const tenants = [
  {
    id: 1,
    name: "Vamit",
    email: "vamit2damor+7@gmail.com",
    role: "ADMIN",
    status: "Active",
    permissionsCount: 9,
    permissions: [
      "MANAGE ORGANISATION",
      "MANAGE PERMISSION",
      "CREATE TENANT",
      "MANAGE TENANT",
      "GLOBAL CONTENT MANAGER",
      "VIEW ANALYTICS",
      "CREATOR"
    ]
  },
  {
    id: 2,
    name: "Aaditya Saini",
    email: "aaditya@9ai.in",
    role: "ADMIN",
    status: "Active",
    permissionsCount: 11,
    permissions: ["VIEW ANALYTICS"] 
  },
  {
    id: 3,
    name: "Garvit Chouhan",
    email: "909garvit@gmail.com",
    role: "ADMIN",
    status: "Active",
    permissionsCount: 9,
    permissions: ["MANAGE ORGANISATION"]
  },
  {
    id: 4,
    name: "test243",
    email: "tes353535@yopmail.com",
    role: "TEST",
    status: "Inactive",
    permissionsCount: 0,
    permissions: []
  }
];

function TenantStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-center">
        <div className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Total Tenants</div>
        <div className="text-[34px] font-bold text-slate-900 dark:text-white leading-none">20</div>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-center">
        <div className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Active Tenants</div>
        <div className="flex items-center gap-2">
          <span className="text-[34px] font-bold text-slate-900 dark:text-white leading-none">17</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-center">
        <div className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Inactive</div>
        <div className="flex items-center gap-2">
          <span className="text-[34px] font-bold text-slate-300 dark:text-slate-600 leading-none">3</span>
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 mt-1"></div>
        </div>
      </div>
    </div>
  );
}

function TenantList({ expandedId, setExpandedId }: { expandedId: number | null, setExpandedId: (id: number | null) => void }) {
  return (
    <div className="space-y-4 pt-2">
      {tenants.map((tenant) => {
        const isExpanded = expandedId === tenant.id;
        
        return (
          <div key={tenant.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
            <div 
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : tenant.id)}
            >
              <div className="flex items-start justify-between">
                {/* User Details */}
                <div className="flex items-center gap-4 md:w-[300px] group overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    {tenant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-slate-900 dark:text-white text-[15px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{tenant.name}</span>
                    <span className="text-sm text-slate-500 truncate">{tenant.email}</span>
                  </div>
                </div>
                {/* Actions mobile only */}
                <div className="hidden items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 h-9 w-9">
                    <Pencil className="w-[18px] h-[18px]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-9 w-9">
                    <Trash2 className="w-[18px] h-[18px]" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-0 flex-1 justify-between sm:pl-[64px] md:pl-0">
                {/* Role */}
                <div className="flex flex-col gap-1.5 w-[calc(50%-8px)] md:w-[140px]">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Role</span>
                  <div>
                    {tenant.role === 'ADMIN' ? (
                       <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600 border-none px-3 py-1 rounded-md text-[11px] font-bold dark:bg-blue-500/10 dark:text-blue-400 uppercase tracking-wide">
                          {tenant.role}
                       </Badge>
                    ) : (
                       <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-600 border-none px-3 py-1 rounded-md text-[11px] font-bold dark:bg-slate-800 dark:text-slate-300 uppercase tracking-wide">
                          {tenant.role}
                       </Badge>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5 w-[calc(50%-8px)] md:w-[140px]">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Status</span>
                  <div>
                    {tenant.status === 'Active' ? (
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 border-none px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit dark:bg-emerald-500/10 dark:text-emerald-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {tenant.status}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-slate-50 text-slate-500 hover:bg-slate-50 hover:text-slate-500 border-none px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit dark:bg-slate-800 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                        {tenant.status}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Permissions */}
                <div className="flex flex-col gap-1.5 w-[calc(50%-8px)] md:w-[160px]">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Permissions</span>
                  <div className="flex items-center gap-1.5 text-[15px] font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {tenant.permissionsCount} <span className="hidden sm:inline">permissions</span>
                    {tenant.permissionsCount > 0 ? (
                      isExpanded ? <ChevronDown className="w-[18px] h-[18px] text-slate-400 ml-0.5" /> : <Eye className="w-[18px] h-[18px] text-slate-400 ml-0.5" />
                    ) : (
                      <Eye className="w-[18px] h-[18px] text-slate-400 ml-0.5 opacity-50" />
                    )}
                  </div>
                </div>

                {/* Actions Desktop */}
                <div 
                  className="hidden items-center justify-end gap-1.5 w-[100px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 h-9 w-9">
                    <Pencil className="w-[18px] h-[18px]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-9 w-9">
                    <Trash2 className="w-[18px] h-[18px]" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expanded Permissions */}
            {isExpanded && tenant.permissions.length > 0 && (
              <div className="px-6 py-5 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5 mb-4">
                  <Shield className="w-[18px] h-[18px] text-blue-500 fill-blue-50" />
                  <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">User Permissions</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tenant.permissions.map((perm) => (
                    <div 
                      key={perm} 
                      className="bg-white dark:bg-slate-900 text-[11px] font-bold uppercase tracking-[0.5px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 py-1.5 px-3.5 rounded-md"
                    >
                      {perm}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TenantPagination() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 pb-2 text-[13px] text-slate-500 gap-4 sm:gap-0">
      <div className="w-full sm:w-auto text-center sm:text-left">
        Page <span className="font-semibold text-slate-700 dark:text-slate-300">1 - 3</span> of <span className="font-semibold text-slate-700 dark:text-slate-300">27</span> results
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1.5 font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span>10 / page</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="w-8 h-8 rounded-md bg-white dark:bg-slate-900 text-slate-300 border-slate-200" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8 rounded-md bg-white dark:bg-slate-900 text-blue-600 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:text-blue-400">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function OrganisationTenants() {
  const [expandedId, setExpandedId] = useState<number | null>(1); // Pre-expand first one to match design

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Organization Tenants</h2>
          <p className="text-sm text-muted-foreground">
            Manage users, permissions and roles within your tenant ecosystem.
          </p>
        </div>
      </div>

      <TenantStats />

      <TenantList expandedId={expandedId} setExpandedId={setExpandedId} />

      <TenantPagination />
    </div>
  );
}
