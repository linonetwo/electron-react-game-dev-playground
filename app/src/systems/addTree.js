// @flow
import { getTree } from 'components/tree';
import type { TreePropsWithRenderer } from 'components/tree';
import type { SystemInput } from 'systems/typing';
import { resources } from '~/resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function addTree({ createEntity, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'add-tree') {
      if (!resources.index.core) return;
      const treeList = resources.index.core.tree;

      for (let index = 10; index <= 100; index += 1) {
        const randomTreeName = randomItem(Object.keys(treeList));
        const randomTreeDetailName = randomItem(treeList[randomTreeName]);
        const treeEntity: TreePropsWithRenderer = getTree(randomTreeDetailName, [
          Math.floor(Math.random() * index * 100),
          Math.floor(Math.random() * index * 100),
        ]);
        createEntity(treeEntity);
      }
    }
  });
}
