import { ImageResponse } from "next/og";
import { nameParts, siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
  Hex rather than the oklch() tokens: this renders through satori, which has no
  stylesheet and no support for that colour space. Values are the dark palette
  from globals.css, converted once.
*/
const paper = "#0a100e";
const ink = "#eff3ee";
const muted = "#b9c2bb";
const line = "#27302d";
const accent = "#64d3a9";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          backgroundImage: `radial-gradient(900px 500px at 85% -10%, rgba(100,211,169,0.2), transparent 60%)`,
          padding: "72px 80px",
          color: ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: accent }}
          />
          <div style={{ fontSize: 24, letterSpacing: 4, color: muted }}>
            {siteConfig.availability.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Flex children collapse the space between words, so gap supplies it. */}
          <div style={{ display: "flex", gap: 32, fontSize: 128, letterSpacing: -4 }}>
            <span>{nameParts.first}</span>
            <span style={{ color: accent }}>{nameParts.last}</span>
          </div>
          {/* One interpolated string, not three nodes — satori requires an
              explicit display on any element with more than one child. */}
          <div style={{ fontSize: 40, color: muted, marginTop: 16 }}>
            {`${siteConfig.title} · ${siteConfig.location}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${line}`,
            paddingTop: 28,
            fontSize: 26,
            color: muted,
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.stack.slice(0, 5).join("  ·  ")}</div>
          <div style={{ display: "flex" }}>{siteConfig.email}</div>
        </div>
      </div>
    ),
    size,
  );
}
