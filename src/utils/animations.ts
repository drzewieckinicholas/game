export const createAnimations = (
  anims: Phaser.Animations.AnimationManager,
  spriteKey: string,
  animationKey: string,
  start: number,
  end: number,
  frameRate: number,
  repeat: boolean
) => {
  anims.create({
    key: `${spriteKey}-${animationKey}`,
    frames: anims.generateFrameNumbers(spriteKey, { start, end }),
    frameRate,
    repeat: repeat ? -1 : 0,
  });
};
