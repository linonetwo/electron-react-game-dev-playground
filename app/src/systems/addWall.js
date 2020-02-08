// @flow
import React from 'react';
import Wall from 'components/wall';
import type { WallProps, IWall, WallPropsWithRenderer } from 'components/wall';
import type { SystemInput } from 'systems/typing';

export default function addWall({ createEntity, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'add-wall') {
      const wallEntity: WallPropsWithRenderer = {
        '@type': 'wall',
        walls: [],
        Renderer: (props: WallProps) => <Wall {...props} />,
      };

      for (let index = 10; index <= 100; index += 1) {
        const wallName = 'Titanium_Atlas';
        const wall: IWall = {
          '@type': 'wall-standalone',
          name: `${wallName} ${String(Math.random()).substring(2, 6)}`,
          texture: wallName,
          collider: { type: 'block', width: 100, height: 100 },
          x: Math.floor(Math.random() * index * 100),
          y: Math.floor(Math.random() * index * 100),
        };
        wallEntity.walls.push(wall);
      }
      createEntity(wallEntity);
    }
  });
}
