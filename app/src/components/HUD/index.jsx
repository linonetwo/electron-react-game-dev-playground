// @flow
import React from 'react';
import styled from 'styled-components';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  Position,
  Switch,
  Popover,
} from '@blueprintjs/core';
import { connect } from 'react-redux';

import getDebugMenu from './getDebugMenu';

const DebugSwitch = styled(Switch)`
  margin-bottom: 0;
  margin-left: 10px;
`;

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});

const mapDispatch = ({ debug: { toggleDebugMode } }) => ({
  toggleDebugMode,
});

export default connect(
  mapState,
  mapDispatch,
)(function HUD(props: {
  inDebugMode: boolean,
  toggleDebugMode: () => void,
  dispatchGameEvent: (event: any) => void,
}) {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <Popover content={getDebugMenu()} position={Position.BOTTOM} minimal>
          <Button className={Classes.MINIMAL} icon="menu" />
        </Popover>
        <NavbarDivider />
        <Button
          onClick={() => props.dispatchGameEvent({ type: 'spawn-protagonist-pawn' })}
          className={Classes.MINIMAL}
          icon="user"
          text="Spawn Protagonist"
        />
        <Button
          onClick={() => props.dispatchGameEvent({ type: 'spawn-pawn' })}
          className={Classes.MINIMAL}
          icon="people"
          text="Spawn Pawn"
        />
        <Button
          onClick={() => props.dispatchGameEvent({ type: 'add-floor' })}
          className={Classes.MINIMAL}
          icon="insert"
          text="Add Floor"
        />
        <Button
          onClick={() => props.dispatchGameEvent({ type: 'add-tree' })}
          className={Classes.MINIMAL}
          icon="tree"
          text="Add Tree"
        />
        <DebugSwitch
          checked={props.inDebugMode}
          label="Debug"
          onChange={props.toggleDebugMode}
        />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button className={Classes.MINIMAL} icon="cog" />
      </NavbarGroup>
    </Navbar>
  );
});
