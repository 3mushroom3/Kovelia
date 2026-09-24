"use client";

import { motion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string };

/** Desktop nav link with an animated pill under the active item. Colors follow the header state. */
export function NavLink({ href, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative isolate block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-foreground",
        "group-data-[top=true]/header:text-white/70 group-data-[top=true]/header:hover:text-white",
        active && "text-foreground group-data-[top=true]/header:text-white",
        className,
      )}
      {...props}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute inset-0 -z-10 rounded-lg bg-accent-soft group-data-[top=true]/header:bg-white/10"
        />
      )}
      {children}
    </Link>
  );
}
