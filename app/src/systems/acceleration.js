import { vAdd } from 'vec-la-fp';

/** Should call after movement, so we can use an acceleration negative to velocity to perform a single step movement */
export default function acceleration({ entities }) {
  for (const entity of entities) {
    if ('velocity' in entity && 'acceleration' in entity) {
      entity.velocity = vAdd(entity.velocity, entity.acceleration);
    }
  }
}
