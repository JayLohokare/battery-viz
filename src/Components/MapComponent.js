import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Map, Marker, Popup} from "react-map-gl";
import MAP_STYLE from "../map-style-basic-v8.json";
import pinImg from "./marker.png";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import Loader from "react-js-loader";
import Chart from "react-apexcharts";
import Popupcontent from "./PopupContent.js"

const markerStyle = {
  height: '10px',
  width: '10px',
}


const popupStyle = {
  height: '35%',
  width: '50%',
}

const chartStyle = {
  height: '100%',
  width: '100%',
}

const chartContainerStyle = {
  position: 'relative',
  overflow: 'scroll',
}

export class MapComponent extends Component {

  componentDidMount() {
    try {
      this.props.store.updateCounties();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(){
    console.log(this.state.popupOpen)
    
  }
  

  closePopup(county) {
    this.setPopupOpen(county['name'], false);
  }

  
  constructor(props) {
    super(props);
    this.state = {
     popupOpen : {},
     timeseriesData: {},
    };
  }

  setPopupOpen(countyName, value){
    var popupOpenDct = this.state.popupOpen
    popupOpenDct[countyName] = value
    this.setState({popupOpen:popupOpenDct })
  }

  handleMarkerClick(countyName){
    this.setPopupOpen(countyName, true);
  }

  _renderPopUpContent(county){
    return(
      <div className={"item"}>
          <Popupcontent county={county["name"]}/>
      </div>
    );
  }

  _renderMarker(county){

      return(
        <div key={county['name']}>
        {this.props.loading === true ? 
            <Loader type="spinner-default" bgColor={"#0096FF"} color={'#0096FF'} size={100} />
            :
            <div >
              <Marker 
              key={county['name'] + "-marker"}
              latitude={parseFloat(county['X'])}
              longitude={parseFloat(county['Y'])}
              onClick={() => this.handleMarkerClick(county['name'])}
              >
                <img
                  src={pinImg}
                  style={markerStyle}
                />
              </Marker>
              {this.state.popupOpen[county['name']] === true ? (
                <Popup
                  key={county['name']}
                  latitude={parseFloat(county['X'])}
                  longitude={parseFloat(county['Y'])}
                  onClose={() => 
                    {
                      this.setPopupOpen(county['name'], false);
                    }
                  }
                  closeButton={true}
                  style={popupStyle}
                >
                  <div>{this._renderPopUpContent(county)}</div>
                </Popup>
                )
                :
                <div/>
              }
            </div>  
			}
      </div>
      );
  }

  render() {
    return (
        
      <Map
        controller={true}
        mapboxAccessToken={"pk.eyJ1IjoiamF5bG9ob2thcmUiLCJhIjoiY2w4cnd4Mjh6Mmk5cjNubDVpcHU1Ymo4aCJ9.Lk-GWkR6XQGURxoXWKEp8A"}
        initialViewState={{
          longitude: -96.97176602,
          latitude:  28.79640594,
          zoom: 5
        }}
        mapStyle= {MAP_STYLE}
      >
      <div>
        {
          this.props.store.counties.map((county) => this._renderMarker(county))
        }
      </div>
    
      </Map>

    );
  };
}
export default inject("store")(observer(MapComponent));


