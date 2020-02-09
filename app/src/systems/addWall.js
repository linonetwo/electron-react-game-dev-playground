// @flow
import React from 'react';
import nanoid from 'nanoid/non-secure';
import Wall from 'components/wall';
import type { WallProps, WallPropsWithRenderer } from 'components/wall';
import type { SystemInput } from 'systems/typing';

export default function addWall({ createEntity, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'add-wall') {
      for (let index = 10; index <= 100; index += 1) {
        const wallName = 'Titanium_Atlas';
        const wallEntity: WallPropsWithRenderer = {
          '@type': 'wall-standalone',
          Renderer: (props: WallProps) => (props.renderable ? <Wall {...props} /> : null),
          renderable: true,
          name: `${wallName} ${nanoid()}`,
          textureName: wallName,
          collider: { type: 'block', width: 100, height: 100 },
          position: [Math.floor(Math.random() * index * 100), Math.floor(Math.random() * index * 100)],
        };
        createEntity(wallEntity);
      }
    }
  });
}
