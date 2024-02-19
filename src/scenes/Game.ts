import { addComponent, addEntity, createWorld, IWorld, pipe } from 'bitecs';

import {
  Animation,
  Computer,
  Input,
  Player,
  Position,
  Sprite,
  Velocity,
} from '../components';
import { MapKeys, Maps, TextureKeys, Textures } from '../constants';
import {
  createAnimationSystem,
  createCameraSystem,
  createCollisionSystem,
  createComputerSystem,
  createInputSystem,
  createMovementSystem,
  createSpriteSystem,
} from '../systems';

export class Game extends Phaser.Scene {
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  private pipeline?: (world: IWorld) => void;
  private sprites?: Map<
    number,
    Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  >;
  private world?: IWorld;

  constructor() {
    super('Game');
  }

  init(): void {
    this.cursorKeys = this.input?.keyboard?.createCursorKeys();

    this.sprites = new Map();
  }

  create(): void {
    const map = this.createMap();

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.world = createWorld();

    const player = addEntity(this.world);

    addComponent(this.world, Position, player);
    Position.x[player] = 100;
    Position.y[player] = 100;

    addComponent(this.world, Velocity, player);

    addComponent(this.world, Sprite, player);
    Sprite.texture[player] = Textures.Player;

    addComponent(this.world, Animation, player);

    addComponent(this.world, Player, player);

    addComponent(this.world, Input, player);
    Input.speed[player] = 20;

    for (let i = 0; i < 5; i++) {
      const enemy = addEntity(this.world);

      addComponent(this.world, Position, enemy);
      Position.x[enemy] = Phaser.Math.Between(
        map.widthInPixels * 0.25,
        map.widthInPixels * 0.75
      );
      Position.y[enemy] = Phaser.Math.Between(
        map.heightInPixels * 0.25,
        map.heightInPixels * 0.75
      );

      addComponent(this.world, Velocity, enemy);

      addComponent(this.world, Sprite, enemy);
      Sprite.texture[enemy] = Textures.Slime;

      addComponent(this.world, Animation, enemy);

      addComponent(this.world, Computer, enemy);
      Computer.timeBetweenActions[enemy] = 2000;

      addComponent(this.world, Input, enemy);
      Input.speed[enemy] = 10;
    }

    this.pipeline = pipe(
      createMovementSystem(this),
      createInputSystem(this.cursorKeys!),
      createComputerSystem(this),
      createSpriteSystem(this, this.sprites!, TextureKeys),
      createCameraSystem(this, this.sprites!, map),
      createCollisionSystem(this, this.sprites!, player),
      createAnimationSystem(this, this.sprites!)
    );
  }

  update(): void {
    if (!this.pipeline || !this.world) return;

    this.pipeline(this.world);
  }

  private createMap(): Phaser.Tilemaps.Tilemap {
    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({
      key: MapKeys[Maps.Map],
    });

    map.addTilesetImage(
      TextureKeys[Textures.Tiles],
      TextureKeys[Textures.Tiles],
      16,
      16
    );

    for (let i = 0; i < map.layers.length; i++) {
      map.createLayer(i, TextureKeys[Textures.Tiles], 0, 0);
    }

    return map;
  }
}
