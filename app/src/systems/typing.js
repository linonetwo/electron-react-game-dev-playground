// @flow
export type IEntity = {
  '@type': string,
  [key: string]: any,
};
export type IEvent = {
  type: string,
  payload?: any,
};

export type SystemInput = {
  entities: IEntity[],
  createEntity: IEntity => void,
  destroyEntity: (id: number) => void,
  gameEvents: IEvent[],
  keysDown: string[],
  elapsedTime: number,
  timeDiff: number,
};

export type BaseEntity = {
  id: number,
};

export type DispatchGameEvent = IEvent => void;
