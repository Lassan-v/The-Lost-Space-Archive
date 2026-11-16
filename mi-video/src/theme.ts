import { loadFont as loadDynaPuff } from "@remotion/google-fonts/DynaPuff";
import { loadFont as loadChewy } from "@remotion/google-fonts/Chewy";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";

// Fonts used by The Lost Space Archive (DESIGN.md / tokens.css)
export const display = loadDynaPuff("normal", { weights: ["600", "700"], subsets: ["latin"] }).fontFamily;
export const accent = loadChewy("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const body = loadNunito("normal", { weights: ["600", "800", "900"], subsets: ["latin"] }).fontFamily;

// Palette taken from src/styles/tokens.css of the web app
export const C = {
  night: "#10152F",
  navy: "#111D38",
  raised: "#1C2446",
  blue: "#273C67",
  cabinInk: "#17153F",
  cabinViolet: "#6C45B5",
  purple: "#9270D9",
  lavender: "#C7A8EE",
  guide: "#BBA2ED",
  gold: "#F7AE32",
  yellow: "#F7D779",
  warm: "#F4BD55",
  paper: "#FFF4D9",
  ink: "#1D2440",
  marsCoral: "#F07B62",
  marsOrange: "#F28A54",
  marsViolet: "#5B347F",
  moonIndigo: "#211C5C",
  moonLavender: "#B6A9D9",
  moonSilver: "#D7CEEF",
  body: "#F8F3E5",
};

// Timeline (30 fps, 90 BPM => 1 beat = 20 frames)
export const FPS = 30;
export const BEAT = 20;
export const TRANSITION = 20;
export const SCENES = {
  hook: 140,
  problem: 140,
  solution: 140,
  showcase: 340,
  impact: 140,
  cta: 100,
};
// Absolute start frame of each scene (scene n starts TRANSITION frames before previous ends)
export const STARTS = {
  hook: 0,
  problem: 120,
  solution: 240,
  showcase: 360,
  impact: 680,
  cta: 800,
};
export const TOTAL = 900;
