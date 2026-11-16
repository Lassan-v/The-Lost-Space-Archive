import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Words } from "../components/Kinetic";
import { accent, body, C } from "../theme";

// 4–8.7s · THE PROBLEM — six real explorers on two worlds; their stories nearly disappeared.
export const EXPLORERS = [
  { name: "Sojourner", world: "Mars", src: "char-sojourner.svg" },
  { name: "Spirit", world: "Mars", src: "char-spirit.svg" },
  { name: "Opportunity", world: "Mars", src: "char-opportunity.svg" },
  { name: "Ingenuity", world: "Mars", src: "char-ingenuity.svg" },
  { name: "Surveyor 3", world: "Moon", src: "char-surveyor.svg" },
  { name: "Apollo 17 Rover", world: "Moon", src: "char-apollo17.svg" },
];
export const CARD_POP_FRAMES = EXPLORERS.map((_, i) => 18 + i * 7);

export const S2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [76, 118], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Backdrop tint="night" drift={40} seed="problem" />
      <div style={{ position: "absolute", top: 230, left: 60, right: 60 }}>
        <Words text="6 explorers." delay={2} stagger={4} size={110} highlight={["6"]} />
        <Words text="2 worlds." delay={10} stagger={4} size={110} highlight={["2"]} />
      </div>
      {EXPLORERS.map((e, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const s = spring({ frame: frame - CARD_POP_FRAMES[i], fps, config: { damping: 11, stiffness: 170, mass: 0.6 } });
        const mars = e.world === "Mars";
        const drift = Math.sin((frame + i * 13) / 22) * 6;
        return (
          <div
            key={e.name}
            style={{
              position: "absolute",
              left: 80 + col * 480,
              top: 560 + row * 360 + drift,
              width: 440,
              height: 320,
              borderRadius: "28px 28px 28px 8px",
              background: `linear-gradient(170deg, ${mars ? "rgba(91,52,127,0.92)" : "rgba(33,28,92,0.92)"} 0%, rgba(16,21,47,0.95) 100%)`,
              border: `3px solid ${mars ? C.marsCoral : C.moonLavender}`,
              boxShadow: "0 24px 50px rgba(3,5,18,0.5)",
              transform: `scale(${interpolate(s, [0, 1], [0.4, 1])}) rotate(${interpolate(s, [0, 1], [col ? 8 : -8, 0])}deg)`,
              opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) * (0.3 + 0.7 * fade),
              filter: `saturate(${0.15 + 0.85 * fade})`,
              overflow: "hidden",
            }}
          >
            <Img src={staticFile(`brand/${e.src}`)} style={{ position: "absolute", left: 90, top: 8, width: 260 }} />
            <div
              style={{
                position: "absolute",
                left: 22,
                right: 22,
                bottom: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: body, fontWeight: 900, fontSize: e.name.length > 12 ? 31 : 38, color: C.paper, whiteSpace: "nowrap" }}>
                {e.name}
              </span>
              <span
                style={{
                  fontFamily: accent,
                  fontSize: 30,
                  color: C.ink,
                  background: mars ? C.marsCoral : C.moonSilver,
                  borderRadius: 999,
                  padding: "4px 16px",
                }}
              >
                {e.world}
              </span>
            </div>
          </div>
        );
      })}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 55%, rgba(16,21,47,0.75) 0%, rgba(16,21,47,0) 70%)",
          opacity: 1 - fade,
        }}
      />
      <div style={{ position: "absolute", top: 900, left: 70, right: 70 }}>
        <Words text="Their stories nearly disappeared." delay={80} stagger={5} size={100} color={C.paper} highlight={["disappeared"]} />
      </div>
    </AbsoluteFill>
  );
};
