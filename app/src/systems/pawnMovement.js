/* eslint-disable no-param-reassign */
export default function pawnMovement({ entities, keysDown }) {
  entities
    .filter(e => e.name === 'protagonistPawn')
    .forEach(pawn => {
      if (keysDown.includes('ArrowLeft') && pawn.x > 0) {
        pawn.x -= 8;
      }
      if (
        keysDown.includes('ArrowRight') &&
        pawn.x < 512 - pawn.collider.width
      ) {
        pawn.x += 8;
      }
      if (keysDown.includes('ArrowUp') && pawn.y > 0) {
        pawn.y -= 8;
      }
      if (
        keysDown.includes('ArrowDown') &&
        pawn.y < 512 - pawn.collider.height
      ) {
        pawn.y += 8;
      }
    });
}
