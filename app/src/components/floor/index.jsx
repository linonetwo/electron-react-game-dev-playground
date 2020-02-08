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
};
export type FloorProps = {
  '@type': string,
  tiles: IFloorTile[][],
  // top left's xy for this map
  x: number,
  y: number,
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
      {props.tiles.map((tileRow, indexY) =>
        tileRow.map((tile, indexX) => (
          <Sprite
            texture={resources.getTexture(tile.texture, trimTileTexture)}
            x={props.width * indexX}
            y={props.height * indexY}
            width={props.width}
            height={props.height}
            anchor={centerAnchor}
          />
        )),
      )}
      {props.inDebugMode && (
        <>
          <Text
            text={`${props.tiles[0] &&
              props.tiles[0][0] &&
              props.tiles[0][0].name} x: ${props.x} y: ${props.y}`}
            style={{ fill: 'white', align: 'center' }}
            x={props.x}
            y={props.y}
          />
        </>
      )}
    </Container>
  );
});
