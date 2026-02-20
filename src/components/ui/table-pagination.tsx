import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  entityName?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  entityName = "items",
  onPageChange,
  className,
}: TablePaginationProps) {
  const startIndex = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems);

  // If total items is 0, start index should show 0
  const displayStartIndex = totalItems === 0 ? 0 : startIndex;

  return (
    <div className={cn("flex items-center justify-between px-6 py-4", className)}>
      <div className="text-sm text-muted-foreground">
        Showing {displayStartIndex}-{endIndex} of {totalItems} {entityName}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
