import { defineQuery, defineSystem } from 'bitecs';

import { createPlayerAnimations, createSlimeAnimations } from '../animations';
import { Animation, Direction, Input } from '../components';

export const createAnimationSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
) => {
  const query = defineQuery([Animation, Input]);

  createPlayerAnimations(scene.anims);
  createSlimeAnimations(scene.anims);

  return defineSystem((world) => {
    const entities = query(world);

    for (const id of entities) {
      const sprite = sprites.get(id);

      if (!sprite) {
        continue;
      }

      const direction = Input.direction[id];
      const previousDirection = Input.previousDirection[id];
      const spriteKey = sprite.texture.key;
      const animation =
        direction === Direction.None
          ? `${spriteKey}-idle-${Direction[previousDirection].toLowerCase()}`
          : `${spriteKey}-walk-${Direction[direction].toLowerCase()}`;

      if (animation) {
        sprite.anims.play(animation, true);
      } else {
        sprite.anims.stop();
      }
    }

    return world;
  });
};
