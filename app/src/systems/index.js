import movement from './movement';
import acceleration from './acceleration';
import pawnMovement from './pawnMovement';
import pawnFacingTurningWhenMove from './pawnFacingTurningWhenMove';
import spawnPawn from './spawnPawn';
import listEntityUnderMouse from './listEntityUnderMouse';
import mouseMove from './mouseMove';
import addFloorTile from './addFloorTile';
import addTree from './addTree';
import addWall from './addWall';
import camera from './camera';
import saveMap from './saveMap';
import loadMap from './loadMap';
import collisionPredict from './collisionPredict';
import collisionResolve from './collisionResolve';

export const initialSystems = [
  pawnMovement,
  collisionPredict([['protagonistPawn', 'pawn'],['protagonistPawn', 'wall'], ['protagonistPawn', 'tree']]),
  collisionResolve,
  movement,
  acceleration,
  spawnPawn,
  pawnFacingTurningWhenMove,
  listEntityUnderMouse,
  mouseMove,
  addFloorTile,
  addTree,
  addWall,
  camera,
  saveMap,
  loadMap,
];
