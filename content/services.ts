/**
 * Fallback "last updated" date applied to services that don't override it.
 * Bump when you do a site-wide copy pass; otherwise set `lastUpdated` per
 * service for more accurate freshness signals.
 */
export const DEFAULT_LAST_UPDATED = "2026-04-21";

export type ServiceTier = {
  name: string;
  price: string;
  priceNote?: string;
  highlights: string[];
  featured?: boolean;
};

export type FAQ = { q: string; a: string };

export type ServiceCopy = {
  nav: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  lead: string;
  /**
   * Optional 40-60 word self-contained definition used for AI / LLM
   * extraction. Falls back to `lead` when absent. Curate one per locale
   * when you want AI answers to quote exact phrasing.
   */
  aiSummary?: string;
  outcomes: string[];
  audience: string[];
  scenarios: { when: string; what: string }[];
  features: { title: string; body: string }[];
  timeline: { phase: string; duration: string; detail: string }[];
  integrations: string[];
  tiers: ServiceTier[];
  pricingNote?: string;
  faq: FAQ[];
  crossSell: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  whatsappMessage: string;
};

export type Service = {
  slug: string;
  icon: string;
  accent: "indigo" | "cyan" | "emerald" | "rose" | "amber" | "violet";
  isNew?: boolean;
  isPopular?: boolean;
  startingPrice: number;
  /** ISO date of the most recent meaningful content update for this service. */
  lastUpdated?: string;
  he: ServiceCopy;
  en: ServiceCopy;
};

