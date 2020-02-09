// @flow
import React from 'react';
import Tree from 'components/tree';
import type { TreeProps, ITree, TreePropsWithRenderer } from 'components/tree';
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
      const treeEntity: TreePropsWithRenderer = {
        '@type': 'tree',
        tree: [],
        Renderer: (props: TreeProps) => <Tree {...props} />,
      };

      for (let index = 10; index <= 11; index += 1) {
        const randomTreeName = randomItem(Object.keys(treeList));
        const randomTreeDetailName = randomItem(treeList[randomTreeName]);
        const tree: ITree = {
          name: `${randomTreeDetailName} ${String(Math.random()).substring(
            2,
            6,
          )}`,
          texture: randomTreeDetailName,
          collider: { type: 'block', width: 100, height: 100 },
          position: [
            Math.floor(Math.random() * index * 100),
            Math.floor(Math.random() * index * 100),
          ],
        };
        treeEntity.tree.push(tree);
      }
      createEntity(treeEntity);
    }
  });
}
