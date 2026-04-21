import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Automaziot AI — סוכני AI ואוטומציות לעסקים",
    short_name: "Automaziot AI",
    description:
      "AI agents and automation for Israeli businesses — Hebrew-native, 24/7.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F7F9FB",
    theme_color: "#0E4767",
    lang: "he",
    dir: "rtl",
    orientation: "portrait",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    categories: ["business", "productivity", "utilities"],
  };
}
