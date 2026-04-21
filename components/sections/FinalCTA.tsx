"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";
import { quickLeadSchema, type QuickLeadInput } from "@/lib/validators";
import { whatsappLink } from "@/lib/whatsapp";
import { MessageCircle, Send, Clock3, Loader2 } from "lucide-react";

export function FinalCTA({ isHe }: { isHe: boolean }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<QuickLeadInput>({
    resolver: zodResolver(quickLeadSchema),
    defaultValues: { name: "", phone: "" },
  });

  async function onSubmit(values: QuickLeadInput) {
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "home-final-cta",
          message: isHe ? "פנייה מהעמוד הראשי" : "Lead from homepage",
        }),
      });
      if (!r.ok) throw new Error();
      toast({
        title: isHe ? "קיבלנו!" : "Got it!",
        description: isHe ? "נחזור אליך תוך שעה." : "We'll call within an hour.",
        variant: "success",
      });
      reset();
    } catch {
      toast({
        title: isHe ? "משהו השתבש" : "Something broke",
        description: isHe ? "אפשר לשלוח שוב או לפנות בוואטסאפ." : "Try again, or WhatsApp us.",
        variant: "error",
      });
    }
  }

  const err = (k: keyof QuickLeadInput) => {
    const raw = errors[k]?.message as string | undefined;
    if (!raw) return undefined;
    if (raw === "phone.invalid") return isHe ? "מספר לא תקין. 050-1234567 או בפורמט בינלאומי" : "Invalid phone. Use 050-1234567 or international";
    if (raw === "name.tooShort") return isHe ? "השם קצר מדי" : "Name is too short";
    return raw;
  };

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink-950 p-8 text-white shadow-card dark:bg-surface dark:text-ink-900 dark:ring-1 dark:ring-inset dark:ring-rule md:p-14">
            <div className="pointer-events-none absolute -top-32 -end-24 h-96 w-96 rounded-full bg-teal-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -start-20 bottom-0 h-80 w-80 rounded-full bg-teal-700/30 blur-3xl dark:bg-teal-500/20" />
            <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-[0.06]" aria-hidden />
            <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200 ring-1 ring-inset ring-white/10 dark:bg-teal-500/10 dark:text-teal-700 dark:ring-teal-500/25">
                  <Clock3 className="h-3.5 w-3.5" />
                  {isHe ? "שיחת היכרות: 30 דקות, חינם" : "Intro call: 30 min, free"}
                </span>
                <h2 className="mt-5 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
                  {isHe ? (
                    <>
                      השבוע הזה — אתה מפסיד לידים. <br />
                      <span className="text-gradient-brand">השבוע הבא לא חייב להיות ככה.</span>
                    </>
                  ) : (
                    <>
                      This week, you&apos;re losing leads. <br />
                      <span className="text-gradient-brand">Next week doesn&apos;t have to look the same.</span>
                    </>
                  )}
                </h2>
                <p className="mt-5 max-w-lg text-lg text-slate-200 dark:text-ink-500">
                  {isHe
                    ? "30 דקות איתנו, בחינם. אם נגיע למסקנה שאין איך להוסיף לך ערך — נגיד לך את זה. אחרת, יוצאים עם מפה קצרה של מה שאפשר לשפר בחודש הקרוב."
                    : "30 minutes with us, free. If we don't see value to add, we'll say so. Otherwise: you leave with a short map of what can improve in the next month."}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={0.18}>
                    <Button
                      as="a"
                      href={whatsappLink(
                        isHe
                          ? "רוצה לשריין שיחת היכרות של 30 דקות"
                          : "I'd like to book a 30-min intro call",
                      )}
                      target="_blank"
                      rel="noopener"
                      variant="whatsapp"
                      size="lg"
                    >
                      <MessageCircle className="h-4.5 w-4.5" />
                      {isHe ? "וואטסאפ עכשיו" : "WhatsApp now"}
                    </Button>
                  </Magnetic>
                </div>
              </div>

              <div className="md:col-span-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-2xl bg-white p-5 text-ink-900 shadow-card md:p-6"
                  noValidate
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
                    {isHe ? "או — נחזור אליך תוך שעה" : "Or — we'll call you within an hour"}
                  </p>
                  <div className="mt-4 grid gap-3">
                    <FormField htmlFor="fc-name" error={err("name")}>
                      <Input
                        {...register("name")}
                        type="text"
                        placeholder={isHe ? "שם מלא" : "Full name"}
                        autoComplete="name"
                        aria-label={isHe ? "שם מלא" : "Full name"}
                        invalid={!!errors.name}
                      />
                    </FormField>
                    <FormField htmlFor="fc-phone" error={err("phone")}>
                      <Input
                        {...register("phone")}
                        type="tel"
                        dir="ltr"
                        placeholder={isHe ? "טלפון (050-1234567)" : "Phone (050-1234567)"}
                        autoComplete="tel"
                        aria-label={isHe ? "מספר טלפון" : "Phone number"}
                        invalid={!!errors.phone}
                      />
                    </FormField>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-[15px] font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {isSubmitting ? (isHe ? "שולח…" : "Sending…") : isHe ? "שלחו פרטים" : "Send details"}
                    </button>
                  </div>
                  {isSubmitSuccessful && (
                    <p className="mt-3 text-sm font-medium text-teal-700">
                      {isHe ? "קיבלנו! נחזור אליך תוך שעה." : "Got it — we'll call within an hour."}
                    </p>
                  )}
                  <p className="mt-4 text-[11px] leading-relaxed text-ink-400">
                    {isHe
                      ? "בשליחה את/ה מסכים/ה למדיניות הפרטיות ולתנאי השימוש."
                      : "By sending you agree to the privacy policy and terms of use."}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
