// @flow
import React, { useState, useCallback } from 'react';
import { Button, Classes, Dialog, Intent, FormGroup, Tooltip, MenuItem } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
import { connect } from 'react-redux';
import formatDistance from 'date-fns/formatDistance';

import type { ISaveMetadata } from '~/typings';

const mapState = ({ dialog: { save: saveDialogOpen, load: loadDialogOpen } }) => ({
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
  const [loadableSave, loadableSaveSetter] = useState<ISaveMetadata[]>([]);
  const [saveNameToLoad, saveNameToLoadSetter] = useState('');
  const loadAllLoadableSave = useCallback(async () => {
    const metadata: ISaveMetadata[] = await window.save.loadMapMetadataList();
    loadableSaveSetter(metadata);
  });
  return (
    <>
      {/* Save */}

      <Dialog
        icon="cloud-upload"
        onClose={toggleSaveDialog}
        title="Save As..."
        isOpen={props.saveDialogOpen}
        onOpened={() => {
          loadAllLoadableSave();
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup helperText="Choose a name for your save" label="Name" labelFor="text-input" labelInfo="(required)">
            <Suggest
              items={loadableSave}
              inputValueRenderer={(item: ISaveMetadata) => item.name}
              noResults={<MenuItem disabled text="No results." />}
              onItemSelect={(item: ISaveMetadata) => {
                saveNameSetter(item.name);
              }}
              createNewItemFromQuery={query => ({
                chunk: [],
                name: query,
                playTime: new Date(0),
                saveTime: Date.now(),
              })}
              createNewItemRenderer={(query: string, active: boolean, handleClick) => {
                return <MenuItem label={`new Save ${query}`} key={query} onClick={handleClick} text={query} />;
              }}
              itemRenderer={(item: ISaveMetadata, { handleClick }) => {
                return (
                  <MenuItem
                    label={`Last played: ${formatDistance(new Date(item.saveTime), new Date())} ago (${formatDistance(
                      item.playTime,
                      0,
                    )})`}
                    key={item.name}
                    onClick={handleClick}
                    text={item.name}
                  />
                );
              }}
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
              onClick={async () => {
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
          loadAllLoadableSave();
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup helperText="Choose a save file to load" label="Name" labelFor="text-input" labelInfo="(required)">
            <Suggest
              items={loadableSave}
              inputValueRenderer={(item: ISaveMetadata) => item.name}
              noResults={<MenuItem disabled text="No results." />}
              onItemSelect={(item: ISaveMetadata) => {
                saveNameToLoadSetter(item.name);
              }}
              itemRenderer={(item: ISaveMetadata, { handleClick }) => {
                return (
                  <MenuItem
                    label={`Last played: ${formatDistance(new Date(item.saveTime), new Date())} ago (${formatDistance(
                      item.playTime,
                      0,
                    )})`}
                    key={item.name}
                    onClick={handleClick}
                    text={item.name}
                  />
                );
              }}
            />
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="Don't want to load? Click me!">
              <Button onClick={toggleLoadDialog}>Close</Button>
            </Tooltip>
            <Button
              intent={Intent.PRIMARY}
              onClick={async () => {
                const entitiesToLoad = await window.save.loadMapChunk({
                  saveName: saveNameToLoad,
                  chunkID: 0,
                });
                props.dispatchGameEvent({
                  type: 'load-map',
                  payload: { entities: entitiesToLoad },
                });
                toggleLoadDialog();
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
