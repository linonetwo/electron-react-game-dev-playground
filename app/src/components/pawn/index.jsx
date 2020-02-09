// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';
import { resources } from '~/resourcePool';
import type { IMoveableRigidBody } from '~/entities/components/moveableRigidBody';

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
  baseMoveSpeed: number,
} & IMoveableRigidBody;

function flipTexture(texture: PIXI.Texture) {
  return new PIXI.Texture(texture, texture.frame, null, null, 12);
}

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
  const headHeight = 40;
  return (
    <Container>
      <Sprite
        width={props.collider.width}
        height={props.collider.height}
        anchor={centerAnchor}
        x={props.position[0]}
        y={props.position[1]}
        texture={
          flipLeftRight
            ? resources.getTexture(
                `${props.texture.body[facing]}_flip`,
                flipTexture,
                props.texture.body[facing],
              )
            : resources.getTexture(props.texture.body[facing])
        }
      />
      <Sprite
        width={props.collider.width}
        height={props.collider.height}
        anchor={centerAnchor}
        x={props.position[0]}
        y={props.position[1] - headHeight}
        texture={
          flipLeftRight
            ? resources.getTexture(
                `${props.texture.head[facing]}_flip`,
                flipTexture,
                props.texture.head[facing],
              )
            : resources.getTexture(props.texture.head[facing])
        }
      />
      <Sprite
        width={props.collider.width}
        height={props.collider.height}
        anchor={centerAnchor}
        x={props.position[0]}
        y={props.position[1] - headHeight}
        texture={
          flipLeftRight
            ? resources.getTexture(
                `${props.texture.hair[facing]}_flip`,
                flipTexture,
                props.texture.hair[facing],
              )
            : resources.getTexture(props.texture.hair[facing])
        }
      />
      {props.inDebugMode && (
        <>
          <Text
            text={`x: ${props.position[0]} y: ${props.position[1]}`}
            style={{ fill: 'white', align: 'center' }}
            x={props.position[0] - props.collider.width / 2}
            y={props.position[1] - props.collider.height / 2}
          />
          <ColliderBoxDebug
            x={props.position[0] - props.collider.width / 2}
            y={props.position[1] - props.collider.height / 2}
            width={props.collider.width}
            height={props.collider.height}
            lineStyle={{ color: 0x66ccff }}
          />
        </>
      )}
    </Container>
  );
});
