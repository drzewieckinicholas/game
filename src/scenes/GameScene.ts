import { addComponent, addEntity, createWorld, IWorld, pipe } from 'bitecs';

import {
  Animation,
  Computer,
  Input,
  PhysicsBody,
  Player,
  Position,
  Sprite,
  Velocity,
} from '../components';
import {
  createAnimationSystem,
  createCameraSystem,
  createCollisionSystem,
  createComputerSystem,
  createMovementSystem,
  createPlayerInputSystem,
  createSpriteSystem,
} from '../systems';

enum Maps {
  Map = 0,
}

const MapKeys: string[] = ['map'];

enum Textures {
  Tiles = 0,
  Player = 1,
  Slime = 2,
}

const TextureKeys: string[] = ['tiles', 'player', 'slime'];

export class GameScene extends Phaser.Scene {
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
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
    this.cursorKeys = this.input?.keyboard?.createCursorKeys();
  }

  preload(): void {
    this.load.image(
      TextureKeys[Textures.Tiles],
      `/assets/tiles/${TextureKeys[Textures.Tiles]}.png`
    );
    this.load.spritesheet(
      TextureKeys[Textures.Player],
      `/assets/characters/${TextureKeys[Textures.Player]}.png`,
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet(
      TextureKeys[Textures.Slime],
      `/assets/characters/${TextureKeys[Textures.Slime]}.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.tilemapTiledJSON(
      MapKeys[Maps.Map],
      `/assets/${MapKeys[Maps.Map]}.json`
    );
  }

  create(): void {
    this.sprites = new Map();

    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({
      key: MapKeys[Maps.Map],
    });

    map.addTilesetImage(
      TextureKeys[Textures.Tiles],
      TextureKeys[Textures.Tiles],
      16,
      16
    );

    map.createLayer(0, TextureKeys[Textures.Tiles], 0, 0);

    map.createLayer(1, TextureKeys[Textures.Tiles], 0, 0);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.world = createWorld();

    const player = addEntity(this.world);

    addComponent(this.world, Position, player);
    Position.x[player] = 50;
    Position.y[player] = 50;

    addComponent(this.world, Velocity, player);

    addComponent(this.world, Sprite, player);
    Sprite.texture[player] = Textures.Player;

    addComponent(this.world, Animation, player);

    addComponent(this.world, Player, player);

    addComponent(this.world, Input, player);
    Input.speed[player] = 20;

    addComponent(this.world, PhysicsBody, player);
    PhysicsBody.entity[player] = player;

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

      addComponent(this.world, PhysicsBody, enemy);
      PhysicsBody.entity[enemy] = enemy;
    }

    this.pipeline = pipe(
      createMovementSystem(this),
      createPlayerInputSystem(this.cursorKeys!),
      createComputerSystem(this),
      createSpriteSystem(this, this.sprites!, TextureKeys),
      createCameraSystem(this, this.sprites!, map),
      createCollisionSystem(this, this.sprites!),
      createAnimationSystem(this, this.sprites!)
    );
  }

  update(): void {
    if (!this.pipeline || !this.world) return;

    this.pipeline(this.world);
  }
}
