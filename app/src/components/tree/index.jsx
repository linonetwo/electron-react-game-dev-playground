// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import { resources } from '~/resourcePool';
import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type ITree = {
  name: string,
  x: number,
  y: number,
  collider: { type: string, width: number, height: number },
  texture: string,
};
export type TreeProps = {
  '@type': string,
  trees: ITree[],
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
      {props.trees.map(tree => (
        <>
          <Sprite
            texture={resources.getTexture(tree.texture)}
            x={tree.x}
            y={tree.y}
            width={tree.collider.width}
            height={tree.collider.height}
            anchor={centerAnchor}
          />
          {props.inDebugMode && (
            <>
              <Text
                text={`${tree.name} x: ${tree.x} y: ${tree.y}`}
                style={{ fill: 'white', align: 'center' }}
                x={tree.x}
                y={tree.y}
              />
              <ColliderBoxDebug
                x={tree.x - tree.collider.width / 2}
                y={tree.y - tree.collider.height / 2}
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
