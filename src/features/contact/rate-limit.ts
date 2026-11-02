import "server-only";

// In-memory fixed-window limiter: the site runs as a single pm2 process, so a shared store isn't needed.
// nginx also rate-limits POSTs (scripts/harden-server.sh); this is the app-level backstop.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_KEYS = 10_000;

const hits = new Map<string, { count: number; resetAt: number }>();

/** Returns true if `key` may submit now, and counts the attempt. */
export function takeToken(key: string, now = Date.now()): boolean {
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_KEYS) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      // Still full: every key is active, i.e. a flood. Refuse instead of growing without bound.
      if (hits.size >= MAX_KEYS) return false;
    }
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

/**
 * Client IP as set by nginx: X-Real-IP, else the LAST X-Forwarded-For hop (the one nginx appended;
 * earlier hops come from the client and can be forged). Undefined when not behind the proxy.
 */
export function clientIp(headers: Headers): string | undefined {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  return headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || undefined;
}
