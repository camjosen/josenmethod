let ctx: AudioContext | null = null;

function ac(): AudioContext {
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

interface ToneOpts {
  freq?: number;
  dur?: number;
  type?: OscillatorType;
  gain?: number;
  attack?: number;
  release?: number;
  start?: number;
  detune?: number;
}

function tone({
  freq = 440,
  dur = 0.25,
  type = "sine",
  gain = 0.15,
  attack = 0.01,
  release = 0.12,
  start = 0,
  detune = 0,
}: ToneOpts) {
  const a = ac();
  const t0 = a.currentTime + start;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  osc.connect(g).connect(a.destination);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + release);
  osc.start(t0);
  osc.stop(t0 + dur + release + 0.05);
}

interface NoiseOpts {
  dur?: number;
  gain?: number;
  start?: number;
  hp?: number;
}

function noise({ dur = 0.2, gain = 0.06, start = 0, hp = 800 }: NoiseOpts) {
  const a = ac();
  const t0 = a.currentTime + start;
  const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = a.createBufferSource();
  src.buffer = buf;
  const f = a.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = hp;
  const g = a.createGain();
  g.gain.value = gain;
  src.connect(f).connect(g).connect(a.destination);
  src.start(t0);
}

export const audio = {
  hype() {
    const base = [523.25, 659.25, 783.99];
    base.forEach((f, i) => {
      tone({ freq: f, dur: 0.35, type: "triangle", gain: 0.12, start: i * 0.08, attack: 0.02, release: 0.25 });
      tone({ freq: f * 2, dur: 0.35, type: "sine", gain: 0.04, start: i * 0.08, attack: 0.02, release: 0.25 });
    });
    noise({ dur: 0.08, gain: 0.03, start: 0.32, hp: 1500 });
  },
  success() {
    tone({ freq: 659.25, dur: 0.12, type: "triangle", gain: 0.14, attack: 0.005, release: 0.14 });
    tone({ freq: 987.77, dur: 0.18, type: "triangle", gain: 0.12, start: 0.09, attack: 0.005, release: 0.22 });
  },
  fail() {
    tone({ freq: 261.63, dur: 0.2, type: "sine", gain: 0.12, attack: 0.01, release: 0.3 });
    tone({ freq: 196.0, dur: 0.28, type: "sine", gain: 0.1, start: 0.12, attack: 0.01, release: 0.3 });
  },
  activityDone() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      tone({ freq: f, dur: 0.16, type: "triangle", gain: 0.12, start: i * 0.08, attack: 0.005, release: 0.2 });
    });
  },
  lessonDone() {
    const notes: [number, number][] = [
      [523.25, 0.0], [659.25, 0.12], [783.99, 0.24],
      [1046.5, 0.36], [1318.5, 0.5],
      [783.99, 0.72], [1046.5, 0.84], [1318.5, 0.96], [1567.98, 1.12],
    ];
    notes.forEach(([f, t]) => {
      tone({ freq: f, dur: 0.22, type: "triangle", gain: 0.12, start: t, attack: 0.005, release: 0.3 });
      tone({ freq: f * 2, dur: 0.22, type: "sine", gain: 0.03, start: t, attack: 0.005, release: 0.3 });
    });
    for (let i = 0; i < 8; i++) {
      tone({ freq: 2000 + Math.random() * 800, dur: 0.08, type: "sine", gain: 0.03, start: 0.4 + i * 0.07, attack: 0.005, release: 0.15 });
    }
  },
  tick() {
    noise({ dur: 0.05, gain: 0.025, hp: 2000 });
    tone({ freq: 1200, dur: 0.04, type: "sine", gain: 0.04, attack: 0.002, release: 0.08 });
  },
};
