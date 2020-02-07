// @flow
/* eslint-disable no-param-reassign */
import type { PawnProps } from '../components/pawn';

export default function pawnFacingTurningWhenMove({ entities, keysDown }) {
  entities
    .filter(e => e['@type'] === 'protagonistPawn')
    .forEach((pawn: PawnProps) => {
      if (keysDown.includes('ArrowLeft') && pawn.x > 0) {
        pawn.facing = 'west';
      }
      if (
        keysDown.includes('ArrowRight') &&
        pawn.x < 512 - pawn.collider.width
      ) {
        pawn.facing = 'east';
      }
      if (keysDown.includes('ArrowUp') && pawn.y > 0) {
        pawn.facing = 'north';
      }
      if (
        keysDown.includes('ArrowDown') &&
        pawn.y < 512 - pawn.collider.height
      ) {
        pawn.facing = 'south';
      }
    });
}
