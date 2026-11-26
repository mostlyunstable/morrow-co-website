import { ImageResponse } from "next/og";

export const alt =
  "Morrow & Co. — Workflow Automation, Custom SaaS & Web Products";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 80% 25%, rgba(68,131,232,0.22), rgba(0,0,0,0) 55%)",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
              <path
                d="M4.78 18.5A11.5 11.5 0 1 1 27.22 18.5Q16 12.2 4.78 18.5Z"
                fill="#FFFFFF"
              />
              <path
                d="M6.07 21.8Q16 16.2 25.93 21.8A11.5 11.5 0 0 1 6.07 21.8Z"
                fill="#4483E8"
              />
            </svg>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Morrow &amp; Co.
            </span>
          </div>

          <span
            style={{
              fontSize: "16px",
              color: "#60a5fa",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            INDIA &amp; GLOBAL SOFTWARE STUDIO
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "74px",
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              maxWidth: "920px",
            }}
          >
            Automate the busywork. Build whatever comes next.
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: "820px",
            }}
          >
            AI workflows, custom SaaS apps, and web products engineered for
            ambitious teams in India and worldwide.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#71717a",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>WORKFLOW AUTOMATION · SAAS · WEB PRODUCTS</span>
          <span style={{ color: "#93c5fd" }}>INR ₹ &amp; USD $</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
