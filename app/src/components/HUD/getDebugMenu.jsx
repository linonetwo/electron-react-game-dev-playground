// @flow
import React from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

import type { DispatchGameEvent } from 'systems/typing';

export default function getDebugMenu(dispatchGameEvent: DispatchGameEvent, toggleDialog: (dialogName: string) => void) {
  return (
    <Menu>
      <MenuItem onClick={() => dispatchGameEvent({ type: 'spawn-pawn' })} icon="people" text="Spawn Pawn" />
      <MenuItem onClick={() => dispatchGameEvent({ type: 'add-floor' })} icon="insert" text="Add Floor" />
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
      <MenuItem icon="floppy-disk" text="Saving...">
        <MenuItem icon="cloud-upload" text="Save As..." onClick={() => toggleDialog('save')} />
        <MenuItem icon="cloud-download" text="Load..." onClick={() => toggleDialog('load')} />
      </MenuItem>
    </Menu>
  );
}
