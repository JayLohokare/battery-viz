import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import Chart from "react-apexcharts";
import { apiService } from "../api.js";
import Loader from "react-js-loader";

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


const chartStyle = {
	height: '100%',
	width: '100%',
  }



export class Popupcontent extends Component {

	_getSeries(data){
		var  series = [
			{
				name: "capacity",
				data: data['values'],
				dataLabels: {
					enabled: false
				},
			}
			];

		return series;
	}

	_getOptions(data){
		var options = {
			dataLabels: {
				enabled: false
			},
			chart: {
			  id: "basic-bar"
			},
			xaxis: {
			  categories: data['index']
			}
		  }
		return options;
	}

	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	}
	
	async componentDidMount() {
		var loader = <Loader type="spinner-default" bgColor={"#0096FF"} color={'#0096FF'} size={100} />
		this.setState({ data: loader });

		var promise = new Promise(function(resolve, reject) {
			// call resolve if the method succeeds
		resolve(true);
		})


		const assets = apiService.getCountyData(this.props.county, true);

		console.log(assets);
		var graphs = assets.map((data, index) => 
			<Chart
				key={this.props.county + "-" + index + "-capacity-chart"}
				options={this._getOptions(data)}
				series={this._getSeries(data)}
				width="200"
				height="100"
				type="bar"
				style={chartStyle}/>
		)
		this.setState({ data: graphs });
	}

	render() { 
		return (
		<div>{this.state.data}</div>
		);
	};
}

export default inject("store")(observer(Popupcontent));


