// @flow
import React from 'react';
import * as PIXI from 'pixi.js';
import Floor from 'components/floor';
import type {
  FloorProps,
  IFloorTile,
  FloorPropsWithRenderer,
} from 'components/floor';
import { resources } from '~/resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function addFloorTile({ createEntity, gameEvents }) {
  gameEvents.forEach(event => {
    if (event.type === 'add-floor') {
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

      let texture = new PIXI.Texture.from(resources[randomFloorName]);
      texture = new PIXI.Texture(
        texture,
        new PIXI.Rectangle(0, 0, floorEntity.width, floorEntity.height),
      );
      for (let indexY = 0; indexY <= 100; indexY += 1) {
        const tileRow = [];
        for (let indexX = 0; indexX <= 100; indexX += 1) {
          const tile: IFloorTile = {
            texture,
            name: `${randomFloorName} ${String(Math.random()).substring(2, 6)}`,
          };
          tileRow.push(tile);
        }
        floorEntity.tiles.push(tileRow);
      }
      createEntity(floorEntity);
    }
  });
}
