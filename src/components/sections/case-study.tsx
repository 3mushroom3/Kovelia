import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/brand/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Project } from "@/lib/cms";
import { RegionBars } from "./region-bars";

/** Featured case: KOVELIA Agro (zernovik.online) with a stylised product preview. */
export async function CaseStudy({ project }: { project: Project }) {
  const t = await getTranslations("Case");
  const features = t.raw("features") as string[];

  return (
    <section className="relative isolate overflow-hidden bg-ink-gradient py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-plus" />
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow inverted>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
              {t("title")}
            </h2>
            <p className="mt-5 text-lg text-white/70">{t("subtitle")}</p>
          </Reveal>

          <Stagger as="ul" className="mt-8 grid gap-3">
            {features.map((f) => (
              <StaggerItem as="li" key={f} className="flex items-start gap-3 text-white/85">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#3cc07f]/20 text-[#7ee2b5]">
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                {f}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                className={buttonStyles({ variant: "light", size: "lg" })}
              >
                {t("visit")}
                <ArrowIcon />
              </a>
            )}
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-white/15 px-2 py-1 font-mono text-[0.7rem] text-white/60"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Product preview mock, echoing the zernovik.online dashboard */}
        <Reveal y={40} delay={0.1} className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_60%_40%,rgb(47_197_138/0.35),transparent_65%)] blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#f7f9fb] text-[#212829] shadow-[0_30px_80px_rgb(0_0_0/0.45)]">
            <div className="flex items-center gap-2 border-b border-[#e7ecea] bg-white px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 rounded-md bg-[#f1f5f4] px-3 py-1 font-mono text-[0.7rem] text-[#6f8080]">
                zernovik.online
              </span>
            </div>
            <div className="flex">
              <aside className="hidden w-14 shrink-0 flex-col items-center gap-3 bg-[#021a18] py-4 sm:flex">
                <LogoMark className="h-7 w-7" />
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`h-7 w-7 rounded-lg ${i === 0 ? "bg-[#054532]" : "bg-white/5"}`} />
                ))}
              </aside>
              <div className="min-w-0 flex-1 p-4 sm:p-5">
                <div className="rounded-xl bg-[linear-gradient(135deg,#021a18,#075c44_60%,#17a06f)] p-5 text-white">
                  <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-[0.65rem]">
                    KOVELIA Agro
                  </span>
                  <p className="mt-3 text-lg font-extrabold">{t("mock.title")}</p>
                  <p className="mt-1 flex items-center gap-2 text-[0.7rem] text-white/75">
                    <span className="size-1.5 animate-blink rounded-full bg-[#7ee2b5]" />
                    {t("mock.live")} · {t("mock.updated")}
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["12 480", t("mock.companies")],
                    ["38 915", t("mock.declarations")],
                  ].map(([v, l]) => (
                    <div key={l} className="rounded-xl border border-[#e7ecea] bg-white p-3.5">
                      <p className="text-[0.65rem] text-[#6f8080]">{l}</p>
                      <p className="text-xl font-bold tabular-nums">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-[#e7ecea] bg-white p-4">
                  <p className="mb-3 text-xs font-bold">{t("mock.regions")}</p>
                  <RegionBars />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