export const SERVICES: Service[] = [
  {
    slug: "whatsapp-agent",
    icon: "MessageCircle",
    accent: "emerald",
    isPopular: true,
    startingPrice: 3500,
    he: {
      nav: "סוכן וואטסאפ",
      title: "סוכן וואטסאפ שסוגר עסקאות",
      titleHighlight: "ב-02:00 בלילה",
      subtitle: "ולא נשמע כמו בוט.",
      lead:
        "סוכן AI חי שיושב על ה-WhatsApp Business API שלך, מקבל הודעות 24/7, עונה בעברית טבעית, מציע הצעות מחיר, קובע פגישות ומעביר רק לידים חמים ליועץ האנושי. מאות שיחות במקביל, אפס תורים.",
      outcomes: [
        "זמן תגובה ממוצע: מתחת ל-10 שניות",
        "15–20 שעות של תשובות ידניות נחסכות בכל שבוע",
        "שיעור סגירה שעולה כי אף הודעה לא נשארת ללא מענה",
      ],
      audience: ["נדל״ן ותיווך", "קליניקות וזימון תורים", "קמעונאות וחנויות", "שירותי B2B", "חינוך והדרכה"],
      scenarios: [
        { when: "02:14 בלילה, לקוח שולח ״כמה זה עולה?״", what: "הסוכן עונה תוך 8 שניות עם הצעת מחיר, מזהה כוונה לקנייה, וקובע שיחה ל-09:30 — כל זה לפני שקמת לבוקר." },
        { when: "יום עמוס, 40 הודעות נכנסות בבת אחת", what: "הסוכן מטפל בכולן במקביל, מסנן את 6 הלידים החמים ושולח לך סיכום קצר למכשיר." },
        { when: "לקוח שואל שאלה טכנית שדורשת בן-אדם", what: "הסוכן מזהה את המקרה, מעביר ליועץ הנכון עם סיכום השיחה ב-CRM, בלי לגרום ללקוח להרגיש מורד." },
        { when: "לקוח שהתעניין לפני שבוע חוזר לשקט", what: "הסוכן מזהה את השקט, שולח פולואפ מדוד (לא ספאמי), ומחייה את הליד." },
      ],
      features: [
        { title: "מבין עברית אמיתית", body: "שיח טבעי, סלנג ישראלי, תיקון טעויות כתיב — לא תבניות נוקשות." },
        { title: "מחובר לכל המערכות", body: "CRM (Zoho/HubSpot/Monday), יומנים, חשבוניות, תשלומים — הכול זורם." },
        { title: "קו אדום ברור", body: "אתה מחליט מה הסוכן רשאי לומר, מה לא, ומתי להעביר לאדם." },
        { title: "למידה מתמשכת", body: "כל השיחות נסקרות כדי לשפר את הסוכן — הוא הופך טוב יותר עם הזמן." },
      ],
      timeline: [
        { phase: "אפיון ומסרים", duration: "2 ימים", detail: "יושבים יחד, מגדירים טון, שאלות נפוצות, תרחישי סגירה." },
        { phase: "חיבור API ובנייה", duration: "5 ימים", detail: "אישור WhatsApp Business, בניית הסוכן, אינטגרציה עם ה-CRM." },
        { phase: "בדיקות סמויות", duration: "3 ימים", detail: "50+ שיחות בדיקה, כיוון עדין של תשובות ואישור על ידי צוות המכירות." },
        { phase: "השקה וליווי 14 יום", duration: "14 ימים", detail: "ניטור יומי, שיפורים יומיומיים, ישיבת אופטימיזציה בסוף." },
      ],
      integrations: ["WhatsApp Business API", "n8n", "Zoho CRM", "HubSpot", "Monday", "Pipedrive", "Google Calendar", "Outlook", "Stripe"],
      tiers: [
        { name: "בסיסי", price: "₪3,500", highlights: ["מענה לשאלות נפוצות", "סינון לידים ראשוני", "העברה לנציג אנושי", "שילוב CRM יחיד"] },
        { name: "מקצועי", price: "₪5,500", featured: true, highlights: ["הכל מהבסיסי", "סוכן מכירות פעיל", "הצעות מחיר וסגירה", "פולואפ אוטומטי", "2 אינטגרציות"] },
        { name: "מותאם אישית", price: "₪7,000+", highlights: ["הכל מהמקצועי", "אינטגרציה מלאה עם מערכות הליבה", "תרחישים מורכבים (תשלום, משלוחים)", "ליווי חודשי מורחב"] },
      ],
      pricingNote: "עלויות צד ג׳ (WhatsApp API + טוקני AI): 100–500 ₪ לחודש, לפי נפח שיחות. תשלום חד-פעמי על ההקמה.",
      faq: [
        { q: "כמה זה באמת עולה בחודש אחרי ההקמה?", a: "תלוי בנפח. לעסק עם 300–800 שיחות בחודש זה ינוע בין 150–400 ₪ לעלויות API ו-AI. אתה משלם ישירות לספקים (Meta, OpenAI), אין מרווח מצידנו." },
        { q: "מה קורה אם הסוכן יענה תשובה שגויה ללקוח?", a: "אנחנו בונים מראש ״קווים אדומים״ — נושאים בהם הסוכן מחויב להעביר לאדם. לגבי שאר התשובות, אנחנו בודקים 50+ שיחות בסימולציה לפני השקה וממשיכים לעקוב אחרי הנתונים בשבועיים הראשונים." },
        { q: "למי שייך הסוכן בסוף?", a: "לך. כל הקוד, ההגדרות וההיסטוריה שייכים לעסק שלך. אנחנו מסבכים אותך אל לקוח — אם תרצה לעבור לספק אחר, אתה יכול." },
        { q: "זה מתאים גם לעסק קטן עם 3–5 עובדים?", a: "זה נבנה בדיוק בשבילם. לידים שמתפספסים ב-22:00 הם הכאב הכי גדול של עסק קטן — שם האוטומציה הכי משתלמת." },
        { q: "כמה זמן עד שרואים תוצאות?", a: "זמן התגובה משתפר ביום 1. החזר ההשקעה בדרך כלל תוך 3–6 חודשים, לפי נפח הלידים." },
      ],
      crossSell: ["lead-management", "smart-crm", "voice-agent"],
      ctaPrimary: "הפעילו סוכן בוואטסאפ",
      ctaSecondary: "ראו איך זה עובד",
      whatsappMessage: "היי, מעניין אותי סוכן וואטסאפ לעסק שלי. אפשר דוגמה?",
    },
    en: {
      nav: "WhatsApp Agent",
      title: "A WhatsApp agent that closes deals",
      titleHighlight: "at 2am",
      subtitle: "And doesn't sound like a bot.",
      lead:
        "A live AI agent riding on your WhatsApp Business API. Replies in under 10 seconds, quotes prices, books meetings, and hands you only the hot leads. Hundreds of conversations in parallel, zero queue.",
      outcomes: [
        "Average response time under 10 seconds",
        "15–20 hours of manual replies saved every week",
        "Higher close rates because no message goes ignored",
      ],
      audience: ["Real estate", "Clinics & scheduling", "Retail & e-commerce", "B2B services", "Education & training"],
      scenarios: [
        { when: "2:14am. A prospect types 'how much is it?'", what: "The agent quotes in 8 seconds, spots buying intent, books a 9:30am call — before you wake up." },
        { when: "Monday chaos, 40 messages hit at once", what: "The agent handles them all in parallel, surfaces the 6 hot leads, and pings you with a short summary." },
        { when: "A customer asks something technical", what: "The agent routes to the right human with a conversation summary logged to CRM — no friction for the customer." },
        { when: "An old lead goes quiet", what: "The agent notices the silence, sends a measured follow-up (not spammy), and revives the lead." },
      ],
      features: [
        { title: "Real Hebrew & English", body: "Natural phrasing, typo tolerance, slang — not rigid templates." },
        { title: "Wired into everything", body: "CRM (Zoho/HubSpot/Monday), calendars, invoicing, payments — all flowing." },
        { title: "Clear red lines", body: "You decide what the agent can say, can't say, and when to hand off." },
        { title: "Learns over time", body: "Every conversation gets reviewed; the agent improves week over week." },
      ],
      timeline: [
        { phase: "Scope & tone", duration: "2 days", detail: "We sit together, define voice, FAQs, closing scripts." },
        { phase: "API & build", duration: "5 days", detail: "WhatsApp Business approval, agent build, CRM integration." },
        { phase: "Shadow testing", duration: "3 days", detail: "50+ test conversations, tuning, sales-team sign-off." },
        { phase: "Launch + 14-day babysit", duration: "14 days", detail: "Daily monitoring, continuous tweaks, optimization review at day 14." },
      ],
      integrations: ["WhatsApp Business API", "n8n", "Zoho CRM", "HubSpot", "Monday", "Pipedrive", "Google Calendar", "Outlook", "Stripe"],
      tiers: [
        { name: "Starter", price: "₪3,500", highlights: ["FAQ answering", "First-pass lead filtering", "Human handoff", "Single CRM integration"] },
        { name: "Professional", price: "₪5,500", featured: true, highlights: ["Everything in Starter", "Active selling agent", "Quoting & closing", "Automated follow-ups", "2 integrations"] },
        { name: "Custom", price: "₪7,000+", highlights: ["Everything in Pro", "Deep core-system integration", "Complex flows (payments, logistics)", "Extended monthly support"] },
      ],
      pricingNote: "Third-party costs (WhatsApp API + AI tokens): ₪100–₪500/month based on volume. Setup is a one-time fee.",
      faq: [
        { q: "What does it really cost per month after setup?", a: "Volume-based. For 300–800 conversations/month expect ₪150–₪400 in API + AI costs, paid direct to the vendors (Meta, OpenAI). No markup from us." },
        { q: "What if the agent gives a wrong answer?", a: "We define red-line topics where the agent must hand off to a human. For everything else we run 50+ simulated conversations before launch and monitor data for the first two weeks." },
        { q: "Who owns the agent?", a: "You do. Code, configuration, conversation history — all yours. We don't lock you in. If you want to switch providers, you can." },
        { q: "Is this for small 3-5 person teams?", a: "Absolutely. Missed late-night leads hurt small teams the most — that's where automation pays back fastest." },
        { q: "When do I see results?", a: "Response time improves on day one. ROI typically within 3–6 months depending on lead volume." },
      ],
      crossSell: ["lead-management", "smart-crm", "voice-agent"],
      ctaPrimary: "Launch my agent",
      ctaSecondary: "See how it works",
      whatsappMessage: "Hi, I'm interested in a WhatsApp agent for my business. Can I see a demo?",
    },
  },
  {
    slug: "voice-agent",
    icon: "Phone",
    accent: "cyan",
    isNew: true,
    startingPrice: 6000,
    he: {
      nav: "סוכן AI קולי",
      title: "עונה לטלפון. מבין עברית.",
      titleHighlight: "לא לוקח חופשה.",
      subtitle: "סוכן AI קולי שמקבל שיחות נכנסות, יוזם יוצאות, ומתאם פגישות בעברית טבעית — מסביב לשעון.",
      lead:
        "הקו שלכם מפסיק ״ללכת לתא קולי״. הסוכן זמין 24/7, מזהה את הלקוח, עונה על שאלות, קובע פגישה ביומן, ומעביר לאדם אנושי רק כשזה נדרש. גם שיחות יוצאות — תזכורות, אישור הזמנה, איסוף משוב.",
      outcomes: [
        "0 שיחות שהולכות לתא קולי",
        "קביעת פגישות אוטומטית מהשיחה — ישר ליומן",
        "תיעוד מלא של כל שיחה ב-CRM, כולל תמלול וסיכום",
      ],
      audience: ["קליניקות רפואיות", "מתווכי נדל״ן", "שירותי חירום ותחזוקה", "עורכי דין ורואי חשבון", "חברות שירות"],
      scenarios: [
        { when: "קליניקה, 18:30, המזכירה בבית", what: "לקוח חדש מצלצל, הסוכן עונה, מציע שלושה חלונות פגישה שפנויים, וקובע ליום שני בבוקר." },
        { when: "יום ראשון בבוקר — עומס תזכורות לפגישות השבוע", what: "הסוכן מוציא 120 שיחות יוצאות, מקבל אישור או דחייה, ומעדכן את היומן אוטומטית." },
        { when: "שיחה שזקוקה לרופא ספציפית", what: "הסוכן מזהה, מעביר ישיר למכשיר של הרופא עם סיכום של 3 משפטים על הסיבה." },
      ],
      features: [
        { title: "עברית טבעית", body: "לא קול רובוטי. נעים, ברור, עם קצב שיחה אנושי." },
        { title: "מזהה כוונה", body: "יודע מתי לקבוע פגישה, מתי לענות על שאלה, ומתי להעביר לאדם." },
        { title: "רב-לשוני", body: "עברית, אנגלית, ערבית, רוסית — זיהוי שפה אוטומטי לפי הדובר." },
        { title: "תמלול וסיכום", body: "כל שיחה מתומללת, מסוכמת ומחוברת לכרטיס הלקוח ב-CRM." },
      ],
      timeline: [
        { phase: "אפיון שיחות", duration: "3 ימים", detail: "מיפוי תסריטי שיחה, קולות, FAQ והעברות." },
        { phase: "בנייה", duration: "5 ימים", detail: "בחירת קול, התאמת דיאלוג, אימון על מסמכי העסק." },
        { phase: "חיבור יומנים ו-CRM", duration: "4 ימים", detail: "Google/Outlook, n8n, CRM, טלפוניה נכנסת." },
        { phase: "השקה", duration: "3 ימים", detail: "הפעלה, מעקב, טיונינג יומי." },
      ],
      integrations: ["Twilio", "ElevenLabs", "n8n", "Google Calendar", "Outlook", "Zoho CRM", "HubSpot", "MyClinic", "Clio"],
      tiers: [
        { name: "בסיסי", price: "₪6,000", highlights: ["שיחות נכנסות בלבד", "FAQ + תיאום", "חיבור יומן יחיד"] },
        { name: "מקצועי", price: "₪9,000", featured: true, highlights: ["נכנסות + יוצאות", "רב-לשוני", "חיבור CRM מלא", "תמלול וסיכום AI"] },
        { name: "מותאם אישית", price: "₪14,000+", highlights: ["מספר קווים", "תרחישי מכירה מורכבים", "אנליטיקס מתקדם", "SLA מורחב"] },
      ],
      pricingNote: "עלות דקות דיבור: כ-0.08–0.15 ₪ לדקה (Twilio + ElevenLabs). משולם ישירות לספקים.",
      faq: [
        { q: "זה לא יהיה כמו IVR רובוטי עם '1 לשירות'?", a: "לא. זו שיחה רציפה ללא תפריטים. הסוכן מבין ״אני רוצה לקבוע תור לחודש הבא״ ומגיב ישר." },
        { q: "מה קורה אם הלקוח מתעצבן על 'בוט'?", a: "הסוכן מזהה תסכול וממהר להעביר לאדם. אנחנו מודדים את זה: בפועל רוב הלקוחות לא שמים לב שזה AI." },
        { q: "אתם שומרים על פרטיות רפואית/רגישה?", a: "כל המערכת רצה באירופה/ישראל, תמלולים נשמרים מוצפנים ונמחקים לפי מדיניות שתגדיר. תואם דרישות רגולטוריות." },
        { q: "כמה זה חוסך למזכירה שלי?", a: "בקליניקה ממוצעת (80–150 שיחות/יום) — בערך 3–4 שעות בכל יום פנויות לעבודה משמעותית יותר." },
      ],
      crossSell: ["scheduling", "whatsapp-agent", "smart-crm"],
      ctaPrimary: "לפתוח סוכן קולי",
      ctaSecondary: "להאזין לדוגמה",
      whatsappMessage: "היי, אני רוצה סוכן קולי לעסק. אפשר להאזין לדוגמה?",
    },
    en: {
      nav: "Voice AI Agent",
      title: "Answers every call. Understands Hebrew.",
      titleHighlight: "Never calls in sick.",
      subtitle: "An AI voice agent that takes inbound calls, makes outbound ones, and books meetings in natural Hebrew — 24/7.",
      lead:
        "Your line stops hitting voicemail. The agent picks up, answers questions, books into your calendar, and routes to a human only when needed. Also places outbound calls — reminders, confirmations, feedback.",
      outcomes: ["0 voicemails", "Meetings booked straight into the calendar", "Every call transcribed, summarized, logged to CRM"],
      audience: ["Medical clinics", "Real estate agents", "Emergency & maintenance services", "Lawyers & accountants", "Service businesses"],
      scenarios: [
        { when: "Clinic, 6:30pm, the front desk has gone home", what: "A new patient calls. The agent offers three open windows and books one for Monday morning." },
        { when: "Sunday morning — a wall of appointment reminders", what: "The agent places 120 outbound calls, confirms or reschedules, and updates the calendar." },
        { when: "A caller really needs to speak to Dr. Cohen", what: "The agent detects it, warm-transfers to her mobile with a 3-sentence summary." },
      ],
      features: [
        { title: "Natural Hebrew (and more)", body: "Not a robotic voice. Warm, clear, human cadence." },
        { title: "Intent detection", body: "Knows when to book, when to answer, when to escalate." },
        { title: "Multi-lingual", body: "Hebrew, English, Arabic, Russian — auto-detected per speaker." },
        { title: "Transcribe & summarize", body: "Every call transcribed, summarized, pinned to the CRM contact." },
      ],
      timeline: [
        { phase: "Dialog scoping", duration: "3 days", detail: "Map call scripts, voice selection, FAQs and handoffs." },
        { phase: "Build", duration: "5 days", detail: "Voice selection, dialog tuning, train on your docs." },
        { phase: "Calendar & CRM wiring", duration: "4 days", detail: "Google/Outlook, n8n, CRM, inbound telephony." },
        { phase: "Launch", duration: "3 days", detail: "Go-live, monitoring, daily tuning." },
      ],
      integrations: ["Twilio", "ElevenLabs", "n8n", "Google Calendar", "Outlook", "Zoho CRM", "HubSpot", "MyClinic", "Clio"],
      tiers: [
        { name: "Starter", price: "₪6,000", highlights: ["Inbound only", "FAQ + booking", "Single calendar"] },
        { name: "Professional", price: "₪9,000", featured: true, highlights: ["Inbound + outbound", "Multi-lingual", "Full CRM wiring", "AI transcripts & summaries"] },
        { name: "Custom", price: "₪14,000+", highlights: ["Multiple lines", "Complex sales flows", "Advanced analytics", "Extended SLA"] },
      ],
      pricingNote: "Talk minutes: ~₪0.08–0.15/min (Twilio + ElevenLabs), billed direct to providers.",
      faq: [
        { q: "Will this feel like a robotic IVR?", a: "No. It's a continuous conversation — no 'press 1' menus. 'I'd like to book for next month' → booked." },
        { q: "What if a caller gets frustrated?", a: "The agent detects frustration and hands off fast. In practice, most callers don't even realize it's AI." },
        { q: "Is it compliant with medical/sensitive data?", a: "Infrastructure runs in EU/Israel. Transcripts stored encrypted, purged per your policy. Meets regulatory requirements." },
        { q: "How much time does this save my receptionist?", a: "At a typical clinic (80–150 calls/day) — about 3–4 hours freed every day for higher-value work." },
      ],
      crossSell: ["scheduling", "whatsapp-agent", "smart-crm"],
      ctaPrimary: "Set up a voice agent",
      ctaSecondary: "Listen to a sample",
      whatsappMessage: "Hi, I want a voice agent for my business. Can I hear a sample?",
    },
  },
  {
    slug: "lead-management",
    icon: "Filter",
    accent: "indigo",
    startingPrice: 4000,
    he: {
      nav: "ניהול לידים",
      title: "כל ליד מקבל תשובה ב-30 שניות",
      titleHighlight: "גם זה ששלח ב-03:00",
      subtitle: "מערכת שמקבלת כל ליד מכל מקור, מסננת, מדרגת ומעבירה — אפס לידים שנשכחים, אפס גיליונות Excel.",
      lead:
        "הלידים זורמים מהאתר, פייסבוק, גוגל, וואטסאפ ופלטפורמות שותפים. מערכת הלידים שלנו קולטת את כולם בזמן אמת, מזהה תוכן, מדרגת לפי איכות, שולחת תגובה ראשונית, ומוסרת רק את החמים לאיש המכירות הנכון.",
      outcomes: ["תשובה ראשונית תוך פחות מ-30 שניות", "100% מהלידים מתועדים ב-CRM", "איש המכירות מקבל רק לידים בעלי כוונה ברורה"],
      audience: ["נדל״ן", "קליניקות", "שירותים מקצועיים", "B2B", "סוכנויות שיווק"],
      scenarios: [
        { when: "ליד נכנס מקמפיין פייסבוק ב-11:47 בלילה", what: "המערכת מזהה, שולחת הודעת וואטסאפ אישית, מתזמנת פולואפ ליום למחרת אם אין תגובה." },
        { when: "ליד כפול ממקורות שונים", what: "המערכת מאחדת, לא כופלת, ומסמנת כ׳חם במיוחד׳ — זה שעונה אלייך פעמיים." },
        { when: "ליד של בזבוז זמן (לא רלוונטי לגאוגרפיה/מחיר)", what: "מסתנן אוטומטית, מסומן, לא מפריע לאיש מכירות." },
      ],
      features: [
        { title: "קליטה מכל מקור", body: "אתר, פייסבוק, גוגל, אינסטגרם, וואטסאפ, TikTok Ads, טפסי שותפים." },
        { title: "סינון חכם", body: "מודל AI שמכיר את ה-ICP שלך ומדרג כל ליד מ-1 ל-10." },
        { title: "ניתוב אוטומטי", body: "לפי אזור, שפה, תקציב — ישר ליועץ הנכון, ב-CRM וב-WhatsApp שלו." },
        { title: "פולואפ מובנה", body: "אם הליד לא הגיב תוך X שעות — מהלך הבא רץ אוטומטית." },
      ],
      timeline: [
        { phase: "מיפוי מקורות", duration: "2 ימים", detail: "רשימת כל המקורות והטפסים, הגדרת שדות חובה." },
        { phase: "בניית זרימה", duration: "4 ימים", detail: "זרימת ה-n8n, התחברות למערכות, קריטריוני סינון." },
        { phase: "חיבור CRM וניתוב", duration: "3 ימים", detail: "כללי הקצאה, הודעות אוטומטיות, תזכורות." },
        { phase: "השקה ומדידה", duration: "3 ימים", detail: "מדידה, אופטימיזציה של קריטריונים." },
      ],
      integrations: ["n8n", "Zoho CRM", "HubSpot", "Monday", "Facebook Lead Ads", "Google Ads", "WhatsApp", "Zapier"],
      tiers: [
        { name: "בסיסי", price: "₪4,000", highlights: ["עד 2 מקורות", "סינון בסיסי", "מייל + CRM"] },
        { name: "מקצועי", price: "₪7,000", featured: true, highlights: ["ללא הגבלת מקורות", "סינון AI", "וואטסאפ + CRM", "פולואפ אוטומטי", "דוחות שבועיים"] },
        { name: "מותאם אישית", price: "בהתאמה", highlights: ["אינטגרציות מורכבות", "ICP מרובה", "אנליטיקס מתקדם", "ליווי חודשי"] },
      ],
      faq: [
        { q: "כמה לידים בחודש אתם תומכים?", a: "מ-50 עד 50,000 — הארכיטקטורה בנויה להסתגל. אין תוספת מחיר עבור נפח באחזקה." },
        { q: "אני כבר משתמש ב-CRM. צריך להחליף?", a: "לא. המערכת מתחברת לרוב ה-CRMs הפופולריים — אתה ממשיך לעבוד בכלי שאתה אוהב." },
        { q: "מה אם שיטת הסינון טועה ומסננת ליד טוב?", a: "בתחילת הדרך הכל עובר לסוכן + למקום מיון. אחרי שבועיים-שלושה של כיול, שיעור הטעויות יורד מתחת ל-3%." },
        { q: "מה ההבדל בין זה לבין סוכן וואטסאפ?", a: "הסוכן הוא איך מתקשרים. מערכת הלידים היא מה קורה מאחורי הקלעים — תיעדוף, ניתוב, סגירת לולאות. הם משלימים." },
      ],
      crossSell: ["whatsapp-agent", "smart-crm", "sales-service"],
      ctaPrimary: "להקים את המערכת",
      ctaSecondary: "איך זה נבנה",
      whatsappMessage: "היי, אני רוצה לשמוע על מערכת ניהול לידים לעסק שלי.",
    },
    en: {
      nav: "Lead Management",
      title: "Every lead gets a reply in 30 seconds",
      titleHighlight: "Including the 3am one",
      subtitle: "A system that captures every lead from every source, filters, ranks, and routes — zero leads forgotten, zero spreadsheets.",
      lead:
        "Leads arrive from your site, Facebook, Google, WhatsApp, partner forms. Our system ingests them in real time, detects content, scores quality, sends a first reply, and routes only the hot ones to the right rep.",
      outcomes: ["First reply in under 30 seconds", "100% of leads logged to CRM", "Reps only see leads with clear intent"],
      audience: ["Real estate", "Clinics", "Professional services", "B2B", "Marketing agencies"],
      scenarios: [
        { when: "A lead comes in from a Facebook campaign at 11:47pm", what: "System detects, sends a personalized WhatsApp reply, schedules next-day follow-up if no response." },
        { when: "Duplicate lead from two sources", what: "Dedup'd, not counted twice, flagged 'extra warm' — this one replied to you twice." },
        { when: "Time-waster lead (wrong region/budget)", what: "Auto-filtered, tagged, never bothers your rep." },
      ],
      features: [
        { title: "All sources in one pipe", body: "Site, Facebook, Google, Instagram, WhatsApp, TikTok Ads, partner forms." },
        { title: "Smart scoring", body: "AI model trained on your ICP, scores each lead 1–10." },
        { title: "Auto-routing", body: "By region, language, budget — straight to the right rep's CRM + WhatsApp." },
        { title: "Built-in follow-up", body: "If no response within X hours — next play fires automatically." },
      ],
      timeline: [
        { phase: "Source mapping", duration: "2 days", detail: "Inventory all sources and forms, define required fields." },
        { phase: "Flow build", duration: "4 days", detail: "n8n flow, system wiring, filtering rules." },
        { phase: "CRM + routing", duration: "3 days", detail: "Assignment rules, automated messages, reminders." },
        { phase: "Launch & tune", duration: "3 days", detail: "Measurement, criteria refinement." },
      ],
      integrations: ["n8n", "Zoho CRM", "HubSpot", "Monday", "Facebook Lead Ads", "Google Ads", "WhatsApp", "Zapier"],
      tiers: [
        { name: "Starter", price: "₪4,000", highlights: ["Up to 2 sources", "Basic filtering", "Email + CRM"] },
        { name: "Professional", price: "₪7,000", featured: true, highlights: ["Unlimited sources", "AI filtering", "WhatsApp + CRM", "Auto follow-up", "Weekly reports"] },
        { name: "Custom", price: "Quote", highlights: ["Complex integrations", "Multiple ICPs", "Advanced analytics", "Monthly retainer"] },
      ],
      faq: [
        { q: "How many leads/month do you support?", a: "From 50 to 50,000 — the architecture scales. No volume surcharge on the retainer." },
        { q: "I already have a CRM. Do I need to switch?", a: "No. We integrate with most popular CRMs — keep working in the tool you love." },
        { q: "What if scoring gets a good lead wrong?", a: "First two weeks everything also goes to a review queue. After tuning, error rate drops below 3%." },
        { q: "How is this different from the WhatsApp agent?", a: "The agent is how you communicate. Lead management is the backstage — prioritization, routing, loop-closing. They complement each other." },
      ],
      crossSell: ["whatsapp-agent", "smart-crm", "sales-service"],
      ctaPrimary: "Set up the system",
      ctaSecondary: "How it's built",
      whatsappMessage: "Hi, I'd like to hear about a lead management system.",
    },
  },
  {
    slug: "automation",
    icon: "Workflow",
    accent: "indigo",
    startingPrice: 5000,
    he: {
      nav: "אוטומציה עסקית",
      title: "חיבור בין כל המערכות שלך.",
      titleHighlight: "פעם אחת. לתמיד.",
      subtitle: "ה-CRM, הוואטסאפ, החשבוניות, המלאי, היומן — מפסיקים לעבוד בנפרד ומתחילים לזרום אחד לשני.",
      lead:
        "רוב העסק הישראלי הקטן מאבד 2–3 שעות ביום על העתקה-הדבקה בין מערכות. אנחנו מחברים את כל המערכות דרך n8n, AI ו-APIs כך שכל אירוע בעסק אחד (ליד, הזמנה, סיום עבודה) מפעיל אוטומטית את מה שצריך לקרות במערכות האחרות.",
      outcomes: ["פחות 15+ שעות/שבוע של עבודה ידנית", "0 טעויות העתקה בין מערכות", "נתונים בזמן אמת בכל מקום"],
      audience: ["עסקים שעובדים עם 3+ מערכות", "חנויות אונליין", "סוכנויות שיווק", "צוותי מכירות", "משרדי שירותים מקצועיים"],
      scenarios: [
        { when: "לקוח סוגר עסקה בוואטסאפ", what: "חשבונית מונפקת, תשלום נסלח, CRM מתעדכן, משימה פותחת בצוות הפרויקט, מייל 'תודה' נשלח — בלי שנגעת במחשב." },
        { when: "מלאי מוצר X יורד מתחת ל-5", what: "הזמנה אוטומטית לספק, התראה בסלאק למנהל, עדכון בחנות — לא תלוי שמישהו יזכור." },
        { when: "חודש חדש מתחיל", what: "דוחות מכירות מופקים אוטומטית, נשלחים למנהלים, סיכומים ב-CRM מתעדכנים." },
      ],
      features: [
        { title: "אוטומציה מבוססת אירועים", body: "כל טריגר ב-X מפעיל פעולה ב-Y. אין קרון-ג׳וב עיוור." },
        { title: "AI במוקדי החלטה", body: "שיבוץ ליד, ניתוב תלונה, סיכום שיחה — החלטות חכמות, לא כללי if-else קשיחים." },
        { title: "שקיפות מלאה", body: "לוח בקרה שמראה בדיוק מה רץ, מה נכשל, ולמה." },
        { title: "ללא תלות בספק", body: "הכל בנוי על n8n שבבעלותך — לא נועלים אותך במערכת סגורה." },
      ],
      timeline: [
        { phase: "מיפוי תהליכים", duration: "2 ימים", detail: "מיפוי כל זרימת עבודה שמכניסה כסף או חוסכת זמן." },
        { phase: "עיצוב ותכנון", duration: "2 ימים", detail: "הגדרת אילו אוטומציות נבנות, באיזה סדר ומה ה-ROI לכל אחת." },
        { phase: "בנייה", duration: "5 ימים", detail: "בניית זרימות ה-n8n, כולל טיפול בשגיאות ולוגים." },
        { phase: "חיבור מערכות", duration: "3 ימים", detail: "אינטגרציה עם CRM, חשבוניות, חנות, מייל, וואטסאפ." },
        { phase: "בדיקות ואופטימיזציה", duration: "2 ימים", detail: "בדיקות קצה-לקצה, עומסים, תיקוני חיים." },
        { phase: "השקה", duration: "יום 1", detail: "הפעלה, הדרכת צוות, חומר הדרכה כתוב." },
      ],
      integrations: ["n8n", "Zoho", "HubSpot", "Monday", "Pipedrive", "Google Workspace", "Microsoft 365", "Stripe", "Morning+", "CardCom", "Shopify", "WooCommerce"],
      tiers: [
        { name: "בסיסי", price: "₪5,000", highlights: ["חיבור 2–3 מערכות", "אוטומציית לידים", "סנכרון CRM"] },
        { name: "מקצועי", price: "₪8,000", featured: true, highlights: ["הכל מהבסיסי", "גבייה וחשבוניות", "פולואפים", "דשבורד KPI"] },
        { name: "מותאם אישית", price: "בהתאמה", highlights: ["APIs מותאמים", "בוטי AI מורכבים", "אנליטיקה מתקדמת", "SLA"] },
      ],
      pricingNote: "תשלום חד-פעמי. עלויות צד ג׳ (API, מנויי SaaS) משולמות על ידך ישירות.",
      faq: [
        { q: "האוטומציה שייכת לי? מה אם אחליף ספק?", a: "הכל רץ על n8n בשרת שלך (או אצלנו, לבחירתך). הקוד, ה-workflows וההגדרות בבעלותך המלאה." },
        { q: "עם אילו מערכות אפשר להתחבר?", a: "כל מערכת עם API, Webhook או חיבור דרך Zapier/Make. בפועל — כל מה ששמעת עליו." },
        { q: "מה המחיר בחודש אחרי ההקמה?", a: "תלוי בתחזוקה שבוחר. עסקים רבים עוברים להפעלה עצמאית. אם רוצים ליווי: מ-₪350/חודש." },
        { q: "אני עסק קטן — זה לא יותר מדי בשבילי?", a: "לא. אנחנו נתחיל מ-2–3 אוטומציות שיחסכו לך הכי הרבה זמן, ומוסיפים לפי קצב הצמיחה." },
      ],
      crossSell: ["smart-crm", "lead-management", "consultation"],
      ctaPrimary: "למפות את העסק שלי",
      ctaSecondary: "דוגמאות לזרימות",
      whatsappMessage: "היי, מעניין אותי לחבר בין המערכות בעסק. אפשר שיחת היכרות?",
    },
    en: {
      nav: "Business Automation",
      title: "All your tools, finally talking.",
      titleHighlight: "Wire it up once.",
      subtitle: "CRM, WhatsApp, invoicing, inventory, calendar — stop working in silos and start flowing together.",
      lead:
        "Most small businesses lose 2–3 hours/day copying between systems. We wire them together with n8n, AI, and APIs so every event in one (lead, order, job done) triggers whatever needs to happen in the others.",
      outcomes: ["15+ hours/week of manual work gone", "0 copy-paste errors across systems", "Real-time data everywhere"],
      audience: ["Businesses with 3+ tools", "Online stores", "Marketing agencies", "Sales teams", "Professional services"],
      scenarios: [
        { when: "Customer closes a deal on WhatsApp", what: "Invoice issued, payment captured, CRM updated, project task opened, thank-you email sent — without you touching anything." },
        { when: "Inventory for SKU-X drops below 5", what: "Auto-PO to supplier, Slack alert to manager, store updated — doesn't depend on anyone remembering." },
        { when: "A new month begins", what: "Sales reports auto-generated, mailed to managers, CRM summaries updated." },
      ],
      features: [
        { title: "Event-driven", body: "Any trigger in X fires an action in Y. No blind cron jobs." },
        { title: "AI at decision points", body: "Lead routing, ticket triage, call summarization — smart decisions, not rigid if-else." },
        { title: "Full transparency", body: "Dashboard shows exactly what's running, failing, and why." },
        { title: "Vendor-independent", body: "Built on n8n — yours to own. No black-box lock-in." },
      ],
      timeline: [
        { phase: "Process mapping", duration: "2 days", detail: "Map every workflow that earns money or saves time." },
        { phase: "Design", duration: "2 days", detail: "Which automations, what order, ROI per each." },
        { phase: "Build", duration: "5 days", detail: "n8n flows with error handling and logs." },
        { phase: "System wiring", duration: "3 days", detail: "CRM, invoicing, store, email, WhatsApp." },
        { phase: "Test & tune", duration: "2 days", detail: "End-to-end, load, live fixes." },
        { phase: "Launch", duration: "1 day", detail: "Go-live, team training, written handoff." },
      ],
      integrations: ["n8n", "Zoho", "HubSpot", "Monday", "Pipedrive", "Google Workspace", "Microsoft 365", "Stripe", "Morning+", "CardCom", "Shopify", "WooCommerce"],
      tiers: [
        { name: "Starter", price: "₪5,000", highlights: ["2–3 systems connected", "Lead automation", "CRM sync"] },
        { name: "Professional", price: "₪8,000", featured: true, highlights: ["Everything in Starter", "Billing + invoicing", "Follow-ups", "KPI dashboard"] },
        { name: "Custom", price: "Quote", highlights: ["Custom APIs", "Complex AI bots", "Advanced analytics", "SLA"] },
      ],
      pricingNote: "One-time setup. Third-party costs (APIs, SaaS) paid directly by you.",
      faq: [
        { q: "Do I own the automations?", a: "Yes — all workflows run on n8n (your server or ours, you pick). Code, flows, configs are yours." },
        { q: "What systems can you connect?", a: "Anything with an API, webhook, or Zapier/Make connector. In practice: everything you've heard of." },
        { q: "Monthly cost after setup?", a: "Depends on support tier. Many clients self-operate. Managed support from ₪350/month." },
        { q: "I'm a small business — is this overkill?", a: "No. We start with the 2–3 automations that save you the most, expand as you grow." },
      ],
      crossSell: ["smart-crm", "lead-management", "consultation"],
      ctaPrimary: "Map my business",
      ctaSecondary: "See example flows",
      whatsappMessage: "Hi, interested in connecting the systems in my business.",
    },
  },
  {
    slug: "smart-crm",
    icon: "Database",
    accent: "violet",
    startingPrice: 2000,
    he: {
      nav: "CRM חכם",
      title: "מאקסל ופתקים ל-CRM שעובד לבד",
      titleHighlight: "תוך שבועיים",
      subtitle: "הטמעת CRM שמתחיל לעבוד מהיום הראשון — נתונים מיובאים, אוטומציות פעילות, הצוות מאומן.",
      lead:
        "CRM הוא הלב של העסק — אבל רוב המערכות נשארות ריקות כי ההטמעה כושלת. אצלנו אתה מקבל CRM (Zoho / HubSpot / Monday) שמוכן עם הנתונים שלך, חוקי אוטומציה מוטמעים, ווחוזה שהצוות יאמץ.",
      outcomes: ["כל הלקוחות והלידים במקום אחד", "פעילות מתועדת אוטומטית — אפס רישום ידני", "דוחות שאתה באמת מסתכל עליהם"],
      audience: ["עסקים קטנים-בינוניים", "קמעונאות", "קליניקות", "שירותים מקצועיים", "נדל״ן, משפט, ראיית חשבון"],
      scenarios: [
        { when: "לקוח מתקשר", what: "המערכת מזהה לפי המספר, פותחת את הכרטיס, מציגה היסטוריה מלאה, מוכנה לרישום." },
        { when: "סוף שבוע, סיכום פעילות", what: "המערכת מייצרת סיכום אוטומטי: עסקאות חדשות, לידים חמים, משימות פתוחות." },
        { when: "איש מכירות חדש מצטרף", what: "בתוך שעה יש לו גישה לכל ההיסטוריה של הלקוחות שלו — הכל מתועד." },
      ],
      features: [
        { title: "כרטיס לקוח מרכזי", body: "כל שיחה, הודעה, הצעת מחיר, חשבונית — במקום אחד." },
        { title: "אוטומציות מובנות", body: "תזכורות, פולואפים, עדכוני סטטוס — בלי שתזכרו." },
        { title: "משפך מכירות ויזואלי", body: "רואים בדיוק איפה כל עסקה ומה חוסם." },
        { title: "דוחות שאפשר לקרוא", body: "לא ים של גרפים — דוחות ממוקדים שמכוונים החלטות." },
      ],
      timeline: [
        { phase: "אבחון", duration: "2 ימים", detail: "המצב הנוכחי, שאיפות, בחירת פלטפורמה." },
        { phase: "בחירה והטמעה", duration: "4 ימים", detail: "ייבוא נתונים, הגדרות, תהליכים." },
        { phase: "חיבור אוטומציות n8n", duration: "3 ימים", detail: "אוטומציות חכמות, חיבור וואטסאפ, חשבונית, מייל." },
        { phase: "הדרכת צוות", duration: "2 ימים", detail: "סדנאות, חומר כתוב, תמיכה." },
        { phase: "אופטימיזציה", duration: "4 ימים", detail: "שבועיים של שיפורים יומיומיים לפי התנהגות." },
      ],
      integrations: ["Zoho CRM", "HubSpot", "Monday CRM", "Pipedrive", "n8n", "WhatsApp", "Gmail", "Outlook", "Morning+", "CardCom"],
      tiers: [
        { name: "כניסה", price: "₪2,000", highlights: ["הטמעה בסיסית", "ייבוא נתונים", "1 משתמש", "אוטומציה ראשונית"] },
        { name: "מנוע צמיחה", price: "₪4,000", featured: true, highlights: ["עד 5 משתמשים", "אוטומציות מובנות", "חיבור וואטסאפ", "דוחות"] },
        { name: "קסטומיזציה מלאה", price: "₪6,000+", highlights: ["משתמשים ללא הגבלה", "אינטגרציות מתקדמות", "תהליכים מותאמים", "אימונים ייעודיים"] },
      ],
      faq: [
        { q: "איזה CRM אתם ממליצים?", a: "תלוי בעסק. Zoho לעסקים קטנים עם תקציב, HubSpot למכירות מובנות, Monday לצוותים שאוהבים חזותיות. נחליט יחד באפיון." },
        { q: "האם אפשר להעביר נתונים ממערכת קיימת?", a: "כן. אנחנו מייבאים מ-Excel, גוגל שיטס, או כל CRM ישן. הפרטים שלכם נשארים אצלכם." },
        { q: "מה אם הצוות לא רוצה להשתמש?", a: "הסיבה הכי נפוצה לכישלון. אנחנו מגיעים עם תהליך אימוץ מובנה: סדנאות, תסריטי שימוש, וליווי אישי בשבועיים הראשונים." },
        { q: "יש עלויות חודשיות?", a: "מנוי ל-CRM משולם ישירות לספק (Zoho מ-$14/משתמש/חודש). אנחנו לא גובים עמלה על זה." },
      ],
      crossSell: ["automation", "lead-management", "whatsapp-agent"],
      ctaPrimary: "להטמיע CRM",
      ctaSecondary: "לראות דוגמה",
      whatsappMessage: "היי, אני רוצה להטמיע CRM בעסק. אפשר אבחון?",
    },
    en: {
      nav: "Smart CRM",
      title: "From spreadsheets to a CRM that runs itself",
      titleHighlight: "in two weeks",
      subtitle: "A CRM implementation that actually gets used — your data imported, automations live, team trained.",
      lead:
        "CRM is the heart of your business — but most implementations fail because the rollout does. You get a CRM (Zoho / HubSpot / Monday) populated with your data, automations wired, and a team that adopts it.",
      outcomes: ["All customers and leads in one place", "Activity logged automatically — no manual entry", "Reports you actually read"],
      audience: ["SMBs", "Retail", "Clinics", "Professional services", "Real estate, legal, accounting"],
      scenarios: [
        { when: "A customer calls", what: "System IDs by number, opens the contact card, full history ready — you start talking." },
        { when: "End-of-week wrap-up", what: "Auto-generated summary: new deals, hot leads, open tasks." },
        { when: "A new rep joins", what: "Within an hour they have full history on their accounts — everything's recorded." },
      ],
      features: [
        { title: "Unified contact card", body: "Every call, message, quote, invoice — one place." },
        { title: "Built-in automations", body: "Reminders, follow-ups, stage updates — without you remembering." },
        { title: "Visual sales funnel", body: "See every deal and what's blocking it." },
        { title: "Readable reports", body: "Not a wall of charts — focused reports that drive decisions." },
      ],
      timeline: [
        { phase: "Discovery", duration: "2 days", detail: "Current state, goals, platform choice." },
        { phase: "Setup", duration: "4 days", detail: "Data import, configuration, workflows." },
        { phase: "n8n automations", duration: "3 days", detail: "Smart flows, WhatsApp, invoicing, email." },
        { phase: "Team training", duration: "2 days", detail: "Workshops, docs, support." },
        { phase: "Optimization", duration: "4 days", detail: "Two weeks of daily tuning based on usage." },
      ],
      integrations: ["Zoho CRM", "HubSpot", "Monday CRM", "Pipedrive", "n8n", "WhatsApp", "Gmail", "Outlook", "Morning+", "CardCom"],
      tiers: [
        { name: "Entry", price: "₪2,000", highlights: ["Basic setup", "Data import", "1 user", "First automation"] },
        { name: "Growth Engine", price: "₪4,000", featured: true, highlights: ["Up to 5 users", "Built-in automations", "WhatsApp wiring", "Reports"] },
        { name: "Custom Empire", price: "₪6,000+", highlights: ["Unlimited users", "Advanced integrations", "Custom workflows", "Dedicated training"] },
      ],
      faq: [
        { q: "Which CRM do you recommend?", a: "Depends. Zoho for budget-minded SMBs, HubSpot for structured sales, Monday for visual teams. We decide together in discovery." },
        { q: "Can you migrate from our current system?", a: "Yes — Excel, Sheets, or any legacy CRM. Your data stays yours." },
        { q: "What if the team refuses to use it?", a: "Most common failure mode. We include a structured adoption plan: workshops, usage scripts, 2-week babysit." },
        { q: "Monthly costs?", a: "CRM subscription paid direct to the vendor (Zoho from $14/user/mo). We take no commission." },
      ],
      crossSell: ["automation", "lead-management", "whatsapp-agent"],
      ctaPrimary: "Implement CRM",
      ctaSecondary: "See an example",
      whatsappMessage: "Hi, I want to implement a CRM. Can we talk?",
    },
  },
  {
    slug: "sales-service",
    icon: "TrendingUp",
    accent: "emerald",
    startingPrice: 4000,
    he: {
      nav: "מכירות ושירות",
      title: "סוכן מכירות שלא מפספס לידים,",
      titleHighlight: "לא שוכח פולואפ, לא לוקח עמלה",
      subtitle: "סוכן AI שמבצע את תהליך המכירה מקצה לקצה — מהליד הראשון עד הסגירה, 24/7.",
      lead:
        "הצוות שלך טוב. אבל הצוות ישן, הצוות חולה, והצוות מתפזר. הסוכן שלנו עובד במקביל לצוות: מזהה כוונה לקנייה, מציג מוצרים, מטפל בהתנגדויות, מציע מחיר — ורק בסוף מעביר לאדם להשלים.",
      outcomes: ["סגירות מהירות יותר — זמן תגובה יורד מ-4 שעות ל-4 דקות", "הצוות שלך מתעסק רק בלידים חמים", "אפס לידים שנשכחים"],
      audience: ["חנויות אונליין", "נדל״ן ויזמות", "קליניקות ושירותי בריאות", "חינוך והדרכה", "שירותים מקצועיים", "SaaS"],
      scenarios: [
        { when: "לקוח שואל 'מה ההבדל בין X ל-Y?'", what: "הסוכן עונה מיידית, מראה טבלת השוואה, ושואל מה חשוב לו — מתמרן לעבר סגירה." },
        { when: "לקוח אומר 'זה יקר מדי'", what: "הסוכן מזהה את ההתנגדות, שואל למה, ומציע חבילה חלופית או תנאי תשלום — לפי תסריט שאתה אישרת." },
        { when: "לקוח 'אני אחשוב ואחזור'", what: "הסוכן שולח סיכום + חומר עזר, קובע פולואפ ל-48 שעות, ומסמן כ׳חם׳." },
      ],
      features: [
        { title: "תסריטי מכירה שלך", body: "הסוכן מאומן על הכלים שהצוות שלך משתמש בהם — טון, תשובות נפוצות, הצעות ערך." },
        { title: "טיפול בהתנגדויות", body: "מחיר, תזמון, השוואה למתחרה, צורך עכשווי — יש מענה לכולן." },
        { title: "אינטגרציה עם תשלום", body: "אפשר לסגור עסקה עם קישור לתשלום ישיר בשיחה." },
        { title: "העברה חכמה", body: "כשההזדמנות מעל X ₪ או שהלקוח מתקשה — אדם נכנס." },
      ],
      timeline: [
        { phase: "אפיון ותסריטים", duration: "שבוע", detail: "הבנת המוצר, התנגדויות נפוצות, תסריטי סגירה." },
        { phase: "אימון הסוכן", duration: "שבוע", detail: "הזנת ידע, סימולציות, כיול." },
        { phase: "אינטגרציה ובדיקות", duration: "שבוע", detail: "CRM, תשלום, יומן, בדיקות סגירה." },
        { phase: "השקה ואופטימיזציה", duration: "שבועיים", detail: "ניטור, שיפור שבועי, סבב משוב." },
      ],
      integrations: ["WhatsApp", "Website chat", "Instagram DM", "n8n", "Stripe", "CardCom", "CRM שלך", "Google Calendar"],
      tiers: [
        { name: "בסיסי", price: "₪4,000", highlights: ["אוטומציית שירות לקוחות", "תשובות למוצר ושאלות נפוצות"] },
        { name: "מקצועי", price: "₪6,000", featured: true, highlights: ["מכירה פעילה", "טיפול בהתנגדויות", "Upsell + cross-sell", "פולואפ אוטומטי"] },
        { name: "מותאם אישית", price: "₪8,000+", highlights: ["אינטגרציה מלאה", "מספר ערוצים", "תסריטי B2B מורכבים", "ליווי חודשי"] },
      ],
      faq: [
        { q: "זה מחליף את אנשי המכירות שלי?", a: "לא. זה מכין אותם לסגירה. אנשי המכירות שלך מקבלים לידים כבר מחוממים, עם היסטוריה מלאה, ומתפנים לסגור — לא לברר." },
        { q: "מה אם הסוכן יטעה בהצעת מחיר?", a: "יש שכבת אישור: הסוכן יכול לצטט רק מרשימת מחירים שאישרת. כל חריגה — עוברת לאדם." },
        { q: "זה מתאים גם ל-B2B?", a: "כן. ב-B2B הסוכן בדרך כלל מתמקד בשלב ה-qualification ובזמן התגובה, לא בסגירה — אבל גם שם הוא חוסך שעות." },
        { q: "כמה ROI אני יכול לצפות?", a: "לקוחות רואים בממוצע 25–40% עלייה בשיעור ההמרה מליד לשיחה, ו-10–20% בשיעור הסגירה." },
      ],
      crossSell: ["whatsapp-agent", "lead-management", "smart-crm"],
      ctaPrimary: "להפעיל סוכן מכירות",
      ctaSecondary: "לראות איך מוכרים",
      whatsappMessage: "היי, אני רוצה סוכן מכירות AI לעסק.",
    },
    en: {
      nav: "Sales & Service Agent",
      title: "A sales rep that doesn't miss leads,",
      titleHighlight: "doesn't forget follow-ups, doesn't take commission",
      subtitle: "An AI agent that runs the full sales motion — from first touch to close — 24/7.",
      lead:
        "Your team is great. But your team sleeps, gets sick, gets distracted. Our agent works in parallel: detects buying intent, presents products, handles objections, quotes prices — and only hands off to a human for the finish line.",
      outcomes: ["Faster closes — response drops from 4 hours to 4 minutes", "Your team only touches hot leads", "Zero leads forgotten"],
      audience: ["Online stores", "Real estate & development", "Clinics & healthcare", "Education & training", "Professional services", "SaaS"],
      scenarios: [
        { when: "Prospect asks 'what's the difference between X and Y?'", what: "Agent answers instantly with comparison, asks what matters to them — steers toward close." },
        { when: "'It's too expensive'", what: "Agent detects the objection, probes why, offers alternative package or payment terms — per the script you approved." },
        { when: "'Let me think about it'", what: "Agent sends summary + collateral, books follow-up in 48h, tags 'warm'." },
      ],
      features: [
        { title: "Your scripts", body: "Trained on the materials your team uses — tone, FAQs, value props." },
        { title: "Objection handling", body: "Price, timing, competitor comparison, current need — all covered." },
        { title: "Payment integration", body: "Close a deal with a direct payment link in-chat." },
        { title: "Smart handoff", body: "Deals above ₪X or stuck customers — a human steps in." },
      ],
      timeline: [
        { phase: "Scoping & scripts", duration: "1 week", detail: "Product understanding, common objections, closing scripts." },
        { phase: "Agent training", duration: "1 week", detail: "Knowledge load, simulations, tuning." },
        { phase: "Integration & test", duration: "1 week", detail: "CRM, payment, calendar, close tests." },
        { phase: "Launch & optimize", duration: "2 weeks", detail: "Monitoring, weekly improvements, feedback loop." },
      ],
      integrations: ["WhatsApp", "Website chat", "Instagram DM", "n8n", "Stripe", "CardCom", "Your CRM", "Google Calendar"],
      tiers: [
        { name: "Starter", price: "₪4,000", highlights: ["Customer service automation", "Product & FAQ answering"] },
        { name: "Professional", price: "₪6,000", featured: true, highlights: ["Active selling", "Objection handling", "Upsell + cross-sell", "Auto follow-up"] },
        { name: "Custom", price: "₪8,000+", highlights: ["Full integration", "Multi-channel", "Complex B2B scripts", "Monthly retainer"] },
      ],
      faq: [
        { q: "Does this replace my sales team?", a: "No — it warms leads for them. Reps get pre-qualified leads with full history and focus on closing, not discovery." },
        { q: "What if the agent mis-quotes?", a: "Guardrail: agent can only quote from an approved price list. Anything outside → human." },
        { q: "Does it work for B2B?", a: "Yes. In B2B the agent usually focuses on qualification and response time rather than closing — still saves hours." },
        { q: "What ROI can I expect?", a: "Clients typically see 25–40% lift in lead-to-conversation rate, 10–20% lift in close rate." },
      ],
      crossSell: ["whatsapp-agent", "lead-management", "smart-crm"],
      ctaPrimary: "Deploy sales agent",
      ctaSecondary: "See it sell",
      whatsappMessage: "Hi, I want an AI sales agent for my business.",
    },
  },
  {
    slug: "scheduling",
    icon: "Calendar",
    accent: "amber",
    startingPrice: 3000,
    he: {
      nav: "קביעת תורים",
      title: "יומן מלא.",
      titleHighlight: "בלי טלפון אחד.",
      subtitle: "לקוחות קובעים, מזיזים ומבטלים פגישות בעצמם — בוואטסאפ, באתר, או בטלפון חכם.",
      lead:
        "המזכירה לא חייבת להישאר בטלפון. המערכת מציגה ללקוח רק חלונות פנויים, קובעת, שולחת תזכורת, ואם הלקוח צריך לשנות — הוא עושה את זה בעצמו. התוצאה: פחות no-show, פחות שעות מזכירות, פחות טעויות יומן.",
      outcomes: ["ירידה של 40–60% בפגישות שנשכחות", "שעות מזכירות שחוזרות אליך", "אפס פגישות כפולות"],
      audience: ["קליניקות שיניים ורפואה", "מאמנים ומאמנות", "יועצים עסקיים", "סלוני יופי", "מורים פרטיים", "משרדי שירותים מקצועיים"],
      scenarios: [
        { when: "לקוח שולח 'אני רוצה להקדים את הפגישה'", what: "הבוט מציג חלונות מוקדמים, הלקוח לוחץ, היומן מתעדכן, אישור חוזר — הכול תוך 40 שניות." },
        { when: "יום לפני הפגישה", what: "תזכורת אוטומטית. אם אין תגובה תוך 4 שעות — תזכורת נוספת. אם הלקוח מבטל — חלון משוחרר אוטומטית ונציע לרשימת המתנה." },
        { when: "לקוח רוצה מקדמה לפני הקביעה", what: "קישור תשלום בלחיצה, תשלום נסלח, ופגישה מאושרת — הכול בתוך השיחה." },
      ],
      features: [
        { title: "יומן 24/7", body: "פתוח תמיד, גם בשבת וחג (לפי מה שתבחר)." },
        { title: "תזכורות חכמות", body: "WhatsApp/SMS, הודעות חוזרות אם אין תגובה." },
        { title: "מקדמות", body: "מחייבים מקדמה למניעת no-show." },
        { title: "רשימת המתנה חכמה", body: "מישהו ביטל — המערכת מציעה אוטומטית לאדם הבא בתור." },
      ],
      timeline: [
        { phase: "אפיון", duration: "2 ימים", detail: "מיפוי שירותים, משכים, כללים, בעלי תפקידים." },
        { phase: "חיבור יומנים", duration: "3 ימים", detail: "Google/Outlook/MyClinic, הגדרת חלונות." },
        { phase: "בוט הזמנות", duration: "5 ימים", detail: "WhatsApp/Web bot, תזכורות, מקדמות." },
        { phase: "בדיקות והשקה", duration: "4 ימים", detail: "קביעות דמה, ניטור, השקה." },
      ],
      integrations: ["Google Calendar", "Outlook", "MyClinic", "ClickFunnels", "Calendly", "n8n", "WhatsApp", "Stripe", "CardCom"],
      tiers: [
        { name: "בסיסי", price: "₪3,000", highlights: ["קביעת תור בוואטסאפ", "תזכורות בסיסיות", "יומן יחיד"] },
        { name: "מקצועי", price: "₪4,500", featured: true, highlights: ["שינוי ביטול עצמאי", "תזכורות מותאמות", "גביית מקדמה", "רשימת המתנה"] },
        { name: "מותאם אישית", price: "₪6,000", highlights: ["מספר יומנים ושירותים", "חיבור CRM", "לוגיקות מורכבות (קבוצות, משאבים)"] },
      ],
      faq: [
        { q: "האם זה מתחבר ל-MyClinic?", a: "כן. גם ל-Google Calendar, Outlook, Acuity, Calendly ועוד." },
        { q: "מה אם הלקוח לא יודע להשתמש בוואטסאפ?", a: "הבוט פשוט. אנחנו מציעים גם קישור-אתר לגיבוי. בפועל 95%+ מהלקוחות מסתדרים מיד." },
        { q: "מחזיר את ה-no-show?", a: "מקדמה + תזכורת חכמה מורידה no-show ב-40–60%. אם אתה רוצה לאפס, יש גם אימות דו-שלבי." },
        { q: "אחרי ההשקה יש תמיכה?", a: "14 יום ניטור חינם. אחרי זה, אפשר לקחת חבילת תחזוקה או להפעיל עצמאית — הכל שלך." },
      ],
      crossSell: ["voice-agent", "whatsapp-agent", "automation"],
      ctaPrimary: "לשריין יומן אוטומטי",
      ctaSecondary: "לראות דמו",
      whatsappMessage: "היי, אני רוצה קביעת תורים אוטומטית. אפשר דמו?",
    },
    en: {
      nav: "Smart Scheduling",
      title: "A full calendar.",
      titleHighlight: "Not one phone call.",
      subtitle: "Customers book, reschedule, and cancel on their own — via WhatsApp, web, or mobile.",
      lead:
        "Your front desk doesn't have to live on the phone. The system shows only open slots, books, reminds — and if the customer needs to change, they do it themselves. Fewer no-shows, fewer admin hours, zero calendar collisions.",
      outcomes: ["40–60% drop in no-shows", "Front-desk hours back to you", "Zero double bookings"],
      audience: ["Dental & medical clinics", "Coaches", "Business consultants", "Beauty salons", "Private tutors", "Professional service offices"],
      scenarios: [
        { when: "Client messages 'can I move my appointment earlier?'", what: "Bot shows earlier windows, client taps, calendar updates, confirmation sent — all in 40 seconds." },
        { when: "Day before appointment", what: "Auto-reminder. No response in 4 hours → second reminder. Cancel → slot freed + offered to waitlist." },
        { when: "Client wants to pay deposit before booking", what: "Payment link in chat, paid, appointment confirmed — all in one flow." },
      ],
      features: [
        { title: "24/7 calendar", body: "Always open, including Shabbat/holidays per your choice." },
        { title: "Smart reminders", body: "WhatsApp/SMS with escalation if no reply." },
        { title: "Deposits", body: "Charge deposit to prevent no-shows." },
        { title: "Smart waitlist", body: "Someone cancels — system auto-offers the next person." },
      ],
      timeline: [
        { phase: "Scoping", duration: "2 days", detail: "Map services, durations, rules, roles." },
        { phase: "Calendar wiring", duration: "3 days", detail: "Google/Outlook/MyClinic, slot rules." },
        { phase: "Booking bot", duration: "5 days", detail: "WhatsApp/Web bot, reminders, deposits." },
        { phase: "Test & launch", duration: "4 days", detail: "Dummy bookings, monitoring, go-live." },
      ],
      integrations: ["Google Calendar", "Outlook", "MyClinic", "ClickFunnels", "Calendly", "n8n", "WhatsApp", "Stripe", "CardCom"],
      tiers: [
        { name: "Starter", price: "₪3,000", highlights: ["WhatsApp booking", "Basic reminders", "Single calendar"] },
        { name: "Professional", price: "₪4,500", featured: true, highlights: ["Self-service changes", "Custom reminders", "Deposit collection", "Waitlist"] },
        { name: "Custom", price: "₪6,000", highlights: ["Multi-calendar & services", "CRM wiring", "Complex logic (groups, resources)"] },
      ],
      faq: [
        { q: "Does it connect to MyClinic?", a: "Yes. Also Google Calendar, Outlook, Acuity, Calendly, and more." },
        { q: "What if a client can't use WhatsApp?", a: "Bot is simple; we also offer a web link as backup. 95%+ of users figure it out instantly." },
        { q: "Does it reduce no-shows?", a: "Deposit + smart reminders drop no-shows 40–60%. Add two-step confirmation to zero it out." },
        { q: "Post-launch support?", a: "14 days of free monitoring included. After that, optional retainer or self-operate — your call." },
      ],
      crossSell: ["voice-agent", "whatsapp-agent", "automation"],
      ctaPrimary: "Automate my calendar",
      ctaSecondary: "See demo",
      whatsappMessage: "Hi, I want automated scheduling. Can I see a demo?",
    },
  },
  {
    slug: "ecommerce",
    icon: "ShoppingCart",
    accent: "rose",
    startingPrice: 4000,
    he: {
      nav: "חנות אוטומטית",
      title: "עגלות נטושות חוזרות.",
      titleHighlight: "מלאי מסתנכרן. שירות לא ישן.",
      subtitle: "אוטומציה לחנויות Shopify / WooCommerce / רב-ערוצי — מניהול מלאי ועד שירות לקוחות ב-WhatsApp.",
      lead:
        "המוצרים שלך מצוינים. מה שמונע מהם להיות רווחיים זה כל הדברים שצריכים לקרות סביבם — עגלות נטושות, משלוחים מאוחרים, שאלות חוזרות, מלאי שיצא מסנכרון. אנחנו בונים את הרובד האוטומציה שגורם לחנות לעבוד לבד.",
      outcomes: ["+15–30% הכנסה מגאופק עגלות נטושות", "כל המוצרים מסתנכרנים בזמן אמת בכל הערוצים", "זמן טיפול בהזמנה יורד ב-70%"],
      audience: ["חנויות Shopify", "חנויות WooCommerce", "מוכרים רב-ערוציים", "דרופשיפינג", "מותגים D2C"],
      scenarios: [
        { when: "לקוח נטש עגלה עם ₪450 בתוכה", what: "תוך שעה: הודעת וואטסאפ ידידותית, אחרי יום: הצעה עם הנחה קטנה, אחרי שלושה ימים: עוד נוכחות — 18% חוזרים." },
        { when: "מלאי מוצר פופולרי נגמר", what: "כל הערוצים מתעדכנים בבת אחת (Shopify, אינסטגרם, פייסבוק Shop), הזמנה לספק יוצאת, דאש-בורד מראה תחזית." },
        { when: "לקוח שואל 'מתי מגיע המשלוח?'", what: "הבוט מזהה את ההזמנה, בודק סטטוס אצל השליח, נותן תשובה מדויקת בעברית." },
      ],
      features: [
        { title: "שחזור עגלות נטושות", body: "סדרה של 3 הודעות מחושבות בוואטסאפ עם הנחות חכמות." },
        { title: "סנכרון מלאי רב-ערוצי", body: "Shopify ↔ פייסבוק Shop ↔ Instagram ↔ WooCommerce בזמן אמת." },
        { title: "שירות לקוחות AI", body: "שאלות על משלוחים, החזרות, מידות, זמינות — כולן נענות אוטומטית." },
        { title: "עדכוני סטטוס", body: "הזמנה בהכנה → יצא למשלוח → נמסר — אוטומטי ללקוח ב-WhatsApp." },
      ],
      timeline: [
        { phase: "אפיון קטלוג ותהליכים", duration: "שבוע", detail: "מיפוי מוצרים, ערוצים, תהליכי הזמנה." },
        { phase: "בניית אוטומציות", duration: "שבוע-שבועיים", detail: "עגלות נטושות, סנכרון, שירות." },
        { phase: "אינטגרציות", duration: "שבוע", detail: "Shopify/Woo + WhatsApp + שליחים + גבייה." },
        { phase: "בדיקות והשקה", duration: "שבוע", detail: "סדרות בדיקה, ניטור, אופטימיזציה." },
      ],
      integrations: ["Shopify", "WooCommerce", "WhatsApp", "n8n", "Klaviyo", "Mailchimp", "Facebook Shop", "Instagram Shop", "BO/Outvio/HFD"],
      tiers: [
        { name: "בסיסי", price: "₪4,000", highlights: ["שחזור עגלות נטושות", "סטטוס הזמנה", "ערוץ יחיד"] },
        { name: "מתקדם", price: "₪6,000", featured: true, highlights: ["סנכרון מלאי רב-ערוצי", "שירות AI", "עדכונים ללקוח", "דוחות"] },
        { name: "פרימיום", price: "₪8,500", highlights: ["Dropshipping, חוזים עם ספקים", "דוחות רווחיות מתקדמים", "אנליטיקה ב-AI"] },
      ],
      faq: [
        { q: "עובד עם Shopify בעברית?", a: "כן. כולל עדכונים RTL ומשלוח עם שליחים ישראליים (HFD, Outvio, ש״ל, Delivery)." },
        { q: "כמה זה מעלה המרה בעגלות נטושות?", a: "חנויות ממוצעות רואות 12–22% מעגלות נטושות חוזרות להמיר עם סדרת WhatsApp טובה. תלוי במוצר ובקהל." },
        { q: "יש אינטגרציה לדרופשיפינג?", a: "כן — AliExpress, CJ, Spocket, אושיל — אנחנו מחברים אוטומטית את ה-PO ואת הסטטוס ללקוח." },
      ],
      crossSell: ["whatsapp-agent", "automation", "sales-service"],
      ctaPrimary: "אוטומציה לחנות",
      ctaSecondary: "הערכת חסכון",
      whatsappMessage: "היי, רוצה אוטומציה לחנות שלי.",
    },
    en: {
      nav: "E-commerce Automation",
      title: "Abandoned carts come back.",
      titleHighlight: "Inventory syncs. Support never sleeps.",
      subtitle: "Automation for Shopify / WooCommerce / multi-channel stores — from inventory to customer service on WhatsApp.",
      lead:
        "Your products are great. What keeps them from being profitable is everything around them — abandoned carts, late shipments, repeat questions, out-of-sync inventory. We build the automation layer that makes the store run itself.",
      outcomes: ["+15–30% revenue from abandoned-cart recovery", "All products sync across channels in real time", "Order handling time drops 70%"],
      audience: ["Shopify stores", "WooCommerce", "Multi-channel sellers", "Dropshipping", "D2C brands"],
      scenarios: [
        { when: "Customer abandons a ₪450 cart", what: "Within an hour: friendly WhatsApp nudge. Day 1: small-discount offer. Day 3: last call — 18% recover." },
        { when: "Popular SKU runs low", what: "All channels update at once (Shopify, IG Shop, FB Shop), PO to supplier fires, dashboard shows forecast." },
        { when: "'When does my order arrive?'", what: "Bot IDs the order, checks carrier status, replies in natural Hebrew/English." },
      ],
      features: [
        { title: "Abandoned cart recovery", body: "3-message cadence on WhatsApp with smart discounts." },
        { title: "Multi-channel inventory sync", body: "Shopify ↔ FB Shop ↔ IG ↔ WooCommerce in real time." },
        { title: "AI customer service", body: "Shipping, returns, sizes, availability — all answered automatically." },
        { title: "Status updates", body: "Preparing → shipped → delivered — auto-sent via WhatsApp." },
      ],
      timeline: [
        { phase: "Catalog & flow scoping", duration: "1 week", detail: "Map products, channels, order flows." },
        { phase: "Build", duration: "1–2 weeks", detail: "Carts, sync, service." },
        { phase: "Integrations", duration: "1 week", detail: "Shopify/Woo + WhatsApp + carriers + billing." },
        { phase: "Test & launch", duration: "1 week", detail: "Test runs, monitoring, tuning." },
      ],
      integrations: ["Shopify", "WooCommerce", "WhatsApp", "n8n", "Klaviyo", "Mailchimp", "Facebook Shop", "Instagram Shop", "BO/Outvio/HFD"],
      tiers: [
        { name: "Starter", price: "₪4,000", highlights: ["Abandoned cart recovery", "Order status", "Single channel"] },
        { name: "Advanced", price: "₪6,000", featured: true, highlights: ["Multi-channel sync", "AI service", "Status pushes", "Reports"] },
        { name: "Premium", price: "₪8,500", highlights: ["Dropshipping, supplier contracts", "Advanced profitability reports", "AI analytics"] },
      ],
      faq: [
        { q: "Does it work with Shopify in Hebrew?", a: "Yes. Including RTL updates and Israeli carriers (HFD, Outvio, etc)." },
        { q: "How much does abandoned-cart recovery actually convert?", a: "Average stores see 12–22% of abandoned carts convert with a solid WhatsApp sequence. Varies by product and audience." },
        { q: "Dropshipping integration?", a: "Yes — AliExpress, CJ, Spocket — we auto-wire PO and customer status." },
      ],
      crossSell: ["whatsapp-agent", "automation", "sales-service"],
      ctaPrimary: "Automate my store",
      ctaSecondary: "Get a savings estimate",
      whatsappMessage: "Hi, I want automation for my store.",
    },
  },
  {
    slug: "ai-agents",
    icon: "Bot",
    accent: "indigo",
    startingPrice: 15000,
    he: {
      nav: "סוכני AI",
      title: "עובד דיגיטלי שמבצע פעולות,",
      titleHighlight: "לא רק עונה על שאלות",
      subtitle: "סוכן AI אוטונומי שמחליט, פועל ומדבר — כמו עובד מומחה ב-24/7.",
      lead:
        "צ׳אטבוטים עונים על שאלות. סוכן אמיתי מבצע: בודק CRM, פותח טיקט, שולח חשבונית, מעדכן יומן, מזמין ספק. הסוכן שלנו בנוי לפעולות מורכבות — כולל מצבים שלא צפית.",
      outcomes: ["אוטומציה של תהליכים שהיו בלתי אפשריים לבוט רגיל", "זמן תגובה מתחת ל-10 שניות על תהליך מולטי-שלבי", "תמיכה בכל ערוץ — לא רק בצ׳אט"],
      audience: ["נדל״ן (שאילתות על נכסים, תיאום סיורים)", "E-commerce (המלצות, החזרות, מעקב)", "קליניקות (זימון, תזכורות, מילוי טפסים)", "חברות שירות (פתיחת קריאות, תיאום טכנאי)", "ייעוץ (ניהול פגישות, פולואפ)", "חינוך (רישום, שאלות על קורסים)"],
      scenarios: [
        { when: "לקוח: 'רוצה להזמין טכנאי למחר בבוקר לגלילה'", what: "הסוכן בודק זמינות טכנאים, בוחר הקרוב ביותר, שולח הצעת מחיר, קובע, שולח אישור, פותח קריאה במערכת — ללא שאילת שאלה מהמפעיל." },
        { when: "לקוח מתלונן: 'המוצר שקיבלתי פגום'", what: "הסוכן מזהה את ההזמנה, יוצר תלונה, מציע איסוף חזרה או זיכוי, פתוח RMA ב-ERP, מעדכן CRM." },
        { when: "לקוח פוטנציאלי: 'כמה שווה דירה ברחוב X?'", what: "הסוכן ניגש למאגר נכסים, שולף נתוני עסקאות, מחזיר טווח מחיר ומציע שיחה עם מתווך." },
      ],
      features: [
        { title: "ריבוי כלים (Tool Use)", body: "הסוכן משתמש בפונקציות, APIs ומאגרי מידע כדי לבצע פעולות אמיתיות." },
        { title: "זיכרון והקשר", body: "זוכר הקשר של שיחה ארוכה, גם חוזרת לאחר ימים." },
        { title: "רב-ערוצי", body: "עובד בוואטסאפ, אימייל, אתר — באותה אישיות ואותו ידע." },
        { title: "מדידה ואופטימיזציה", body: "כל פעולה נמדדת, גרף שגיאות, שיפור שוטף." },
      ],
      timeline: [
        { phase: "אפיון", duration: "שבוע", detail: "הגדרת תהליכים, כלים, גבולות אחריות." },
        { phase: "בנייה", duration: "2-3 שבועות", detail: "פיתוח, אימון על מסמכים, חיבור כלים." },
        { phase: "בדיקות", duration: "שבוע", detail: "סימולציות, בדיקות קצה-לקצה." },
        { phase: "השקה", duration: "שבוע", detail: "הפעלה, ניטור 24/7, התאמות." },
      ],
      integrations: ["OpenAI / Anthropic / Gemini", "n8n", "CRM (הכל)", "WhatsApp", "Twilio", "מערכות ERP", "מאגרי מידע פנימיים"],
      tiers: [
        { name: "סוכן יחיד", price: "₪15,000", highlights: ["1 תהליך עסקי מורכב", "חיבור 3–5 כלים", "ליווי חודשי מ-₪350"] },
        { name: "שני סוכנים משלימים", price: "₪25,000", featured: true, highlights: ["2 תהליכים קשורים (מכירות + שירות, למשל)", "ידע משותף", "ליווי"] },
        { name: "מותאם אישית", price: "בהתאמה", highlights: ["מערכת סוכנים", "אורקסטרציה", "התאמה לאסטרטגיה"] },
      ],
      faq: [
        { q: "מה ההבדל בין סוכן AI לצ׳אטבוט?", a: "צ׳אטבוט עונה לפי תסריט. סוכן מחליט ומבצע. הוא יכול לפתוח ERP, לשלוח מייל, לעדכן CRM — לא רק לענות." },
        { q: "זה יחליף את הצוות שלי?", a: "לא. הוא מבצע משימות שחוזרות על עצמן כדי שהצוות יוכל להתמקד באסטרטגיה וביחסים." },
        { q: "על איזה מודלים זה רץ?", a: "אנחנו בוחרים את המודל המתאים לתהליך — GPT-4, Claude, Gemini, או משולב. אתה לא תלוי במודל אחד." },
        { q: "מה קורה אם המודל טועה?", a: "כל פעולה עם ״סיכון״ (חיוב, שליחת הודעה ללקוח חשוב) עוברת אישור אנושי לפני ביצוע, עד שהסוכן יוכיח את עצמו." },
      ],
      crossSell: ["automation", "smart-crm", "consultation"],
      ctaPrimary: "לבנות סוכן לעסק שלי",
      ctaSecondary: "לראות דוגמאות",
      whatsappMessage: "היי, אני רוצה לבנות סוכן AI לעסק. אפשר לדבר?",
    },
    en: {
      nav: "AI Agents",
      title: "A digital coworker that takes actions,",
      titleHighlight: "not just answers questions",
      subtitle: "An autonomous AI agent that decides, acts and communicates — like an expert employee, 24/7.",
      lead:
        "Chatbots answer questions. A real agent executes: checks the CRM, opens a ticket, sends an invoice, updates the calendar, orders from a supplier. Ours is built for complex flows — including the ones you didn't plan for.",
      outcomes: ["Automates processes a regular bot can't", "Under 10s response on multi-step flows", "Works across every channel, not just chat"],
      audience: ["Real estate (property queries, tour booking)", "E-commerce (recs, returns, tracking)", "Clinics (booking, reminders, form filling)", "Service cos (tickets, technician routing)", "Consulting (meeting mgmt, follow-up)", "Education (enrollment, course Q&A)"],
      scenarios: [
        { when: "Customer: 'I need a technician tomorrow morning in Galilee'", what: "Agent checks technician availability, picks nearest, quotes, books, confirms, opens ticket in the ERP — no operator needed." },
        { when: "'My product arrived damaged'", what: "Agent IDs the order, opens complaint, offers return or credit, opens RMA in the ERP, updates CRM." },
        { when: "'What's a house worth on X Street?'", what: "Agent queries property database, pulls recent transactions, returns price range + offers a call with a broker." },
      ],
      features: [
        { title: "Tool use", body: "The agent calls functions, APIs, and databases to do real work." },
        { title: "Memory & context", body: "Remembers long-running context, even across days." },
        { title: "Multi-channel", body: "WhatsApp, email, site — same personality, same knowledge." },
        { title: "Measured & tuned", body: "Every action tracked, error graph, continuous improvement." },
      ],
      timeline: [
        { phase: "Scoping", duration: "1 week", detail: "Define flows, tools, boundaries." },
        { phase: "Build", duration: "2–3 weeks", detail: "Development, doc training, tool wiring." },
        { phase: "Test", duration: "1 week", detail: "Simulations, end-to-end tests." },
        { phase: "Launch", duration: "1 week", detail: "Go-live, 24/7 monitoring, tuning." },
      ],
      integrations: ["OpenAI / Anthropic / Gemini", "n8n", "Any CRM", "WhatsApp", "Twilio", "ERP systems", "Internal databases"],
      tiers: [
        { name: "Single Agent", price: "₪15,000", highlights: ["1 complex business flow", "3–5 tool integrations", "Retainer from ₪350/mo"] },
        { name: "Dual Agents", price: "₪25,000", featured: true, highlights: ["2 connected flows (sales + service)", "Shared knowledge", "Retainer"] },
        { name: "Custom", price: "Quote", highlights: ["Multi-agent system", "Orchestration", "Strategic fit"] },
      ],
      faq: [
        { q: "Difference between an AI agent and a chatbot?", a: "A chatbot replies from a script. An agent decides and acts — opens an ERP, sends email, updates CRM, not just answers." },
        { q: "Will this replace my team?", a: "No. It runs the repetitive tasks so your team can focus on strategy and relationships." },
        { q: "Which models does it run on?", a: "We pick per task — GPT-4, Claude, Gemini, or blended. You're not locked to one." },
        { q: "What if the model gets something wrong?", a: "Every 'risky' action (billing, messaging a VIP) goes through human approval until the agent proves itself." },
      ],
      crossSell: ["automation", "smart-crm", "consultation"],
      ctaPrimary: "Build my agent",
      ctaSecondary: "See examples",
      whatsappMessage: "Hi, I want to build an AI agent for my business.",
    },
  },
  {
    slug: "consultation",
    icon: "Compass",
    accent: "cyan",
    startingPrice: 5000,
    he: {
      nav: "ייעוץ טכנולוגי",
      title: "לפני שתקנה עוד כלי —",
      titleHighlight: "בוא נבין איפה באמת דולפים לך שעות",
      subtitle: "ייעוץ אוטומציה ו-AI מאפיון ועד מפת דרכים — עם תוצרים מדידים, לא PDF של 80 עמודים.",
      lead:
        "רוב העסקים קונים כלים לפני שהם מבינים איפה באמת הבעיה. אצלנו מתחילים מאבחון, ממשיכים למפת דרכים עם ROI צפוי לכל צעד, ורק אז מחליטים אם בכלל לבנות — או אולי מספיק לשנות תהליך אחד.",
      outcomes: ["מפה ברורה של מקומות שדולפים זמן וכסף", "מפת דרכים עם עדיפויות ו-ROI מוערך", "אין אתגר של 'לא ידעתי מאיפה להתחיל'"],
      audience: ["עסקים שלא יודעים איפה להתחיל עם AI", "חברות בצמיחה מהירה שהתהליכים ידניים", "ארגונים בעיצומה של טרנספורמציה דיגיטלית", "עסקים שנכוו מניסיון כושל בעבר", "בעלי עסקים שאין להם זמן לבד לחקור"],
      scenarios: [
        { when: "שיחת היכרות חינם, 60–90 דקות", what: "מיפוי מהיר של העסק, זיהוי 3 פוטנציאלי-חיסכון גדולים, המלצה על הצעד הבא." },
        { when: "אבחון מעמיק, 3–5 ימים", what: "מיפוי תהליכים, מיפוי מערכות, מדידת זמנים ועלויות, זיהוי צווארי בקבוק." },
        { when: "מפת דרכים, 2–3 ימים", what: "תוכנית פעולה, לו״ז, תקציב לפי שלבים, יעדים מדידים, תחזית ROI." },
      ],
      features: [
        { title: "תוצרים מוחשיים", body: "לא הרבה תיאוריה — מסמכים מעשיים שהצוות שלך יכול להתחיל ליישם ביום ה-1." },
        { title: "ROI מחושב", body: "כל המלצה כוללת הערכת חיסכון ומחיר ליישום." },
        { title: "ניטרליות", body: "אנחנו לא מוכרים כלי מסוים — ממליצים על מה שנכון לך." },
        { title: "המשך אופציונלי", body: "אם תרצה ליווי ליישום — אפשר. אם לא — תוצאות תוכנית העבודה שלך." },
      ],
      timeline: [
        { phase: "שיחת Discovery", duration: "חינם, 60–90 דק׳", detail: "להבין את המטרות שלך, להעריך אם בכלל יש מה לעשות." },
        { phase: "אבחון תהליכים", duration: "3–5 ימים", detail: "מיפוי workflows, מערכות, זמנים." },
        { phase: "בניית אסטרטגיה", duration: "3–5 ימים", detail: "המלצה על טכנולוגיה, תעדוף לפי ROI." },
        { phase: "מפת דרכים", duration: "2–3 ימים", detail: "תוכנית פעולה מפורטת, תקציב, אבני דרך." },
        { phase: "ליווי ליישום", duration: "2–8 שבועות", detail: "אופציונלי — פיקוח על יישום, הדרכה, פתרון בעיות בזמן אמת." },
      ],
      integrations: ["n8n", "כל CRM", "כלי AI", "מערכות ERP", "מערכות ייעודיות"],
      tiers: [
        { name: "ייעוץ בסיסי", price: "₪5,000", highlights: ["אבחון + מפת דרכים", "בחירת טכנולוגיה", "תחזית ROI"] },
        { name: "ייעוץ מקיף", price: "₪12,000–15,000", featured: true, highlights: ["הכל מהבסיסי", "ליווי יישום 4 שבועות", "הדרכת צוות", "דוח ביצועים"] },
        { name: "ייעוץ + יישום מלא", price: "₪20,000–25,000", highlights: ["הכל מהמקיף", "יישום מלא 8 שבועות", "ליווי 3 חודשים אחרי השקה"] },
      ],
      pricingNote: "כל מחיר ללא מע״מ. שיחת היכרות תמיד חינם.",
      faq: [
        { q: "למה בכלל להשקיע בייעוץ? אני יכול להתחיל ישר", a: "אפשר, אבל רוב העסקים מתחילים במקום הלא-נכון. שבועיים של ייעוץ חוסכים 6–12 חודשי יישום שגוי." },
        { q: "נשרפתי מספק קודם. למה אתם שונים?", a: "אנחנו מסיימים כל שלב עם תוצר שאפשר לעבוד איתו גם בלעדינו. אין תלות. אם תחליט להפסיק — יש לך מסמך יישים." },
        { q: "כמה עומק טכני דרוש ממני?", a: "שום דבר. אנחנו מדברים עסקית, אתם מבינים מה נעשה ולמה." },
        { q: "יש הנחות לעסקים קטנים?", a: "יש מסלול מותאם בסיסי לעסקים של עד 5 עובדים. דברו איתנו." },
      ],
      crossSell: ["automation", "smart-crm", "ai-agents"],
      ctaPrimary: "לשריין אבחון חינם",
      ctaSecondary: "לראות דוגמת מפת-דרכים",
      whatsappMessage: "היי, רוצה לשריין שיחת ייעוץ חינם לאוטומציה.",
    },
    en: {
      nav: "Automation Consulting",
      title: "Before you buy another tool —",
      titleHighlight: "let's find where your hours are actually leaking",
      subtitle: "Automation & AI consulting from scoping to roadmap — with measurable deliverables, not 80-page PDFs.",
      lead:
        "Most businesses buy tools before they understand the real problem. We start with diagnosis, deliver a roadmap with expected ROI per step, and only then decide whether to build at all.",
      outcomes: ["A clear map of where time and money leak", "A prioritized roadmap with estimated ROI", "No more 'I don't know where to start'"],
      audience: ["Businesses unsure where to begin with AI", "Fast-scaling companies outgrowing manual processes", "Mid-transformation organizations", "Burnt by a failed prior attempt", "Owners without time to research"],
      scenarios: [
        { when: "Free 60–90 min discovery call", what: "Quick business map, identify 3 biggest savings, recommend next step." },
        { when: "Deep audit, 3–5 days", what: "Process mapping, system inventory, time/cost measurement, bottleneck identification." },
        { when: "Roadmap, 2–3 days", what: "Action plan, timeline, phase budget, measurable goals, ROI projection." },
      ],
      features: [
        { title: "Tangible deliverables", body: "Not theory — practical docs your team can start executing day 1." },
        { title: "ROI-calculated", body: "Every recommendation comes with estimated savings and build cost." },
        { title: "Vendor-neutral", body: "We don't push a specific tool — we recommend what fits you." },
        { title: "Optional continuation", body: "Want us to execute? Great. Don't? You still have a roadmap." },
      ],
      timeline: [
        { phase: "Discovery call", duration: "Free, 60–90 min", detail: "Understand your goals, assess if there's work to do at all." },
        { phase: "Process audit", duration: "3–5 days", detail: "Map workflows, systems, times." },
        { phase: "Strategy", duration: "3–5 days", detail: "Tech recommendations, ROI prioritization." },
        { phase: "Roadmap", duration: "2–3 days", detail: "Detailed plan, budget, milestones." },
        { phase: "Execution support", duration: "2–8 weeks", detail: "Optional — oversee rollout, train team, real-time fixes." },
      ],
      integrations: ["n8n", "Any CRM", "AI tools", "ERP systems", "Custom systems"],
      tiers: [
        { name: "Basic Consulting", price: "₪5,000", highlights: ["Diagnosis + roadmap", "Tech selection", "ROI forecast"] },
        { name: "Comprehensive", price: "₪12,000–15,000", featured: true, highlights: ["Everything in Basic", "4-week rollout support", "Team training", "Performance report"] },
        { name: "Consulting + Full Implementation", price: "₪20,000–25,000", highlights: ["Everything in Comprehensive", "8-week full rollout", "3-month post-launch support"] },
      ],
      pricingNote: "All prices exclude VAT. Discovery call always free.",
      faq: [
        { q: "Why consulting — can't I just start?", a: "You can. But most businesses start in the wrong place. Two weeks of consulting saves 6–12 months of wrong execution." },
        { q: "I got burned by a past vendor. Why are you different?", a: "Every phase ends with a deliverable you can use without us. No lock-in." },
        { q: "How technical do I need to be?", a: "Not at all. We speak business, you understand what we'll do and why." },
        { q: "Discounts for small business?", a: "We have a tailored basic track for businesses under 5 employees. Let's talk." },
      ],
      crossSell: ["automation", "smart-crm", "ai-agents"],
      ctaPrimary: "Book a free diagnosis",
      ctaSecondary: "See a roadmap sample",
      whatsappMessage: "Hi, I'd like to book a free automation consultation.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCrossSell(slugs: string[]): Service[] {
  return slugs.map((s) => getService(s)).filter((s): s is Service => Boolean(s));
}
