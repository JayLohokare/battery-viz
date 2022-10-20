import MAP_STYLE from "../map-style-basic-v8.json";
import WebMercatorViewport from "viewport-mercator-project";
import { observable, computed, action, makeObservable , runInAction, keys} from "mobx";

import { apiService } from "../api.js";
import { Index } from "pondjs";

export default class DataStore {
 
counties = [];
countyData = {};
countyDataLoading = {};
isDataReady = {};
loading = true;
popupOpen = {};

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

setPopup(county, state){
    this.popupOpen[county] = state;
}

getPopup(county){
    if (county in this.popupOpen) {
        return this.popupOpen[county];
    } 
    return false;
}

async updateCounties(){
    runInAction(() => {
        this.loading = true;
    })

    let countyList = await apiService.getCounties(true);

    countyList.map((county) => 
    {
        if (county["name"] in this.countyData === false){
            runInAction(() => {
                this.countyData[county["name"]] = [];
            })
        }
        
        if (county["name"] in this.isDataReady === false){
            runInAction(() => {
                this.isDataReady[county["name"]] = false;
            })
        }
    })

    runInAction(() => {
        this.counties = countyList;
        this.loading = false;
    })
}

async updateCountyData(county, data) {
    if (data == null) {
        var newData = await apiService.getCountyData(county, true);
        data = newData
    }
   
    runInAction(() => {
        var isDataReady = this.isDataReady;
        isDataReady[county] = true
        this.isDataReady = isDataReady;

        var countyDataNew = this.countyData
        countyDataNew[county] = data;
        this.countyData = countyDataNew;
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
    loading: observable,
    isDataReady: observable,
    countyData: observable,
    initiateMap: action,
    getCounties: action,
    getCountyData: action,
    updateCounties: action,
    updateCountyData: action,
    getCountyDataLoading: action,
    setCountyDataLoading: action,
    setPopup: action,
    getPopup: action,
})
this.value = value
}

}
