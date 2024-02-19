import { defineQuery, defineSystem, enterQuery, removeEntity } from 'bitecs';

import { Computer } from '../components';

export const createCollisionSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>,
  player: number
) => {
  const query = defineQuery([Computer]);
  const queryEnter = enterQuery(query);

  return defineSystem((world) => {
    const playerSprite = sprites.get(player);

    if (!playerSprite) {
      return world;
    }

    const enterEntities = queryEnter(world);

    for (const id of enterEntities) {
      const computerSprite = sprites.get(id);

      if (computerSprite) {
        scene.physics.add.collider(computerSprite, playerSprite, () => {
          removeEntity(world, id);
        });
      }
    }

    return world;
  });
};
