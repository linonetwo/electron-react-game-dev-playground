// @flow
import React, { useCallback } from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import { resources } from '~/resourcePool';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type IFloorTile = {
  name: string,
  texture: string,
  x: number,
  y: number,
};
export type FloorProps = {
  '@type': string,
  tiles: IFloorTile[],
  // width and height of each tile
  width: number,
  height: number,
};
export type FloorPropsWithRenderer = FloorProps & { Renderer: Function };

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});
type PropFromRedux = { inDebugMode: boolean };
export default connect(mapState)(function Floor(
  props: FloorProps & PropFromRedux,
) {
  const trimTileTexture = useCallback(
    texture => {
      return new PIXI.Texture(
        texture,
        new PIXI.Rectangle(0, 0, props.width, props.height),
      );
    },
    [props.width, props.height],
  );
  return (
    <Container>
      {props.tiles.map(tile => (
        <>
          <Sprite
            texture={resources.getTexture(tile.texture, trimTileTexture)}
            x={tile.x}
            y={tile.y}
            width={props.width}
            height={props.height}
            anchor={centerAnchor}
          />
          {props.inDebugMode && (
            <Text
              text={`${tile.name} x: ${tile.x} y: ${tile.y}`}
              style={{ fill: 'white', align: 'center' }}
              x={tile.x}
              y={tile.y}
            />
          )}
        </>
      ))}
    </Container>
  );
});
