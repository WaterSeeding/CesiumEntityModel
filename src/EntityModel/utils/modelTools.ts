import * as Cesium from "cesium";

export const setModel = (
  viewer: Cesium.Viewer,
  position: Cesium.Cartesian3,
): Cesium.Entity => {
  const modelEntity = viewer.entities.add({
    position: position,
    model: {
      uri: './static/SM_XMH_EM_WRJ_01_GLB.glb',
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      scale: 128,
      maximumScale: 256,
    },
  });
  return modelEntity;
};

export const flyModel = (
  viewer: Cesium.Viewer,
  position: Cesium.Cartesian3,
  cb?: Function,
) => {
  viewer.camera.flyTo({
    destination: position,
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-35.0),
      roll: Cesium.Math.toRadians(0.0),
    },
    complete: () => {
      cb?.();
    },
  });
};
