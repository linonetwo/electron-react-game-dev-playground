// @flow
import React from 'react';
import Floor from 'components/floor';
import type {
  FloorProps,
  FloorPropsWithRenderer,
} from 'components/floor';
import type { SystemInput } from 'systems/typing';
import { resources } from '~/resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function addFloorTile({
  createEntity,
  gameEvents,
}: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'add-floor') {
      if (!resources.index.core) return;
      const randomFloorName = randomItem(resources.index.core.floors);

      for (let index = 0; index <= 100; index += 1) {
        const tile: FloorPropsWithRenderer = {
          '@type': 'floor',
          Renderer: (props: FloorProps) => <Floor {...props} />,
          renderable: true,
          width: 64,
          height: 64,
          textureName: randomFloorName,
          name: `${randomFloorName} ${String(Math.random()).substring(2, 6)}`,
          position: [
            Math.floor(Math.random() * index * 100),
            Math.floor(Math.random() * index * 100),
          ],
        };
        createEntity(tile);
      }
    }
  });
}
