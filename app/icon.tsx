import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1b526e",
        color: "#f7fafb",
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "Arial, sans-serif",
      }}
    >
      QX
    </div>,
    size,
  );
}
