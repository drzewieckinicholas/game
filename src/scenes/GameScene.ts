import { addComponent, addEntity, createWorld, IWorld, pipe } from 'bitecs';

import { Position, Sprite } from '../components';
import { createSpriteSystem } from '../systems';

enum Maps {
  Map = 0,
}

const MapKeys: string[] = ['map'];

enum Textures {
  Blue = 0,
  Green = 1,
  Red = 2,
}

const TextureKeys: string[] = ['blue', 'green', 'red'];

export class GameScene extends Phaser.Scene {
  private pipeline?: (world: IWorld) => void;
  private sprites?: Map<
    number,
    Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  >;
  private world?: IWorld;

  constructor() {
    super('GameScene');
  }

  init(): void {
    console.log('GameScene init');
  }

  preload(): void {
    this.load.image(
      TextureKeys[Textures.Blue],
      `src/assets/${TextureKeys[Textures.Blue]}.png`
    );
    this.load.image(
      TextureKeys[Textures.Green],
      `src/assets/${TextureKeys[Textures.Green]}.png`
    );
    this.load.image(
      TextureKeys[Textures.Red],
      `src/assets/${TextureKeys[Textures.Red]}.png`
    );
    this.load.tilemapTiledJSON(
      MapKeys[Maps.Map],
      `src/assets/${MapKeys[Maps.Map]}.json`
    );
  }

  create(): void {
    this.sprites = new Map();

    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({
      key: MapKeys[Maps.Map],
    });

    map.addTilesetImage(
      TextureKeys[Textures.Blue],
      TextureKeys[Textures.Blue],
      16,
      16
    );

    map.createLayer(0, TextureKeys[Textures.Blue], 0, 0);

    this.world = createWorld();

    const player = addEntity(this.world);
    addComponent(this.world, Position, player);
    Position.x[player] = 32;
    Position.y[player] = 32;
    addComponent(this.world, Sprite, player);
    Sprite.texture[player] = Textures.Green;

    const enemy = addEntity(this.world);
    addComponent(this.world, Position, enemy);
    Position.x[enemy] = 64;
    Position.y[enemy] = 64;
    addComponent(this.world, Sprite, enemy);
    Sprite.texture[enemy] = Textures.Red;

    this.pipeline = pipe(createSpriteSystem(this, this.sprites!, TextureKeys));
  }

  update(): void {
    if (!this.pipeline || !this.world) return;

    this.pipeline(this.world);
  }
}
