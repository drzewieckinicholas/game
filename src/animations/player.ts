export const createPlayerAnimations = (
  anims: Phaser.Animations.AnimationManager
) => {
  const player = 'player';
  const frameRate = 6;
  const infinite = -1;

  const animationConfig = [
    { key: `${player}-idle-down`, start: 0, end: 5 },
    { key: `${player}-idle-right`, start: 6, end: 11 },
    { key: `${player}-idle-up`, start: 12, end: 17 },
    { key: `${player}-idle-left`, start: 18, end: 23 },
    { key: `${player}-walk-down`, start: 24, end: 29 },
    { key: `${player}-walk-right`, start: 30, end: 35 },
    { key: `${player}-walk-up`, start: 36, end: 41 },
    { key: `${player}-walk-left`, start: 42, end: 47 },
  ];

  for (const { key, start, end } of animationConfig) {
    anims.create({
      key,
      frames: anims.generateFrameNumbers(player, { start, end }),
      frameRate,
      repeat: infinite,
    });
  }
};
