import { Direction } from '../components';

const playerKey = 'player';
const frameRate = 6;
const infinite = -1;

export const getAnimationMap = () => ({
  [Direction.Up]: 'walk-up',
  [Direction.Right]: 'walk-right',
  [Direction.Down]: 'walk-down',
  [Direction.Left]: 'walk-left',
});

const animationConfig = [
  { key: 'idle-down', start: 0, end: 5 },
  { key: 'idle-right', start: 6, end: 11 },
  { key: 'idle-up', start: 12, end: 17 },
  { key: 'idle-left', start: 18, end: 23 },
  { key: 'walk-down', start: 24, end: 29 },
  { key: 'walk-right', start: 30, end: 35 },
  { key: 'walk-up', start: 36, end: 41 },
  { key: 'walk-left', start: 42, end: 47 },
];

export const createPlayerAnimations = (
  anims: Phaser.Animations.AnimationManager
) => {
  for (const { key, start, end } of animationConfig) {
    anims.create({
      key,
      frames: anims.generateFrameNumbers(playerKey, { start, end }),
      frameRate,
      repeat: infinite,
    });
  }
};
