import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { S1Hook } from "./scenes/S1Hook";
import { CARD_POP_FRAMES, S2Problem } from "./scenes/S2Problem";
import { S3Solution } from "./scenes/S3Solution";
import { BEATS, S4Showcase } from "./scenes/S4Showcase";
import { S5Impact, STATS } from "./scenes/S5Impact";
import { S6Cta } from "./scenes/S6Cta";
import { SCENES, STARTS, TRANSITION } from "./theme";

const t = linearTiming({ durationInFrames: TRANSITION });
const ts = springTiming({ durationInFrames: TRANSITION, config: { damping: 200 } });

// One sound effect placed on the absolute timeline.
const Sfx: React.FC<{ name: string; at: number; volume?: number }> = ({ name, at, volume = 0.5 }) => (
  <Sequence from={at} layout="none" name={`sfx ${name}`}>
    <Audio src={staticFile(`audio/sfx-${name}.wav`)} volume={volume} />
  </Sequence>
);

export const LostSpaceArchivePromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#10152F" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="1 Hook" durationInFrames={SCENES.hook}>
          <S1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence name="2 Problem" durationInFrames={SCENES.problem}>
          <S2Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={ts} />
        <TransitionSeries.Sequence name="3 Solution" durationInFrames={SCENES.solution}>
          <S3Solution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={ts} />
        <TransitionSeries.Sequence name="4 Showcase" durationInFrames={SCENES.showcase}>
          <S4Showcase />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={ts} />
        <TransitionSeries.Sequence name="5 Impact" durationInFrames={SCENES.impact}>
          <S5Impact />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence name="6 CTA" durationInFrames={SCENES.cta}>
          <S6Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Original soundtrack (scripts/synth.mjs) */}
      <Audio src={staticFile("audio/music.wav")} volume={0.78} name="Music" />

      {/* Sound design, synced to the scene timeline */}
      <Sfx name="glitch" at={2} volume={0.35} />
      {[STARTS.problem, STARTS.solution, STARTS.showcase, STARTS.impact, STARTS.cta].map((f) => (
        <Sfx key={`w${f}`} name="whoosh" at={f - 6} volume={0.45} />
      ))}
      {CARD_POP_FRAMES.map((f) => (
        <Sfx key={`p${f}`} name="pop" at={STARTS.problem + f} volume={0.3} />
      ))}
      <Sfx name="stamp" at={STARTS.problem + 82} volume={0.45} />
      <Sfx name="chime" at={STARTS.solution + 22} volume={0.45} />
      <Sfx name="pop" at={STARTS.solution + 36} volume={0.4} />
      {BEATS.map((b) => (
        <Sfx key={`t${b}`} name="tick" at={STARTS.showcase + b} volume={0.45} />
      ))}
      <Sfx name="pop" at={STARTS.showcase + BEATS[0] + 28} volume={0.35} />
      <Sfx name="pop" at={STARTS.showcase + BEATS[1] + 40} volume={0.35} />
      {[4, 12, 20].map((d) => (
        <Sfx key={`f${d}`} name="pop" at={STARTS.showcase + BEATS[2] + d} volume={0.3} />
      ))}
      <Sfx name="chime" at={STARTS.showcase + BEATS[3] + 14} volume={0.4} />
      <Sfx name="chime" at={STARTS.showcase + BEATS[3] + 50} volume={0.35} />
      {STATS.map((s) => (
        <Sfx key={`s${s.at}`} name="pop" at={STARTS.impact + s.at} volume={0.35} />
      ))}
      <Sfx name="impact" at={STARTS.cta} volume={0.3} />
      <Sfx name="chime" at={STARTS.cta + 6} volume={0.25} />
    </AbsoluteFill>
  );
};
