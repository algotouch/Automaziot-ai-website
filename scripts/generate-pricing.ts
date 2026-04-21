// Build-time generator for /pricing.md and /pricing.txt — machine-readable
// pricing tiers that AI agents can parse when evaluating the product for a
// human. Runs as a `prebuild` hook so the public files stay in sync with
// content/services.ts on every build.

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { SERVICES } from "../content/services";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

const TODAY = new Date().toISOString().slice(0, 10);

function formatTier(t: { name: string; price: string; priceNote?: string; highlights: string[]; featured?: boolean }): string {
  const badge = t.featured ? " ★" : "";
  const lines = [
    `  - ${t.name}${badge}: ${t.price}${t.priceNote ? ` (${t.priceNote})` : ""}`,
    ...t.highlights.map((h) => `    - ${h}`),
  ];
  return lines.join("\n");
}

function serviceSection(
  heading: string,
  service: (typeof SERVICES)[number],
  copy: (typeof SERVICES)[number]["he"],
): string {
  const outcomes = copy.outcomes.map((o) => `- ${o}`).join("\n");
  const audience = copy.audience.join(", ");
  const integrations = copy.integrations.join(", ");
  const tiers = copy.tiers.map(formatTier).join("\n");
  return [
    `### ${heading}`,
    copy.subtitle + (copy.titleHighlight ? ` — ${copy.titleHighlight}` : ""),
    "",
    `Audience: ${audience}`,
    `Integrations: ${integrations}`,
    `Starting price: ₪${service.startingPrice.toLocaleString("en-US")}`,
    "",
    `Outcomes:`,
    outcomes,
    "",
    `Pricing tiers:`,
    tiers,
    copy.pricingNote ? `\n> ${copy.pricingNote}` : "",
  ].filter(Boolean).join("\n");
}

function buildMarkdown(): string {
  const header = `# Automaziot AI — Pricing

Updated: ${TODAY}. All prices in ILS (₪). Setup is one-time; retainers are monthly and optional.
Machine-readable version of https://www.automaziot.ai/en/pricing — generated from source of truth in content/services.ts.

Engagement range across the catalog: ₪2,000 (entry CRM) → ₪25,000 (full AI consulting). Most clients: ₪4,000–₪15,000 one-time setup.

Third-party monthly costs paid directly to vendors (not to Automaziot):
- WhatsApp Business API: ~₪100–₪400/mo by volume
- AI tokens (OpenAI / Anthropic): ~₪50–₪300/mo by volume

## English services
`;

  const en = SERVICES.map((s) => serviceSection(s.en.nav, s, s.en)).join("\n\n");

  const heHeader = `
## Hebrew services — שירותים בעברית
`;

  const he = SERVICES.map((s) => serviceSection(s.he.nav, s, s.he)).join("\n\n");

  const footer = `

## Contact
- WhatsApp: https://wa.me/972542787664
- Email: info@automaziot.ai
- Office IL: +972-3-7630715 · Tel Aviv, 9 Ahad Ha'am St, Shalom Tower
- Office US: +1 (646) 760-4854
- LinkedIn: https://www.linkedin.com/company/automaziot-ai/
- Founder: Eyal Yakobi Miller — https://il.linkedin.com/in/eyal-yakobi-miller-aaaa50210
`;

  return header + en + heHeader + he + footer;
}

function toPlainText(md: string): string {
  return md
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/★/g, "*featured*");
}

function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true });
  const md = buildMarkdown();
  writeFileSync(path.join(PUBLIC_DIR, "pricing.md"), md, "utf8");
  writeFileSync(path.join(PUBLIC_DIR, "pricing.txt"), toPlainText(md), "utf8");
  // eslint-disable-next-line no-console
  console.log(`[pricing] generated public/pricing.md + public/pricing.txt (${SERVICES.length} services)`);
}

main();
