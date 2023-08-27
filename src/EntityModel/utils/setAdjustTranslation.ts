import * as Cesium from "cesium";
import { setByDirectionAndLen } from './setByDirectionAndLen';

export const setAdjustTranslation = (
  viewer: Cesium.Viewer,
  entity: Cesium.Entity,
  length: number,
  cb: Function,
) => {
  const origin = entity.position?.getValue(new Cesium.JulianDate());
  const position = setByDirectionAndLen(origin!, 0, length);
  entity.position = new Cesium.ConstantPositionProperty(position);
  cb(viewer, position, Cesium.Color.CORNSILK);
};
