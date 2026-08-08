import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} Educator Portfolio`,
    short_name: "Shirleen Xu",
    description: "Professional early childhood educator portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f5",
    theme_color: "#1b526e",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
