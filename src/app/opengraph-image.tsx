import { ImageResponse } from "next/og";
import { brand, siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
  Hex rather than the oklch() tokens: this renders through satori, which has no
  stylesheet and no support for that colour space. Values are the dark palette
  from globals.css, converted once.
*/
const paper = "#090d16";
const ink = "#f0f4f7";
const muted = "#a9b2be";
const line = "#232935";
const accent = "#65a7fa";

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
          backgroundImage: `radial-gradient(900px 500px at 85% -10%, rgba(101,167,250,0.2), transparent 60%)`,
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
          <div style={{ display: "flex", fontSize: 128, letterSpacing: -4 }}>
            <span>{brand.firstName}</span>
            {brand.handle && <span style={{ color: accent }}>.{brand.handle}</span>}
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
