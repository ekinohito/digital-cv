import type { PropsWithChildren } from "react";
import { cn } from "../../lib/cn.ts";

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
