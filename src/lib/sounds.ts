let _ctx: AudioContext | null = null;

function ctx(): AudioContext | null {
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

// Card open — two-note arrival chime: D5 + A5 (perfect fifth)
export function playCardOpen() {
  const c = ctx();
  if (!c) return;
  const now = c.currentTime;

  const osc1 = c.createOscillator();
  const gain1 = c.createGain();
  osc1.type = "sine";
  osc1.frequency.value = 587; // D5
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.065, now + 0.008);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.50);
  osc1.connect(gain1);
  gain1.connect(c.destination);
  osc1.start(now);
  osc1.stop(now + 0.50);

  const osc2 = c.createOscillator();
  const gain2 = c.createGain();
  osc2.type = "sine";
  osc2.frequency.value = 880; // A5
  gain2.gain.setValueAtTime(0, now);
  gain2.gain.linearRampToValueAtTime(0.040, now + 0.008);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  osc2.connect(gain2);
  gain2.connect(c.destination);
  osc2.start(now);
  osc2.stop(now + 0.40);
}

// Tab change — micro confirmation tone: E5 single clean note
export function playTabChange() {
  const c = ctx();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = 659; // E5
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.032, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.09);
}

// Modal close — two-step departure: A4 then E4 (staggered perfect fifth descent)
export function playClose() {
  const c = ctx();
  if (!c) return;
  const now = c.currentTime;

  const osc1 = c.createOscillator();
  const gain1 = c.createGain();
  osc1.type = "sine";
  osc1.frequency.value = 440; // A4
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.055, now + 0.008);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  osc1.connect(gain1);
  gain1.connect(c.destination);
  osc1.start(now);
  osc1.stop(now + 0.40);

  const t2 = now + 0.12;
  const osc2 = c.createOscillator();
  const gain2 = c.createGain();
  osc2.type = "sine";
  osc2.frequency.value = 329; // E4
  gain2.gain.setValueAtTime(0, t2);
  gain2.gain.linearRampToValueAtTime(0.045, t2 + 0.008);
  gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.30);
  osc2.connect(gain2);
  gain2.connect(c.destination);
  osc2.start(t2);
  osc2.stop(t2 + 0.32);
}
