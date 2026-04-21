"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatILS } from "@/lib/utils";

type Line = { side: "them" | "us"; text: string; typing?: boolean; time: string };

const HE_CONVOS: Record<string, Line[]> = {
  whatsapp: [
    { side: "them", text: "היי, יש לכם חבילה למחיר טוב?", time: "03:14" },
    { side: "us", text: "היי אורי 👋 יש 3 חבילות, מ-₪1,200. רוצה שאסנכרן לך שיחה חינם?", time: "03:14", typing: true },
    { side: "them", text: "כן בבקשה 🙏", time: "03:15" },
    { side: "us", text: "מעולה. שלחתי הזמנה ליומן למחר 10:30 📍", time: "03:15" },
  ],
  sales: [
    { side: "them", text: "מה ההבדל בין X ל-Y?", time: "11:02" },
    { side: "us", text: "שאלה מצוינת. X ל-3 משתמשים, Y ל-15. בואי נראה מה מתאים:", time: "11:02", typing: true },
    { side: "them", text: "צוות של 5.", time: "11:03" },
    { side: "us", text: "אז Y עם הנחה 15%. לסגור עכשיו? 💳", time: "11:03" },
  ],
  ecommerce: [
    { side: "them", text: "מתי המשלוח שלי מגיע?", time: "18:41" },
    { side: "us", text: "ההזמנה #8421 בדרך. שליח יצור קשר בין 09:00-11:00 מחר 🚚", time: "18:41" },
    { side: "them", text: "אפשר בעצם לשנות כתובת?", time: "18:42" },
    { side: "us", text: "בטח. שלחתי קישור לעריכה ✏️", time: "18:42", typing: true },
  ],
};

const EN_CONVOS: Record<string, Line[]> = {
  whatsapp: [
    { side: "them", text: "Hi, any training packages?", time: "03:14" },
    { side: "us", text: "Hey Uri 👋 Three, from ₪1,200. Want me to hold a free intro call?", time: "03:14", typing: true },
    { side: "them", text: "Yes please 🙏", time: "03:15" },
    { side: "us", text: "Done. Calendar invite sent for tomorrow 10:30 📍", time: "03:15" },
  ],
  sales: [
    { side: "them", text: "What's the difference between X and Y?", time: "11:02" },
    { side: "us", text: "Great question. X is for up to 3 seats, Y for 15. Let me check:", time: "11:02", typing: true },
    { side: "them", text: "Team of 5.", time: "11:03" },
    { side: "us", text: "Then Y with a 15% discount. Close now? 💳", time: "11:03" },
  ],
  ecommerce: [
    { side: "them", text: "When does my order arrive?", time: "18:41" },
    { side: "us", text: "Order #8421 is out. Courier will call between 9-11am tomorrow 🚚", time: "18:41" },
    { side: "them", text: "Can I change the address?", time: "18:42" },
    { side: "us", text: "Sure. Edit link sent ✏️", time: "18:42", typing: true },
  ],
};

export function ChatVisual({
  isHe,
  variant = "whatsapp",
}: {
  isHe: boolean;
  variant?: "whatsapp" | "sales" | "ecommerce";
}) {
  const lines = (isHe ? HE_CONVOS : EN_CONVOS)[variant];
  const [saved, setSaved] = useState(12_450);
  useEffect(() => {
    const id = setInterval(() => setSaved((s) => s + Math.floor(Math.random() * 80) + 40), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative rounded-[28px] bg-surface p-5 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between border-b border-rule-soft pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 font-bold text-white">AI</div>
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-surface" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{isHe ? "הסוכן שלך" : "Your agent"}</p>
              <p className="text-[11px] font-medium text-emerald-500">{isHe ? "עונה תוך 8 שניות" : "Replies in 8s"}</p>
            </div>
          </div>
          <span className="rounded-full bg-cream px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">WhatsApp</span>
        </div>

        <div className="mt-4 space-y-2.5 text-sm">
          {lines.map((l, i) => {
            const isUs = l.side === "us";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`flex ${isUs ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                    isUs
                      ? "bg-gradient-to-bl from-teal-600 to-teal-700 text-white"
                      : "bg-cream text-ink-900 ring-1 ring-inset ring-rule-soft dark:text-white"
                  }`}
                >
                  <span>{l.text}</span>
                  {l.typing && (
                    <span className="ms-2 inline-flex gap-0.5 align-middle">
                      <span className="animate-blink-1 h-1 w-1 rounded-full bg-white/90" />
                      <span className="animate-blink-2 h-1 w-1 rounded-full bg-white/90" />
                      <span className="animate-blink-3 h-1 w-1 rounded-full bg-white/90" />
                    </span>
                  )}
                  <span className={`ms-2 text-[10px] ${isUs ? "text-teal-100" : "text-ink-400"}`} dir="ltr">
                    {l.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 ring-1 ring-inset ring-rule-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">{isHe ? "חיסכון החודש" : "Savings this month"}</p>
              <p key={saved} className="animate-tick mt-0.5 font-display text-2xl font-extrabold text-teal-700 dark:text-teal-300">
                {formatILS(saved)}
              </p>
            </div>
            <div className="text-end">
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">{isHe ? "שיחות פעילות" : "Active chats"}</p>
              <p className="mt-0.5 font-display text-2xl font-extrabold text-ink-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
