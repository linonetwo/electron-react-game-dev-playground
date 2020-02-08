// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type ITreeTile = {
  name: string,
  x: number,
  y: number,
  collider: { type: string, width: number, height: number },
  texture: {|
    '@id': string,
    '@value': PIXI.Texture,
  |},
};
export type TreeProps = {
  '@type': string,
  trees: ITreeTile[],
};
export type TreePropsWithRenderer = TreeProps & { Renderer: Function };

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});
type PropFromRedux = { inDebugMode: boolean };
export default connect(mapState)(function Tree(
  props: TreeProps & PropFromRedux,
) {
  return (
    <Container>
      {props.tiles.map((tileRow, indexY) =>
        tileRow.map((tile, indexX) => (
          <Sprite
            texture={tile.texture}
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
