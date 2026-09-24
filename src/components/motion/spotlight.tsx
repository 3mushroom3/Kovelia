"use client";

import { cn } from "@/lib/utils";

/** Card surface with a soft highlight that follows the cursor (see `spotlight` utility in globals.css). */
export function Spotlight({ className, style, children, ...props }: React.ComponentProps<"div">) {
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn("group/spot relative", className)}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] spotlight opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}
