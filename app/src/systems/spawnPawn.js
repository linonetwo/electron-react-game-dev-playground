// @flow
import React from 'react';
import * as PIXI from 'pixi.js';
import { Pawn, pawnFacing } from '../components/pawn';
import type { PawnProps } from '../components/pawn';
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
      const pawnEntity = {
        name: 'protagonistPawn',
        Renderer: (props: PawnProps) => <Pawn {...props} />,
        x: 200,
        y: 200,
        collider: { type: 'block', width: 64, height: 32 },
        facing: pawnFacing.SOUTH,
        texture: {
          head: {
            [pawnFacing.NORTH]: {
              '@id': `${randomHeadName}_${pawnFacing.NORTH}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHeadName}_${pawnFacing.NORTH}`],
              ),
            },
            [pawnFacing.SOUTH]: {
              '@id': `${randomHeadName}_${pawnFacing.SOUTH}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHeadName}_${pawnFacing.SOUTH}`],
              ),
            },
            [pawnFacing.EAST]: {
              '@id': `${randomHeadName}_${pawnFacing.EAST}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHeadName}_${pawnFacing.EAST}`],
              ),
            },
          },
          hair: {
            [pawnFacing.NORTH]: {
              '@id': `${randomHairName}_${pawnFacing.NORTH}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHairName}_${pawnFacing.NORTH}`],
              ),
            },
            [pawnFacing.SOUTH]: {
              '@id': `${randomHairName}_${pawnFacing.SOUTH}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHairName}_${pawnFacing.SOUTH}`],
              ),
            },
            [pawnFacing.EAST]: {
              '@id': `${randomHairName}_${pawnFacing.EAST}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomHairName}_${pawnFacing.EAST}`],
              ),
            },
          },
          body: {
            [pawnFacing.NORTH]: {
              '@id': `${randomBodyName}_${pawnFacing.NORTH}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomBodyName}_${pawnFacing.NORTH}`],
              ),
            },
            [pawnFacing.SOUTH]: {
              '@id': `${randomBodyName}_${pawnFacing.SOUTH}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomBodyName}_${pawnFacing.SOUTH}`],
              ),
            },
            [pawnFacing.EAST]: {
              '@id': `${randomBodyName}_${pawnFacing.EAST}`,
              '@value': new PIXI.Texture.from(
                resources[`${randomBodyName}_${pawnFacing.EAST}`],
              ),
            },
          },
        },
      };

      createEntity(pawnEntity);
    }
  });
}
