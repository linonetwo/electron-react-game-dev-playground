/* eslint-disable no-param-reassign */
export default function pawnMovement({ entities, keysDown }) {
  entities
    .filter(e => e['@type'] === 'protagonistPawn')
    .forEach(pawn => {
      if (keysDown.includes('ArrowLeft')) {
        pawn.x -= pawn.baseMoveSpeed;
      }
      if (keysDown.includes('ArrowRight')) {
        pawn.x += pawn.baseMoveSpeed;
      }
      if (keysDown.includes('ArrowUp')) {
        pawn.y -= pawn.baseMoveSpeed;
      }
      if (keysDown.includes('ArrowDown')) {
        pawn.y += pawn.baseMoveSpeed;
      }
    });
}
