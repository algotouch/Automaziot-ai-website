import { z } from "zod";

// Accepts Israeli formats: 050-1234567, 0501234567, 0521234567, +972501234567, 972501234567
// Also allows spaces, dashes, and optional leading + for international.
const RAW_PHONE_RE = /^(?:\+?972[-\s]?5\d|0?5\d)[-\s]?\d{3}[-\s]?\d{4}$/;

export const israeliPhoneSchema = z
  .string()
  .min(1)
  .transform((s) => s.replace(/\s+/g, ""))
  .refine((s) => RAW_PHONE_RE.test(s), {
    message: "phone.invalid",
  });

export const emailSchema = z
  .string()
  .min(1)
  .email({ message: "email.invalid" });

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "name.tooShort" }).max(80),
  phone: israeliPhoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  message: z.string().max(1200).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const quickLeadSchema = z.object({
  name: z.string().min(2, { message: "name.tooShort" }).max(80),
  phone: israeliPhoneSchema,
});

export type QuickLeadInput = z.infer<typeof quickLeadSchema>;

export const newsletterSchema = z.object({
  email: emailSchema,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
