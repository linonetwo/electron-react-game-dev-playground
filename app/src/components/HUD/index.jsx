// @flow
import React from 'react';
import type { Element } from 'react';
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

export function filterHUDEntities(entities: Element<any>[]): Object[] {
  const filter = ['mouse', 'underMouse'];
  return entities
    .filter(entity => filter.includes(entity.props['@type']))
    .map(entity => entity.props);
}

export default function HUD(props: {
  dispatchGameEvent: (event: any) => void,
  entities: Object[],
}) {
  const mouseEntity = props.entities.find(
    entity => entity['@type'] === 'mouse',
  );
  const entitiesUnderMouseEntity = props.entities.find(
    entity => entity['@type'] === 'underMouse',
  );
  const entitiesUnderMouse = entitiesUnderMouseEntity
    ? entitiesUnderMouseEntity.entities
    : [];
  return (
    <Nav>
      <ReturnButton>Menu</ReturnButton>
      <SpawnPawnButton
        onClick={() => props.dispatchGameEvent({ type: 'spawn-pawn' })}
      >
        SpawnPawn
      </SpawnPawnButton>
      {mouseEntity && <span>mouse: {mouseEntity.x} {mouseEntity.y}</span>}
      {JSON.stringify(entitiesUnderMouse)}
    </Nav>
  );
}
