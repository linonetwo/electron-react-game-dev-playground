// @flow
import React, { useState } from 'react';
import type { Element } from 'react';
import styled from 'styled-components';
import { Stage } from 'react-pixi-fiber';
import { ReactReduxContext, Provider } from 'react-redux';

import HUD from '../../components/HUD';
import ContextMenu from '../../components/ContextMenu';
import { initialSystems } from '../../systems';
import { initialEntities } from '../../entites';
import useGame from '../../useGame';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

function filterHUDEntities(entities: Element<any>[]): Object[] {
  const filter = ['mouse', 'underMouse'];
  return entities
    .filter(entity => filter.includes(entity.props['@type']))
    .map(entity => entity.props);
}

const containerID = 'game-container';
export default function Main() {
  const [entities, dispatchGameEvent] = useGame(
    initialSystems,
    initialEntities,
  );
  const [contextMenuIsOpen, contextMenuIsOpenSetter] = useState(false);

  // get data for HUD and context menu
  const dataEntities = filterHUDEntities(entities);
  const mouseEntity = dataEntities.find(entity => entity['@type'] === 'mouse');
  const entitiesUnderMouseEntity = dataEntities.find(
    entity => entity['@type'] === 'underMouse',
  );
  const entitiesUnderMouse = entitiesUnderMouseEntity
    ? entitiesUnderMouseEntity.entities
    : [];

  return (
    <Container id={containerID}>
      <HUD dispatchGameEvent={dispatchGameEvent} />
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            onMouseMove={event => {
              dispatchGameEvent({
                type: 'mouse-move',
                x: event.clientX,
                y: event.clientY,
              });
            }}
            options={{
              backgroundColor: 0x10bb99,
              height: window.innerHeight,
              width: window.innerWidth,
            }}
            onContextMenu={event => {
              event.preventDefault();
              // reopen the menu to refresh its props
              contextMenuIsOpenSetter(false);
              setImmediate(() => {
                contextMenuIsOpenSetter(true);
              });
            }}
            onClick={() => {
              contextMenuIsOpenSetter(false);
            }}
          >
            <Provider store={store}>{entities}</Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>

      <ContextMenu
        open={contextMenuIsOpen}
        items={entitiesUnderMouse.map(entity => ({
          title: entity.name,
          type: entity['@type'],
          icon: 'people',
        }))}
        position={mouseEntity || { x: 0, y: 0 }}
        mountPoint={containerID}
      />
    </Container>
  );
}
