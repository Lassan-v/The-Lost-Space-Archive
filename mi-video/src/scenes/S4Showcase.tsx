import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Chip, Words } from "../components/Kinetic";
import { Crop, Phone } from "../components/Phone";
import { Burst } from "../components/Sparkles";
import { accent, body, C } from "../theme";

// 12–22.7s · PRODUCT SHOWCASE — four beats of 80 frames, each on the 90 BPM bar.
export const BEATS = [20, 100, 180, 260];
const BEAT_LEN = 80;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Section title: "01 · Choose an expedition"
const Label: React.FC<{ n: string; text: string }> = ({ n, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const out = interpolate(frame, [BEAT_LEN - 8, BEAT_LEN], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: 190,
        left: 60,
        right: 60,
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateX(${interpolate(s, [0, 1], [-160, 0]) - out * 160}px)`,
        opacity: Math.min(interpolate(s, [0, 0.5], [0, 1], clamp), 1 - out),
      }}
    >
      <div
        style={{
          fontFamily: accent,
          fontSize: 56,
          color: C.ink,
          background: C.gold,
          borderRadius: 22,
          padding: "6px 20px",
          boxShadow: "0 10px 30px rgba(247,174,50,0.35)",
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <Words text={text} delay={2} stagger={2} size={66} align="left" />
      </div>
    </div>
  );
};

const Caption: React.FC<{ text: string; delay?: number }> = ({ text, delay = 10 }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [BEAT_LEN - 8, BEAT_LEN], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: 1640, width: "100%", display: "flex", justifyContent: "center", opacity: out }}>
      <Chip delay={delay} size={40} color={C.lavender}>
        {text}
      </Chip>
    </div>
  );
};

// Phone screen that slides up into place and scrolls through a real capture.
const Screen: React.FC<{ src: string; from: number; to: number; len?: number; enter?: boolean }> = ({ src, from, to, len = BEAT_LEN, enter = true }) => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [8, len - 6], [from, to], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const enterP = enter ? interpolate(frame, [0, 12], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) }) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${enterP * 2400}px)` }}>
      <Phone src={src} scrollY={scroll} width={600} height={1180} style={{ left: 0, top: 0 }} />
    </div>
  );
};

const PHONE_LEFT = (1080 - 636) / 2;
const PHONE_TOP = 400;

