import { pawnEntity } from '../components/pawn';

export default function spawnPawn({ createEntity, gameEvents }) {
  gameEvents.forEach(event => {
    if (event.type === 'spawn-pawn') {
      createEntity(pawnEntity);
    }
  });
}
