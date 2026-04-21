export type FaqItem = { q: string; a: string };

export const HOME_FAQ_HE: FaqItem[] = [
  { q: "כמה זה עולה באמת?", a: "תלוי בשירות. הקמה מתחילה מ-₪2,000 (CRM בסיסי) ועד ₪25,000 (ייעוץ + יישום מלא). רוב העסקים משקיעים ₪4,000–₪15,000. המחיר ברור מראש, סופי, ובלי ״הפתעות בסוף הדרך״." },
  { q: "למי שייך הסוכן אחרי ההטמעה?", a: "לך. כל הקוד, ה-workflows בשרת n8n, ההגדרות וההיסטוריה — שלך. אין נעילה. אם תרצה לעבור לספק אחר מחר, אפשר." },
  { q: "עם אילו מערכות אתם מתחברים?", a: "כל מערכת עם API או Webhook. בפועל: כל ה-CRMs (Zoho, HubSpot, Monday, Pipedrive, Salesforce), מערכות חשבוניות (Morning+, CardCom, Stripe), יומנים (Google, Outlook), חנויות (Shopify, WooCommerce) ו-WhatsApp Business API." },
  { q: "מה אם הסוכן יגיד ללקוח משהו שגוי?", a: "לפני השקה — 50+ שיחות סימולציה. בשבועיים הראשונים — ניטור יומי. נושאים רגישים (תשלום, מחיר מיוחד, לקוח VIP) מוגדרים מראש כ'קווים אדומים' שמחייבים העברה לאדם. שיעור הטעויות בפועל: מתחת ל-3%." },
  { q: "כמה זמן עד שאני רואה תוצאות?", a: "זמן תגובה משתפר ביום 1. שיעור סגירה — בתוך 3-4 שבועות. ROI ממוצע: 3-6 חודשים, בהתאם לנפח הלידים." },
  { q: "האם זה מתאים לעסק קטן של 3-5 עובדים?", a: "זה נבנה בדיוק בשבילם. עסקים קטנים מרוויחים מאוטומציה יותר מגדולים — כי כל שעה שחוסך עובד היא אחוז משמעותי מהעסק. יש מסלולי entry מ-₪2,000." },
  { q: "מה העלויות השוטפות אחרי ההקמה?", a: "שני סוגים: (1) עלויות צד ג׳ — WhatsApp Business API וטוקני AI, סה״כ ₪100-500 לחודש, משולמים ישירות לספקים. (2) ליווי חודשי אופציונלי מ-₪350 לחודש. אם לא רוצים ליווי — אפשר לרוץ עצמאית." },
  { q: "נשרפתי מספק קודם שלא סיפק. למה אתם שונים?", a: "כל שלב מסתיים בתוצר שיכול לעבוד בלעדינו. אין חוזים ארוכי טווח, אפשר לעצור בכל נקודה עם מה שנבנה עד אותו רגע, וכל הקוד אצלך — לא אצלנו." },
  { q: "הסוכן לא ירגיז לקוחות?", a: "רוב הלקוחות מעדיפים תשובה תוך 8 שניות על פני המתנה של יום — גם כשהם יודעים שזה AI. בנוסף: הסוכן מציג את עצמו, תמיד אפשר לבקש אדם, ומצבים מורכבים מועברים אוטומטית." },
  { q: "איך מודדים שזה באמת עובד?", a: "מגדירים KPIs מראש: זמן תגובה, שיעור המרה, שעות שנחסכו, הכנסות חדשות. מודדים בחודש 1 ואחרי 90 יום. אם אין ROI מדיד — ממשיכים עד שיש." },
];

export const HOME_FAQ_EN: FaqItem[] = [
  { q: "What does it really cost?", a: "Depends on the service. Setup starts at ₪2,000 (basic CRM) up to ₪25,000 (consulting + full implementation). Most clients invest ₪4,000–₪15,000. Final price up front — no surprises." },
  { q: "Who owns the agent after launch?", a: "You do. Code, n8n workflows, configurations, history — all yours. No lock-in. You can migrate tomorrow if you want." },
  { q: "What systems do you integrate with?", a: "Anything with an API or webhook. In practice: every popular CRM (Zoho, HubSpot, Monday, Pipedrive, Salesforce), invoicing (Morning+, CardCom, Stripe), calendars (Google, Outlook), stores (Shopify, WooCommerce), and the WhatsApp Business API." },
  { q: "What if the agent replies wrong?", a: "Before launch: 50+ simulated conversations. First two weeks: daily monitoring. Sensitive topics (payment, special pricing, VIP customer) are defined as 'red lines' that force human handoff. Actual error rate: under 3%." },
  { q: "How fast do I see results?", a: "Response time improves on day 1. Close rate — within 3-4 weeks. Average ROI: 3-6 months based on lead volume." },
  { q: "Good for a 3-5 person business?", a: "Built for them. Small businesses benefit more from automation than big ones — every hour saved is a meaningful % of the business. Entry tracks start at ₪2,000." },
  { q: "What are the ongoing costs?", a: "Two types: (1) Third-party — WhatsApp Business API and AI tokens, ₪100-500/mo, paid direct to vendors. (2) Optional retainer from ₪350/mo. If you don't want support, you can self-operate." },
  { q: "I got burned by a prior vendor. Why are you different?", a: "Every phase ends with a usable deliverable. No long contracts, you can stop at any point with everything built so far, and all the code lives with you — not us." },
  { q: "Won't the agent annoy customers?", a: "Most customers prefer a 8-second reply to a 24-hour wait — even knowing it's AI. Plus: the agent introduces itself, human handoff is always one message away, complex cases auto-escalate." },
  { q: "How do I know it's actually working?", a: "KPIs defined upfront: response time, conversion rate, hours saved, new revenue. Measured at month 1 and day 90. No measurable ROI? We keep working until there is." },
];
