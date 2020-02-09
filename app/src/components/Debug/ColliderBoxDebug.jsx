// @flow
import React from 'react';
import { Sprite, Container, CustomPIXIComponent, Text } from 'react-pixi-fiber';

import * as PIXI from 'pixi.js';

const TYPE = 'Rect';
const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps(instance, oldProps, newProps) {
    const { lineStyle, x, y, width, height, ...newPropsRest } = newProps;
    const { lineStyle: oldLineStyle, x: oldX, y: oldY, width: oldWidth, height: oldHeight, ...oldPropsRest } =
      oldProps || {};
    if (typeof oldProps !== 'undefined') {
      instance.clear();
    }
    instance.lineStyle(1, lineStyle.color, 0.6);
    instance.drawRect(x, y, width, height);

    this.applyDisplayObjectProps(oldPropsRest, newPropsRest);
  },
};

const ColliderBoxDebug = CustomPIXIComponent(behavior, TYPE);
export default ColliderBoxDebug;
