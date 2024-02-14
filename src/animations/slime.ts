import { createAnimations } from '../utils';

export const createSlimeAnimations = (
  anims: Phaser.Animations.AnimationManager
) => {
  const spriteKey = 'slime';
  const frameRate = 6;
  const repeat = true;

  const animationConfig = [
    { key: 'idle-down', start: 0, end: 3 },
    { key: 'idle-right', start: 0, end: 3 },
    { key: 'idle-up', start: 0, end: 3 },
    { key: 'idle-left', start: 0, end: 3 },
    { key: 'walk-down', start: 0, end: 3 },
    { key: 'walk-right', start: 0, end: 3 },
    { key: 'walk-up', start: 0, end: 3 },
    { key: 'walk-left', start: 0, end: 3 },
  ];

  for (const { key, start, end } of animationConfig) {
    createAnimations(anims, spriteKey, key, start, end, frameRate, repeat);
  }
};
