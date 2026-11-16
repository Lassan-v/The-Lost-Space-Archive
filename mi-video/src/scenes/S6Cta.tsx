import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Words } from "../components/Kinetic";
import { Burst } from "../components/Sparkles";
import { body, C } from "../theme";

// 26.7–30s · FINAL CTA — logo, name, URL, team + independence note.
export const S6Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spark = spring({ frame: frame - 2, fps, config: { damping: 9, stiffness: 140, mass: 0.7 } });
  const url = spring({ frame: frame - 34, fps, config: { damping: 12, stiffness: 170 } });
  const foot = interpolate(frame, [50, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <AbsoluteFill>
      <Backdrop tint="station" drift={40} seed="cta" />
      <div
        style={{
          position: "absolute",
          left: 540 - 230,
          top: 190,
          width: 460,
          height: 460,
          transform: `scale(${interpolate(spark, [0, 1], [0.2, 1])}) translateY(${Math.sin(frame / 8) * 8}px)`,
        }}
      >
        <div style={{ position: "absolute", inset: 40, borderRadius: "50%", background: "radial-gradient(circle, rgba(247,174,50,0.35) 0%, rgba(0,0,0,0) 70%)" }} />
        <Img src={staticFile("brand/spark-celebration.svg")} style={{ width: 460 }} />
      </div>
      <Burst x={540} y={400} at={4} count={20} radius={420} seed="cta" />
      <div style={{ position: "absolute", top: 670, left: 50, right: 50 }}>
        <Words text="The Lost Space Archive" delay={8} stagger={3} size={108} highlight={["Archive"]} />
      </div>
      <div style={{ position: "absolute", top: 940, left: 70, right: 70 }}>
        <Words text="Open the archive. Find their stories." delay={20} stagger={2} size={52} font="body" weight={900} color={C.lavender} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1070,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          transform: `scale(${interpolate(url, [0, 1], [0.5, 1])})`,
          opacity: interpolate(url, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            fontFamily: body,
            fontWeight: 900,
            fontSize: 52,
            color: C.ink,
            background: C.gold,
            borderRadius: 26,
            padding: "26px 40px",
            boxShadow: `0 0 ${40 + glow * 50}px rgba(247,174,50,${0.35 + glow * 0.3}), 0 16px 40px rgba(3,5,18,0.5)`,
            letterSpacing: -0.5,
          }}
        >
          thelostspacearchive.vercel.app
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1290,
          left: 80,
          right: 80,
          display: "flex",
          alignItems: "center",
          gap: 26,
          opacity: foot,
          transform: `translateY(${(1 - foot) * 30}px)`,
        }}
      >
        <Img src={staticFile("brand/grupo-epico-logo.png")} style={{ width: 130, height: 130, borderRadius: "50%" }} />
        <div style={{ fontFamily: body, color: C.body, lineHeight: 1.3 }}>
          <div style={{ fontWeight: 900, fontSize: 36 }}>Grupo Épico · NASA Space Apps Challenge 2026</div>
          <div style={{ fontWeight: 600, fontSize: 28, color: C.moonSilver, marginTop: 6 }}>Independent project. Not an official NASA product.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
