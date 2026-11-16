import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../theme";

type Props = {
  readonly tint?: "station" | "mars" | "moon" | "night";
  readonly drift?: number; // px of parallax drift over the scene
  readonly starCount?: number;
  readonly seed?: string;
};

const TINTS: Record<NonNullable<Props["tint"]>, [string, string, string]> = {
  night: [C.night, C.navy, "rgba(146,112,217,0.30)"],
  station: [C.cabinInk, "#22205A", "rgba(108,69,181,0.45)"],
  mars: ["#1E1236", C.marsViolet, "rgba(240,123,98,0.35)"],
  moon: [C.night, C.moonIndigo, "rgba(182,169,217,0.30)"],
};

// Layered storybook night sky: gradient, two nebula glows, three star layers with parallax.
export const Backdrop: React.FC<Props> = ({ tint = "night", drift = 60, starCount = 140, seed = "sky" }) => {
  const frame = useCurrentFrame();
  const [top, bottom, glow] = TINTS[tint];
  const stars = useMemo(
    () =>
      new Array(starCount).fill(0).map((_, i) => ({
        x: random(`${seed}-x-${i}`) * 1080,
        y: random(`${seed}-y-${i}`) * 1920,
        r: 1 + random(`${seed}-r-${i}`) * 3.2,
        layer: Math.floor(random(`${seed}-l-${i}`) * 3),
        tw: random(`${seed}-t-${i}`) * Math.PI * 2,
        gold: random(`${seed}-g-${i}`) > 0.86,
      })),
    [seed, starCount],
  );
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          left: -420 + Math.sin(t * 0.3) * 30,
          top: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glow} 0%, rgba(0,0,0,0) 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          right: -460,
          top: 1050 + Math.cos(t * 0.25) * 25,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,174,50,0.16) 0%, rgba(0,0,0,0) 65%)",
        }}
      />
      {stars.map((s, i) => {
        const speed = [0.35, 0.65, 1][s.layer];
        const y = s.y - interpolate(frame, [0, 150], [0, drift * speed], { extrapolateRight: "extend" });
        const wrapped = ((y % 1920) + 1920) % 1920;
        const twinkle = 0.55 + 0.45 * Math.sin(t * 2.2 + s.tw);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: wrapped,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: "50%",
              background: s.gold ? C.yellow : "#FFFFFF",
              opacity: (0.25 + 0.55 * speed) * twinkle,
              boxShadow: s.r > 3 ? `0 0 ${s.r * 4}px ${s.gold ? C.gold : "#ffffff"}` : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
