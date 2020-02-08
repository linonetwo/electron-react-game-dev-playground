// @flow
import React from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import ColliderBoxDebug from 'components/Debug/ColliderBoxDebug';
import { resources } from '~/resourcePool';

const centerAnchor = new PIXI.Point(0.5, 0.5);

export type IWall = {
  '@type': string,
  name: string,
  x: number,
  y: number,
  collider: { type: string, width: number, height: number },
  texture: string,
};
export type WallProps = {
  '@type': string,
  walls: IWall[],
};
export type WallPropsWithRenderer = WallProps & { Renderer: Function };

const mapState = ({ debug: { inDebugMode } }) => ({
  inDebugMode,
});
type PropFromRedux = { inDebugMode: boolean };
export default connect(mapState)(function Wall(
  props: WallProps & PropFromRedux,
) {
  return (
    <Container>
      {props.walls.map(wall => (
        <>
          <Sprite
            texture={resources.getTexture(wall.texture)}
            x={wall.x}
            y={wall.y}
            width={wall.collider.width}
            height={wall.collider.height}
            anchor={centerAnchor}
          />
          {props.inDebugMode && (
            <>
              <Text
                text={`${wall.name} x: ${wall.x} y: ${wall.y}`}
                style={{ fill: 'white', align: 'center' }}
                x={wall.x}
                y={wall.y}
              />
              <ColliderBoxDebug
                x={wall.x - wall.collider.width / 2}
                y={wall.y - wall.collider.height / 2}
                width={wall.collider.width}
                height={wall.collider.height}
                lineStyle={{ color: 0x66ccff }}
              />
            </>
          )}
        </>
      ))}
    </Container>
  );
});
