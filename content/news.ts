export type NewsItem = {
  slug: string;
  date: string;
  source: string;
  sourceHe: string;
  titleHe: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  url?: string;
  accent?: "teal" | "amber" | "emerald" | "rose";
};

export const NEWS: NewsItem[] = [
  {
    slug: "walla-nadlan-end-of-brokerage-commission",
    date: "2026-03-05",
    source: "Walla Nadlan",
    sourceHe: "וואלה נדל״ן",
    titleHe: "הסוף לעמלת התיווך? יזם ישראלי מצהיר: ׳המודל הנוכחי גוסס׳",
    titleEn: "Is the brokerage commission dying? An Israeli entrepreneur says yes",
    excerpt:
      "סקירה על פלטפורמת Nadlanist AI שאוטומאזיוט בנו — והשפעתה על שוק הנדל״ן המסורתי.",
    excerptEn:
      "A deep-dive on Nadlanist AI built by Automaziot — and its effect on the traditional brokerage market.",
    url: "https://nadlan.walla.co.il",
    accent: "teal",
  },
  {
    slug: "ice-ai-replacing-real-estate-brokers",
    date: "2026-02-18",
    source: "ICE",
    sourceHe: "ICE",
    titleHe: "האם ה-AI יחליף את מתווכי הנדל״ן ומה תהיה העמלה?",
    titleEn: "Will AI replace real estate brokers, and what happens to commissions?",
    excerpt:
      "ראיון עם צוות אוטומאזיוט על עתיד התיווך ועל מערכת ה-AI שפותחה.",
    excerptEn:
      "Interview with the Automaziot team on the future of brokerage and the AI they built.",
    url: "https://www.ice.co.il",
    accent: "amber",
  },
  {
    slug: "maariv-real-estate-moment",
    date: "2026-02-01",
    source: "Maariv",
    sourceHe: "מעריב",
    titleHe: "מהפכת נדל״ן: מה שווייז עשתה לנהיגה — ChatGPT עושה לגוגל",
    titleEn: "Real estate's moment: what Waze did to driving, ChatGPT is doing to Google",
    excerpt:
      "מאמר דעה הכולל התייחסות נרחבת למודל Nadlanist AI.",
    excerptEn:
      "Opinion piece with extended coverage of the Nadlanist AI model.",
    url: "https://www.maariv.co.il",
    accent: "emerald",
  },
];

export function getNewsItem(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}
