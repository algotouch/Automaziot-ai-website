import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { StickyToc } from "@/components/services/StickyToc";
import { ServiceNavStrip } from "@/components/services/ServiceNavStrip";
import { whatsappLink } from "@/lib/whatsapp";
import { DEFAULT_LAST_UPDATED, SERVICES, getCrossSell, type Service, type ServiceCopy } from "@/content/services";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  Check,
  Compass,
  Database,
  Filter,
  MessageCircle,
  Phone,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";

const icons = {
  MessageCircle,
  Phone,
  Filter,
  Workflow,
  Database,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Bot,
  Compass,
} as const;

const accent: Record<string, string> = {
  indigo: "bg-teal-50 text-teal-700 ring-teal-100",
  cyan: "bg-teal-50 text-teal-700 ring-teal-100",
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  rose: "bg-rose-50 text-rose-600 ring-rose-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  violet: "bg-teal-50 text-teal-700 ring-teal-100",
};

export function ServicePageShell({ service, isHe }: { service: Service; isHe: boolean }) {
  const copy: ServiceCopy = isHe ? service.he : service.en;
  const Icon = icons[service.icon as keyof typeof icons] ?? Workflow;
  const accentCls = accent[service.accent] ?? accent.indigo;
  const cross = getCrossSell(copy.crossSell);

  const tocItems = [
    { id: "scenarios", label: isHe ? "תרחישים" : "Scenarios" },
    { id: "features", label: isHe ? "יכולות" : "Features" },
    { id: "timeline", label: isHe ? "לוח זמנים" : "Timeline" },
    { id: "integrations", label: isHe ? "אינטגרציות" : "Integrations" },
    { id: "pricing", label: isHe ? "מחירים" : "Pricing" },
    { id: "faq", label: isHe ? "שאלות" : "FAQ" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-light pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <div className="pointer-events-none absolute -end-40 -top-20 h-[420px] w-[420px] rounded-full bg-teal-100/60 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -start-32 top-1/2 h-[360px] w-[360px] rounded-full bg-amber-50 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03] mix-blend-multiply" aria-hidden />

        <Container className="relative">
          <div className="mb-8 flex items-center gap-2 text-sm text-ink-400">
            <Link href="/services" className="hover:text-ink-950">
              {isHe ? "שירותים" : "Services"}
            </Link>
            <ArrowLeft className="h-3.5 w-3.5 flip-x opacity-60" />
            <span className="text-ink-800">{copy.nav}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <div className={`inline-flex items-center gap-3 rounded-2xl px-3.5 py-2 ring-1 ring-inset ${accentCls}`}>
                <Icon className="h-5 w-5" />
                <span className="pe-2 text-xs font-bold uppercase tracking-[0.14em]">{copy.nav}</span>
              </div>
              <h1 className="mt-6 text-[clamp(2.2rem,5.2vw,4rem)] font-extrabold leading-[1.05] text-ink-950 text-balance">
                {copy.title}{" "}
                {copy.titleHighlight && <span className="text-gradient-brand">{copy.titleHighlight}</span>}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">{copy.subtitle}</p>
              <p
                className="mt-4 max-w-2xl text-ink-500"
                itemScope
                itemType="https://schema.org/DefinedTerm"
              >
                <span itemProp="name" className="sr-only">{copy.nav}</span>
                <span itemProp="description">{copy.aiSummary ?? copy.lead}</span>
              </p>

              <Stagger className="mt-8 space-y-2.5">
                {copy.outcomes.map((o) => (
                  <StaggerItem key={o}>
                    <div className="flex items-start gap-3 text-ink-800">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-600 ring-1 ring-inset ring-teal-100">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-medium">{o}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button as="a" href={whatsappLink(copy.whatsappMessage)} target="_blank" rel="noopener" variant="whatsapp" size="lg">
                  <MessageCircle className="h-4.5 w-4.5" />
                  {copy.ctaPrimary}
                </Button>
                <Button as="a" href="#pricing" variant="secondary" size="lg" className="group">
                  {copy.ctaSecondary}
                  <ArrowLeft className="h-4 w-4 flip-x arrow-nudge" />
                </Button>
              </div>

              {/* Audience chips */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                  {isHe ? "עבור" : "For"}
                </span>
                {copy.audience.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-ink-700 shadow-soft ring-1 ring-inset ring-rule"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
                {isHe ? "עודכן לאחרונה:" : "Last updated:"}{" "}
                <time dateTime={service.lastUpdated ?? DEFAULT_LAST_UPDATED}>
                  {service.lastUpdated ?? DEFAULT_LAST_UPDATED}
                </time>
              </p>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <ServiceHeroVisual slug={service.slug} isHe={isHe} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* BODY: sticky TOC + long content */}
      <div className="relative bg-paper">
        <Container>
          <div className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
            <aside className="hidden lg:col-span-3 lg:block">
              <StickyToc items={tocItems} isHe={isHe} />
            </aside>

            <div className="lg:col-span-9 lg:ps-6">
              {/* SCENARIOS */}
              <section id="scenarios" className="scroll-mt-24">
                <Reveal>
                  <Eyebrow>{isHe ? "תרחישים מהשטח" : "Real scenarios"}</Eyebrow>
                  <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                    {isHe ? "ככה זה נראה ביום של לקוח" : "What a customer's day actually looks like"}
                  </h2>
                </Reveal>
                <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
                  {copy.scenarios.map((s, i) => (
                    <StaggerItem key={i}>
                      <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-1 hover:shadow-card hover:ring-teal-200">
                        <div className="pointer-events-none absolute -end-12 -top-12 h-32 w-32 rounded-full bg-teal-50 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-40" />
                        <p className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
                          <Sparkles className="h-3.5 w-3.5" />
                          {isHe ? `תרחיש ${i + 1}` : `Scenario ${i + 1}`}
                        </p>
                        <h3 className="relative mt-3 text-lg font-extrabold text-ink-950">{s.when}</h3>
                        <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-ink-500">{s.what}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>

              {/* FEATURES */}
              <section id="features" className="mt-24 scroll-mt-24">
                <Reveal>
                  <Eyebrow>{isHe ? "איך זה בנוי" : "What's inside"}</Eyebrow>
                  <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                    {isHe ? "יכולות הליבה" : "Core capabilities"}
                  </h2>
                </Reveal>
                <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
                  {copy.features.map((f, i) => (
                    <StaggerItem key={f.title}>
                      <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-0.5 hover:shadow-card hover:ring-teal-200">
                        <span className="absolute end-6 top-6 font-display text-3xl font-extrabold text-ink-100 transition-colors group-hover:text-teal-50">
                          0{i + 1}
                        </span>
                        <h3 className="text-lg font-extrabold text-ink-950">{f.title}</h3>
                        <p className="mt-2 text-[14.5px] text-ink-500">{f.body}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>

              {/* TIMELINE */}
              <section id="timeline" className="mt-24 scroll-mt-24">
                <Reveal>
                  <Eyebrow>{isHe ? "לוח זמנים" : "Timeline"}</Eyebrow>
                  <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                    {isHe ? "מהיום הראשון עד ההשקה" : "From day one to launch"}
                  </h2>
                </Reveal>
                <ol className="relative mt-10 space-y-4 ps-5 before:absolute before:start-2 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-teal-500 before:to-teal-100">
                  {copy.timeline.map((t, i) => (
                    <Reveal key={i} delay={i * 0.08}>
                      <li className="relative">
                        <span className="absolute -start-[26px] top-2 grid h-5 w-5 place-items-center rounded-full bg-teal-600 text-[10px] font-bold text-white ring-4 ring-paper">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-1 rounded-2xl bg-white p-5 ring-1 ring-inset ring-rule md:flex-row md:items-center md:gap-6">
                          <div className="md:w-44">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">{t.duration}</p>
                            <h3 className="mt-1 text-base font-extrabold text-ink-950">{t.phase}</h3>
                          </div>
                          <p className="flex-1 text-[14.5px] text-ink-500">{t.detail}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </section>

              {/* INTEGRATIONS */}
              <section id="integrations" className="mt-24 scroll-mt-24">
                <Reveal>
                  <Eyebrow>{isHe ? "אינטגרציות" : "Integrations"}</Eyebrow>
                  <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                    {isHe ? "מתחבר לכל מה שאתה עובד איתו היום" : "Connects to everything you already use"}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-8 rounded-3xl bg-white p-7 ring-1 ring-inset ring-rule">
                    <div className="flex flex-wrap gap-2">
                      {copy.integrations.map((int) => (
                        <span
                          key={int}
                          className="rounded-full bg-cream px-3.5 py-1.5 text-xs font-semibold text-ink-800 ring-1 ring-inset ring-rule-soft transition hover:bg-teal-50 hover:text-teal-700 hover:ring-teal-100"
                        >
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* PRICING */}
              <section id="pricing" className="mt-24 scroll-mt-24">
                <Reveal>
                  <Eyebrow>{isHe ? "מחירים" : "Pricing"}</Eyebrow>
                  <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                    {isHe ? "שקוף ומפורט — מראש" : "Transparent, detailed — upfront"}
                  </h2>
                  {copy.pricingNote && (
                    <p className="mt-4 max-w-2xl text-[14.5px] text-ink-500">{copy.pricingNote}</p>
                  )}
                </Reveal>
                <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
                  {copy.tiers.map((t) => (
                    <StaggerItem key={t.name}>
                      <div
                        className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-6 ring-1 ring-inset transition hover:-translate-y-1 hover:shadow-card ${
                          t.featured
                            ? "bg-white ring-teal-300 shadow-card"
                            : "bg-white ring-rule hover:ring-teal-200"
                        }`}
                      >
                        {t.featured && (
                          <>
                            <div className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-teal-100 blur-3xl" aria-hidden />
                            <span className="relative -mt-1 mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-700 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                              <Sparkles className="h-3 w-3" />
                              {isHe ? "הכי נבחר" : "Most chosen"}
                            </span>
                          </>
                        )}
                        <h3 className="relative text-lg font-extrabold text-ink-950">{t.name}</h3>
                        <p className="relative mt-2 font-display text-4xl font-extrabold text-ink-950">{t.price}</p>
                        {t.priceNote && <p className="relative text-xs text-ink-400">{t.priceNote}</p>}
                        <ul className="relative mt-6 flex-1 space-y-2.5 text-sm">
                          {t.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-ink-800">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <Button
                          as="a"
                          href={whatsappLink(copy.whatsappMessage + " — " + t.name)}
                          target="_blank"
                          rel="noopener"
                          variant={t.featured ? "primary" : "secondary"}
                          className="relative mt-6"
                        >
                          {isHe ? "בחרתי" : "I'll take it"}
                        </Button>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>

              {/* CROSS SELL */}
              {cross.length > 0 && (
                <section className="mt-24">
                  <Reveal>
                    <Eyebrow>{isHe ? "משלים היטב עם" : "Pairs well with"}</Eyebrow>
                    <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                      {isHe ? "עסקים שבחרו את זה — בחרו גם" : "Clients who picked this — also picked"}
                    </h2>
                  </Reveal>
                  <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
                    {cross.map((c) => {
                      const cCopy = isHe ? c.he : c.en;
                      const CIcon = icons[c.icon as keyof typeof icons] ?? Workflow;
                      return (
                        <StaggerItem key={c.slug}>
                          <Link
                            href={`/services/${c.slug}`}
                            className="group block h-full rounded-2xl bg-white p-5 ring-1 ring-inset ring-rule transition hover:-translate-y-1 hover:shadow-soft hover:ring-teal-200"
                          >
                            <div className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ring-inset ${accent[c.accent] ?? accent.indigo}`}>
                              <CIcon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-4 font-extrabold text-ink-950">{cCopy.nav}</h3>
                            <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{cCopy.subtitle}</p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-teal-700">
                              {isHe ? "לפרטים" : "Details"}
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Link>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </section>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24">
        <FAQ isHe={isHe} items={copy.faq} />
      </section>

      {/* ALL SERVICES STRIP */}
      <ServiceNavStrip currentSlug={service.slug} isHe={isHe} />

      {/* FINAL */}
      <FinalCTA isHe={isHe} />
    </>
  );
}

export function generateServiceStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
