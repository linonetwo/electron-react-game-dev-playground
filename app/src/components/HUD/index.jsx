// @flow
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100vw;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
`;
const ReturnButton = styled.button``;
const SpawnPawnButton = styled.button``;

export default function HUD(props: {
  dispatchGameEvent: (event: any) => void,
}) {
  return (
    <Nav>
      <ReturnButton>Menu</ReturnButton>
      <SpawnPawnButton
        onClick={() => props.dispatchGameEvent({ type: 'spawn-pawn' })}
      >
        SpawnPawn
      </SpawnPawnButton>
    </Nav>
  );
}
