import { defineQuery, defineSystem, enterQuery } from 'bitecs';

import { Computer, PhysicsBody, Player } from '../components';

export const createCollisionSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
) => {
  const queryPlayer = defineQuery([Player, PhysicsBody]);
  const queryComputer = defineQuery([Computer, PhysicsBody]);
  const queryComputerEnter = enterQuery(queryComputer);

  let playerSprite:
    | Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    | undefined;
  const computerSprites: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] =
    [];

  return defineSystem((world) => {
    const playerEntities = queryPlayer(world);
    const computerEnterEntities = queryComputerEnter(world);

    if (playerEntities.length > 0) {
      playerSprite = sprites.get(playerEntities[0]);
    }

    computerEnterEntities.forEach((id) => {
      const sprite = sprites.get(id);

      if (sprite) {
        computerSprites.push(sprite);
      }
    });

    if (playerSprite && computerSprites.length > 0) {
      scene.physics.add.collider(playerSprite, computerSprites);
    }

    return world;
  });
};
