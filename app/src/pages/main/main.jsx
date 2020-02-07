// @flow
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Stage } from 'react-pixi-fiber';
import { changeMessage } from '../../redux/components/home/homeSlice';

import HUD, { filterHUDEntities } from '../../components/HUD';
import ContextMenu from '../../components/ContextMenu';
import { initialSystems } from '../../systems';
import { initialEntities } from '../../entites';
import useGame from '../../useGame';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const containerID = 'game-container';
function Main(props) {
  const [entities, dispatchGameEvent] = useGame(
    initialSystems,
    initialEntities,
  );
  const [contextMenuIsOpen, contextMenuIsOpenSetter] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  return (
    <Container id={containerID}>
      <HUD
        dispatchGameEvent={dispatchGameEvent}
        entities={filterHUDEntities(entities)}
      />
      <Stage
        onMouseMove={event => {
          const position = { x: event.clientX, y: event.clientY };
          // set
          if (!contextMenuIsOpen) {
            mousePosition.current = position;
          }
          dispatchGameEvent({
            type: 'mouse-move',
            ...position,
          });
        }}
        options={{
          backgroundColor: 0x10bb99,
          height: window.innerHeight,
          width: window.innerWidth,
        }}
        onContextMenu={event => {
          event.preventDefault();
          contextMenuIsOpenSetter(true);
        }}
        onClick={() => {
          contextMenuIsOpenSetter(false);
        }}
      >
        {entities}
      </Stage>

      <ContextMenu
        open={contextMenuIsOpen}
        items={[{ type: 'aaa' }]}
        position={mousePosition.current}
        mountPoint={containerID}
      />
    </Container>
  );
}

const mapStateToProps = (state, props) => ({
  home: state.home,
});
const mapDispatch = { changeMessage };

export default connect(mapStateToProps, mapDispatch)(Main);
