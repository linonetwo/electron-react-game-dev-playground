/* eslint-disable no-param-reassign */
// @flow
import { remove } from 'lodash';
import type { SystemInput } from 'systems/typing';
import type { TreeProps } from 'components/tree';

/** get trees with chopped debuff, if its chopping time > 1s, then hp -1 */
export default function chopDownTree({ entities, destroyEntity }: SystemInput) {
  const trees: Array<TreeProps> = entities.filter(entity => entity['@type'] === 'tree');
  // chop tree and reduce its health
  trees.forEach(tree => {
    const getChoppedEntity = debuff => debuff['@type'] === 'chopped';
    const chopped = tree.debuff.find(getChoppedEntity);
    if (chopped && chopped.choppedTime > 1000) {
      remove(tree.debuff, getChoppedEntity);
      tree.health -= 1;
    }
  });

  // if health === 0, it is chopped down
  trees.forEach(tree => {
    if (tree.health <= 0) {
      destroyEntity(tree.id);
    }
  });
}
