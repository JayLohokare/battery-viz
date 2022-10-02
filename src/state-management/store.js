import MAP_STYLE from "../map-style-basic-v8.json";
import WebMercatorViewport from "viewport-mercator-project";
import { observable, computed, action, makeObservable } from "mobx";

export default class DataStore {
 
  mapViewPort = {
    width: "fit",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 2,
    pitch: 0,
    bearing: 0,
  };

  initiateMap(){
    const newViewport = {
      width: "fit",
      height: "100vh",
      latitude: 41.7833,
      longitude: -88.1678,
      zoom: 17.8,
      pitch: 0,
      bearing: 0,
    };
    this.mapViewPort = newViewport;
  }

  //Change Map view port
  updateMapViewport(newViewport: any) {
    this.mapViewPort = newViewport;
    var viewport = new WebMercatorViewport(newViewport);
    var vwportState = [];
    vwportState.push(
      viewport.unproject([0, viewport.height]),
      viewport.unproject([0, 0]),
      viewport.unproject([viewport.width, 0]),
      viewport.unproject([viewport.width, viewport.height])
    );
    this.viewportCoordinates = vwportState;
  }
  constructor(value) {
    makeObservable(this, {
        mapViewPort: observable,
        initiateMap: observable,
        updateMapViewport: action,
    })
    this.value = value
    }
}
