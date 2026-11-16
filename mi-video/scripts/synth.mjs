// Original soundtrack + sound effects, synthesized from scratch (no samples).
// Timeline: 30 fps, 90 BPM => 1 beat = 20 frames = 0.6667 s.
// Section cuts (frames): problem 120, solution 240, showcase 360, impact 680, cta 800, end 900.
// Writes: audio/*.wav and copies to public/audio/ for Remotion.
import fs from "node:fs";
import path from "node:path";

const SR = 44100;
const FPS = 30;
const f2s = (f) => f / FPS; // frame -> seconds
const BEAT = f2s(20);

// ---------- helpers ----------
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
const N = (name) => {
  const m = name.match(/^([A-G])(#|b)?(-?\d)$/);
  const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
  const acc = m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0;
  return 12 * (Number(m[3]) + 1) + base + acc;
};
let seed = 12345;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

function buf(seconds) {
  const n = Math.ceil(seconds * SR);
  return { L: new Float32Array(n), R: new Float32Array(n), n };
}

function osc(type, phase) {
  const p = phase - Math.floor(phase);
  switch (type) {
    case "sine":
      return Math.sin(2 * Math.PI * p);
    case "tri":
      return 1 - 4 * Math.abs(p - 0.5);
    case "saw":
      return 2 * p - 1;
    case "square":
      return p < 0.5 ? 1 : -1;
  }
}

// ADSR-ish envelope
function env(t, dur, a, d, s, r) {
  if (t < 0) return 0;
  if (t < a) return t / a;
  if (t < a + d) return 1 - (1 - s) * ((t - a) / d);
  if (t < dur) return s;
  if (t < dur + r) return s * (1 - (t - dur) / r);
  return 0;
}

// Generic voice: oscillator stack with detune, lowpass, envelope, pan
function voice(b, start, dur, freq, o = {}) {
  const {
    type = "sine",
    gain = 0.2,
    a = 0.01,
    d = 0.1,
    s = 0.7,
    r = 0.3,
    pan = 0,
    detune = 0, // cents spread
    voices = 1,
    cutoff = 20000,
    cutoffEnd = null,
    vibrato = 0,
    pitchDrop = 0, // multiplier sweep (for kicks)
    pitchTime = 0.05,
  } = o;
  const total = dur + r;
  const i0 = Math.floor(start * SR);
  const len = Math.floor(total * SR);
  const gl = Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = Math.sin(((pan + 1) * Math.PI) / 4);
  const phases = new Array(voices).fill(0).map(() => Math.random());
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const idx = i0 + i;
    if (idx < 0 || idx >= b.n) continue;
    const t = i / SR;
    let sample = 0;
    for (let v = 0; v < voices; v++) {
      const cents = voices > 1 ? (v / (voices - 1) - 0.5) * 2 * detune : 0;
      let f = freq * Math.pow(2, cents / 1200);
      if (pitchDrop) f *= 1 + pitchDrop * Math.exp(-t / pitchTime);
      if (vibrato) f *= 1 + vibrato * Math.sin(2 * Math.PI * 5 * t);
      phases[v] += f / SR;
      sample += osc(type, phases[v]);
    }
    sample /= voices;
    const c = cutoffEnd == null ? cutoff : cutoff + (cutoffEnd - cutoff) * Math.min(1, t / total);
    const alpha = 1 - Math.exp((-2 * Math.PI * c) / SR);
    lp += alpha * (sample - lp);
    const e = env(t, dur, a, d, s, r) * gain;
    b.L[idx] += lp * e * gl;
    b.R[idx] += lp * e * gr;
  }
}

// Filtered noise with sweeping band (whooshes, hats, snares, risers)
function noise(b, start, dur, o = {}) {
  const { gain = 0.2, a = 0.005, r = 0.05, f0 = 2000, f1 = f0, hp = 0, pan = 0, curve = 1, shape = "env" } = o;
  const i0 = Math.floor(start * SR);
  const len = Math.floor((dur + r) * SR);
  let lp1 = 0,
    lp2 = 0,
    hpPrev = 0,
    hpOut = 0;
  const gl = Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < len; i++) {
    const idx = i0 + i;
    if (idx < 0 || idx >= b.n) continue;
    const t = i / SR;
    const p = Math.min(1, t / dur);
    const fc = f0 * Math.pow(f1 / f0, Math.pow(p, curve));
    const alpha = 1 - Math.exp((-2 * Math.PI * fc) / SR);
    const x = rnd();
    lp1 += alpha * (x - lp1);
    lp2 += alpha * (lp1 - lp2);
    let y = lp2;
    if (hp) {
      const ah = Math.exp((-2 * Math.PI * hp) / SR);
      hpOut = ah * (hpOut + y - hpPrev);
      hpPrev = y;
      y = hpOut;
    }
    let e;
    if (shape === "swell") e = Math.pow(p, 2.2) * (t > dur ? Math.max(0, 1 - (t - dur) / r) : 1);
    else if (shape === "bell") e = Math.sin(Math.PI * p);
    else e = env(t, dur, a, dur * 0.3, 0.4, r);
    b.L[idx] += y * e * gain * 3 * gl;
    b.R[idx] += y * e * gain * 3 * gr;
  }
}

