import { defineQuery, defineSystem } from 'bitecs';
import Phaser from 'phaser';

import { Direction, Input, Player, Velocity } from '../components';

export const createPlayerInputSystem = (
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const query = defineQuery([Input, Player, Velocity]);

  return defineSystem((world) => {
    const entities = query(world);
    const player = entities[0];

    Input.direction[player] = Direction.None;

    cursorKeys.up?.isDown && (Input.direction[player] = Direction.Up);
    cursorKeys.right?.isDown && (Input.direction[player] = Direction.Right);
    cursorKeys.down?.isDown && (Input.direction[player] = Direction.Down);
    cursorKeys.left?.isDown && (Input.direction[player] = Direction.Left);

    return world;
  });
};
