import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { accent, body, C, display } from "../theme";

type WordsProps = {
  readonly text: string;
  readonly delay?: number;
  readonly stagger?: number;
  readonly size?: number;
  readonly color?: string;
  readonly font?: "display" | "body" | "accent";
  readonly weight?: number;
  readonly align?: "center" | "left";
  readonly lineHeight?: number;
  readonly highlight?: string[]; // words drawn in gold
  readonly style?: React.CSSProperties;
};

// Words rise in one by one with a soft spring + de-blur.
export const Words: React.FC<WordsProps> = ({
  text,
  delay = 0,
  stagger = 3,
  size = 96,
  color = C.paper,
  font = "display",
  weight = 700,
  align = "center",
  lineHeight = 1.08,
  highlight = [],
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const family = font === "display" ? display : font === "accent" ? accent : body;
  const words = text.split(" ");
  return (
    <div
      style={{
        fontFamily: family,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        textAlign: align,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        columnGap: size * 0.26,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const s = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 14, stiffness: 140, mass: 0.7 } });
        const clean = w.replace(/[.,!?…]/g, "");
        const isHi = highlight.includes(clean);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${interpolate(s, [0, 1], [size * 0.55, 0])}px) scale(${interpolate(s, [0, 1], [0.86, 1])})`,
              opacity: interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: "clamp" }),
              filter: `blur(${interpolate(s, [0, 1], [10, 0])}px)`,
              color: isHi ? C.gold : undefined,
              textShadow: isHi ? `0 0 ${size * 0.35}px rgba(247,174,50,0.45)` : "0 6px 24px rgba(5,8,24,0.45)",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

type ChipProps = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly color?: string;
  readonly size?: number;
  readonly style?: React.CSSProperties;
};

// Pill label echoing the app's "A space storybook adventure" eyebrow.
export const Chip: React.FC<ChipProps> = ({ children, delay = 0, color = C.yellow, size = 40, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 160 } });
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: `${size * 0.32}px ${size * 0.75}px`,
        borderRadius: 999,
        border: `3px solid ${color}`,
        background: "rgba(16,21,47,0.72)",
        color,
        fontFamily: accent,
        fontSize: size,
        letterSpacing: 0.5,
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
        opacity: interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
        boxShadow: "0 10px 30px rgba(5,8,24,0.35)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
