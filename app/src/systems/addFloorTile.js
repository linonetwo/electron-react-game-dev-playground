// @flow
import React from 'react';
import Floor from 'components/floor';
import type {
  FloorProps,
  IFloorTile,
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
      const floorEntity: FloorPropsWithRenderer = {
        '@type': 'floor',
        tiles: [],
        Renderer: (props: FloorProps) => <Floor {...props} />,
        x: 0,
        y: 0,
        width: 64,
        height: 64,
      };

      for (let index = 0; index <= 100; index += 1) {
        const tile: IFloorTile = {
          texture: randomFloorName,
          name: `${randomFloorName} ${String(Math.random()).substring(2, 6)}`,
          x: Math.floor(Math.random() * index * 100),
          y: Math.floor(Math.random() * index * 100),
        };
        floorEntity.tiles.push(tile);
      }
      createEntity(floorEntity);
    }
  });
}
