import { ViewTransition } from "react";

/**
 * Wrap each page's content in this. On client navigation the old page fades out and the new one rises in
 * (animations: `.page` in globals.css). Must live in page.tsx, not layout — layouts persist, so enter/exit never fire.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
