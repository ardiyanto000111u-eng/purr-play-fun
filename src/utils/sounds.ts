// Simple synthesized sounds using Web Audio API - works offline!

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Fish water/bubble sound - realistic underwater bubbling
export const playFishSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Create multiple bubbles with varying sizes
  for (let i = 0; i < 4; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "sine";
    const baseFreq = 300 + Math.random() * 300;
    oscillator.frequency.setValueAtTime(baseFreq, now + i * 0.04);
    oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.12 + i * 0.04);

    filter.type = "lowpass";
    filter.frequency.value = 600;
    filter.Q.value = 8;

    gainNode.gain.setValueAtTime(0.12, now + i * 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15 + i * 0.04);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.04);
    oscillator.stop(now + 0.2 + i * 0.04);
  }
};

// Mouse squeak sound - high pitched realistic squeak
export const playMouseSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Double squeak like real mice
  for (let j = 0; j < 2; j++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(2500, now + j * 0.12);
    oscillator.frequency.exponentialRampToValueAtTime(4000, now + 0.03 + j * 0.12);
    oscillator.frequency.exponentialRampToValueAtTime(2200, now + 0.06 + j * 0.12);
    oscillator.frequency.exponentialRampToValueAtTime(3500, now + 0.09 + j * 0.12);
    oscillator.frequency.exponentialRampToValueAtTime(2000, now + 0.11 + j * 0.12);

    gainNode.gain.setValueAtTime(0.1, now + j * 0.12);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.03 + j * 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12 + j * 0.12);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + j * 0.12);
    oscillator.stop(now + 0.13 + j * 0.12);
  }
};

// Butterfly flutter sound - delicate wing flapping
export const playButterflySound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Soft fluttering with multiple quick bursts
  for (let i = 0; i < 6; i++) {
    const bufferSize = ctx.sampleRate * 0.04;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let j = 0; j < bufferSize; j++) {
      output[j] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 4000 + i * 200;
    filter.Q.value = 3;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.06, now + i * 0.025);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03 + i * 0.025);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(now + i * 0.025);
    noise.stop(now + 0.04 + i * 0.025);
  }
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

// Laser dot zap sound - electronic buzz
export const playLaserSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const oscillator2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(1200, now);
  oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.15);

  oscillator2.type = "square";
  oscillator2.frequency.setValueAtTime(600, now);
  oscillator2.frequency.exponentialRampToValueAtTime(100, now + 0.12);

  gainNode.gain.setValueAtTime(0.1, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  oscillator.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator2.start(now);
  oscillator.stop(now + 0.18);
  oscillator2.stop(now + 0.18);
};

// Ladybug crawl/click sound - tiny legs on leaves
export const playLadybugSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Soft clicking/rustling like tiny feet
  for (let i = 0; i < 5; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, now + i * 0.02);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.025 + i * 0.02);

    filter.type = "highpass";
    filter.frequency.value = 500;

    gainNode.gain.setValueAtTime(0.08, now + i * 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03 + i * 0.02);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.02);
    oscillator.stop(now + 0.04 + i * 0.02);
  }
};

// Bird chirp sound - realistic tweet/chirp
export const playBirdSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Three-note chirp like a real songbird
  const notes = [
    { freq: 2000, endFreq: 2800, time: 0 },
    { freq: 2400, endFreq: 3200, time: 0.08 },
    { freq: 2200, endFreq: 1800, time: 0.16 },
  ];

  notes.forEach((note) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note.freq, now + note.time);
    oscillator.frequency.exponentialRampToValueAtTime(note.endFreq, now + note.time + 0.04);
    oscillator.frequency.exponentialRampToValueAtTime(note.freq * 0.9, now + note.time + 0.07);

    gainNode.gain.setValueAtTime(0, now + note.time);
    gainNode.gain.linearRampToValueAtTime(0.12, now + note.time + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.time + 0.08);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + note.time);
    oscillator.stop(now + note.time + 0.1);
  });
};

// Spider creepy crawl sound - scuttling legs
export const playSpiderSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Quick scuttling taps like 8 legs moving
  for (let i = 0; i < 8; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(150 + Math.random() * 80, now + i * 0.015);

    filter.type = "highpass";
    filter.frequency.value = 200;
    filter.Q.value = 1;

    gainNode.gain.setValueAtTime(0.1, now + i * 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.02 + i * 0.015);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.015);
    oscillator.stop(now + 0.025 + i * 0.015);
  }
};

// Fly buzzing sound - realistic annoying buzz
export const playFlySound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const oscillator2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  // Main buzz - sawtooth for rich harmonics
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(200, now);
  oscillator.frequency.setValueAtTime(220, now + 0.05);
  oscillator.frequency.setValueAtTime(180, now + 0.1);

  // Secondary buzz for thickness
  oscillator2.type = "square";
  oscillator2.frequency.setValueAtTime(205, now);

  // LFO for wing vibration wobble
  lfo.frequency.setValueAtTime(80, now);
  lfoGain.gain.setValueAtTime(40, now);

  lfo.connect(lfoGain);
  lfoGain.connect(oscillator.frequency);
  lfoGain.connect(oscillator2.frequency);

  gainNode.gain.setValueAtTime(0.08, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

  oscillator.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(ctx.destination);

  lfo.start(now);
  oscillator.start(now);
  oscillator2.start(now);
  lfo.stop(now + 0.2);
  oscillator.stop(now + 0.2);
  oscillator2.stop(now + 0.2);
};

// Gecko chirp/click sound - distinctive gecko call
export const playGeckoSound = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Gecko "tsk-tsk" clicking call
  for (let i = 0; i < 3; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1800, now + i * 0.06);
    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.02 + i * 0.06);
    oscillator.frequency.setValueAtTime(1400, now + 0.025 + i * 0.06);
    oscillator.frequency.exponentialRampToValueAtTime(500, now + 0.04 + i * 0.06);

    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 2;

    gainNode.gain.setValueAtTime(0.12, now + i * 0.06);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.015 + i * 0.06);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05 + i * 0.06);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + i * 0.06);
    oscillator.stop(now + 0.055 + i * 0.06);
  }
};
