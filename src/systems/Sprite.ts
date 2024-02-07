import { defineQuery, defineSystem, enterQuery, exitQuery } from 'bitecs';
import Phaser from 'phaser';

import { Position, Sprite, Velocity } from '../components';

export const createSpriteSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>,
  textures: string[]
) => {
  const query = defineQuery([Position, Sprite]);
  const queryEnter = enterQuery(query);
  const queryExit = exitQuery(query);

  return defineSystem((world) => {
    const enterEntities = queryEnter(world);

    for (let i = 0; i < enterEntities.length; ++i) {
      const id = enterEntities[i];
      const textureId = Sprite.texture[id];
      const texture = textures[textureId];
      const sprite = scene.physics.add.sprite(
        Position.x[id],
        Position.y[id],
        texture
      );

      sprites.set(id, sprite);
    }

    const entities = query(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const sprite = sprites.get(id);

      if (!sprite) continue;

      sprite.body.velocity.x = Velocity.x[id];
      sprite.body.velocity.y = Velocity.y[id];
    }

    const exitEntities = queryExit(world);

    for (let i = 0; i < exitEntities.length; ++i) {
      const id = enterEntities[i];

      sprites.delete(id);
    }

    return world;
  });
};
