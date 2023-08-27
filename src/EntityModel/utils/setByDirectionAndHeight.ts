import * as Cesium from "cesium";

export const setByDirectionAndHeight = (
  position: Cesium.Cartesian3,
  angle: number,
  height: number,
) => {
  // 从具有东北向上轴的参考帧计算4x4变换矩阵以提供的原点为中心，以提供的椭球的固定参考系为中心。
  let matrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  // 创建围绕z轴的旋转矩阵
  let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(angle || 0));
  // 从Matrix3计算代表旋转的Matrix4实例和代表翻译的Cartesian3
  let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
  // 计算两个矩阵(matrix * rotationX)的乘积
  Cesium.Matrix4.multiply(matrix, rotationX, matrix);
  let result = Cesium.Matrix4.multiplyByPoint(
    matrix,
    new Cesium.Cartesian3(0, height, 0),
    new Cesium.Cartesian3(),
  );
  return result;
};
