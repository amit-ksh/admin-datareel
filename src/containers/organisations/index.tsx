"use client";

import { OrganisationsHeader } from "./components/organisations-header";
import { OrganisationsTable } from "./components/organisations-table";

export default function OrganisationsContainer() {
  return (
    <div className="space-y-8 min-h-screen">
      <OrganisationsHeader />
      <OrganisationsTable />
    </div>
  );
}
