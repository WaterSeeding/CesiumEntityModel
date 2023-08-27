import * as Cesium from "cesium";

export const setPoint = (
  viewer: Cesium.Viewer,
  position: Cesium.Cartesian3,
  color: Cesium.Color,
) => {
  viewer.entities.add({
    position: position,
    point: {
      color: color,
      pixelSize: 20,
    },
  });
};

export const setPolyline = (
  viewer: Cesium.Viewer,
  positions: Cesium.Cartesian3[],
) => {
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
          positions: positions,
          width: 2.0,
          vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
          colors: [Cesium.Color.YELLOW, Cesium.Color.YELLOW],
          colorsPerVertex: true,
        }),
      }),
      appearance: new Cesium.PolylineColorAppearance(),
    }),
  );
};
