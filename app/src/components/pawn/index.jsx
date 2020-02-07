// @flow
import React from 'react';
import { Sprite, Container, CustomPIXIComponent, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type PawnTextureFacing = 'north' | 'south' | 'east' | 'west';
export type PawnFacing = PawnTextureFacing | 'west';
export type PawnProps = {
  '@type': string,
  name: string,
  facing: PawnFacing,
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
  collider: { type: string, width: number, height: number },
  x: number,
  y: number,
};
export type PawnPropsWithRenderer = PawnProps & { Renderer: Function };

const TYPE = 'Rect';
const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps(instance, oldProps, newProps) {
    const { lineStyle, x, y, width, height, ...newPropsRest } = newProps;
    const {
      lineStyle: oldLineStyle,
      x: oldX,
      y: oldY,
      width: oldWidth,
      height: oldHeight,
      ...oldPropsRest
    } = oldProps || {};
    if (typeof oldProps !== 'undefined') {
      instance.clear();
    }
    instance.lineStyle(1, lineStyle.color, 0.6);
    instance.drawRect(x, y, width, height);

    this.applyDisplayObjectProps(oldPropsRest, newPropsRest);
  },
};

const ColliderBox = CustomPIXIComponent(behavior, TYPE);

export function Pawn(props: PawnProps) {
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
      <ColliderBox
        x={props.x - props.collider.width / 2}
        y={props.y - props.collider.height / 2}
        width={props.collider.width}
        height={props.collider.height}
        lineStyle={{ color: 0x66ccff }}
      />
      <Sprite
        anchor={centerAnchor}
        x={props.x}
        y={props.y}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={props.texture.body[facing]['@value']}
      />
      <Sprite
        anchor={centerAnchor}
        x={props.x}
        y={props.y - headHeight}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={props.texture.head[facing]['@value']}
      />
      <Sprite
        anchor={centerAnchor}
        x={props.x}
        y={props.y - headHeight}
        scale={{ x: flipLeftRight ? -1 : 1, y: 1 }}
        texture={props.texture.hair[facing]['@value']}
      />
      <Text
        text={`x: ${props.x} y: ${props.y}`}
        style={{ fill: 'white', align: 'center' }}
        x={props.x - props.collider.width / 2}
        y={props.y - props.collider.height / 2}
      />
    </Container>
  );
}
