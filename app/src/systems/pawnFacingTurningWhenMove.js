import { pawnFacing } from '../components/pawn';

export default function pawnFacingTurningWhenMove({ entities, keysDown }) {
  const pawn = entities.find(e => e.name === 'protagonistPawn');
  if (keysDown.includes('ArrowLeft') && pawn.x > 0) {
    pawn.facing = pawnFacing.WEST;
  }
  if (keysDown.includes('ArrowRight') && pawn.x < 512 - pawn.collider.width) {
    pawn.facing = pawnFacing.EAST;
  }
  if (keysDown.includes('ArrowUp') && pawn.y > 0) {
    pawn.facing = pawnFacing.NORTH;
  }
  if (keysDown.includes('ArrowDown') && pawn.y < 512 - pawn.collider.height) {
    pawn.facing = pawnFacing.SOUTH;
  }
}
