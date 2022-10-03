import MAP_STYLE from "../map-style-basic-v8.json";
import WebMercatorViewport from "viewport-mercator-project";
import { observable, computed, action, makeObservable } from "mobx";

import { apiService } from "../api.js";
export default class DataStore {
 
countyData = [];

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
    latitude: 31.689029,
    longitude: -98.958322,
    zoom: 5
        };
    this.mapViewPort = newViewport;
}

async updateCountyData(){
    const dynamicAssets = await apiService.getCountyData();
    this.countyData = dynamicAssets;
}

getCountyData(){
    return this.countyData;
}

constructor(value) {
makeObservable(this, {
    mapViewPort: observable,
    initiateMap: observable,
    countyData: observable,
    initiateMap: action,
    getCountyData: action,
    updateCountyData: action,
})
this.value = value
}

}
