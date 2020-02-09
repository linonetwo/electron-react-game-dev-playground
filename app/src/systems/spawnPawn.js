// @flow
import React from 'react';
import Pawn from 'components/pawn';
import type { PawnProps, PawnPropsWithRenderer } from 'components/pawn';

import type { SystemInput } from 'systems/typing';
import { resources } from '~/resourcePool';
import moveableRigidBody from '~/entities/components/moveableRigidBody';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function spawnPawn({ createEntity, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (
      event.type === 'spawn-pawn' ||
      event.type === 'spawn-protagonist-pawn'
    ) {
      if (!resources.index.core) return;
      const coreIndex = resources.index.core;
      const randomHeadName = randomItem(coreIndex.heads.female);
      const randomHairName = randomItem(coreIndex.hair);
      const randomBodyName = randomItem(coreIndex.bodies);
      const pawnEntity: PawnPropsWithRenderer = {
        '@type': event.type === 'spawn-pawn' ? 'pawn' : 'protagonistPawn',
        name: `ID${String(Math.random()).substring(2, 6)}`,
        Renderer: (props: PawnProps) => <Pawn {...props} />,
        ...moveableRigidBody,
        baseMoveSpeed: 10,
        collider: { type: 'block', width: 160, height: 160 },
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
