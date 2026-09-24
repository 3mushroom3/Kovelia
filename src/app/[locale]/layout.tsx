import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
});

// Only the locales from generateStaticParams exist; anything else is a 404 before rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#021a18",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: `%s — ${siteConfig.name}` },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for everything below this layout.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      // Next disables smooth scrolling during route changes so navigation lands at the top instantly.
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider>
          <ThemeProvider>
            <MotionProvider>
              <Header />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer locale={locale} />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