// Simple stereo Schroeder reverb (returns wet buffer added in-place)
function reverb(b, mix = 0.25, size = 1) {
  const combs = [1557, 1617, 1491, 1422, 1277, 1356].map((x) => Math.floor(x * size));
  const aps = [225, 556, 441];
  for (const ch of ["L", "R"]) {
    const src = b[ch];
    const out = new Float32Array(b.n);
    combs.forEach((dl, k) => {
      const d = dl + (ch === "R" ? 23 * (k + 1) : 0);
      const line = new Float32Array(d);
      let p = 0,
        lpS = 0;
      for (let i = 0; i < b.n; i++) {
        const y = line[p];
        lpS = y * 0.75 + lpS * 0.25;
        line[p] = src[i] + lpS * 0.82;
        out[i] += y / combs.length;
        p = (p + 1) % d;
      }
    });
    for (const dl of aps) {
      const line = new Float32Array(dl);
      let p = 0;
      for (let i = 0; i < b.n; i++) {
        const y = line[p];
        const x = out[i];
        line[p] = x + y * 0.5;
        out[i] = y - x * 0.5;
        p = (p + 1) % dl;
      }
    }
    for (let i = 0; i < b.n; i++) src[i] = src[i] * (1 - mix * 0.5) + out[i] * mix;
  }
}

function master(b, peakDb = -1, drive = 1.2) {
  // gentle saturation + peak normalize
  let peak = 0;
  for (const ch of ["L", "R"]) for (let i = 0; i < b.n; i++) b[ch][i] = Math.tanh(b[ch][i] * drive);
  for (const ch of ["L", "R"]) for (let i = 0; i < b.n; i++) peak = Math.max(peak, Math.abs(b[ch][i]));
  const target = Math.pow(10, peakDb / 20);
  const g = peak > 0 ? target / peak : 1;
  for (const ch of ["L", "R"]) for (let i = 0; i < b.n; i++) b[ch][i] *= g;
}

function fadeOut(b, startS, endS) {
  for (let i = Math.floor(startS * SR); i < b.n; i++) {
    const t = i / SR;
    const g = t >= endS ? 0 : 1 - (t - startS) / (endS - startS);
    b.L[i] *= g;
    b.R[i] *= g;
  }
}

function writeWav(file, b) {
  const data = Buffer.alloc(b.n * 4);
  for (let i = 0; i < b.n; i++) {
    data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(b.L[i] * 32767))), i * 4);
    data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(b.R[i] * 32767))), i * 4 + 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + data.length, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(2, 22);
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 4, 28);
  h.writeUInt16LE(4, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36);
  h.writeUInt32LE(data.length, 40);
  fs.writeFileSync(file, Buffer.concat([h, data]));
  console.log("wrote", file, (b.n / SR).toFixed(2) + "s");
}

// ---------- instruments ----------
const pad = (b, t, dur, notes, gain = 0.06, cutoff = 1800) =>
  notes.forEach((n, i) =>
    voice(b, t, dur, midi(N(n)), {
      type: "saw",
      voices: 4,
      detune: 14,
      gain,
      a: 0.8,
      d: 0.5,
      s: 0.85,
      r: 1.4,
      cutoff,
      pan: (i / Math.max(1, notes.length - 1) - 0.5) * 0.8,
    }),
  );
