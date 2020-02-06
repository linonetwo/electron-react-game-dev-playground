// @flow
import { useState, useCallback } from 'react';
import {
  useEntityComponentSystem,
  useGameLoop,
  useGameEvents,
  useKeysDown,
} from 'react-entity-component-system';

/** Setup of game loop and ECS */
export default function useGame(initialSystems: Function[], initialEntities: Object[]) {
  const [systems] = useState(initialSystems);
  const [entities, updater] = useEntityComponentSystem(
    initialEntities,
    systems,
  );

  const { dispatchGameEvent, flushGameEvents } = useGameEvents();
  const keysDown = useKeysDown();

  const handleFrame = useCallback(
    (elapsedTime, gameLoop) => {
      updater({
        gameEvents: flushGameEvents(),
        dispatchGameEvent,
        keysDown: keysDown.current,
        elapsedTime,
        gameLoop,
      });
    },
    [updater, flushGameEvents, dispatchGameEvent, keysDown],
  );
  useGameLoop(handleFrame);

  return entities
}