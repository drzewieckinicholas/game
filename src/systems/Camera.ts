import { defineQuery, defineSystem, enterQuery } from 'bitecs';
import Phaser from 'phaser';

import { Player } from '../components';

export const createCameraSystem = (
  scene: Phaser.Scene,
  sprites: Map<number, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>,
  map: Phaser.Tilemaps.Tilemap
) => {
  const query = defineQuery([Player]);
  const queryEnter = enterQuery(query);

  scene.cameras.main.setZoom(2);
  scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  return defineSystem((world) => {
    const enterEntities = queryEnter(world);
    const player = enterEntities[0];
    const sprite = sprites.get(player);

    if (sprite) {
      scene.cameras.main.startFollow(sprite);
    }

    return world;
  });
};
