import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Editorial standards" };

export default async function EditorialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  return (
    <LegalShell
      eyebrow={isHe ? "עריכה" : "Editorial"}
      title={isHe ? "מדיניות עריכה" : "Editorial standards"}
      updated={isHe ? "עודכן: אפריל 2026" : "Updated: April 2026"}
    >
      {isHe ? (
        <>
          <p>הבלוג שלנו נועד להיות שימושי לבעלי עסקים ישראלים. הנה הסטנדרטים שאנחנו מחזיקים בהם:</p>
          <h2>דיוק</h2>
          <p>כל מחקר או נתון מגיע ממקור שניתן לבדוק. אנחנו מציינים מקורות כשמדובר בטענות לא-טריוויאליות.</p>
          <h2>גילוי נאות</h2>
          <p>אנחנו משווקים את השירותים שלנו. במאמרי השוואה — אנחנו מסבירים את ההטיה ומציגים גם את החסרונות של הגישה שלנו.</p>
          <h2>עדכונים ותיקונים</h2>
          <p>אם משהו מתברר כלא מדויק — אנחנו מתקנים ומסמנים. תאריך העדכון האחרון מופיע בכל מאמר.</p>
          <h2>תוכן ממומן</h2>
          <p>אין באתר תוכן ממומן במסווה של עריכה. שיתופי פעולה מסומנים בבירור.</p>
        </>
      ) : (
        <>
          <p>Our blog is meant to be genuinely useful to Israeli business owners. Standards we hold:</p>
          <h2>Accuracy</h2>
          <p>Every research claim or stat comes from a verifiable source. We cite when the claim isn't obvious.</p>
          <h2>Disclosure</h2>
          <p>We market our services. In comparison pieces, we explain our bias and present downsides of our approach too.</p>
          <h2>Updates and corrections</h2>
          <p>If something turns out wrong, we correct and mark it. Each article shows a "last updated" date.</p>
          <h2>Sponsored content</h2>
          <p>No sponsored content disguised as editorial. Partnerships are clearly labeled.</p>
        </>
      )}
    </LegalShell>
  );
}
