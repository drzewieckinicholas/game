import { addEntity, createWorld, IWorld } from 'bitecs';

export class GameScene extends Phaser.Scene {
  private world?: IWorld;

  constructor() {
    super('GameScene');
  }

  init(): void {
    console.log('GameScene init');
  }

  preload(): void {
    console.log('GameScene preload');
  }

  create(): void {
    this.world = createWorld();

    // Player
    const player = addEntity(this.world);

    // Enemy
    const enemy = addEntity(this.world);
  }
}
