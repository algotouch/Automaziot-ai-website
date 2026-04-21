import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.CONTACT_FROM || "Automaziot AI <noreply@automaziot.ai>",
        to: process.env.CONTACT_TO || "info@automaziot.ai",
        subject: "Newsletter subscription",
        text: `New subscriber: ${parsed.data.email}`,
      });
    } catch (err) {
      console.error("newsletter_error", err);
    }
  } else {
    console.info("[newsletter]", parsed.data.email);
  }
  return NextResponse.json({ ok: true });
}
