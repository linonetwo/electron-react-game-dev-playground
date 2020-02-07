// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Stage } from 'react-pixi-fiber';
import { changeMessage } from '../../redux/components/home/homeSlice';

import HUD, { filterHUDEntities } from '../../components/HUD';
import { initialSystems } from '../../systems';
import { initialEntities } from '../../entites';
import useGame from '../../useGame';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Main(props) {
  const [entities, dispatchGameEvent] = useGame(
    initialSystems,
    initialEntities,
  );

  return (
    <Container>
      <HUD
        dispatchGameEvent={dispatchGameEvent}
        entities={filterHUDEntities(entities)}
      />
      <Stage
        onMouseMove={event => {
          dispatchGameEvent({
            type: 'mouse-move',
            x: event.clientX,
            y: event.clientY,
          });
        }}
        options={{ backgroundColor: 0x10bb99, height: window.innerHeight, width: window.innerWidth }}
        onContextMenu={event => event.preventDefault()}
      >
        {entities}
      </Stage>
    </Container>
  );
}

const mapStateToProps = (state, props) => ({
  home: state.home,
});
const mapDispatch = { changeMessage };

export default connect(mapStateToProps, mapDispatch)(Main);
