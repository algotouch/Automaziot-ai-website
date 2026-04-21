import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nadlanist AI — case study by Automaziot AI";

export default function OGImage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isHe = locale === "he";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#0B0C0E",
          backgroundImage:
            "radial-gradient(1100px 520px at 78% -8%, rgba(54,198,192,0.3), transparent 62%), radial-gradient(820px 460px at -4% 84%, rgba(14,71,103,0.55), transparent 60%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              background:
                "linear-gradient(135deg, #36C6C0 0%, #1F9AA1 55%, #0E4767 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path
                d="M12 28 L20 11 L28 28 M15.2 22.2 H24.8"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 800 }}>
            <span>Automaziot</span>
            <span style={{ marginInlineStart: 6, color: "#36C6C0" }}>AI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8FD7D2",
              background: "rgba(143,215,210,0.1)",
              border: "1px solid rgba(143,215,210,0.25)",
              padding: "8px 14px",
              borderRadius: 999,
            }}
          >
            {isHe ? "סיפור הצלחה · פלגשיפ" : "Case study · Flagship"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -1.4,
            }}
          >
            Nadlanist AI
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#CDD2D9", lineHeight: 1.35, maxWidth: 920 }}>
            {isHe
              ? "פלטפורמת AI לנדל״ן שהתפרסמה ב־Walla, ICE ומעריב. ₪34M+ של עסקאות שזזו."
              : "A real-estate AI platform featured in Walla, ICE and Maariv. ₪34M+ of deals moved."}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8FD7D2",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <span>automaziot.ai/{locale}/case-studies/nadlanist-ai</span>
          <span>{isHe ? "פלגשיפ של Automaziot AI" : "Automaziot AI flagship"}</span>
        </div>
      </div>
    ),
    size,
  );
}
