import MAP_STYLE from "../map-style-basic-v8.json";
import WebMercatorViewport from "viewport-mercator-project";
import { observable, computed, action, makeObservable , runInAction, keys} from "mobx";

import { apiService } from "../api.js";
import { Index } from "pondjs";

export default class DataStore {
 
counties = [];
countyData = {};
countyDataLoading = {};

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

async updateCounties(){
    const dynamicAssets = await apiService.getCounties(true);
    runInAction(() => {
        this.counties = dynamicAssets;
    })
}

async updateCountyData(county) {
    const data = await apiService.getCountyData(county, true);

    runInAction(() => {
        this.countyData[county] = data;
    })
}

getCountyDataLoading(county){
    return this.countyDataLoading[county]
}

setCountyDataLoading(county, value){
    return this.countyDataLoading[county] = value
}

getCounties(){
    return this.counties;
}

getCountyData(county=null){
    if (county == null) {
        return this.countyData
    } 
    return this.countyData[county];
}

constructor(value) {
makeObservable(this, {
    mapViewPort: observable,
    counties: observable,
    countyData: observable,
    initiateMap: action,
    getCounties: action,
    getCountyData: action,
    updateCounties: action,
    updateCountyData: action,
    getCountyDataLoading: action,
    setCountyDataLoading: action,
})
this.value = value
}

}
