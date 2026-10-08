import { ImageResponse } from "next/og";
import { brand } from "@/lib/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the wordmark initial on the accent colour. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b4ed8",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 600,
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        {brand.firstName.charAt(0)}
      </div>
    ),
    size,
  );
}
