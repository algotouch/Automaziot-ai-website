"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Send, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";
import { contactFormSchema, type ContactFormInput } from "@/lib/validators";
import { whatsappLink } from "@/lib/whatsapp";
import { SERVICES } from "@/content/services";

type Extra = { company?: string; service?: string; budget?: string; honeypot?: string };
type FullInput = ContactFormInput & Extra;

export function ContactForm({ isHe }: { isHe: boolean }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FullInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "", message: "", company: "", service: "", budget: "", honeypot: "" },
  });

  async function onSubmit(values: FullInput) {
    if (values.honeypot) return;
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source: "contact-page" }),
      });
      if (!r.ok) throw new Error();
      toast({
        title: isHe ? "הפרטים התקבלו" : "Got your details",
        description: isHe ? "נחזור אליך תוך שעה." : "We'll reply within an hour.",
        variant: "success",
      });
      reset();
    } catch {
      toast({
        title: isHe ? "משהו השתבש" : "Something broke",
        description: isHe ? "אפשר לנסות שוב או לפנות בוואטסאפ." : "Try again, or WhatsApp us.",
        variant: "error",
      });
    }
  }

  const budgets = isHe
    ? ["עד ₪5,000", "₪5,000–10,000", "₪10,000–25,000", "מעל ₪25,000", "עוד לא בטוח"]
    : ["Under ₪5,000", "₪5,000–10,000", "₪10,000–25,000", "Over ₪25,000", "Not sure yet"];

  const err = (k: keyof FullInput) => {
    const raw = errors[k]?.message as string | undefined;
    if (!raw) return undefined;
    const dict: Record<string, { he: string; en: string }> = {
      "phone.invalid": { he: "מספר לא תקין. 050-1234567 או בפורמט בינלאומי", en: "Invalid phone. Use 050-1234567 or international format" },
      "email.invalid": { he: "כתובת מייל לא תקינה", en: "Invalid email address" },
      "name.tooShort": { he: "השם קצר מדי", en: "Name is too short" },
    };
    return (dict[raw]?.[isHe ? "he" : "en"]) ?? raw;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[28px] bg-surface p-6 shadow-card ring-1 ring-inset ring-rule md:p-8"
      noValidate
    >
      <h2 className="text-2xl font-extrabold text-ink-950 dark:text-white">
        {isHe ? "שלחו פרטים — נחזור תוך שעה" : "Send your details — we'll reply within an hour"}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormField
          label={isHe ? "שם מלא" : "Full name"}
          htmlFor="cf-name"
          required
          error={err("name")}
        >
          <Input {...register("name")} type="text" autoComplete="name" invalid={!!errors.name} />
        </FormField>
        <FormField
          label={isHe ? "טלפון" : "Phone"}
          htmlFor="cf-phone"
          required
          error={err("phone")}
          hint={isHe ? "לדוגמה: 050-1234567" : "e.g. 050-1234567"}
        >
          <Input {...register("phone")} type="tel" dir="ltr" autoComplete="tel" invalid={!!errors.phone} />
        </FormField>
        <FormField label={isHe ? "אימייל" : "Email"} htmlFor="cf-email" error={err("email")}>
          <Input {...register("email")} type="email" dir="ltr" autoComplete="email" invalid={!!errors.email} />
        </FormField>
        <FormField label={isHe ? "שם החברה" : "Company"} htmlFor="cf-company">
          <Input {...register("company")} type="text" autoComplete="organization" />
        </FormField>
        <FormField label={isHe ? "השירות שמעניין" : "Service of interest"} htmlFor="cf-service">
          <Select {...register("service")}>
            <option value="">{isHe ? "בחר שירות" : "Pick a service"}</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {isHe ? s.he.nav : s.en.nav}
              </option>
            ))}
            <option value="other">{isHe ? "אחר / לא בטוח" : "Other / not sure"}</option>
          </Select>
        </FormField>
        <FormField label={isHe ? "תקציב משוער" : "Estimated budget"} htmlFor="cf-budget">
          <Select {...register("budget")}>
            <option value="">{isHe ? "בחר טווח" : "Pick a range"}</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </Select>
        </FormField>
        <FormField
          className="md:col-span-2"
          label={isHe ? "פרטים נוספים" : "More details"}
          htmlFor="cf-message"
        >
          <Textarea
            {...register("message")}
            rows={4}
            placeholder={isHe ? "מה אתם רוצים לאוטומט? מה המטרה?" : "What are you looking to automate? What's the goal?"}
          />
        </FormField>
      </div>

      <input
        {...register("honeypot")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isSubmitting ? (isHe ? "שולח…" : "Sending…") : isHe ? "שלחו עכשיו" : "Send now"}
        </Button>
        <Button as="a" href={whatsappLink()} target="_blank" rel="noopener" variant="whatsapp" size="lg">
          <MessageCircle className="h-4 w-4" />
          {isHe ? "או בוואטסאפ" : "Or on WhatsApp"}
        </Button>
      </div>

      {isSubmitSuccessful && (
        <p className="mt-4 rounded-xl bg-teal-50 p-3 text-sm font-semibold text-teal-700 ring-1 ring-inset ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30">
          {isHe ? "הפרטים התקבלו. נחזור אליך תוך שעה." : "Got your details — we'll reply within an hour."}
        </p>
      )}

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-ink-400">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-300" />
        <span>
          {isHe
            ? "בשליחה את/ה מסכים/ה למדיניות הפרטיות ולתנאי השימוש. לא שולחים ספאם, לא מעבירים פרטים לצד ג׳."
            : "By sending you agree to our privacy policy and terms. No spam, no third-party sharing."}
        </span>
      </p>
    </form>
  );
}
