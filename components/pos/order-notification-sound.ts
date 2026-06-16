"use client";

/**
 * Plays a short 2-tone beep using Web Audio API.
 * Lazily creates the AudioContext on first use (handles autoplay restrictions).
 */
let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (_ctx) return _ctx;
  const Ctor =
    (window.AudioContext as typeof AudioContext) ||
    ((window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext as typeof AudioContext);
  if (!Ctor) return null;
  _ctx = new Ctor();
  return _ctx;
}

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  durationMs: number,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = "sine";
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + start + durationMs / 1000,
  );
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + durationMs / 1000);
}

export function playNewOrderBeep() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  // Two-tone ascending: ding-DONG
  tone(ctx, 880, 0, 140);
  tone(ctx, 1320, 0.18, 220);
}
