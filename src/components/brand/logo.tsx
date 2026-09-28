import Image from "next/image";
import logoLight from "@/assets/brand/kovelia-logo-light.png";
import logo from "@/assets/brand/kovelia-logo.png";
import mark from "@/assets/brand/kovelia-mark.png";
import { cn } from "@/lib/utils";

// Brand assets are the official KOVELIA logo (same as zernovik.online), cleaned of the transparency halo.
// kovelia-logo-light.png is the same artwork with a white wordmark for dark (ink) backgrounds.

/** The "K" mark. Size it with height/width classes. */
export function LogoMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden
      priority={priority}
      sizes="(min-width: 1024px) 480px, 240px"
      className={cn("h-auto w-auto shrink-0 object-contain select-none", className)}
    />
  );
}

type LogoProps = {
  className?: string;
  /** White wordmark, for dark (ink) backgrounds. */
  inverted?: boolean;
  priority?: boolean;
};

/** Full logo: mark + KOVELIA wordmark + "Data / Intelligence / Platforms". Set the height via className (e.g. h-10). */
export function Logo({ className, inverted = false, priority }: LogoProps) {
  const alt = "KOVELIA — Data / Intelligence / Platforms";
  const common = {
    priority,
    sizes: "240px",
    className: cn("h-9 w-auto select-none", className),
  };

  if (inverted) return <Image src={logoLight} alt={alt} {...common} />;

  // Dark wordmark on light theme, white wordmark on dark theme.
  return (
    <>
      <Image src={logo} alt={alt} {...common} className={cn(common.className, "dark:hidden")} />
      <Image
        src={logoLight}
        {...common}
        alt=""
        aria-hidden
        className={cn(common.className, "hidden dark:block")}
      />
    </>
  );
}
