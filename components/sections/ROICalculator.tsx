"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatILS, formatNumber } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { MessageCircle, Share2 } from "lucide-react";

export function ROICalculator({ isHe }: { isHe: boolean }) {
  const [employees, setEmployees] = useState(5);
  const [salary, setSalary] = useState(12000);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [copied, setCopied] = useState(false);

  const { currentAnnualCost, annualSaved, hoursPerMonth } = useMemo(() => {
    const hourlyCost = salary / 176;
    const monthlyHours = hoursPerDay * 22 * employees;
    const current = Math.round(hourlyCost * monthlyHours * 12);
    const saved = Math.round(current * 0.6);
    return {
      currentAnnualCost: current,
      annualSaved: saved,
      hoursPerMonth: Math.round(monthlyHours),
    };
  }, [employees, salary, hoursPerDay]);

  const summaryHe = `חישוב החיסכון: ${formatILS(annualSaved)}/שנה, ${formatNumber(hoursPerMonth * 0.6)} שעות/חודש. ${employees} עובדים × ${formatILS(salary)}.`;
  const summaryEn = `Savings estimate: ${formatILS(annualSaved)}/yr, ${formatNumber(hoursPerMonth * 0.6)} hrs/mo freed. ${employees} team × ${formatILS(salary)}.`;

  async function share() {
    await navigator.clipboard.writeText(isHe ? summaryHe : summaryEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="roi" className="relative bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-white p-8 shadow-card ring-1 ring-inset ring-rule md:p-14">
            <div className="pointer-events-none absolute -start-24 -top-24 h-96 w-96 rounded-full bg-teal-50 blur-3xl" />
            <div className="pointer-events-none absolute -end-24 bottom-0 h-80 w-80 rounded-full bg-amber-50 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>{isHe ? "מחשבון חיסכון" : "ROI calculator"}</Eyebrow>
                <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-[44px]">
                  {isHe ? (
                    <>
                      אתה לא מפסיד כסף. <br />
                      <span className="text-gradient-brand">אתה שורף אותו.</span>
                    </>
                  ) : (
                    <>
                      You're not losing money. <br />
                      <span className="text-gradient-brand">You're burning it.</span>
                    </>
                  )}
                </h2>
                <p className="mt-5 text-ink-500">
                  {isHe
                    ? "גררו את המחוונים. תראו כמה אתם משלמים היום על עבודה שסוכן AI יכול לעשות בחינם."
                    : "Drag the sliders. See how much you're paying right now for work an AI agent can do for free."}
                </p>

                <div className="mt-8 space-y-6">
                  <Slider
                    label={isHe ? "עובדים בצוות" : "Team size"}
                    value={employees}
                    min={1}
                    max={50}
                    step={1}
                    onChange={setEmployees}
                    format={(v) => `${v} ${isHe ? "עובדים" : "people"}`}
                  />
                  <Slider
                    label={isHe ? "שכר ברוטו ממוצע" : "Average gross salary"}
                    value={salary}
                    min={6000}
                    max={30000}
                    step={500}
                    onChange={setSalary}
                    format={(v) => formatILS(v)}
                  />
                  <Slider
                    label={isHe ? "שעות עבודה ידנית ליום (לעובד)" : "Manual hours/day (per person)"}
                    value={hoursPerDay}
                    min={0.5}
                    max={6}
                    step={0.25}
                    onChange={setHoursPerDay}
                    format={(v) => `${v} ${isHe ? "שעות" : "hrs"}`}
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Stat
                    label={isHe ? "מה אתה מפסיד שנה (עכשיו)" : "Annual loss (current)"}
                    value={formatILS(currentAnnualCost)}
                    tone="rose"
                  />
                  <Stat
                    label={isHe ? "חיסכון שנתי צפוי" : "Projected annual savings"}
                    value={formatILS(annualSaved)}
                    tone="good"
                  />
                  <Stat
                    label={isHe ? "שעות משוחררות / חודש" : "Hours freed / month"}
                    value={`${formatNumber(hoursPerMonth * 0.6)}`}
                    tone="accent"
                  />
                  <Stat
                    label={isHe ? "ROI צפוי" : "Expected ROI"}
                    value={isHe ? "3–6 חודשים" : "3–6 months"}
                    tone="neutral"
                  />
                </div>

                <div className="mt-7 rounded-2xl bg-cream p-5 ring-1 ring-inset ring-rule-soft">
                  <p className="text-[14.5px] text-ink-700">
                    {isHe
                      ? "זו הערכה שמרנית (60% אוטומציה בלבד). להערכה מדויקת לעסק שלך —"
                      : "Conservative estimate (60% automation). For a precise number for your business —"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      as="a"
                      href={whatsappLink(isHe ? summaryHe : summaryEn)}
                      target="_blank"
                      rel="noopener"
                      variant="whatsapp"
                      size="md"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {isHe ? "שלחו לי הערכה בוואטסאפ" : "Send me this on WhatsApp"}
                    </Button>
                    <Button onClick={share} variant="secondary" size="md">
                      <Share2 className="h-4 w-4" />
                      {copied
                        ? isHe
                          ? "הועתק ✓"
                          : "Copied ✓"
                        : isHe
                          ? "העתקה"
                          : "Copy"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <label className="font-semibold text-ink-800">{label}</label>
        <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono font-bold text-teal-700" dir="ltr">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-teal-600"
        aria-label={label}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "rose" | "good" | "accent" | "neutral";
}) {
  const toneCls: Record<typeof tone, string> = {
    rose: "bg-rose-50 text-rose-700 ring-rose-100",
    good: "bg-teal-50 text-teal-700 ring-teal-100",
    accent: "bg-amber-50 text-amber-700 ring-amber-100",
    neutral: "bg-cream text-ink-900 ring-rule-soft",
  };
  return (
    <div className={`rounded-2xl p-5 ring-1 ring-inset ${toneCls[tone]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-80">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold">{value}</p>
    </div>
  );
}
