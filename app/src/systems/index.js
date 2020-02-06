import movement from './movement';
import pawnMovement from './pawnMovement';
import pawnFacingTurningWhenMove from './pawnFacingTurningWhenMove';
import spawnPawn from './spawnPawn';

export const initialSystems = [
  movement,
  pawnMovement,
  spawnPawn,
  pawnFacingTurningWhenMove,
];
