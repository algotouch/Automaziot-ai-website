import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(135deg, #36C6C0 0%, #1F9AA1 55%, #0E4767 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 28 L20 11 L28 28 M15.2 22.2 H24.8"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="33.2" r="1.8" fill="#A8F0EA" />
        </svg>
      </div>
    ),
    size,
  );
}
