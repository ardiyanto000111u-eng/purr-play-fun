// Simple synthesized sounds using Web Audio API - works offline!

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Fish water/bubble sound
export const playFishSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Create multiple bubbles
  for (let i = 0; i < 3; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(400 + Math.random() * 200, now + i * 0.05);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15 + i * 0.05);

    filter.type = "lowpass";
    filter.frequency.value = 800;

    gainNode.gain.setValueAtTime(0.15, now + i * 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2 + i * 0.05);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.05);
    oscillator.stop(now + 0.25 + i * 0.05);
  }
};

// Mouse squeak sound
export const playMouseSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(2000, now);
  oscillator.frequency.exponentialRampToValueAtTime(3500, now + 0.05);
  oscillator.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
  oscillator.frequency.exponentialRampToValueAtTime(2800, now + 0.15);

  gainNode.gain.setValueAtTime(0.12, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.2);
};

// Butterfly flutter sound
export const playButterflySound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Soft flutter using noise + filter
  const bufferSize = ctx.sampleRate * 0.15;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3000;
  filter.Q.value = 2;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.08, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.15);
};

// Generic catch celebration sound
export const playCatchSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(523, now); // C5
  oscillator.frequency.setValueAtTime(659, now + 0.08); // E5
  oscillator.frequency.setValueAtTime(784, now + 0.16); // G5

  gainNode.gain.setValueAtTime(0.2, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.35);
};
