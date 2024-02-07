import { GameScene } from './scenes';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    parent: 'game',
  },
  scene: [GameScene],
};
