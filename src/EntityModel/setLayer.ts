import * as Cesium from 'cesium';
import { setPoint } from './utils/graphicalTools';
import { setGuiSlide } from './utils/gui/setGuiSlide';
import { setAdjustHeight } from './utils/setAdjustHeight';
import { setAdjustTranslation } from './utils/setAdjustTranslation';
import { setRotate } from './utils/setRotate';

const setLayer = (
  viewer: Cesium.Viewer,
  gui: dat.GUI,
  entity: Cesium.Entity,
) => {
  let folder = gui.addFolder('EntityModel');
  folder.open();

  let folderParams = {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scale: 128,
    opacity: 1,
    setAdjustHeight: () => {
      setAdjustHeight(
        viewer,
        entity,
        300,
        (
          viewer: Cesium.Viewer,
          position: Cesium.Cartesian3,
          color: Cesium.Color,
        ) => {
          setPoint(viewer, position, color);
        },
      );
    },
    setAdjustTranslation: () => {
      setAdjustTranslation(
        viewer,
        entity,
        300,
        (
          viewer: Cesium.Viewer,
          position: Cesium.Cartesian3,
          color: Cesium.Color,
        ) => {
          setPoint(viewer, position, color);
        },
      );
    },
  };

  setGuiSlide(
    folder,
    folderParams,
    'scale',
    '缩放',
    {
      min: 1,
      max: 256,
      step: 1,
    },
    (v) => {
      entity.model!.scale = new Cesium.ConstantProperty(v);
    },
  );

  setGuiSlide(
    folder,
    folderParams,
    'opacity',
    '透明度',
    {
      min: 0,
      max: 1,
      step: 0.01,
    },
    (v) => {
      let color = Cesium.Color.WHITE.withAlpha(v);
      entity.model!.color = new Cesium.ConstantProperty(color);
    },
  );

  setGuiSlide(
    folder,
    folderParams,
    'rotationX',
    'X轴旋转',
    {
      min: 0,
      max: 360,
      step: 1,
    },
    (v) => {
      setRotate(entity, v, folderParams.rotationY, folderParams.rotationZ);
    },
  );

  setGuiSlide(
    folder,
    folderParams,
    'rotationY',
    'Y轴旋转',
    {
      min: 0,
      max: 360,
      step: 1,
    },
    (v) => {
      setRotate(entity, folderParams.rotationX, v, folderParams.rotationZ);
    },
  );

  setGuiSlide(
    folder,
    folderParams,
    'rotationZ',
    'Z轴旋转',
    {
      min: 0,
      max: 360,
      step: 1,
    },
    (v) => {
      setRotate(entity, folderParams.rotationX, folderParams.rotationY, v);
    },
  );

  folder.add(folderParams, 'setAdjustHeight').name('升高模型');
  folder.add(folderParams, 'setAdjustTranslation').name('平移模型');
};

export default setLayer;
