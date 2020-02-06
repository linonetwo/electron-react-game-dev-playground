import { vAdd } from 'vec-la-fp';

export default function movement({ entities }) {
  for (const entity of entities) {
    if ('velocity' in entity && 'position' in entity) {
      entity.position = vAdd(entity.velocity, entity.position);
    }
  }
}
