import movement from './movement';
import pawnMovement from './pawnMovement';
import pawnFacingTurningWhenMove from './pawnFacingTurningWhenMove';
import spawnPawn from './spawnPawn';
import listEntityUnderMouse from './listEntityUnderMouse';
import mouseMove from './mouseMove';
import addFloorTile from './addFloorTile';
import addTree from './addTree';
import camera from './camera';

export const initialSystems = [
  movement,
  pawnMovement,
  spawnPawn,
  pawnFacingTurningWhenMove,
  listEntityUnderMouse,
  mouseMove,
  addFloorTile,
  addTree,
  camera,
];
