// Sintetizador chiptune 8-bit via Web Audio API.

let audioCtx: AudioContext | null = null;

type WindowWithWebkitAudio = Window & { webkitAudioContext?: typeof AudioContext };

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx?.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

// Frequências pentatônicas para cada slot da hotbar.
const SLOT_FREQUENCIES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

/** Clique de seleção de slot: queda de pitch instantânea com decay rápido. */
export function playSlotSound(slot: number) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const freq = SLOT_FREQUENCIES[(slot - 1) % SLOT_FREQUENCIES.length] ?? 330;

  osc.type = "square";
  osc.frequency.setValueAtTime(freq * 1.5, now);
  osc.frequency.exponentialRampToValueAtTime(freq, now + 0.04);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.09);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.11);
}

/** Arpejo ascendente ao ligar o som, descendente ao mutar. */
export function playToggleSound(enabled: boolean) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const notes = enabled ? [260, 392, 523.25, 659.25] : [440, 330, 220];
  const duration = enabled ? 0.22 : 0.16;

  osc.type = "triangle";
  notes.forEach((note, i) => osc.frequency.setValueAtTime(note, now + i * 0.05));

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.01);
}

/** Desbloqueia o AudioContext dentro de um gesto do usuário. */
export function unlockAudio() {
  getAudioContext();
}
