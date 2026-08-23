import { cn } from "../../lib/cn.ts";

export function LoadingBlock({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse bg-line/70", className)} />;
}

export function SectionLoading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-5" aria-label="Loading" role="status">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="grid gap-3 border-b border-line pb-5 md:grid-cols-[minmax(130px,0.3fr)_1fr]"
        >
          <LoadingBlock className="h-3 w-24" />
          <div className="space-y-3">
            <LoadingBlock className="h-6 w-2/3" />
            <LoadingBlock className="h-4 w-full" />
            <LoadingBlock className="h-4 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
