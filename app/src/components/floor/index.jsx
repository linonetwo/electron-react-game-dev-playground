// @flow
import React, { useCallback } from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';
import type { IRigidBody } from '~/entities/components/rigidBody';

import { resources } from '~/resourcePool';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type FloorProps = {
  '@type': string,
  name: string,
  textureName: string,
  width: number,
  height: number,
} & IRigidBody;
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
      <Sprite
        texture={resources.getTexture(props.textureName, trimTileTexture)}
        x={props.position[0]}
        y={props.position[1]}
        width={props.width}
        height={props.height}
        anchor={centerAnchor}
      />
      {props.inDebugMode && (
        <Text
          text={`${props.name} x: ${props.position[0]} y: ${props.position[1]}`}
          style={{ fill: 'white', align: 'center' }}
          x={props.position[0]}
          y={props.position[1]}
        />
      )}
    </Container>
  );
});
