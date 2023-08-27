import * as Cesium from "cesium";
import { setByDirectionAndHeight } from './setByDirectionAndHeight';

export const setAdjustHeight = (
  viewer: Cesium.Viewer,
  entity: Cesium.Entity,
  height: number,
  cb: Function,
) => {
  const origin = entity.position?.getValue(new Cesium.JulianDate());
  const position = setByDirectionAndHeight(origin!, 90, height);
  entity.position = new Cesium.ConstantPositionProperty(position);
  cb(viewer, position, Cesium.Color.CORNSILK);
};
