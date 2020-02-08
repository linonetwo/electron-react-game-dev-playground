// @flow
import React from 'react';
import * as PIXI from 'pixi.js';
import Wall from 'components/wall';
import type { WallProps, IWall, WallPropsWithRenderer } from 'components/wall';
import { resources } from '~/resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function addWall({ createEntity, gameEvents }) {
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
