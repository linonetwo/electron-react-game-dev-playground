// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Stage } from 'react-pixi-fiber';
import { changeMessage } from '../../redux/components/home/homeSlice';

import HUD from '../../components/HUD';
import { pawnEntity } from '../../components/pawn';
import movement from '../../systems/movement';
import pawnMovement from '../../systems/pawnMovement';
import useGame from '../../useGame';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const initialEntities = [pawnEntity];
const initialSystems = [movement, pawnMovement];

function Main(props) {
  const entities = useGame(initialSystems, initialEntities);
  return (
    <Container>
      <HUD />
      <Stage options={{ backgroundColor: 0x10bb99, height: 600, width: 800 }}>
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