// Floating callout that pops out of the phone toward the viewer.
const Pop: React.FC<{ delay: number; children: React.ReactNode; x: number; y: number; rot?: number }> = ({ delay, children, x, y, rot = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 150 } });
  const out = interpolate(frame, [BEAT_LEN - 8, BEAT_LEN], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${interpolate(s, [0, 1], [0.3, 1])}) rotate(${rot * s}deg)`,
        opacity: interpolate(s, [0, 0.4], [0, 1], clamp) * out,
        transformOrigin: "50% 50%",
      }}
    >
      {children}
    </div>
  );
};

const Tag: React.FC<{ text: string; color?: string }> = ({ text, color = C.gold }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: -58,
      fontFamily: body,
      fontWeight: 900,
      fontSize: 34,
      color: C.ink,
      background: color,
      borderRadius: 999,
      padding: "6px 20px",
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);

export const S4Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneIn = spring({ frame, fps, config: { damping: 15, stiffness: 110 } });
  const sway = Math.sin(frame / 26) * 2.2;
  const beat = BEATS.findIndex((b, i) => frame >= b && (i === BEATS.length - 1 || frame < BEATS[i + 1]));
  const tint = beat === 3 ? "station" : beat === 0 ? "mars" : "night";
  // During beat 3 (hands-on missions) the main phone steps back to make room for the fan of activity screens.
  const back = interpolate(frame, [BEATS[2] - 4, BEATS[2] + 10, BEATS[3] - 8, BEATS[3] + 6], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <Backdrop tint={tint} drift={90} seed="showcase" />
      {/* Main phone */}
      <div
        style={{
          position: "absolute",
          left: PHONE_LEFT,
          top: PHONE_TOP,
          width: 636,
          height: 1216,
          transform: `perspective(2400px) translateY(${interpolate(phoneIn, [0, 1], [1500, 0])}px) rotateY(${sway * 3}deg) rotateZ(${sway * 0.5}deg) scale(${1 - back * 0.25})`,
          opacity: 1 - back * 0.85,
        }}
      >
        <Sequence from={0} durationInFrames={BEATS[1]} layout="none">
          <Screen src="station-full.png" from={0} to={1150} len={BEATS[1]} enter={false} />
        </Sequence>
        <Sequence from={BEATS[1]} durationInFrames={BEAT_LEN} layout="none">
          <Screen src="dossier-sojourner-full.png" from={0} to={2950} />
        </Sequence>
        <Sequence from={BEATS[2]} durationInFrames={BEAT_LEN} layout="none">
          <Screen src="challenge-sojourner-full.png" from={300} to={300} enter={false} />
        </Sequence>
        <Sequence from={BEATS[3]} layout="none">
          <Screen src="fragment-sojourner-full.png" from={0} to={0} len={50} />
        </Sequence>
        <Sequence from={BEATS[3] + 42} layout="none">
          <Screen src="constellation-full.png" from={150} to={150} len={40} />
        </Sequence>
      </div>

      {/* Beat 1 — choose an expedition */}
      <Sequence from={BEATS[0]} durationInFrames={BEAT_LEN} layout="none">
        <Label n="01" text="Pick a world to explore" />
        <Pop delay={28} x={600} y={1060} rot={4}>
          <Tag text="Mars map" color={C.marsCoral} />
          <Crop src="mars-map.png" w={1110} h={740} scale={0.42} border={C.marsCoral} />
        </Pop>
        <Caption text="Mars · Moon · Memory Station" />
      </Sequence>

      {/* Beat 2 — real mission records */}
      <Sequence from={BEATS[1]} durationInFrames={BEAT_LEN} layout="none">
        <Label n="02" text="Read real mission records" />
        <Pop delay={40} x={40} y={1080} rot={-3}>
          <Tag text="Every fact cites its source" />
          <Crop src="sojourner-timeline.png" w={1050} h={470} scale={0.95} />
        </Pop>
        <Caption text="Sourced from NASA · JPL · NSSDCA" />
      </Sequence>

      {/* Beat 3 — hands-on missions: fan of three activity screens */}
      <Sequence from={BEATS[2]} durationInFrames={BEAT_LEN} layout="none">
        <Label n="03" text="Play hands-on missions" />
        {[
          { src: "challenge-ingenuity-full.png", y: 1700, rot: -9, x: 30, d: 4, tag: "Fly Ingenuity" },
          { src: "challenge-apollo17-full.png", y: 2150, rot: 9, x: 630, d: 12, tag: "Plan a Moon route" },
          { src: "challenge-sojourner-full.png", y: 2400, rot: 0, x: 330, d: 20, tag: "Build Sojourner" },
        ].map((c) => (
          <Pop key={c.src} delay={c.d} x={c.x} y={c.rot === 0 ? 560 : 620} rot={c.rot}>
            <div style={{ position: "relative", width: 420, height: 860 }}>
              <Phone src={c.src} scrollY={c.y} width={384} height={824} style={{ left: 0, top: 0 }} glow={C.gold} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -76, display: "flex", justifyContent: "center" }}>
                <div style={{ fontFamily: body, fontWeight: 900, fontSize: 34, color: C.ink, background: C.yellow, borderRadius: 999, padding: "6px 20px", whiteSpace: "nowrap" }}>
                  {c.tag}
                </div>
              </div>
            </div>
          </Pop>
        ))}
        <Caption text="Simplified simulations, real mission data" delay={26} />
      </Sequence>

      {/* Beat 4 — collect memory fragments */}
      <Sequence from={BEATS[3]} layout="none">
        <Label n="04" text="Collect memory fragments" />
        <Burst x={540} y={760} at={14} count={18} radius={420} seed="frag" />
        <Burst x={540} y={900} at={50} count={18} radius={460} seed="const" />
        <Caption text="Complete the Constellation of Memories" delay={44} />
      </Sequence>
    </AbsoluteFill>
  );
};
