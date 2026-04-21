"use client";

import { Container } from "@/components/ui/Container";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function StatsBand({ isHe }: { isHe: boolean }) {
  const stats = [
    { value: 8, suffix: "s", label: isHe ? "זמן תגובה ממוצע" : "Avg response time" },
    { value: 15, suffix: "+", label: isHe ? "שעות נחסכות / שבוע" : "Hours saved / week" },
    { value: 24, suffix: "/7", label: isHe ? "זמינות הסוכנים" : "Agent uptime" },
    { value: 127, suffix: "%", label: isHe ? "שיפור המרה ממוצע" : "Avg conversion lift" },
  ];

  return (
    <section className="relative bg-cream py-20 md:py-24">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            {isHe ? "המספרים שנמדדו אצל לקוחות אמיתיים" : "What we measure at real clients"}
          </p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center">
                <p className="font-display text-5xl font-extrabold tracking-tight text-ink-950 dark:text-white md:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} duration={1.4} />
                </p>
                <p className="mt-2 text-sm font-semibold text-ink-500 dark:text-ink-300">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
