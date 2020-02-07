// @flow
/* eslint-disable no-param-reassign */
import type { PawnProps } from '../components/pawn';

export default function pawnFacingTurningWhenMove({ entities, keysDown }) {
  entities
    .filter(e => e['@type'] === 'protagonistPawn')
    .forEach((pawn: PawnProps) => {
      if (keysDown.includes('ArrowLeft')) {
        pawn.facing = 'west';
      }
      if (keysDown.includes('ArrowRight')) {
        pawn.facing = 'east';
      }
      if (keysDown.includes('ArrowUp')) {
        pawn.facing = 'north';
      }
      if (keysDown.includes('ArrowDown')) {
        pawn.facing = 'south';
      }
    });
}
