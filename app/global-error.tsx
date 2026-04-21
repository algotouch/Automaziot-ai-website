"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            '"Heebo", ui-sans-serif, system-ui, -apple-system, sans-serif',
          background: "#F7F9FB",
          color: "#0B0C0E",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p
            style={{
              color: "#C24B3A",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              marginTop: 16,
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.026em",
            }}
          >
            The site couldn&apos;t load.
          </h1>
          <p style={{ marginTop: 12, color: "#5C626B" }}>
            Reload the page. If it persists, WhatsApp us at{" "}
            <a
              href="https://wa.me/972542787664"
              style={{ color: "#0E4767", fontWeight: 600 }}
            >
              wa.me/972542787664
            </a>
            .
          </p>
          {error.digest && (
            <p
              style={{
                marginTop: 12,
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                color: "#7A828D",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              padding: "10px 20px",
              borderRadius: 9999,
              background: "#0E4767",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
