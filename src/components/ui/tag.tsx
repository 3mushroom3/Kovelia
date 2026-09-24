import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] font-medium tracking-wide text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
