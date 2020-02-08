// @flow
import React, { useState, useCallback } from 'react';
import {
  AnchorButton,
  Button,
  Classes,
  Dialog,
  Intent,
  FormGroup,
  InputGroup,
  Tooltip,
} from '@blueprintjs/core';
import { connect } from 'react-redux';

const mapState = ({
  dialog: { save: saveDialogOpen, load: loadDialogOpen },
}) => ({
  saveDialogOpen,
  loadDialogOpen,
});
const mapDispatch = ({ dialog: { toggleDialog } }) => ({
  toggleDialog,
});

export default connect(
  mapState,
  mapDispatch,
)(function SaveLoadDialog(props: {
  saveDialogOpen: boolean,
  loadDialogOpen: boolean,
  toggleDialog: (dialogName: string) => void,
  dispatchGameEvent: (event: any) => void,
}) {
  const toggleSaveDialog = useCallback(() => props.toggleDialog('save'));
  const [saveName, saveNameSetter] = useState('');
  return (
    <>
      <Dialog
        icon="cloud-upload"
        onClose={toggleSaveDialog}
        title="Save As..."
        isOpen={props.saveDialogOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            helperText="Choose a name for your save"
            label="Name"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder="save name"
              onChange={event => saveNameSetter(event.target.value)}
            />
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="Don't want to save? Click me!">
              <Button onClick={toggleSaveDialog}>Close</Button>
            </Tooltip>
            <Button
              intent={Intent.PRIMARY}
              onClick={() => {
                props.dispatchGameEvent({
                  type: 'save-map',
                  payload: { name: saveName },
                });
                toggleSaveDialog();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
});
