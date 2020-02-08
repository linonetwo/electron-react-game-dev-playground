// @flow
import React, { useState, useCallback } from 'react';
import {
  Button,
  Classes,
  Dialog,
  Intent,
  FormGroup,
  InputGroup,
  Tooltip,
  MenuItem,
} from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
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
  const toggleLoadDialog = useCallback(() => props.toggleDialog('load'));
  // for save dialog
  const [saveName, saveNameSetter] = useState('');
  // for load dialog
  const [loadableSaveName, loadableSaveNameSetter] = useState([]);
  const [saveNameToLoad, saveNameToLoadSetter] = useState('');
  const loadAllLoadableSaveName = useCallback(async (mapName: string) => {
    const metadata = await window.save.loadMapMetadata(mapName);
    console.warn(`metadata`, JSON.stringify(metadata, null, '  '));
  });
  return (
    <>
      {/* Save */}

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

      {/* Load */}

      <Dialog
        icon="cloud-download"
        onClose={toggleLoadDialog}
        title="Load..."
        isOpen={props.loadDialogOpen}
        onOpened={() => {
          loadableSaveNameSetter(['aaa']);
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <Suggest
            items={loadableSaveName}
            inputValueRenderer={i => i}
            noResults={<MenuItem disabled text="No results." />}
            onItemSelect={name => {
              saveNameToLoadSetter(name);
              loadAllLoadableSaveName(name);
            }}
            itemRenderer={(item, { handleClick }) => {
              return (
                <MenuItem
                  label={`${item} label`}
                  key={item}
                  onClick={handleClick}
                  text={item}
                />
              );
            }}
          />
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="Don't want to load? Click me!">
              <Button onClick={toggleLoadDialog}>Close</Button>
            </Tooltip>
            <Button
              intent={Intent.PRIMARY}
              onClick={() => {
                // props.dispatchGameEvent({
                //   type: 'load-map',
                //   payload: { name: saveNameToLoad },
                // });
                // toggleLoadDialog();
                console.log('saveNameToLoad', saveNameToLoad);
              }}
            >
              Load
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
});
