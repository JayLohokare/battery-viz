import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import Chart from "react-apexcharts";
import { apiService } from "../api.js";
import Loader from "react-js-loader";
import { makeAutoObservable, reaction } from "mobx"
import { toJS } from 'mobx'

import GraphContainer from "./GraphContainer.js"

const options = {
	chart: {
	  id: "basic-bar"
	},
	xaxis: {
	  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
	}
  }

const  series = [
{
	name: "series-1",
	data: [30, 40, 45, 50, 49, 60, 70, 91]
}
];




export class Popupcontent extends Component {


	constructor(props) {
		super(props);
		this.state = {
			isDataReady: false,
		};
	}
	

	componentDidMount (){    

		this.props.store.updateCountyData(this.props.county);
		// (async () => {
		// 	await this.props.store.updateCountyData(this.props.county)
		// })();
		
		// console.log(this.state.graphData);
		// var data = apiService.getCountyData(toJS(this.props.county), true);

		// data.then((value) => {
		// 	this.props.store.updateCountyData(this.props.county, value);
		// 	this.setState({isDataReady: true});
		// 	console.log(this.state.isDataReady);
		// 	console.log(this.props.store.countyData[this.props.county])
		// });
    }

	render() { 
		console.log(this.props.store.isDataReady[this.props.county])
		return (
		<div>
			{this.props.store.isDataReady[this.props.county] === false || typeof this.props.store.isDataReady[this.props.county] == 'undefined' ? 
                <Loader type="spinner-default" bgColor={"#0096FF"} color={'#0096FF'} size={100} />
            :
                <GraphContainer id="container" county={this.props.county}/>
			}
		</div>
		);
	};
}

export default inject("store")(observer(Popupcontent));


