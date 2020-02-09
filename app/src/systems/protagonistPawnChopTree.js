/* eslint-disable no-param-reassign */
// @flow
import { vDist } from 'vec-la-fp';

import type { SystemInput } from 'systems/typing';
import choppedBase from '~/entities/components/chopped';
import type { IChopped } from '~/entities/components/chopped';
import type { IAffectable } from '~/entities/components/affectable';

export default function protagonistPawnChopTree({ entities, keysDown, elapsedTime }: SystemInput) {
  if (keysDown.includes('Space')) {
    const protagonistPawn = entities.find(entity => entity['@type'] === 'protagonistPawn');
    if (protagonistPawn) {
      const treeNearPawn: ?IAffectable = entities
        .filter(entity => 'position' in entity && 'debuff' in entity)
        .find(entity => vDist(entity.position, protagonistPawn.position) < protagonistPawn.baseOperationRange);
      if (treeNearPawn) {
        // can only have one chopped debuff
        const prevChoppedDebuff: ?IChopped = treeNearPawn.debuff.find(item => item['@type'] === 'chopped');
        if (!prevChoppedDebuff) {
          treeNearPawn.debuff.push(choppedBase);
        } else {
          prevChoppedDebuff.choppedTime += elapsedTime;
        }
      }

      // console.warn(`treeNearPawn`, JSON.stringify(treeNearPawn, null, '  '));
    }
  }
}
