// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import { resources } from '~/resourcePool';

import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type PawnTextureFacing = 'north' | 'south' | 'east' | 'west';
export type PawnFacing = PawnTextureFacing | 'west';
export type PawnProps = {
  '@type': string,
  name: string,
  facing: PawnFacing,
  texture: {|
    body: {|
      east: string,
      north: string,
      south: string,
    |},
    hair: {|
      east: string,
      north: string,
      south: string,
    |},
    head: {|
      east: string,
      north: string,
      south: string,
    |},
  |},
  collider: { type: string, width: number, height: number },
  x: number,
  y: number,
  baseMoveSpeed: number,
};
export type PawnPropsWithRenderer = PawnProps & { Renderer: Function };

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});
type PropFromRedux = { inDebugMode: boolean };
export default connect(mapState)(function Pawn(
  props: PawnProps & PropFromRedux,
) {
  let { facing } = props;
  let flipLeftRight = false;
  if (facing === 'west') {
    facing = 'east';
    (facing: PawnTextureFacing);
    flipLeftRight = true;
  }
  const headHeight = 50;
  return (
    <Container>
      <Sprite
        anchor={centerAnchor}
        x={props.x}
        y={props.y}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={resources.getTexture(props.texture.body[facing])}
      />
      <Sprite
        anchor={centerAnchor}
        x={props.x}
        y={props.y - headHeight}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={resources.getTexture(props.texture.head[facing])}
      />
      <Sprite
        anchor={centerAnchor}
        x={props.x}
        y={props.y - headHeight}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={resources.getTexture(props.texture.hair[facing])}
      />
      {props.inDebugMode && (
        <>
          <Text
            text={`x: ${props.x} y: ${props.y}`}
            style={{ fill: 'white', align: 'center' }}
            x={props.x - props.collider.width / 2}
            y={props.y - props.collider.height / 2}
          />
          <ColliderBoxDebug
            x={props.x - props.collider.width / 2}
            y={props.y - props.collider.height / 2}
            width={props.collider.width}
            height={props.collider.height}
            lineStyle={{ color: 0x66ccff }}
          />
        </>
      )}
    </Container>
  );
});
