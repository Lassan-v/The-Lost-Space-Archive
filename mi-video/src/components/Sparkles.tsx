import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../theme";

type Props = {
  readonly x: number;
  readonly y: number;
  readonly at: number; // frame of the burst
  readonly count?: number;
  readonly radius?: number;
  readonly seed?: string;
};

// Four-point star burst (the app's "discovery" sparkle language).
export const Burst: React.FC<Props> = ({ x, y, at, count = 14, radius = 260, seed = "b" }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0 || t > 40) return null;
  const p = interpolate(t, [0, 40], [0, 1]);
  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + random(`${seed}${i}`) * 0.5;
        const d = radius * (0.5 + random(`${seed}d${i}`) * 0.6) * Math.sqrt(p);
        const size = (18 + random(`${seed}s${i}`) * 26) * (1 - p * 0.8);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              position: "absolute",
              left: x + Math.cos(a) * d - size / 2,
              top: y + Math.sin(a) * d - size / 2,
              opacity: 1 - p,
              transform: `rotate(${p * 90}deg)`,
            }}
          >
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill={i % 3 ? C.yellow : C.lavender} />
          </svg>
        );
      })}
    </>
  );
};
