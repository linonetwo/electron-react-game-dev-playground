// @flow
import { vAdd, vScale } from 'vec-la-fp';

import type { SystemInput } from 'systems/typing';

/** Should call after movement, so we can use an acceleration negative to velocity to perform a single step movement */
export default function acceleration({ entities, timeDiff }: SystemInput) {
  for (const entity of entities) {
    if ('velocity' in entity && 'acceleration' in entity) {
      entity.velocity = vAdd(
        entity.velocity,
        vScale(timeDiff, entity.acceleration),
      );
    }
  }
}
