import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Chip, Words } from "../components/Kinetic";
import { body, C, display } from "../theme";

// 22.7–27.3s · THE IMPACT — real history, kid-sized. Figures shown in the app's NASA-sourced cards:
// Sojourner 83 days (planned 7) · Ingenuity 72 flights · Apollo 17 LRV 35.9 km (src/i18n/en.ts science.*).
export const STATS = [
  { value: 83, decimals: 0, unit: "days", line: "Sojourner kept exploring Mars (planned: 7)", src: "char-sojourner.svg", color: C.marsCoral, at: 26 },
  { value: 72, decimals: 0, unit: "flights", line: "Ingenuity completed on Mars", src: "char-ingenuity.svg", color: C.marsOrange, at: 40 },
  { value: 35.9, decimals: 1, unit: "km", line: "the Apollo 17 rover drove on the Moon", src: "char-apollo17.svg", color: C.moonLavender, at: 54 },
];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const S5Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Backdrop tint="night" drift={70} seed="impact" />
      <div style={{ position: "absolute", top: 200, left: 60, right: 60 }}>
        <Words text="Real NASA history." delay={0} stagger={3} size={100} />
        <Words text="Kid-sized adventures." delay={10} stagger={3} size={100} color={C.gold} />
      </div>
      {STATS.map((s, i) => {
        const p = spring({ frame: frame - s.at, fps, config: { damping: 13, stiffness: 140 } });
        const count = interpolate(frame, [s.at, s.at + 26], [0, s.value], clamp);
        return (
          <div
            key={s.unit}
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 560 + i * 300,
              height: 260,
              borderRadius: "30px 30px 30px 8px",
              background: "linear-gradient(120deg, rgba(28,36,70,0.95) 0%, rgba(39,60,103,0.85) 100%)",
              border: `3px solid ${s.color}`,
              boxShadow: "0 24px 50px rgba(3,5,18,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "0 36px",
              transform: `translateX(${interpolate(p, [0, 1], [i % 2 ? 900 : -900, 0])}px)`,
              opacity: interpolate(p, [0, 0.3], [0, 1], clamp),
            }}
          >
            <Img src={staticFile(`brand/${s.src}`)} style={{ width: 230, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span style={{ fontFamily: display, fontWeight: 700, fontSize: 120, color: C.gold, lineHeight: 1 }}>
                  {count.toFixed(s.decimals)}
                </span>
                <span style={{ fontFamily: display, fontWeight: 700, fontSize: 56, color: C.paper }}>{s.unit}</span>
              </div>
              <span style={{ fontFamily: body, fontWeight: 800, fontSize: 34, color: C.lavender, lineHeight: 1.2 }}>{s.line}</span>
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 1490, width: "100%", display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
        <Chip delay={80} size={36}>
          English + Spanish
        </Chip>
        <Chip delay={86} size={36}>
          Ages 8–10
        </Chip>
        <Chip delay={92} size={36}>
          No accounts
        </Chip>
      </div>
    </AbsoluteFill>
  );
};
