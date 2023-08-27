import * as Cesium from "cesium";

export const setRotate = (
  entity: Cesium.Entity,
  rotateX: number,
  rotateY: number,
  rotateZ: number,
) => {
  const origin = entity.position?.getValue(new Cesium.JulianDate());
  const heading = Cesium.Math.toRadians(rotateX);
  const pitch = Cesium.Math.toRadians(rotateY);
  const roll = Cesium.Math.toRadians(rotateZ);

  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    origin!,
    hpr,
  );
  entity.orientation = new Cesium.ConstantProperty(orientation);
};
