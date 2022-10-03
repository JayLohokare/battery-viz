import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {MapComponent} from "./Components/MapComponent";

const mapStyle = {
  height: '100vh',
  width: '80vw',
  position: 'absolute',
  left:'20vw',
}

const dataStyle = {
  height: '100vh',
  width: '20vw',
  position: 'absolute',
}

class App extends Component {

  render() {
    return (
      <div>
        <div style={dataStyle}></div>

        <div style={mapStyle}>
        <MapComponent store={this.props.store}/>
        </div>
      </div>
    );
  };
}
export default inject("store")(observer(App));