const bell = (b, t, n, gain = 0.09, pan = 0) => {
  const f = midi(N(n));
  voice(b, t, 0.05, f, { type: "sine", gain, a: 0.002, d: 0.6, s: 0, r: 1.6, pan });
  voice(b, t, 0.05, f * 2.76, { type: "sine", gain: gain * 0.35, a: 0.002, d: 0.25, s: 0, r: 0.6, pan });
  voice(b, t, 0.05, f * 5.4, { type: "sine", gain: gain * 0.12, a: 0.001, d: 0.1, s: 0, r: 0.3, pan });
};
const pluck = (b, t, n, gain = 0.07, pan = 0) =>
  voice(b, t, 0.04, midi(N(n)), { type: "tri", gain, a: 0.003, d: 0.18, s: 0.0, r: 0.15, cutoff: 3500, pan });
const bass = (b, t, dur, n, gain = 0.16) =>
  voice(b, t, dur, midi(N(n)), { type: "saw", voices: 2, detune: 6, gain, a: 0.005, d: 0.12, s: 0.6, r: 0.06, cutoff: 420 });
const sub = (b, t, dur, n, gain = 0.12) =>
  voice(b, t, dur, midi(N(n)), { type: "sine", gain, a: 0.6, d: 0.2, s: 1, r: 1.2 });
const kick = (b, t, gain = 0.5) => {
  voice(b, t, 0.02, 48, { type: "sine", gain, a: 0.001, d: 0.28, s: 0, r: 0.1, pitchDrop: 3.5, pitchTime: 0.035 });
  noise(b, t, 0.01, { gain: 0.05, f0: 3000, r: 0.01 });
};
const softKick = (b, t, gain = 0.32) =>
  voice(b, t, 0.02, 44, { type: "sine", gain, a: 0.002, d: 0.35, s: 0, r: 0.1, pitchDrop: 1.5, pitchTime: 0.05 });
const clap = (b, t, gain = 0.12) => {
  [0, 0.012, 0.024].forEach((o) => noise(b, t + o, 0.01, { gain: gain * 0.6, f0: 1800, hp: 700, r: 0.02 }));
  noise(b, t + 0.03, 0.03, { gain, f0: 2200, hp: 800, r: 0.16 });
};
const hat = (b, t, gain = 0.035, open = false, pan = 0.2) =>
  noise(b, t, 0.005, { gain, f0: 12000, hp: 7000, r: open ? 0.18 : 0.04, pan });

// ---------- MUSIC ----------
const DUR = 30;
const music = buf(DUR + 0.5);
const T = (frame) => f2s(frame);

// HOOK 0-120: mysterious D minor(add9) pad, drone, sparse bells
sub(music, 0, T(120) + 0.2, "D2", 0.13);
pad(music, 0, T(118), ["D3", "A3", "E4", "F4"], 0.05, 1100);
[
  [10, "A5", -0.4],
  [40, "E5", 0.4],
  [70, "F5", -0.2],
  [90, "D6", 0.3],
  [100, "C6", 0.1],
].forEach(([f, n, p]) => bell(music, T(f), n, 0.075, p));
noise(music, T(80), T(40), { gain: 0.05, f0: 400, f1: 6000, shape: "swell", r: 0.05 }); // reverse swell into cut

// PROBLEM 120-240: heartbeat pulse + ticking clock, Bbmaj7 -> Gm(add9)
sub(music, T(120), T(120), "Bb1", 0.11);
pad(music, T(120), T(60), ["Bb2", "F3", "A3", "D4"], 0.05, 1300);
pad(music, T(180), T(58), ["G2", "D3", "Bb3", "A4"], 0.05, 1300);
for (let f = 120; f < 240; f += 20) softKick(music, T(f), f % 40 === 0 ? 0.34 : 0.22);
for (let f = 120; f < 240; f += 10) pluck(music, T(f), f % 20 === 0 ? "D6" : "A5", 0.025, f % 20 === 0 ? 0.5 : -0.5);
noise(music, T(200), T(40), { gain: 0.06, f0: 300, f1: 8000, shape: "swell", r: 0.02 });

