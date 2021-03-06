// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { Stage } from 'react-pixi-fiber';
import { ReactReduxContext, Provider } from 'react-redux';
import { useWindowResize } from 'beautiful-react-hooks';

import HUD from 'components/HUD';
import ContextMenu from 'components/ContextMenu';
import { initialSystems } from '~/systems';
import type { IEvent } from '~/systems/typing';
import { initialEntities } from '~/entities';
import useGame from '~/useGame';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const containerID = 'game-container';
export default function Main() {
  const [renderedEntities, rawEntitiesMap, dispatchGameEvent] = useGame(initialSystems, initialEntities);
  const [contextMenuIsOpen, contextMenuIsOpenSetter] = useState(false);

  // get data for HUD and context menu
  const dataEntities: Object[] = Object.values(rawEntitiesMap);
  const mouseEntity = dataEntities.find(entity => entity['@type'] === 'mouse');
  const cameraEntity = dataEntities.find(entity => entity['@type'] === 'camera');
  const entitiesUnderMouseEntity = dataEntities.find(entity => entity['@type'] === 'underMouse');
  const entitiesUnderMouse = entitiesUnderMouseEntity ? entitiesUnderMouseEntity.entities : [];

  // handle window resize
  useWindowResize(() => {
    const windowResizeEvent: IEvent = {
      type: 'resize-window',
      payload: { width: window.innerWidth, height: window.innerHeight },
    };
    dispatchGameEvent(windowResizeEvent);
  });

  return (
    <Container id={containerID}>
      <HUD dispatchGameEvent={dispatchGameEvent} />
      {cameraEntity && (
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage
              // follow the camera
              pivot={{
                x: cameraEntity.position[0],
                y: cameraEntity.position[1],
              }}
              // center the camera
              position={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
              options={{
                backgroundColor: 0x10bb99,
                height: window.innerHeight,
                width: window.innerWidth,
              }}
              onMouseMove={event => {
                const mouseMoveEvent: IEvent = {
                  type: 'mouse-move',
                  payload: { x: event.clientX, y: event.clientY },
                };
                dispatchGameEvent(mouseMoveEvent);
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
              <Provider store={store}>{renderedEntities}</Provider>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      )}

      <ContextMenu
        open={contextMenuIsOpen}
        items={entitiesUnderMouse.map(entity => ({
          title: entity.name,
          type: entity['@type'],
          icon: 'people',
        }))}
        position={mouseEntity ? mouseEntity.position : [0, 0]}
        mountPoint={containerID}
      />
    </Container>
  );
}
