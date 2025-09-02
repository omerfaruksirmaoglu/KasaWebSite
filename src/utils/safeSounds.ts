
/**
 * Minimal, tema-bozmayan ses yöneticisi.
 * Kullanıcı /public/sounds/ içine key.mp3 ve open.mp3 koyarsa bunları çalar;
 * değilse WebAudio ile kısa bir bip üretir.
 */

let audioCtx: AudioContext | null = null;
const getCtx = () => {
  try {
    if (!audioCtx) {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
  } catch {}
  return audioCtx;
};

const playBeep = (freq = 880, duration = 0.08, gain = 0.05) => {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

const makePlayer = (src: string, fallback: () => void) => {
  let el: HTMLAudioElement | null = null;
  return async () => {
    try {
      if (!el) {
        el = new Audio(src);
        el.preload = "auto";
      }
      // play() promise rejection durumlarında fallback
      await el.play();
    } catch {
      fallback();
    }
  };
};

// Varsayılan konumlar (Vite: /public altı site kökünden servis edilir)
const KEY_SRC = "/sounds/key.mp3";
const OPEN_SRC = "/sounds/open.mp3";

export const playKeySound = makePlayer(KEY_SRC, () => playBeep(1000, 0.06, 0.04));
export const playOpenSound = makePlayer(OPEN_SRC, () => playBeep(220, 0.12, 0.06));

// Ekstra: silme ve temizleme için ayrı efektler (opsiyonel dosyalar)
const DEL_SRC = "/sounds/delete.mp3";
const CLR_SRC = "/sounds/clear.mp3";
export const playDeleteSound = makePlayer(DEL_SRC, () => playBeep(600, 0.05, 0.04));
export const playClearSound = makePlayer(CLR_SRC, () => playBeep(300, 0.08, 0.05));