// SOLUTION 240-360: warm lift to F major, arpeggio begins, sparkle
sub(music, T(240), T(120), "F1", 0.1);
pad(music, T(240), T(60), ["F3", "A3", "C4", "G4"], 0.055, 2200);
pad(music, T(300), T(58), ["C3", "G3", "E4", "A4"], 0.055, 2200);
["C6", "F6", "A6", "C7", "G6"].forEach((n, i) => bell(music, T(240) + i * 0.07, n, 0.06, (i - 2) * 0.25));
const arpF = ["F4", "A4", "C5", "G5", "A5", "C5", "A4", "G4"];
const arpC = ["E4", "G4", "C5", "G5", "A5", "E5", "C5", "G4"];
for (let i = 0; i < 24; i++) {
  const f = 240 + i * 5;
  const seq = f < 300 ? arpF : arpC;
  pluck(music, T(f), seq[i % 8], 0.05, i % 2 ? 0.35 : -0.35);
}
for (let f = 240; f < 360; f += 40) softKick(music, T(f), 0.3);
for (let f = 340; f < 360; f += 2.5) hat(music, T(f), 0.02 + (f - 340) * 0.0015); // build roll

// SHOWCASE 360-680: groove. Bars from 360 every 80 frames: Bb F Gm C (x1) ...
const progression = [
  ["Bb", ["Bb3", "D4", "F4", "C5"]],
  ["F", ["A3", "C4", "F4", "G4"]],
  ["G", ["Bb3", "D4", "G4", "A4"]],
  ["C", ["G3", "C4", "E4", "G4"]],
];
for (let bar = 0; bar < 4; bar++) {
  const start = 360 + bar * 80;
  const [root, chord] = progression[bar];
  pad(music, T(start), T(78), chord, 0.04, 2600);
  for (let s = 0; s < 8; s++) {
    // bass eighths
    const f = start + s * 10;
    bass(music, T(f), T(8), (root.length > 1 ? root : root) + (s % 4 === 3 ? "2" : "1"), 0.13);
  }
  for (let s = 0; s < 4; s++) kick(music, T(start + s * 20), 0.45);
  clap(music, T(start + 20), 0.11);
  clap(music, T(start + 60), 0.11);
  for (let s = 0; s < 16; s++) hat(music, T(start + s * 5), s % 2 ? 0.022 : 0.032, s % 8 === 6, s % 2 ? 0.3 : -0.3);
  // 16th arpeggio over chord tones up an octave
  const tones = chord.map((n) => n.replace(/(\d)$/, (d) => String(Number(d) + 1)));
  for (let s = 0; s < 16; s++) pluck(music, T(start + s * 5), tones[[0, 1, 2, 3, 2, 1][s % 6]], 0.038, s % 2 ? 0.45 : -0.45);
  bell(music, T(start), chord[3].replace(/(\d)$/, (d) => String(Number(d) + 1)), 0.05, 0);
}
noise(music, T(650), T(30), { gain: 0.07, f0: 500, f1: 9000, shape: "swell", r: 0.02 });

// IMPACT 680-800: bigger — Bb, C, Dm with lead motif
const imp = [
  [680, "Bb", ["Bb3", "D4", "F4", "A4"]],
  [720, "C", ["C4", "E4", "G4", "D5"]],
  [760, "D", ["D4", "F4", "A4", "E5"]],
];
imp.forEach(([f, root, chord]) => {
  pad(music, T(f), T(40), chord, 0.05, 3200);
  for (let s = 0; s < 4; s++) bass(music, T(f + s * 10), T(8), root + "1", 0.14);
  kick(music, T(f), 0.5);
  kick(music, T(f + 20), 0.45);
  clap(music, T(f + 20), 0.12);
  for (let s = 0; s < 8; s++) hat(music, T(f + s * 5), 0.03, false, s % 2 ? 0.3 : -0.3);
});
[
  [680, "F5"],
  [690, "G5"],
  [700, "A5"],
  [720, "C6"],
  [740, "A5"],
  [760, "D6"],
  [770, "E6"],
  [780, "F6"],
].forEach(([f, n]) => bell(music, T(f), n, 0.06, 0.1));
noise(music, T(755), T(45), { gain: 0.09, f0: 400, f1: 11000, shape: "swell", r: 0.01, curve: 1.6 });

