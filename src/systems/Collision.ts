import { defineQuery, defineSystem, enterQuery } from 'bitecs';

import { Computer, PhysicsBody, Player } from '../components';

export const createCollisionSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
) => {
  const queryPlayerEnter = enterQuery(defineQuery([Player, PhysicsBody]));
  const queryComputerEnter = enterQuery(defineQuery([Computer, PhysicsBody]));

  return defineSystem((world) => {
    const playerEnterEntities = queryPlayerEnter(world);
    const computerEnterEntities = queryComputerEnter(world);

    if (playerEnterEntities.length > 0) {
      const playerSprite = sprites.get(playerEnterEntities[0]);

      playerSprite?.setCollideWorldBounds(true);

      computerEnterEntities.forEach((id) => {
        const computerSprite = sprites.get(id);

        if (computerSprite && playerSprite) {
          computerSprite.setCollideWorldBounds(true);

          scene.physics.add.collider(computerSprite, playerSprite);
        }
      });
    }

    return world;
  });
};
