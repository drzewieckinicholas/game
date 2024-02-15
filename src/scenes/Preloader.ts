import { MapKeys, Maps, TextureKeys, Textures } from '../constants';

export class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    const { width, height } = this.scale;

    const bar = this.add.rectangle(width / 4, height / 2, 1, 16, 0xffffff);

    this.load.on('progress', (progress: number) => {
      bar.width = (width / 2) * progress;
    });
  }

  preload() {
    this.load.setPath('assets');

    this.load.spritesheet(
      TextureKeys[Textures.Player],
      `/characters/${TextureKeys[Textures.Player]}.png`,
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    this.load.spritesheet(
      TextureKeys[Textures.Slime],
      `/characters/${TextureKeys[Textures.Slime]}.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.image(
      TextureKeys[Textures.Tiles],
      `/tiles/${TextureKeys[Textures.Tiles]}.png`
    );

    this.load.tilemapTiledJSON(MapKeys[Maps.Map], `/${MapKeys[Maps.Map]}.json`);
  }

  create() {
    this.scene.start('Game');
  }
}