// CTA 800-900: resolve on F major (add9), big hit, chime cascade, ring out
kick(music, T(800), 0.6);
voice(music, T(800), 0.05, 41, { type: "sine", gain: 0.35, a: 0.002, d: 1.4, s: 0, r: 0.6, pitchDrop: 1.2, pitchTime: 0.08 });
noise(music, T(800), 0.05, { gain: 0.12, f0: 9000, hp: 3000, r: 1.6 }); // crash-like
pad(music, T(800), T(92), ["F2", "C3", "F3", "A3", "C4", "G4"], 0.05, 3000);
sub(music, T(800), T(90), "F1", 0.12);
["F5", "A5", "C6", "F6", "G6", "A6", "C7"].forEach((n, i) => bell(music, T(806) + i * 0.09, n, 0.055, (i - 3) * 0.2));
bell(music, T(850), "F6", 0.05, 0);

reverb(music, 0.32, 1.1);
fadeOut(music, T(880), T(900));
// Pre-gain into tanh acts as a gentle compressor so the groove sits closer to the CTA peak.
for (const ch of ["L", "R"]) for (let i = 0; i < music.n; i++) music[ch][i] *= 2.2;
master(music, -1.5, 1.6);

// ---------- SFX ----------
function sfx(name, seconds, fn, peakDb = -2, rev = 0.15) {
  const b = buf(seconds);
  fn(b);
  if (rev) reverb(b, rev, 0.7);
  master(b, peakDb, 1.0);
  return [name, b];
}
const effects = [
  sfx("whoosh", 0.9, (b) => {
    noise(b, 0.0, 0.35, { gain: 0.25, f0: 300, f1: 5000, shape: "swell", r: 0.0, curve: 1.2, pan: -0.3 });
    noise(b, 0.35, 0.35, { gain: 0.25, f0: 5000, f1: 400, shape: "env", a: 0.001, r: 0.15, pan: 0.3 });
  }),
  sfx("impact", 1.6, (b) => {
    voice(b, 0, 0.05, 55, { type: "sine", gain: 0.7, a: 0.001, d: 0.8, s: 0, r: 0.5, pitchDrop: 2, pitchTime: 0.06 });
    noise(b, 0, 0.04, { gain: 0.25, f0: 1800, r: 0.4 });
  }, -2, 0.3),
  sfx("pop", 0.35, (b) => {
    voice(b, 0, 0.03, 520, { type: "sine", gain: 0.5, a: 0.001, d: 0.09, s: 0, r: 0.05, pitchDrop: -0.45, pitchTime: 0.03 });
    voice(b, 0.01, 0.03, 1040, { type: "tri", gain: 0.15, a: 0.001, d: 0.06, s: 0, r: 0.03 });
  }, -3, 0.1),
  sfx("tick", 0.25, (b) => {
    voice(b, 0, 0.01, 1900, { type: "sine", gain: 0.5, a: 0.0005, d: 0.03, s: 0, r: 0.02 });
    noise(b, 0, 0.005, { gain: 0.1, f0: 6000, hp: 2000, r: 0.01 });
  }, -4, 0.05),
  sfx("chime", 2.0, (b) => {
    ["C6", "E6", "G6", "C7", "E7"].forEach((n, i) => bell(b, i * 0.06, n, 0.15, (i - 2) * 0.3));
  }, -3, 0.35),
  sfx("glitch", 0.5, (b) => {
    for (let i = 0; i < 6; i++) voice(b, i * 0.045, 0.02, 200 + i * 340, { type: "square", gain: 0.12, a: 0.001, d: 0.02, s: 0, r: 0.01, cutoff: 3000 });
    noise(b, 0, 0.25, { gain: 0.08, f0: 4000, hp: 1500, r: 0.05 });
  }, -6, 0.1),
  sfx("stamp", 0.9, (b) => {
    voice(b, 0, 0.03, 90, { type: "sine", gain: 0.6, a: 0.001, d: 0.25, s: 0, r: 0.2, pitchDrop: 1.5, pitchTime: 0.03 });
    noise(b, 0, 0.03, { gain: 0.3, f0: 2500, r: 0.15 });
  }, -3, 0.25),
];

const AUDIO = path.resolve("audio");
const PUB = path.resolve("public/audio");
fs.mkdirSync(AUDIO, { recursive: true });
fs.mkdirSync(PUB, { recursive: true });
writeWav(path.join(AUDIO, "music.wav"), music);
for (const [name, b] of effects) writeWav(path.join(AUDIO, `sfx-${name}.wav`), b);
for (const f of fs.readdirSync(AUDIO)) if (f.endsWith(".wav")) fs.copyFileSync(path.join(AUDIO, f), path.join(PUB, f));
