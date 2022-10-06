import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Map, Marker, Popup} from "react-map-gl";
import MAP_STYLE from "../map-style-basic-v8.json";
import pinImg from "./marker.png";
import 'mapbox-gl/dist/mapbox-gl.css'; 

const markerStyle = {
  height: '10px',
  width: '10px',
}


export class MapComponent extends Component {

  componentDidUpdate() {
  }

  async componentDidMount() {
    try {
      this.props.store.updateCountyData();
    } catch (error) {
      console.log(error);
    }
  }

  setSelectedMarker(markerId){
    
  }

  closePopup = () => {
    this.setSelectedMarker(null)
  };

  
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

  _renderMarker(county){
      console.log(county);
      console.log(county['X'], county['Y']);


      return(
        <div>
          <Marker 
          key={county['name']}
          latitude={parseFloat(county['X'])}
          longitude={parseFloat(county['Y'])}
          onClick={() => this.setPopupOpen(county['name'], true)}
          >
            <img
              src={pinImg}
              style={markerStyle}
            />
          </Marker>

          {this.state.popupOpen[county['name']] && (
            <Popup
              key={county['name']}
              latitude={parseFloat(county['X'])}
              longitude={parseFloat(county['Y'])}
              onClose={() => this.setPopupOpen(county['name'], false)}
              closeButton={true}
              offsetLeft={10}
            >
              <span style={{fontSize: "1vw", fontFamily: "Poppins"}}>
                {county['name']}
              </span>

            </Popup>
            )}

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

        {/* <Marker 
          longitude={-100} latitude={40}
          />

      <Popup longitude={-100} latitude={40}
        anchor="bottom"
        // onClose={() => setShowPopup(false)
        >
        Render Tiemseries graph here
      </Popup> */}

      <div>
         {
          this.props.store.countyData.map((county) => this._renderMarker(county))
        }
      </div>
      

      </Map>

    );
  };
}
export default inject("store")(observer(MapComponent));


