import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 390, 640, 768, 900, 1024, 1280, 1440, 1920],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/Qiaolin-XU-Shirleen-CV.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Qiaolin-XU-Shirleen-CV.pdf"',
          },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "xuqiaolin.com" }],
        destination: "https://www.xuqiaolin.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
