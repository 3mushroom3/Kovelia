// Static company data. Content editors change CMS data; this file holds things that rarely change.
export const siteConfig = {
  name: "KOVELIA",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "rostik9381525398@gmail.com", // TODO: corporate address
  phone: "", // TODO
  telegram: "", // TODO: e.g. "https://t.me/kovelia"
  products: [{ name: "KOVELIA Agro", url: "https://zernovik.online" }],
  nav: [
    { href: "/", key: "home" },
    { href: "/services", key: "services" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
  ],
} as const;

export type NavKey = (typeof siteConfig.nav)[number]["key"];
