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

// Laser dot zap sound
export const playLaserSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);

  gainNode.gain.setValueAtTime(0.15, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.15);
};

// Ladybug crawl/click sound
export const playLadybugSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Multiple quick clicks
  for (let i = 0; i < 3; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(600 + i * 100, now + i * 0.03);

    gainNode.gain.setValueAtTime(0.1, now + i * 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05 + i * 0.03);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.03);
    oscillator.stop(now + 0.06 + i * 0.03);
  }
};

// Bird chirp sound
export const playBirdSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Two-tone chirp
  for (let i = 0; i < 2; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1200 + i * 400, now + i * 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(1800 + i * 200, now + 0.05 + i * 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(1000 + i * 300, now + 0.1 + i * 0.1);

    gainNode.gain.setValueAtTime(0.12, now + i * 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12 + i * 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.1);
    oscillator.stop(now + 0.15 + i * 0.1);
  }
};

// Spider creepy crawl sound
export const playSpiderSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Quick scratchy taps
  for (let i = 0; i < 5; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(200 + Math.random() * 100, now + i * 0.02);

    filter.type = "highpass";
    filter.frequency.value = 400;

    gainNode.gain.setValueAtTime(0.08, now + i * 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03 + i * 0.02);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.02);
    oscillator.stop(now + 0.04 + i * 0.02);
  }
};

// Fly buzzing sound
export const playFlySound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  // Main buzz
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(180, now);

  // LFO for wobble
  lfo.frequency.setValueAtTime(40, now);
  lfoGain.gain.setValueAtTime(30, now);

  lfo.connect(lfoGain);
  lfoGain.connect(oscillator.frequency);

  gainNode.gain.setValueAtTime(0.1, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  lfo.start(now);
  oscillator.start(now);
  lfo.stop(now + 0.18);
  oscillator.stop(now + 0.18);
};

// Gecko chirp/click sound
export const playGeckoSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Gecko "chirp" - rapid clicks
  for (let i = 0; i < 4; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1500, now + i * 0.04);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.02 + i * 0.04);

    gainNode.gain.setValueAtTime(0.15, now + i * 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03 + i * 0.04);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.04);
    oscillator.stop(now + 0.04 + i * 0.04);
  }
};
