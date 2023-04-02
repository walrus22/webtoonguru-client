import React, { Component } from 'react';
import CanvasJSReact from '../../lib/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


/* 
장르별 순위가 존재하는 경우 차트 출력,
순위가 없는 경우 "랭크를 지원하지 않는 웹툰입니다" 출력
*/


class WebtoonRankChart extends Component {	
	constructor(props) {
		super(props);
		// console.log(props.webtoon)
		// console.log(props.platforms)
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const webtoon = this.props.webtoon;
		const platforms = this.props.platforms;
		// console.log(webtoon)
		// console.log(platforms)

		const options = {
			theme: "light2",
			animationEnabled: true,
			width: 500,
			height: 300,
			backgroundColor: 'transparent',
			axisY:{       
				reversed: true //Try Changing to false
			},
			
			// title:{
			// 	fontSize: 30,
			// 	text: `${webtoon.title}`,
			// },
			// subtitles: [{
			// 	text: "Click Legend to Hide or Unhide Data Series"
			// }],
			// axisX: {
			// 	title: "date"
			// },
			// axisY: {
			// 	title: "랭킹",
			// 	titleFontColor: "#6D78AD",
			// 	lineColor: "#6D78AD",
			// 	labelFontColor: "#6D78AD",
			// 	tickColor: "#6D78AD"
			// },
			// axisY2: {
			// 	title: "Profit in USD",
			// 	titleFontColor: "#51CDA0",
			// 	lineColor: "#51CDA0",
			// 	labelFontColor: "#51CDA0",
			// 	tickColor: "#51CDA0"
			// },
			
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Ktoon",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 1 },
					{ x: new Date(2017, 1, 1), y: 2 },
					{ x: new Date(2017, 2, 1), y: 3 },
					{ x: new Date(2017, 3, 1), y: 4 },
					{ x: new Date(2017, 4, 1), y: 5 },
					{ x: new Date(2017, 5, 1), y: 1 },
					{ x: new Date(2017, 6, 1), y: 3 },
					{ x: new Date(2017, 7, 1), y: 2 },
					{ x: new Date(2017, 8, 1), y: 6 },
					{ x: new Date(2017, 9, 1), y: 5 },
					{ x: new Date(2017, 10, 1), y: 7 },
					{ x: new Date(2017, 11, 1), y: 8 }
				]
			},
			{
				type: "spline",
				name: "Mrblue",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 1 },
					{ x: new Date(2017, 1, 1), y: 3 },
					{ x: new Date(2017, 2, 1), y: 2 },
					{ x: new Date(2017, 3, 1), y: 6 },
					{ x: new Date(2017, 4, 1), y: 5 },
					{ x: new Date(2017, 5, 1), y: 4 },
					{ x: new Date(2017, 6, 1), y: 3 },
					{ x: new Date(2017, 7, 1), y: 2 },
					{ x: new Date(2017, 8, 1), y: 3 },
					{ x: new Date(2017, 9, 1), y: 1 },
					{ x: new Date(2017, 10, 1), y: 2 },
					{ x: new Date(2017, 11, 1), y: 5 }
				]
			}]
		}
		
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
			
}
 
export default WebtoonRankChart;         