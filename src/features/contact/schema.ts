import { z } from "zod";

// Shared between client and server. Error messages are i18n keys under "Contact.errors".
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(100, "name"),
  email: z.email("email").max(200, "email"),
  phone: z.string().trim().max(50).optional(),
  service: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "message").max(5000, "message"),
  consent: z.literal("on", "consent"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrorKey = "name" | "email" | "message" | "consent";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fieldErrors?: Partial<Record<keyof ContactInput, ContactErrorKey>>;
      /** Submitted values, so the form can be re-filled (React resets forms after an action). */
      values?: Partial<Record<keyof ContactInput, string>>;
    };
