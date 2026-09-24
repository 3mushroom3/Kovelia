import { notFound } from "next/navigation";

// Catch-all so unknown paths inside a locale render the localized not-found page.
export default function CatchAll() {
  notFound();
}
