// @flow
import React from 'react';
import { omit, groupBy } from 'lodash';
import type { SystemInput } from 'systems/typing';

import Tree from 'components/tree';

const entityDeSerializer = {
  tree: entity => {
    return {
      '@type': 'tree',
      Renderer: (props) => <Tree {...props} />,
      trees: entity.map(tree => omit(tree, ['@type'])),
    };
  },
};
export default function loadMap({ gameEvents, createEntity }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'load-map' && event.payload) {
      const { entities } = event.payload;
      const entityTypesToLoad = ['tree', 'wall', 'pawn', 'protagonistPawn'];
      const unGroupedEntities = entities.filter(
        entity =>
          entityTypesToLoad.includes(entity['@type']) &&
          Object.keys(entityDeSerializer).includes(entity['@type']),
      );
      const groupedByType = groupBy(unGroupedEntities, '@type');
      const entitiesToLoad = Object.keys(groupedByType).map(type => {
        const entitiesOfThisType = groupedByType[type];
        return entityDeSerializer[type](entitiesOfThisType);
      });

      for (const entity of entitiesToLoad) {
        console.warn(`entity`, JSON.stringify(entity, null, '  '));
        createEntity(entity);
      }
    }
  });
}
