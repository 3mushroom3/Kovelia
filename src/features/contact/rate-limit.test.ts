import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { clientIp, takeToken } = await import("./rate-limit");

describe("takeToken", () => {
  it("allows 5 submissions per window, then refuses until the window resets", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i++) expect(takeToken("1.1.1.1", t0)).toBe(true);
    expect(takeToken("1.1.1.1", t0)).toBe(false);
    expect(takeToken("2.2.2.2", t0)).toBe(true);
    expect(takeToken("1.1.1.1", t0 + 10 * 60 * 1000)).toBe(true);
  });
});

describe("clientIp", () => {
  it("prefers X-Real-IP", () => {
    expect(clientIp(new Headers({ "x-real-ip": "9.9.9.9", "x-forwarded-for": "1.1.1.1" }))).toBe("9.9.9.9");
  });

  it("takes the proxy-appended (last) X-Forwarded-For hop, not a forged first one", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "6.6.6.6, 5.5.5.5" }))).toBe("5.5.5.5");
  });

  it("is undefined without proxy headers", () => {
    expect(clientIp(new Headers())).toBeUndefined();
  });
});
