import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteIcon, DownloadIcon, RetryIcon, ViewIcon } from "@/lib/icons";
import type { AnalysisRecord } from "@/lib/analysis-history-data";
import { cn } from "@/lib/utils";
import { AnalysisStatusBadge, ScoreDial, TechnologyCell } from "./history-primitives";

export function AnalysisHistoryTable({
  rows,
  selectedId,
  checkedIds,
  onSelect,
  onToggleCheck,
  onToggleAll,
  onView,
  onDownload,
  onRetry,
  onDelete,
}: {
  rows: AnalysisRecord[];
  selectedId: string;
  checkedIds: string[];
  onSelect: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onView: (record: AnalysisRecord) => void;
  onDownload: (record: AnalysisRecord) => void;
  onRetry: (record: AnalysisRecord) => void;
  onDelete: (record: AnalysisRecord) => void;
}) {
  const allChecked = rows.length > 0 && rows.every((r) => checkedIds.includes(r.id));

  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="bg-muted/60">
            <th className="w-10 px-4 py-3">
              <Checkbox
                checked={allChecked}
                onCheckedChange={(v) => onToggleAll(v === true)}
                aria-label="Select all analyses"
              />
            </th>
            {["Analysis ID", "Location", "Date & Time", "Suitability Score", "Recommended", "Status"].map(
              (label) => (
                <th key={label} className="text-label px-3 py-3 font-semibold whitespace-nowrap">
                  {label}
                </th>
              ),
            )}
            <th className="text-label px-4 py-3 text-right font-semibold whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((record) => {
            const isSelected = record.id === selectedId;
            return (
              <tr
                key={record.id}
                onClick={() => onSelect(record.id)}
                className={cn(
                  "cursor-pointer border-t border-border transition-colors hover:bg-muted/40",
                  isSelected && "bg-primary-soft/50",
                )}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={checkedIds.includes(record.id)}
                    onCheckedChange={() => onToggleCheck(record.id)}
                    aria-label={`Select ${record.id}`}
                  />
                </td>
                <td className="text-label px-3 py-3 whitespace-nowrap">{record.id}</td>
                <td className="px-3 py-3">
                  <p className="text-label truncate font-semibold">{record.location}</p>
                  <p className="text-wind truncate text-[11px]">{record.coordinatesLabel}</p>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <p className="text-label">{record.dateLabel}</p>
                  <p className="text-helper">{record.timeLabel}</p>
                </td>
                <td className="px-3 py-3">
                  <ScoreDial score={record.score} />
                </td>
                <td className="px-3 py-3">
                  <TechnologyCell technology={record.technology} capacityLabel={record.capacityLabel} />
                </td>
                <td className="px-3 py-3">
                  <AnalysisStatusBadge status={record.status} />
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <IconAction label={`View ${record.id}`} onClick={() => onView(record)}>
                      <ViewIcon className="size-4" />
                    </IconAction>
                    {record.status === "Failed" ? (
                      <IconAction label={`Retry ${record.id}`} onClick={() => onRetry(record)}>
                        <RetryIcon className="size-4" />
                      </IconAction>
                    ) : (
                      <IconAction label={`Download report for ${record.id}`} onClick={() => onDownload(record)}>
                        <DownloadIcon className="size-4" />
                      </IconAction>
                    )}
                    <IconAction
                      label={`Delete ${record.id}`}
                      onClick={() => onDelete(record)}
                      className="text-error hover:bg-error-soft hover:text-error"
                    >
                      <DeleteIcon className="size-4" />
                    </IconAction>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function IconAction({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn("size-8 rounded-lg text-muted-foreground", className)}
    >
      {children}
    </Button>
  );
}

export function HistoryPagination({
  page,
  pageCount,
  rangeLabel,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: {
  page: number;
  pageCount: number;
  rangeLabel: string;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3">
      <p className="text-helper">{rangeLabel}</p>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-lg"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        {Array.from({ length: pageCount }).map((_, i) => {
          const n = i + 1;
          return (
            <Button
              key={n}
              variant={n === page ? "default" : "outline"}
              size="icon"
              className="size-8 rounded-lg"
              aria-current={n === page ? "page" : undefined}
              onClick={() => onPageChange(n)}
            >
              {n}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-lg"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-helper">Rows per page:</span>
        <Select value={String(rowsPerPage)} onValueChange={(v) => onRowsPerPageChange(Number(v))}>
          <SelectTrigger className="h-9 w-[74px]" aria-label="Rows per page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[8, 12, 16].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
