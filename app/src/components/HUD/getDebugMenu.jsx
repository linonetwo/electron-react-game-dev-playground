// @flow
import React from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

export default function getDebugMenu(dispatchGameEvent) {
  return (
    <Menu>
      <MenuItem
        onClick={() => dispatchGameEvent({ type: 'spawn-pawn' })}
        icon="people"
        text="Spawn Pawn"
      />
      <MenuItem
        onClick={() => dispatchGameEvent({ type: 'add-floor' })}
        icon="insert"
        text="Add Floor"
      />
      <MenuItem
        onClick={() => dispatchGameEvent({ type: 'add-tree' })}
        icon="tree"
        text="Add Tree"
        shouldDismissPopover={false}
      />
      <MenuItem
        onClick={() => dispatchGameEvent({ type: 'add-wall' })}
        icon="full-stacked-chart"
        text="Add Wall"
        shouldDismissPopover={false}
      />
      <MenuDivider />
      <MenuItem icon="cog" text="Settings...">
        <MenuItem icon="add" text="Add new application" disabled />
        <MenuItem icon="remove" text="Remove application" />
      </MenuItem>
    </Menu>
  );
}
