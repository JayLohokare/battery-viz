import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import Chart from "react-apexcharts";


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

	componentDidMount(){
		console.log("Loaded")
		this.props.store.setCountyDataLoading(this.props.county, true)
   	}

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


	render() {
		return (
		<div>{this.props.store.getCountyData(this.props.county).map((data, index) => 
			
				// this._renderChart(location, index)
				// <p>Whatsup</p>
				<Chart
				key={this.props.county + "-" + index + "-capacity-chart"}
				options={this._getOptions(data)}
				series={this._getSeries(data)}
				width="200"
				height="100"
				type="bar"
				style={chartStyle}
				
					
				/>
			
			)}</div>
		);
	};
}

export default inject("store")(observer(Popupcontent));


