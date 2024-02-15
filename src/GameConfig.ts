import { Game, Preloader } from './scenes';

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
    width: 640,
    height: 480,
    mode: Phaser.Scale.FIT,
    parent: 'game',
  },
  scene: [Preloader, Game],
};
