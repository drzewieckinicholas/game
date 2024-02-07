import { defineQuery, defineSystem } from 'bitecs';

import { Direction, Input, Velocity } from '../components';

export const createMovementSystem = (scene: Phaser.Scene) => {
  const query = defineQuery([Input, Velocity]);

  return defineSystem((world) => {
    const deltaTime = scene.game.loop.delta;
    const entities = query(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const direction = Input.direction[id];

      if (direction !== Direction.None) {
        Input.previousDirection[id] = direction;
      }

      const speed = Input.speed[id] * deltaTime;

      switch (direction) {
        case Direction.Up:
          Velocity.x[id] = 0;
          Velocity.y[id] = -speed;
          break;
        case Direction.Right:
          Velocity.x[id] = speed;
          Velocity.y[id] = 0;
          break;
        case Direction.Down:
          Velocity.x[id] = 0;
          Velocity.y[id] = speed;
          break;
        case Direction.Left:
          Velocity.x[id] = -speed;
          Velocity.y[id] = 0;
          break;
        default:
          Velocity.x[id] = 0;
          Velocity.y[id] = 0;
      }
    }

    return world;
  });
};
