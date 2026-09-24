import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * KOVELIA "K" mark, vector redraw of the brand logo:
 * lime→emerald stem, blue→cyan arms, emerald fold where they meet.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  const stem = `${id}-stem`;
  const up = `${id}-up`;
  const low = `${id}-low`;
  const fold = `${id}-fold`;

  return (
    <svg
      viewBox="0 0 96 100"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={stem} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b7ea6c" />
          <stop offset="0.45" stopColor="#3cc07f" />
          <stop offset="1" stopColor="#0b7355" />
        </linearGradient>
        <linearGradient id={up} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1463c4" />
          <stop offset="0.55" stopColor="#2b8fe0" />
          <stop offset="1" stopColor="#74dcf8" />
        </linearGradient>
        <linearGradient id={low} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a6fd0" />
          <stop offset="1" stopColor="#4cc3f2" />
        </linearGradient>
        <linearGradient id={fold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2fc58a" />
          <stop offset="1" stopColor="#0b7355" />
        </linearGradient>
      </defs>
      {/* stem */}
      <path
        d="M9 16C9 9.5 13.5 5 20 5h11c4.5 0 7.4 3.6 6.7 8L30 88c-.6 4.2-3.8 7-8 7H15c-4.4 0-7.2-3.4-6.5-7.7Z"
        fill={`url(#${stem})`}
      />
      {/* upper arm */}
      <path
        d="M31 50 70.5 8.3C72.4 6.3 75 5 77.8 5H88c4.5 0 6.8 5.3 3.7 8.6L52.5 55.5Z"
        fill={`url(#${up})`}
      />
      {/* lower arm */}
      <path
        d="M45 60.5 83.2 88c3.6 2.6 1.8 7-2.6 7H67.4c-2.7 0-5.2-1.2-6.9-3.3L36.5 66Z"
        fill={`url(#${low})`}
      />
      {/* fold */}
      <path
        d="M31 50c7.5-1.6 15.5 1.2 21.5 5.5L45 60.5l-8.5 5.5c-2-5.3-4.3-10.6-5.5-16Z"
        fill={`url(#${fold})`}
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Show the "Data / Intelligence / Platforms" tagline under the wordmark. */
  tagline?: boolean;
  /** Light text for dark (ink) backgrounds. */
  inverted?: boolean;
};

export function Logo({ className, tagline = false, inverted = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-auto" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.05rem] font-extrabold tracking-[0.14em]",
            inverted ? "text-white" : "text-[#12241f] dark:text-white",
          )}
        >
          KOVELIA
        </span>
        {tagline && (
          <span
            className={cn(
              "mt-1 font-mono text-[0.6rem] tracking-wide",
              inverted ? "text-white/55" : "text-muted-foreground",
            )}
          >
            Data / Intelligence / Platforms
          </span>
        )}
      </span>
    </span>
  );
}
