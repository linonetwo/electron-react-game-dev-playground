// @flow
import React from 'react';
import { Sprite, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { install } from '@pixi/unsafe-eval';

import bodies from './Bodies';
import hair from './Hair';
import heads from './Heads';

// Apply the patch to PIXI, Adds support for environments that disallow support of new Function, such as WeChat.
install(PIXI);
// // Facinging ↑
// const headTextureN = new PIXI.Texture.from(
//   heads.female.Female_Average_Wide_south,
// );
// const hairTextureN = new PIXI.Texture.from(hair.Hubert_south);
// const bodyTextureN = new PIXI.Texture.from(bodies.Naked_Thin_south);
// // Facinging →
// const headTextureE = new PIXI.Texture.from(
//   heads.female.Female_Average_Wide_south,
// );
// const hairTextureE = new PIXI.Texture.from(hair.Hubert_south);
// const bodyTextureE = new PIXI.Texture.from(bodies.Naked_Thin_south);
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

export const pawnEntity = {
  name: 'protagonistPawn',
  Renderer: (props: PawnProps) => <Pawn {...props} />,
  x: 200,
  y: 200,
  collider: { type: 'block', width: 64, height: 32 },
  facing: pawnFacing.SOUTH,
  texture: {
    head: {
      [pawnFacing.NORTH]: {
        '@id': 'Female_Average_Wide_south',
        '@value': new PIXI.Texture.from(heads.female.Female_Average_Wide_north),
      },
      [pawnFacing.SOUTH]: {
        '@id': 'Female_Average_Wide_south',
        '@value': new PIXI.Texture.from(heads.female.Female_Average_Wide_south),
      },
      [pawnFacing.EAST]: {
        '@id': 'Female_Average_Wide_south',
        '@value': new PIXI.Texture.from(heads.female.Female_Average_Wide_east),
      },
    },
    hair: {
      [pawnFacing.NORTH]: {
        '@id': 'Hubert_south',
        '@value': new PIXI.Texture.from(hair.Hubert_north),
      },
      [pawnFacing.SOUTH]: {
        '@id': 'Hubert_south',
        '@value': new PIXI.Texture.from(hair.Hubert_south),
      },
      [pawnFacing.EAST]: {
        '@id': 'Hubert_south',
        '@value': new PIXI.Texture.from(hair.Hubert_east),
      },
    },
    body: {
      [pawnFacing.NORTH]: {
        '@id': 'Naked_Thin_south',
        '@value': new PIXI.Texture.from(bodies.Naked_Thin_north),
      },
      [pawnFacing.SOUTH]: {
        '@id': 'Naked_Thin_south',
        '@value': new PIXI.Texture.from(bodies.Naked_Thin_south),
      },
      [pawnFacing.EAST]: {
        '@id': 'Naked_Thin_south',
        '@value': new PIXI.Texture.from(bodies.Naked_Thin_east),
      },
    },
  },
};
