import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const ROWS = [
  [
    "PyTorch",
    "vLLM",
    "LoRA / QLoRA",
    "LangChain",
    "LlamaIndex",
    "MCP",
    "AutoGen",
    "ONNX",
    "Qwen",
    "Llama",
    "Mistral",
  ],
  [
    "PostgreSQL",
    "FastAPI",
    "React",
    "Next.js",
    "WebSocket",
    "Playwright",
    "Scrapy",
    "Grafana",
    "Metabase",
    "Recharts",
  ],
  [
    "Docker",
    "Nginx",
    "WireGuard",
    "Ansible",
    "GitHub Actions",
    "Prometheus",
    "systemd",
    "C++20",
    "POSIX",
    "DSP / FFT",
  ],
];

/** Infinite horizontal ticker of the tech stack; rows alternate direction. Pauses on hover. */
export async function TechMarquee() {
  const t = await getTranslations("Stack");

  return (
    <section className="overflow-hidden border-y border-border bg-surface py-16">
      <Container>
        <Reveal>
          <p className="mb-10 text-center font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            {t("title")}
          </p>
        </Reveal>
      </Container>
      <div className="grid gap-4 mask-fade-x">
        {ROWS.map((row, i) => (
          <div key={i} className="group/marquee flex overflow-hidden">
            <ul
              className={cn(
                "flex w-max shrink-0 animate-marquee gap-4 pr-4 group-hover/marquee:[animation-play-state:paused]",
                i % 2 === 1 && "[animation-direction:reverse]",
              )}
              style={{ animationDuration: `${80 + i * 12}s` }}
            >
              {/* two identical halves (each = row twice, wider than a 2560px screen) for a seamless -50% loop */}
              {[...row, ...row, ...row, ...row].map((tech, j) => (
                <li
                  key={j}
                  aria-hidden={j >= row.length}
                  className="rounded-xl border border-border bg-background px-5 py-2.5 font-mono text-sm whitespace-nowrap text-foreground/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
