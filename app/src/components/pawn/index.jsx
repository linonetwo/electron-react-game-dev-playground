// @flow
import React from 'react';
import { Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { install } from '@pixi/unsafe-eval';

import bodies from './Bodies';
import hair from './Hair';
import heads from './Heads';

// Apply the patch to PIXI, Adds support for environments that disallow support of new Function, such as WeChat.
install(PIXI);
// // Fronting ↑
// const headTextureN = new PIXI.Texture.from(
//   heads.female.Female_Average_Wide_south,
// );
// const hairTextureN = new PIXI.Texture.from(hair.Hubert_south);
// const bodyTextureN = new PIXI.Texture.from(bodies.Naked_Thin_south);
// // Fronting →
// const headTextureE = new PIXI.Texture.from(
//   heads.female.Female_Average_Wide_south,
// );
// const hairTextureE = new PIXI.Texture.from(hair.Hubert_south);
// const bodyTextureE = new PIXI.Texture.from(bodies.Naked_Thin_south);
const headCenterAnchor = new PIXI.Point(0.5, 0.5);
const bodyCenterAnchor = new PIXI.Point(0.5, headCenterAnchor.y - 0.2);

export const pawnFront = {
  NORTH: 'north',
  SOUTH: 'south',
  WEST: 'west',
  EAST: 'east',
};
export type PawnProps = {
  body: {| '@id': string, texture: PIXI.Texture |},
  front: $Values<pawnFront>,
  hair: {| '@id': string, texture: PIXI.Texture |},
  head: {| '@id': string, texture: PIXI.Texture |},
  x: number,
  y: number,
};
export function Pawn(props: PawnProps) {
  return (
    <>
      <Sprite
        anchor={bodyCenterAnchor}
        x={props.x}
        y={props.y}
        texture={props.body.texture}
      />
      <Sprite
        anchor={headCenterAnchor}
        x={props.x}
        y={props.y}
        texture={props.head.texture}
      />
      <Sprite
        anchor={headCenterAnchor}
        x={props.x}
        y={props.y}
        texture={props.hair.texture}
      />
    </>
  );
}

export const pawnEntity = {
  name: 'protagonistPawn',
  Renderer: (props: PawnProps) => <Pawn {...props} />,
  x: 200,
  y: 200,
  collider: { type: 'block', width: 64, height: 32 },
  front: pawnFront.SOUTH,
  head: {
    '@id': 'Female_Average_Wide_south',
    texture: new PIXI.Texture.from(heads.female.Female_Average_Wide_south),
  },
  hair: {
    '@id': 'Hubert_south',
    texture: new PIXI.Texture.from(hair.Hubert_south),
  },
  body: {
    '@id': 'Naked_Thin_south',
    texture: new PIXI.Texture.from(bodies.Naked_Thin_south),
  },
};
