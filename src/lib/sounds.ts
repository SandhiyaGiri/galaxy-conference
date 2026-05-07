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

// Card open — satisfying LEGO-snap: noise burst + tonal click
export function playCardOpen() {
  const c = ctx();
  if (!c) return;
  const now = c.currentTime;

  const bufSize = Math.floor(c.sampleRate * 0.05);
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.5;
  const noiseGain = c.createGain();
  noiseGain.gain.setValueAtTime(0.22, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
  src.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(c.destination);
  src.start(now);

  const osc = c.createOscillator();
  const oscGain = c.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(130, now + 0.09);
  oscGain.gain.setValueAtTime(0.12, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  osc.connect(oscGain);
  oscGain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

// Tab change — light bright tick
export function playTabChange() {
  const c = ctx();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1100, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.07);
}

// Modal close — soft descending tone
export function playClose() {
  const c = ctx();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(500, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);
  gain.gain.setValueAtTime(0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.22);
}
