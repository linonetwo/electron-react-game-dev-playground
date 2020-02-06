// @flow
import React from 'react';
import { Sprite, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const headCenterAnchor = new PIXI.Point(0.5, 0.5);
const bodyCenterAnchor = new PIXI.Point(0.5, headCenterAnchor.y - 0.2);

export const pawnFacing = {
  NORTH: 'north',
  SOUTH: 'south',
  WEST: 'west',
  EAST: 'east',
};
export type PawnProps = {
  facing: $Values<pawnFacing>,
  texture: {|
    body: {|
      east: {| '@id': string, '@value': PIXI.Texture |},
      north: {| '@id': string, '@value': PIXI.Texture |},
      south: {| '@id': string, '@value': PIXI.Texture |},
    |},
    hair: {|
      east: {| '@id': string, '@value': PIXI.Texture |},
      north: {| '@id': string, '@value': PIXI.Texture |},
      south: {| '@id': string, '@value': PIXI.Texture |},
    |},
    head: {|
      east: {| '@id': string, '@value': PIXI.Texture |},
      north: {| '@id': string, '@value': PIXI.Texture |},
      south: {| '@id': string, '@value': PIXI.Texture |},
    |},
  |},
  x: number,
  y: number,
};
export function Pawn(props: PawnProps) {
  let { facing } = props;
  let flipLeftRight = false;
  if (facing === pawnFacing.WEST) {
    facing = pawnFacing.EAST;
    flipLeftRight = true;
  }
  return (
    <Container>
      <Sprite
        anchor={bodyCenterAnchor}
        x={props.x}
        y={props.y}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={props.texture.body[facing]['@value']}
      />
      <Sprite
        anchor={headCenterAnchor}
        x={props.x}
        y={props.y}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={props.texture.head[facing]['@value']}
      />
      <Sprite
        anchor={headCenterAnchor}
        x={props.x}
        y={props.y}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={props.texture.hair[facing]['@value']}
      />
    </Container>
  );
}
