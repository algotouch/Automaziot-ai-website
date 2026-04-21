export const WHATSAPP_NUMBER = "972542787664";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const CONTACT = {
  phoneIL: "03-7630715",
  phoneUS: "(646) 760-4854",
  email: "info@automaziot.ai",
  addressHe: "אחד העם 9, תל אביב, מגדל שלום",
  addressEn: "9 Ahad Ha'am St, Tel Aviv, Shalom Tower",
  whatsapp: WHATSAPP_NUMBER,
  social: {
    facebook: "https://www.facebook.com/people/אוטומציות-וסוכני-AI/61580881230761",
    instagram: "https://www.instagram.com/automaziot_ai",
    linkedin: "https://www.linkedin.com/company/automaziot-ai/",
  },
} as const;
