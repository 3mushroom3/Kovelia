import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_2px_6px_rgb(7_92_68/0.28)] hover:bg-primary-hover hover:shadow-[0_6px_20px_rgb(7_92_68/0.35)]",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent-strong/40 hover:bg-surface-2",
  ghost: "text-foreground hover:bg-surface-2",
  /** For ink (dark green) backgrounds. */
  light: "bg-white text-[#053d30] shadow-[0_8px_30px_rgb(0_0_0/0.25)] hover:bg-[#eafaf3]",
  outlineLight: "border border-white/25 text-white backdrop-blur hover:border-white/50 hover:bg-white/10",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
  icon: "size-10",
} as const;

export type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** Button classes — also used to style links as buttons. */
export function buttonStyles({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap",
    "transition-[background-color,border-color,box-shadow,transform,color] duration-200 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<"button"> & ButtonStyleProps) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

/** Arrow that nudges right when the parent button/link is hovered. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        "size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5",
        className,
      )}
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
