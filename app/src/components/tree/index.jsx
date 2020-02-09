// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';
import { resources } from '~/resourcePool';
import type { IRigidBody } from '~/entities/components/rigidBody';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type ITree = {
  name: string,
  collider: { type: string, width: number, height: number },
  texture: string,
} & IRigidBody;
export type TreeProps = {
  '@type': string,
  tree: ITree[],
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
      {props.tree.map(tree => (
        <>
          <Sprite
            texture={resources.getTexture(tree.texture)}
            x={tree.position[0]}
            y={tree.position[1]}
            width={tree.collider.width}
            height={tree.collider.height}
            anchor={centerAnchor}
          />
          {props.inDebugMode && (
            <>
              <Text
                text={`${tree.name} x: ${tree.position[0]} y: ${tree.position[1]}`}
                style={{ fill: 'white', align: 'center' }}
                x={tree.position[0]}
                y={tree.position[1]}
              />
              <ColliderBoxDebug
                x={tree.position[0] - tree.collider.width / 2}
                y={tree.position[1] - tree.collider.height / 2}
                width={tree.collider.width}
                height={tree.collider.height}
                lineStyle={{ color: 0x66ccff }}
              />
            </>
          )}
        </>
      ))}
    </Container>
  );
});
