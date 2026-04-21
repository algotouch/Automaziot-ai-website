import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Privacy", description: "Privacy policy" };

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  const toc = isHe
    ? [
        { id: "collect", label: "מה אנחנו אוספים" },
        { id: "use", label: "איך אנחנו משתמשים" },
        { id: "never", label: "מה אנחנו לא עושים" },
        { id: "rights", label: "הזכויות שלך" },
      ]
    : [
        { id: "collect", label: "What we collect" },
        { id: "use", label: "How we use it" },
        { id: "never", label: "What we don't do" },
        { id: "rights", label: "Your rights" },
      ];
  return (
    <LegalShell
      eyebrow={isHe ? "משפטי" : "Legal"}
      title={isHe ? "מדיניות פרטיות" : "Privacy policy"}
      updated={isHe ? "עודכן: אפריל 2026" : "Updated: April 2026"}
      toc={toc}
    >
      {isHe ? (
        <>
          <p>אנחנו מכבדים את פרטיותך. המסמך הזה מסביר מה אנחנו אוספים, למה, ומה הזכויות שלך.</p>
          <h2 id="collect">מה אנחנו אוספים</h2>
          <ul>
            <li>פרטי יצירת קשר שאת/ה מזין/ה (שם, טלפון, אימייל, חברה).</li>
            <li>תוכן הפניות והמסרים ששלחת — לצורך טיפול ומתן שירות.</li>
            <li>נתוני גלישה אנונימיים (Google Analytics, Vercel Analytics) לשיפור האתר.</li>
          </ul>
          <h2 id="use">איך אנחנו משתמשים</h2>
          <ul>
            <li>ליצירת קשר, הצעות מחיר, ומתן שירותים שביקשת.</li>
            <li>לשיפור המוצר והאתר.</li>
            <li>במקרים חריגים — כדי לעמוד בדרישה משפטית.</li>
          </ul>
          <h2 id="never">מה אנחנו לא עושים</h2>
          <ul>
            <li>לא מוכרים ולא מעבירים פרטים לצד ג׳ לצרכים שיווקיים.</li>
            <li>לא שומרים מידע רגיש ללא צורך.</li>
          </ul>
          <h2 id="rights">הזכויות שלך</h2>
          <ul>
            <li>זכות עיון: אפשר לבקש לראות אילו פרטים יש לנו עליך.</li>
            <li>זכות תיקון או מחיקה: אפשר לבקש בכל רגע.</li>
            <li>זכות התנגדות: אפשר לבטל הסכמה לשימוש במידע.</li>
          </ul>
          <p>לפניות בנושא פרטיות: <a href="mailto:privacy@automaziot.ai">privacy@automaziot.ai</a></p>
        </>
      ) : (
        <>
          <p>We respect your privacy. This document explains what we collect, why, and your rights.</p>
          <h2 id="collect">What we collect</h2>
          <ul>
            <li>Contact details you provide (name, phone, email, company).</li>
            <li>Content of inquiries and messages — to deliver service.</li>
            <li>Anonymous browsing data (Google Analytics, Vercel Analytics) to improve the site.</li>
          </ul>
          <h2 id="use">How we use it</h2>
          <ul>
            <li>To contact you, quote, and deliver services you requested.</li>
            <li>To improve the product and website.</li>
            <li>In exceptional cases — to meet legal obligations.</li>
          </ul>
          <h2 id="never">What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell or share your details with third parties for marketing.</li>
            <li>We don&apos;t retain sensitive data without need.</li>
          </ul>
          <h2 id="rights">Your rights</h2>
          <ul>
            <li>Access: you may request what data we hold.</li>
            <li>Correction or erasure: request at any time.</li>
            <li>Objection: withdraw consent to data use.</li>
          </ul>
          <p>Privacy contact: <a href="mailto:privacy@automaziot.ai">privacy@automaziot.ai</a></p>
        </>
      )}
    </LegalShell>
  );
}
