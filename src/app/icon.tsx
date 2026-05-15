import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — three champagne dots (brand signal). Full wordmark is a poor crop at 32px; see layout metadata TODO. */
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
          background: "#060912",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#c9ab82",
                opacity: i === 2 ? 1 : 0.55,
                ...(i === 2 ? { boxShadow: "0 0 10px rgba(201,171,130,0.45)" } : {}),
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
