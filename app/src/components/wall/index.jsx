// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';
import { resources } from '~/resourcePool';
import type { IRigidBody } from '~/entities/components/rigidBody';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type IWall = {};
export type WallProps = {
  '@type': string,
  name: string,
  collider: { type: string, width: number, height: number },
  textureName: string,
} & IRigidBody;
export type WallPropsWithRenderer = WallProps & { Renderer: Function };

function getWallTexturePart(type: string) {
  const paramByType = {
    'wall-standalone': [0, 192, 64, 64],
  };
  return texture => new PIXI.Texture(texture, new PIXI.Rectangle(...paramByType[type]));
}

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});
type PropFromRedux = { inDebugMode: boolean };
export default connect(mapState)(function Wall(props: WallProps & PropFromRedux) {
  return (
    <Container>
      <Sprite
        texture={resources.getTexture(
          `${props.textureName}_${props['@type']}`,
          getWallTexturePart(props['@type']),
          props.textureName,
        )}
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
