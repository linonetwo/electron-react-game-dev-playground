// @flow
import React from 'react';
import * as PIXI from 'pixi.js';
import Tree from 'components/tree';
import type { TreeProps, ITree, TreePropsWithRenderer } from 'components/tree';
import { resources } from '~/resourcePool';

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function addTree({ createEntity, gameEvents }) {
  gameEvents.forEach(event => {
    if (event.type === 'add-tree') {
      const treeEntity: TreePropsWithRenderer = {
        '@type': 'tree',
        trees: [],
        Renderer: (props: TreeProps) => <Tree {...props} />,
      };

      for (let index = 10; index <= 100; index += 1) {
        const randomTreeName = randomItem(
          Object.keys(resources.index.core.tree),
        );
        const randomTreeDetailName = randomItem(
          resources.index.core.tree[randomTreeName],
        );
        const tree: ITree = {
          name: `${randomTreeDetailName} ${String(Math.random()).substring(
            2,
            6,
          )}`,
          texture: randomTreeDetailName,
          collider: { type: 'block', width: 100, height: 100 },
          x: Math.floor(Math.random() * index * 100),
          y: Math.floor(Math.random() * index * 100),
        };
        treeEntity.trees.push(tree);
      }
      createEntity(treeEntity);
    }
  });
}
