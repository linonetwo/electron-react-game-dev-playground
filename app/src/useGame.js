// @flow
import { useState, useCallback, useRef } from 'react';
import { useEntityComponentSystem, useGameLoop, useGameEvents, useKeysDown } from 'react-entity-component-system';

/** Setup of game loop and ECS */
export default function useGame(initialSystems: Function[] = [], initialEntities: Object[] = []) {
  const [systems] = useState(initialSystems);
  const [renderedEntities, updater, rawEntitiesMap] = useEntityComponentSystem(initialEntities, systems);

  const { dispatchGameEvent, flushGameEvents } = useGameEvents();
  const keysDown = useKeysDown();

  const lastTickTimeStamp = useRef(0);
  const handleFrame = useCallback(
    (elapsedTime, gameLoop) => {
      const timeDiff = (gameLoop.current.now() - lastTickTimeStamp.current) / 1000;
      lastTickTimeStamp.current = gameLoop.current.now();
      updater({
        gameEvents: flushGameEvents(),
        dispatchGameEvent,
        keysDown: keysDown.current,
        elapsedTime,
        timeDiff,
        gameLoop,
      });
    },
    [updater, flushGameEvents, dispatchGameEvent, keysDown],
  );
  useGameLoop(handleFrame);

  return [renderedEntities, rawEntitiesMap, dispatchGameEvent];
}
