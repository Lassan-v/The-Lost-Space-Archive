import React from "react";
import { Composition, Folder } from "remotion";
import { S1Hook } from "./scenes/S1Hook";
import { S2Problem } from "./scenes/S2Problem";
import { S3Solution } from "./scenes/S3Solution";
import { S4Showcase } from "./scenes/S4Showcase";
import { S5Impact } from "./scenes/S5Impact";
import { S6Cta } from "./scenes/S6Cta";
import { LostSpaceArchivePromo } from "./Video";
import { SCENES, TOTAL } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Plates">
        <Composition id="Plate1-Hook" component={S1Hook} durationInFrames={SCENES.hook} fps={30} width={1080} height={1920} />
        <Composition id="Plate2-Problem" component={S2Problem} durationInFrames={SCENES.problem} fps={30} width={1080} height={1920} />
        <Composition id="Plate3-Solution" component={S3Solution} durationInFrames={SCENES.solution} fps={30} width={1080} height={1920} />
        <Composition id="Plate4-Showcase" component={S4Showcase} durationInFrames={SCENES.showcase} fps={30} width={1080} height={1920} />
        <Composition id="Plate5-Impact" component={S5Impact} durationInFrames={SCENES.impact} fps={30} width={1080} height={1920} />
        <Composition id="Plate6-CTA" component={S6Cta} durationInFrames={SCENES.cta} fps={30} width={1080} height={1920} />
      </Folder>
      <Composition id="LostSpaceArchivePromo" component={LostSpaceArchivePromo} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
    </>
  );
};
