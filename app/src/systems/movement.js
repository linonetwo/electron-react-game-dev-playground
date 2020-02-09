// @flow
import { vAdd, vScale } from 'vec-la-fp';

import type { SystemInput } from 'systems/typing';

export default function movement({ entities, timeDiff }: SystemInput) {
  for (const entity of entities) {
    if ('velocity' in entity && 'position' in entity) {
      entity.position = vAdd(vScale(timeDiff, entity.velocity), entity.position);
    }
  }
}
