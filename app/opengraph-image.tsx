import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}, Early Childhood Educator`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f6f7f5",
        color: "#172023",
        padding: "72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderTop: "2px solid #1b526e",
          paddingTop: "34px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#1b526e" }}>{SITE_NAME}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", maxWidth: 860, fontSize: 86, fontWeight: 700, lineHeight: 0.98 }}>
            Language builds belonging.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#626c70" }}>Early childhood educator</div>
        </div>
      </div>
    </div>,
    size,
  );
}
