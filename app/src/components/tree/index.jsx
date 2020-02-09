// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';
import { resources } from '~/resourcePool';
import type { IRigidBody } from '~/entities/components/rigidBody';
import type { IAffectable } from '~/entities/components/affectable';
import type { IBreakable } from '~/entities/components/breakable';
import type { BaseEntity } from '~/systems/typing';
import affectable from '~/entities/components/affectable';
import breakable from '~/entities/components/breakable';

const centerAnchor = new PIXI.Point(0.5, 0.5);
export type TreeProps = {
  '@type': string,
  name: string,
  collider: { type: string, width: number, height: number },
  textureName: string,
} & IRigidBody &
  IAffectable &
  IBreakable &
  BaseEntity;
export type TreePropsWithRenderer = TreeProps & { Renderer: Function };

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});
type PropFromRedux = { inDebugMode: boolean };
const Tree = connect(mapState)((props: TreeProps & PropFromRedux) => {
  return (
    <Container>
      <Sprite
        texture={resources.getTexture(props.textureName)}
        x={props.position[0]}
        y={props.position[1]}
        width={props.collider.width}
        height={props.collider.height}
        anchor={centerAnchor}
      />
      {props.inDebugMode && (
        <>
          <Text
            text={`${props.name} x: ${props.position[0]} y: ${props.position[1]}`}
            style={{ fill: 'white', align: 'center' }}
            x={props.position[0]}
            y={props.position[1]}
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
export default Tree;

export const getTree = (name: string = '', position: number[] = [0, 0]): TreePropsWithRenderer => ({
  '@type': 'tree',
  Renderer: (props: TreeProps) => <Tree {...props} />,
  renderable: true,
  name: `${name} ${String(Math.random()).substring(2, 6)}`,
  textureName: name,
  collider: { type: 'block', width: 100, height: 100 },
  position,
  ...affectable,
  ...breakable,
});
