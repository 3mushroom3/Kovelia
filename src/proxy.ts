import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except API, Next internals, Sanity Studio and files with an extension.
  matcher: "/((?!api|_next|_vercel|studio|.*\\..*).*)",
};
