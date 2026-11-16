import React from "react";
import { AbsoluteFill, Img, interpolate, Easing, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Words } from "../components/Kinetic";
import { C } from "../theme";

// 0–4.7s · HOOK — real explorers resting on Mars; "They explored other worlds. Then we left them behind."
const ROVERS = [
  { src: "char-spirit.svg", x: 0, w: 470, y: 1300 },
  { src: "char-ingenuity.svg", x: 360, w: 400, y: 1130 },
  { src: "char-sojourner.svg", x: 640, w: 440, y: 1380 },
];

export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 140], [1.0, 1.09], { easing: Easing.out(Easing.quad) });
  const pan = interpolate(frame, [0, 140], [0, -90]);
  const dim = interpolate(frame, [60, 110], [1, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const landIn = interpolate(frame, [0, 30], [140, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Backdrop tint="mars" drift={50} seed="hook" />
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "50% 75%" }}>
        <Img
          src={staticFile("brand/mars-expedition.svg")}
          style={{
            position: "absolute",
            width: 2600,
            left: -760 + pan,
            top: 560 + landIn,
            filter: `brightness(${0.75 * dim + 0.2}) saturate(${dim})`,
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 22%)",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 22%)",
          }}
        />
        {ROVERS.map((r, i) => {
          const blink = frame < 70 ? 0.6 + 0.4 * Math.sin(frame / 4 + i * 2) : interpolate(frame, [70, 100 + i * 6], [1, 0], { extrapolateRight: "clamp" });
          return (
            <div key={r.src} style={{ position: "absolute", left: r.x + pan * 0.6, top: r.y + landIn * 1.3, width: r.w }}>
              <Img
                src={staticFile(`brand/${r.src}`)}
                style={{ width: r.w, filter: `brightness(${0.55 + 0.45 * dim}) saturate(${0.4 + 0.6 * dim}) drop-shadow(0 18px 20px rgba(0,0,0,0.45))` }}
              />
              <div
                style={{
                  position: "absolute",
                  left: r.w / 2 - 9,
                  top: r.w * 0.18,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: C.yellow,
                  opacity: blink,
                  boxShadow: `0 0 28px 10px rgba(247,215,121,${0.6 * blink})`,
                }}
              />
            </div>
          );
        })}
      </AbsoluteFill>
      {/* top vignette keeps the headline readable */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(16,21,47,0.85) 0%, rgba(16,21,47,0.35) 40%, rgba(16,21,47,0) 60%)" }} />
      <div style={{ position: "absolute", top: 300, left: 70, right: 70 }}>
        <Words text="They explored other worlds." delay={6} stagger={4} size={112} />
      </div>
      <div style={{ position: "absolute", top: 640, left: 70, right: 70 }}>
        <Words text="Then we left them behind." delay={58} stagger={5} size={92} highlight={["behind"]} color={C.lavender} />
      </div>
    </AbsoluteFill>
  );
};
