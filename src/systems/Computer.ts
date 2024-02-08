import { defineQuery, defineSystem } from 'bitecs';
import Phaser from 'phaser';

import { Computer, Direction, Input, Velocity } from '../components';

export const createComputerSystem = (scene: Phaser.Scene) => {
  const query = defineQuery([Computer, Input, Velocity]);

  return defineSystem((world) => {
    const deltaTime = scene.game.loop.delta;
    const entities = query(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];

      Computer.accumulatedTime[id] += deltaTime;

      if (Computer.accumulatedTime[id] < Computer.timeBetweenActions[id]) {
        continue;
      }

      Computer.accumulatedTime[id] -= Computer.timeBetweenActions[id];

      switch (Phaser.Math.Between(0, 16)) {
        case 0:
          Input.direction[id] = Direction.Up;
          break;
        case 1:
          Input.direction[id] = Direction.Right;
          break;
        case 2:
          Input.direction[id] = Direction.Down;
          break;
        case 3:
          Input.direction[id] = Direction.Left;
          break;
        default:
          Input.direction[id] = Direction.None;
          break;
      }
    }

    return world;
  });
};
