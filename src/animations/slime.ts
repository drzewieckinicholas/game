export const createSlimeAnimations = (
  anims: Phaser.Animations.AnimationManager
) => {
  const slime = 'slime';
  const frameRate = 6;
  const infinite = -1;

  const animationConfig = [
    { key: `${slime}-idle-down`, start: 0, end: 3 },
    { key: `${slime}-idle-right`, start: 0, end: 3 },
    { key: `${slime}-idle-up`, start: 0, end: 3 },
    { key: `${slime}-idle-left`, start: 0, end: 3 },
    { key: `${slime}-walk-down`, start: 0, end: 3 },
    { key: `${slime}-walk-right`, start: 0, end: 3 },
    { key: `${slime}-walk-up`, start: 0, end: 3 },
    { key: `${slime}-walk-left`, start: 0, end: 3 },
  ];

  for (const { key, start, end } of animationConfig) {
    anims.create({
      key,
      frames: anims.generateFrameNumbers(slime, { start, end }),
      frameRate,
      repeat: infinite,
    });
  }
};
