import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Automaziot AI — AI agents and automation for Israeli businesses";

export default async function OGImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
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
            "radial-gradient(1100px 520px at 78% -8%, rgba(54,198,192,0.35), transparent 62%), radial-gradient(820px 460px at -4% 84%, rgba(14,71,103,0.55), transparent 60%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #36C6C0 0%, #1F9AA1 55%, #0E4767 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path
                d="M12 28 L20 11 L28 28 M15.2 22.2 H24.8"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="33.2" r="1.6" fill="#A8F0EA" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 800, letterSpacing: -0.4 }}>
            <span>Automaziot</span>
            <span style={{ marginInlineStart: 6, color: "#36C6C0" }}>AI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
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
            {isHe ? "AI · אוטומציה · 24/7" : "AI · Automation · 24/7"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1.4,
            }}
          >
            {t("siteTitle")}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#CDD2D9", lineHeight: 1.35, maxWidth: 860 }}>
            {t("siteDescription")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8FD7D2",
            fontSize: 18,
          }}
        >
          <span>automaziot.ai</span>
          <span>{isHe ? "תל אביב · ניו יורק" : "Tel Aviv · New York"}</span>
        </div>
      </div>
    ),
    size,
  );
}
