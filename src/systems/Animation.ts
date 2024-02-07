import { defineQuery, defineSystem } from 'bitecs';

import { createPlayerAnimations } from '../animations/player';
import { Animation, Direction, Input } from '../components';

export const createAnimationSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
) => {
  const query = defineQuery([Animation, Input]);

  createPlayerAnimations(scene.anims);

  return defineSystem((world) => {
    const entities = query(world);

    for (const id of entities) {
      const sprite = sprites.get(id);

      if (!sprite) {
        continue;
      }

      const direction = Input.direction[id];
      const previousDirection = Input.previousDirection[id];
      const animation =
        direction === Direction.None
          ? `idle-${Direction[previousDirection].toLowerCase()}`
          : `walk-${Direction[direction].toLowerCase()}`;

      if (animation) {
        sprite.anims.play(animation, true);
      } else {
        sprite.anims.stop();
      }
    }

    return world;
  });
};
