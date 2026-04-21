import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Terms" };

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  return (
    <LegalShell
      eyebrow={isHe ? "משפטי" : "Legal"}
      title={isHe ? "תנאי שימוש" : "Terms of service"}
      updated={isHe ? "עודכן: אפריל 2026" : "Updated: April 2026"}
    >
      {isHe ? (
        <>
          <p>ברוכים הבאים לאתר Automaziot AI. שימוש באתר כפוף לתנאים שלהלן.</p>
          <h2>שימוש באתר</h2>
          <p>האתר מספק מידע על השירותים שלנו. שימוש לרעה — כולל ניסיונות פריצה, שליחת ספאם, או הפרה של קניין רוחני — אסור ויכול לגרור צעדים משפטיים.</p>
          <h2>שירותים ותשלומים</h2>
          <p>כל התקשרות שירות נחתמת בחוזה נפרד. האתר אינו מהווה הצעה מחייבת, והמחירים המצוינים הם אינדיקטיביים. התקשרות סופית תיעשה בכתב.</p>
          <h2>אחריות</h2>
          <p>אנחנו משתדלים לספק שירות ללא תקלות, אך איננו אחראים לנזקים עקיפים או תוצאתיים. אחריותנו מוגבלת לסכום ששולם בפועל.</p>
          <h2>סמכות שיפוט</h2>
          <p>חוזי השירות כפופים לדין הישראלי ולסמכות בתי המשפט בתל אביב.</p>
        </>
      ) : (
        <>
          <p>Welcome to Automaziot AI. Use of the site is subject to the terms below.</p>
          <h2>Site use</h2>
          <p>This site provides information about our services. Misuse — including hacking, spam, or IP infringement — is prohibited and may lead to legal action.</p>
          <h2>Services and payments</h2>
          <p>Service engagements are finalized in separate contracts. This site does not constitute a binding offer; prices shown are indicative. Final contracts are in writing.</p>
          <h2>Liability</h2>
          <p>We strive to provide error-free service but are not liable for indirect or consequential damages. Our liability is capped at the amount actually paid.</p>
          <h2>Jurisdiction</h2>
          <p>Service contracts are governed by Israeli law and subject to the courts of Tel Aviv.</p>
        </>
      )}
    </LegalShell>
  );
}
