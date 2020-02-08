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
  gameEvents: IEvent[],
  keysDown: string[],
};

export type DispatchGameEvent = IEvent => void;