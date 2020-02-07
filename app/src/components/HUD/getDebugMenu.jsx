// @flow
import React from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

export default function getDebugMenu() {
  return (
    <Menu>
      <MenuItem icon="graph" text="Graph" />
      <MenuItem icon="map" text="Map" />
      <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
      <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
      <MenuDivider />
      <MenuItem icon="cog" text="Settings...">
        <MenuItem icon="add" text="Add new application" disabled={true} />
        <MenuItem icon="remove" text="Remove application" />
      </MenuItem>
    </Menu>
  );
}
