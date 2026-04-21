import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Accessibility" };

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  return (
    <LegalShell
      eyebrow={isHe ? "נגישות" : "Accessibility"}
      title={isHe ? "הצהרת נגישות" : "Accessibility statement"}
      updated={isHe ? "עודכן: אפריל 2026" : "Updated: April 2026"}
    >
      {isHe ? (
        <>
          <p>Automaziot AI מחויבת להנגיש את האתר לכל המשתמשים, בכלל זה אנשים עם מוגבלויות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013.</p>
          <h2>תאימות</h2>
          <ul>
            <li>האתר נבנה בהתאם לתקן WCAG 2.1 ברמה AA.</li>
            <li>תומך בקוראי מסך (NVDA, VoiceOver, JAWS).</li>
            <li>ניווט מלא באמצעות מקלדת, כולל דילוג לתוכן ראשי.</li>
            <li>ניגודיות צבעים תקינה, אפשרות להגדלת טקסט עד 200%.</li>
          </ul>
          <h2>משוב נגישות</h2>
          <p>נתקלת/ה בבעיית נגישות? כתוב/כתבי לנו: <a href="mailto:accessibility@automaziot.ai" className="text-cyan-300">accessibility@automaziot.ai</a> — נטפל תוך 7 ימי עסקים.</p>
        </>
      ) : (
        <>
          <p>Automaziot AI is committed to making this site accessible to everyone, including people with disabilities, in accordance with Israeli accessibility regulations.</p>
          <h2>Conformance</h2>
          <ul>
            <li>Built to WCAG 2.1 level AA.</li>
            <li>Supports screen readers (NVDA, VoiceOver, JAWS).</li>
            <li>Full keyboard navigation, including skip-to-content.</li>
            <li>Compliant contrast, text zoom up to 200%.</li>
          </ul>
          <h2>Accessibility feedback</h2>
          <p>Found an issue? Email us at <a href="mailto:accessibility@automaziot.ai" className="text-cyan-300">accessibility@automaziot.ai</a> — we'll respond within 7 business days.</p>
        </>
      )}
    </LegalShell>
  );
}
