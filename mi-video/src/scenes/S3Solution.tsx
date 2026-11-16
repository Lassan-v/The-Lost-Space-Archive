import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Chip, Words } from "../components/Kinetic";
import { Burst } from "../components/Sparkles";
import { body, C } from "../theme";

// 8–12.7s · THE SOLUTION — Archive Keeper Spark opens The Lost Space Archive.
export const S3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sparkIn = spring({ frame: frame - 4, fps, config: { damping: 10, stiffness: 120, mass: 0.8 } });
  const bob = Math.sin(frame / 9) * 10;
  const ring = interpolate(frame, [0, 140], [0, 40]);
  const logoIn = spring({ frame: frame - 34, fps, config: { damping: 12, stiffness: 150 } });
  return (
    <AbsoluteFill>
      <Backdrop tint="station" drift={50} seed="solution" />
      <Img
        src={staticFile("brand/memory-station-cabin.svg")}
        style={{ position: "absolute", width: 2200, left: -560, top: 960, opacity: 0.32, filter: "blur(2px)" }}
      />
      <div style={{ position: "absolute", top: 220, width: "100%", display: "flex", justifyContent: "center" }}>
        <Chip delay={0} size={46}>
          Abandoned, but not forgotten.
        </Chip>
      </div>
      {/* Spark with orbit halo, echoing the app's welcome screen */}
      <div
        style={{
          position: "absolute",
          left: 540 - 330,
          top: 330,
          width: 660,
          height: 660,
          transform: `translateY(${interpolate(sparkIn, [0, 1], [500, 0]) + bob}px) scale(${interpolate(sparkIn, [0, 1], [0.6, 1])})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 30,
            borderRadius: "50%",
            border: `3px solid rgba(199,168,238,0.35)`,
            transform: `rotateX(64deg) rotateZ(${ring}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(146,112,217,0.55) 0%, rgba(146,112,217,0) 70%)",
          }}
        />
        <Img src={staticFile("brand/spark-welcoming.svg")} style={{ position: "absolute", inset: 0, width: 660 }} />
      </div>
      <Burst x={540} y={620} at={22} count={16} radius={380} seed="sol" />
      <div
        style={{
          position: "absolute",
          top: 1030,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          transform: `scale(${interpolate(logoIn, [0, 1], [0.3, 1])}) rotate(${interpolate(logoIn, [0, 1], [-120, 0])}deg)`,
          opacity: interpolate(logoIn, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <Img src={staticFile("brand/favicon.svg")} style={{ width: 120, filter: "drop-shadow(0 0 30px rgba(247,174,50,0.6))" }} />
      </div>
      <div style={{ position: "absolute", top: 1170, left: 50, right: 50 }}>
        <Words text="The Lost" delay={40} stagger={4} size={128} />
        <Words text="Space Archive" delay={48} stagger={4} size={128} highlight={["Archive"]} />
      </div>
      <div style={{ position: "absolute", top: 1480, left: 90, right: 90 }}>
        <Words
          text="An interactive space storybook for kids aged 8–10"
          delay={70}
          stagger={2}
          size={50}
          font="body"
          weight={800}
          color={C.lavender}
          lineHeight={1.25}
          style={{ fontFamily: body }}
        />
      </div>
    </AbsoluteFill>
  );
};
