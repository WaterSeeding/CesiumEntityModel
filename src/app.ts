import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import setLayer from "./EntityModel/setLayer";
import { setPoint, setPolyline } from "./EntityModel/utils/graphicalTools";
import { flyModel, setModel } from "./EntityModel/utils/modelTools";
import { setByDirectionAndHeight } from "./EntityModel/utils/setByDirectionAndHeight";
import { setByDirectionAndLen } from "./EntityModel/utils/setByDirectionAndLen";

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

let position = Cesium.Cartesian3.fromDegrees(114.0535, 22.557904, 300);
const entityModel = setModel(viewer, position);
const center = entityModel.position?.getValue(new Cesium.JulianDate());
let upPosCartesian3 = setByDirectionAndHeight(center!, 90, 1000);
let downPosCartesian3 = setByDirectionAndHeight(center!, -90, 300);
let cameraPosCartesian3 = setByDirectionAndHeight(center!, 90, 1000);
cameraPosCartesian3 = setByDirectionAndLen(cameraPosCartesian3, 180, 1600);
setPoint(viewer, upPosCartesian3, Cesium.Color.BLUE);
setPoint(viewer, downPosCartesian3, Cesium.Color.RED);
setPoint(viewer, cameraPosCartesian3, Cesium.Color.GREEN);
setPolyline(viewer, [downPosCartesian3, upPosCartesian3]);
setPolyline(viewer, [upPosCartesian3, cameraPosCartesian3]);
flyModel(viewer, cameraPosCartesian3);

setLayer(viewer, gui, entityModel);
