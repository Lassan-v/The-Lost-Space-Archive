import React from "react";
import { Img, staticFile } from "remotion";
import { C } from "../theme";

// Screenshots are 1170px wide (390 css px @3x).
const SHOT_W = 1170;

type Props = {
  readonly src: string; // file in public/screens
  readonly width?: number; // screen width in px
  readonly height?: number; // visible screen height in px
  readonly scrollY?: number; // scroll offset in screenshot pixels
  readonly style?: React.CSSProperties;
  readonly glow?: string;
};

// A soft, storybook-styled phone frame showing a real capture of the web app.
export const Phone: React.FC<Props> = ({ src, width = 600, height = 1240, scrollY = 0, style, glow = C.purple }) => {
  const k = width / SHOT_W;
  const bezel = 18;
  return (
    <div
      style={{
        position: "absolute",
        width: width + bezel * 2,
        height: height + bezel * 2,
        borderRadius: 74,
        background: "linear-gradient(160deg, #3A3470 0%, #1B1840 55%, #2B2560 100%)",
        padding: bezel,
        boxShadow: `0 40px 90px rgba(3,5,18,0.65), 0 0 0 3px rgba(199,168,238,0.35), 0 0 120px ${glow}55`,
        ...style,
      }}
    >
      <div style={{ width, height, borderRadius: 58, overflow: "hidden", position: "relative", background: C.night }}>
        <Img
          // 640px-wide JPEG copies (public/screens-sm) keep Chrome's memory low; scroll stays in 1170px units.
          src={staticFile(`screens-sm/${src.replace(/\.png$/, ".jpg")}`)}
          style={{ position: "absolute", left: 0, top: -scrollY * k, width, display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 32%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

type CropProps = {
  readonly src: string; // pre-cropped full-resolution image in public/screens-crop
  readonly w: number; // crop size in screenshot pixels
  readonly h: number;
  readonly scale: number; // output px per screenshot px
  readonly style?: React.CSSProperties;
  readonly border?: string;
};

// A magnified piece of a real screenshot ("callout card").
export const Crop: React.FC<CropProps> = ({ src, w, h, scale, style, border = C.gold }) => (
  <div
    style={{
      position: "absolute",
      width: w * scale,
      height: h * scale,
      overflow: "hidden",
      borderRadius: 28,
      border: `5px solid ${border}`,
      boxShadow: "0 30px 70px rgba(3,5,18,0.6)",
      background: C.night,
      ...style,
    }}
  >
    <Img
      src={staticFile(`screens-crop/${src}`)}
      style={{ position: "absolute", left: 0, top: 0, width: w * scale, height: h * scale }}
    />
  </div>
);
