"use client";

import { EmailTemplatesHeader } from "./components/email-templates-header";
import { EmailTemplatesTable } from "./components/email-templates-table";

export default function EmailTemplatesContainer() {
  return (
    <div className="space-y-8 min-h-screen">
      <EmailTemplatesHeader />
      <EmailTemplatesTable />
    </div>
  );
}
