// @flow
import React from 'react';
import * as PIXI from 'pixi.js';
import Pawn from 'components/pawn';
import type { PawnProps, PawnPropsWithRenderer } from 'components/pawn';
import { resources } from '~/resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function spawnPawn({ createEntity, gameEvents }) {
  gameEvents.forEach(event => {
    if (event.type === 'spawn-pawn' || event.type === 'spawn-protagonist-pawn') {
      const randomHeadName = randomItem(resources.index.core.heads.female);
      const randomHairName = randomItem(resources.index.core.hair);
      const randomBodyName = randomItem(resources.index.core.bodies);
      const pawnEntity: PawnPropsWithRenderer = {
        '@type': event.type === 'spawn-pawn' ? 'pawn' : 'protagonistPawn',
        name: `ID${String(Math.random()).substring(2, 6)}`,
        Renderer: (props: PawnProps) => <Pawn {...props} />,
        x: 200,
        y: 200,
        baseMoveSpeed: 10,
        collider: { type: 'block', width: 150, height: 200 },
        facing: 'south',
        texture: {
          head: {
            north: `${randomHeadName}_${'north'}`,
            south: `${randomHeadName}_${'south'}`,
            east: `${randomHeadName}_${'east'}`,
          },
          hair: {
            north: `${randomHairName}_${'north'}`,
            south: `${randomHairName}_${'south'}`,
            east: `${randomHairName}_${'east'}`,
          },
          body: {
            north: `${randomBodyName}_${'north'}`,
            south: `${randomBodyName}_${'south'}`,
            east: `${randomBodyName}_${'east'}`,
          },
        },
      };

      createEntity(pawnEntity);
    }
  });
}
