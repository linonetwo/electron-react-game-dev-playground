// @flow
import React from 'react';
import * as PIXI from 'pixi.js';
import { Pawn } from '../components/pawn';
import type { PawnProps, PawnPropsWithRenderer } from '../components/pawn';
import { resources } from '../resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function spawnPawn({ createEntity, gameEvents }) {
  gameEvents.forEach(event => {
    if (event.type === 'spawn-pawn') {
      const randomHeadName = randomItem(resources.index.core.heads.female);
      const randomHairName = randomItem(resources.index.core.hair);
      const randomBodyName = randomItem(resources.index.core.bodies);
      const pawnEntity: PawnPropsWithRenderer = {
        '@type': 'protagonistPawn',
        Renderer: (props: PawnProps) => <Pawn {...props} />,
        x: 200,
        y: 200,
        collider: { type: 'block', width: 150, height: 200 },
        facing: 'south',
        texture: {
          head: {
            north: {
              '@id': `${randomHeadName}_${'north'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHeadName}_${'north'}`],
              ),
            },
            south: {
              '@id': `${randomHeadName}_${'south'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHeadName}_${'south'}`],
              ),
            },
            east: {
              '@id': `${randomHeadName}_${'east'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHeadName}_${'east'}`],
              ),
            },
          },
          hair: {
            north: {
              '@id': `${randomHairName}_${'north'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHairName}_${'north'}`],
              ),
            },
            south: {
              '@id': `${randomHairName}_${'south'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHairName}_${'south'}`],
              ),
            },
            east: {
              '@id': `${randomHairName}_${'east'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHairName}_${'east'}`],
              ),
            },
          },
          body: {
            north: {
              '@id': `${randomBodyName}_${'north'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomBodyName}_${'north'}`],
              ),
            },
            south: {
              '@id': `${randomBodyName}_${'south'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomBodyName}_${'south'}`],
              ),
            },
            east: {
              '@id': `${randomBodyName}_${'east'}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomBodyName}_${'east'}`],
              ),
            },
          },
        },
      };

      createEntity(pawnEntity);
    }
  });
}
