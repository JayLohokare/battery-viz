import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Map, Marker } from "react-map-gl";
import MAP_STYLE from "../map-style-basic-v8.json";


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


  render() {
    return (
      <Map
        controller={true}
        mapboxAccessToken={"pk.eyJ1IjoiamF5bG9ob2thcmUiLCJhIjoiY2w4cnd4Mjh6Mmk5cjNubDVpcHU1Ymo4aCJ9.Lk-GWkR6XQGURxoXWKEp8A"}
        initialViewState={{
          latitude: 31.689029,
          longitude: -98.958322,
          zoom: 5
        }}
        mapStyle= {MAP_STYLE}
      >

      {
          this.props.store.getCountyData().forEach(county => {
            <Marker
            longitude={county['Y']}
            latitude={county['X']}>
            <div className="marker">
              <span><b>{county['name']}</b></span>
            </div>
          </Marker>
          })
      }
      </Map>
    );
  };
}
export default inject("store")(observer(MapComponent));


