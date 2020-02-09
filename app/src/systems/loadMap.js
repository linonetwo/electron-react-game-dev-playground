// @flow
import React from 'react';
import type { SystemInput } from 'systems/typing';

import Tree from 'components/tree';
import Wall from 'components/wall';
import Floor from 'components/floor';
import Pawn from 'components/pawn';

const entityDeSerializer = {
  tree: entity => {
    return {
      Renderer: props => <Tree {...props} />,
      ...entity,
    };
  },
  'wall-standalone': entity => {
    return {
      Renderer: props => <Wall {...props} />,
      ...entity,
    };
  },
  floor: entity => {
    return {
      Renderer: props => <Floor {...props} />,
      ...entity,
    };
  },
  pawn: entity => {
    return {
      Renderer: props => <Pawn {...props} />,
      ...entity,
    };
  },
  protagonistPawn: entity => {
    return {
      Renderer: props => <Pawn {...props} />,
      ...entity,
    };
  },
};
export default function loadMap({ gameEvents, createEntity }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'load-map' && event.payload) {
      const { entities } = event.payload;
      const entityTypesToLoad = ['tree', 'wall-standalone', 'pawn', 'protagonistPawn', 'floor'];
      const entitiesToLoad = entities
        .filter(
          entity =>
            entityTypesToLoad.includes(entity['@type']) && Object.keys(entityDeSerializer).includes(entity['@type']),
        )
        .map(entity => entityDeSerializer[entity['@type']](entity));

      for (const entity of entitiesToLoad) {
        createEntity(entity);
      }
    }
  });
}
