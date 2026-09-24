import { cn } from "@/lib/utils";

/** Small monospace label above section titles, e.g. "// услуги". */
export function Eyebrow({
  className,
  inverted,
  children,
}: {
  className?: string;
  inverted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase",
        inverted ? "text-[#7ee2b5]" : "text-accent-strong",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", inverted ? "bg-[#7ee2b5]/60" : "bg-accent-strong/50")} />
      {children}
    </p>
  );
}
