import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().max(100).optional(),
  service: z.string().max(60).optional(),
  budget: z.string().max(60).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(60).optional(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;
  if (data.honeypot) return NextResponse.json({ ok: true }, { status: 200 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "info@automaziot.ai";
  const from = process.env.CONTACT_FROM || "Automaziot AI <noreply@automaziot.ai>";

  const subject = `New lead · ${data.name} · ${data.source ?? "site"}`;
  const text = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email && `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    data.service && `Service: ${data.service}`,
    data.budget && `Budget: ${data.budget}`,
    data.source && `Source: ${data.source}`,
    "",
    data.message ?? "",
  ]
    .filter(Boolean)
    .join("\n");

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({ from, to, subject, text });
    } catch (err) {
      console.error("resend_error", err);
    }
  } else {
    console.info("[contact-form]", subject, text);
  }

  return NextResponse.json({ ok: true });
}
