import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";

describe("contactSchema", () => {
  const valid = {
    name: "Ivan",
    email: "ivan@example.com",
    service: "ai-agents",
    message: "Hello, I need an AI agent.",
    consent: "on",
  };

  it("accepts a valid request", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("returns i18n error keys", () => {
    const r = contactSchema.safeParse({ ...valid, email: "nope", message: "short" });
    expect(r.success).toBe(false);
    const keys = r.error!.issues.map((i) => i.message).sort();
    expect(keys).toEqual(["email", "message"]);
  });

  it("requires consent to data processing", () => {
    const r = contactSchema.safeParse({ ...valid, consent: undefined });
    expect(r.success).toBe(false);
    expect(r.error!.issues[0].message).toBe("consent");
  });
});
