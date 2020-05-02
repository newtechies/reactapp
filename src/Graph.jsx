import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import './App.css';
require('moment-timezone');


class Chart extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.update();
	}

	update = () => {
		/*
		* Checks if our react chart component (id="chart") is already rendered.
		* If not (first time the component is intanciated : before componentDidMount) : it exits from the update function.
		* If ok (component already instanciated : during or after componentDidMount) : it runs the update function.
		*/
		const chartComponentSelection = d3.select("#chart");

		if (chartComponentSelection.empty()) {
			console.log("First call");
			return;
		}

		const WIDTH = 800;
		const HEIGHT = 400;
		const margin = { top: 60, right: 60, bottom: 60, left: 60 };

		// Actual size of the svg
		const width = WIDTH - margin.left - margin.right;
		const height = HEIGHT - margin.top - margin.bottom;

		// chartComponentSelection.attr(
		// 	"style",
		// 	"padding-bottom: " +
		// 	Math.ceil(
		// 		(height + margin.top + margin.bottom) *
		// 		100 /
		// 		(width + margin.left + margin.right)
		// 	) +
		// 	"%"
		// );

		/*
		* We clean previous graphic each time an update is needed by removing the svg element.
		* It avoids that graphics are added/displayed one after the other.
		*/
		const mainSvgSelection = d3.select("svg");
		if (!mainSvgSelection.empty()) {
			mainSvgSelection.remove();
		}

		/*
		* Retrieves data from React parent component.
		*/
		const { dataset } = this.props;
		const { data } = this.props;

		/*
		* Each dataset element date is "2018-07-25 10:04:00" formatted.
		* Before we call parseTime we have to call moment functions 
		* to transform the current date in "%Y-%m-%dT%H:%M:%S%Z" format.
		* Here is an example below.
		*/
		// const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
		// const dateFormat = d3.timeFormat("%Y-%m-%d %H:%M:%S");

		// /*
  
		// * Just for example.
		// * To know : the US/Eastern time zone has been deemed obsolete. It has been replaced by America/New_York.
		// */
		// moment.tz.add([
		// 	"America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6",
		// 	"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6"
		// ]);

		// let newYork = moment.tz(
		// 	"2018-07-26 11:30:00",
		// 	"YYYY-MM-DD HH:mm:ss",
		// 	"America/New_York"
		// );
		// let paris = newYork.clone().tz("Europe/Paris");
		// console.log("n_york : ", newYork.format()); // "2018-07-26T11:30:00-04:00"
		// console.log("paris : ", paris.format()); // "2018-07-26T17:30:00+02:00"
		// console.log("utc : ", newYork.utc().format()); // "2018-07-26T15:30:00Z"
		// console.log("local from utc : ", parseTime(newYork.utc().format())); // "Thu Jul 26 2018 17:30:00 GMT+0200 (Paris, Madrid (heure d’été))"
		// console.log(
		// 	"date format : ",
		// 	dateFormat(parseTime(newYork.utc().format()))
		// );

		/*
		* Creates a new data set (array) from the old data set (object):
		* - string values for stock prices become numeric values
		* - string values for dates become date values
		*/
		// const data = Object.keys(dataset).map(function (key) {
		// 	console.log('keys', key);
		// 	return {
		// 		date: parseTime(
		// 			moment
		// 				.tz(key, "YYYY-MM-DD HH:mm:ss", "America/New_York")
		// 				.utc()
		// 				.format()
		// 		),
		// 		close: +dataset[key]["4. close"]
		// 	};
		// });

		// data.sort(function (a, b) {
		// 	return a.date - b.date;
		// });

		console.log("new data set is:", JSON.stringify(data));

		// Scales are defined to let some space for displaying axis
		// that's why margins are substracted from original WIDTH and HEIGHT
		const xScale = d3
			.scaleTime()
			.domain(
				d3.extent(data, function (d) {
					return d.date;
				})
			)
			.range([0, width]);

		const yScale = d3
			.scaleLinear()
			.domain(
				d3.extent(data, function (d) {
					return d.close;
				})
			)
			.range([height, 0]);

		// We define the line function which will build the graphic for each data "d" of new dataset : data.
		const line = d3
			.line()
			.x(function (d) {
				return xScale(d.date);
			})
			.y(function (d) {
				return yScale(d.close);
			});


		// svg component width , height
		const svg = chartComponentSelection
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr(
				"viewBox",
				"0 0 "
					.concat(width + margin.left + margin.right)
					.concat(" ")
					.concat(height + margin.top + margin.bottom)
			)
			.classed("svg-content", true)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		/*
		* Creates Title
		*/
		// svg
		// 	.append("text")
		// 	.attr("class", "chartTitle")
		// 	.attr("x", width / 2)
		// 	.attr("y", 0 - margin.top / 2)
		// 	.style("text-anchor", "middle")
		// 	.text("Intraday CAC40");

		/*
		* Adds xAxis
		*/
		// svg
		// 	.append("g")
		// 	.attr("transform", "translate(0," + height + ")")
		// 	.call(d3.axisBottom(xScale))
		// 	.append("text")
		// 	.attr("class", "chartXAxisLabel")
		// 	.attr("x", width)
		// 	.attr("dy", "-0.5em")
		// 	.attr("text-anchor", "end")
		// 	.text("Time");

		/*
		* Adds yAxis
		*/
		// svg
		// 	.append("g")
		// 	.call(d3.axisLeft(yScale))
		// 	.append("text")
		// 	.attr("class", "chartYAxisLabel")
		// 	.attr("transform", "rotate(-90)")
		// 	.attr("y", 6)
		// 	.attr("dy", "0.5em")
		// 	.attr("text-anchor", "end")
		// 	.text("Price");

		// Adds horizontal grid
		// svg
		// 	.selectAll(".horizontalGrid")
		// 	.data(yScale.ticks(10))
		// 	.enter()
		// 	.append("line")
		// 	.attr("class", "horizontalGrid")
		// 	.attr("x1", 0)
		// 	.attr("x2", width)
		// 	.attr("y1", function (d) {
		// 		return yScale(d);
		// 	})
		// 	.attr("y2", function (d) {
		// 		return yScale(d);
		// 	});

		// Adds line graph
		svg
			.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 1.5)
			.attr("d", line);

		/* 
		* Defines an area for gradiacion display
		*/
		const area = d3
			.area()
			.x(function (d) {
				return xScale(d.date);
			})
			.y0(height)
			.y1(function (d) {
				return yScale(d.close);
			});

		// Defines gradient
		svg
			.append("linearGradient")
			.attr("id", "areachart-gradient")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("x1", 0)
			.attr("x2", 0)
			.attr(
				"y1",
				yScale(
					d3.min(data, function (d) {
						return d.close;
					})
				)
			)
			.attr(
				"y2",
				yScale(
					d3.max(data, function (d) {
						return d.close;
					})
				)
			)
			.selectAll("stop")
			.data([
				{ offset: "0%", color: "#F7FBFE" },
				{ offset: "100%", color: "#3498DB" }
			])
			.enter()
			.append("stop")
			.attr("offset", function (d) {
				return d.offset;
			})
			.attr("stop-color", function (d) {
				return d.color;
			});

		// Displays gradient are
		const areaPath = svg
			.append("path")
			.datum(data)
			.style("fill", "url(#areachart-gradient)")
			.style("opacity", "0.6")
			.attr("d", area);

		const bisectDate = d3.bisector(function (d) {
			return d.date;
		}).left;

		function addTooltip() {
			// Group that contains the whole tooltip and the moving circle on the line
			const tooltip = svg
				.append("g")
				.attr("id", "tooltip")
				.style("display", "none");

			// External light blue circle of the moving circle
			tooltip
				.append("circle")
				.attr("fill", "#CCE5F6")
				.attr("r", 10);

			// Inner blue circle of the moving circle
			tooltip
				.append("circle")
				.attr("fill", "#3498db")
				.attr("stroke", "#fff")
				.attr("stroke-width", "1.5px")
				.attr("r", 4);

			// The tooltip itself with its peak in down direction at bottom
			tooltip
				.append("polyline")
				.attr("points", "0,0 0,40 55,40 60,45 65,40 120,40 120,0 0,0")
				.style("fill", "#fafafa")
				.style("stroke", "#3498db")
				.style("opacity", "0.9")
				.style("stroke-width", "1")
				.attr("transform", "translate(-60, -55)");

			// This tooltip will contain all our text
			const text = tooltip
				.append("text")
				.style("font-size", "13px")
				.style("font-family", "Segoe UI")
				.style("color", "#333333")
				.style("fill", "#333333")
				.attr("transform", "translate(-50, -40)");

			// Date element positioning
			text
				.append("tspan")
				.attr("dx", "-10")
				.attr("id", "tooltip-date");

			// Little blue point element positioning
			text
				.append("tspan")
				.style("fill", "#3498db")
				.attr("dx", "-110")
				.attr("dy", "15")
				.text("●");

			// "Price : " element positioning
			text
				.append("tspan")
				.attr("dx", "5")
				.text("Price : ");

			// Price value element for the selected date
			text
				.append("tspan")
				.attr("id", "tooltip-close")
				.style("font-weight", "bold");

			return tooltip;
		}

		function mousemove() {
			const x0 = xScale.invert(d3.mouse(this)[0]);
			const i = bisectDate(data, x0);
			const d = data[i];

			// console.log("x0 date", x0);
			// console.log("index ", i);
			// console.log("d", d.date);

			tooltip.attr(
				"transform",
				"translate(" + xScale(d.date) + "," + yScale(d.close) + ")"
			);

			d3.select("#tooltip-date").text(d.date);
			d3.select("#tooltip-close").text(d.close);
		}

		const tooltip = addTooltip();

		svg
			.append("rect")
			.attr("class", "overlay")
			.attr("width", width)
			.attr("height", height)

			.on("mouseover", function () {
				tooltip.style("display", null);
			})
			.on("mouseout", function () {
				tooltip.style("display", "none");
			})
			.on("mousemove", mousemove);
	};

	render() {
		this.update();
		return <div id="chart" className="svg-container" />;
	}
}

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataset: this._getInitDataset()
		};
	}

	// _getInitDataset = () => {
	// 	return {
	// 		"2018-07-26 11:30:00": {
	// 			"4. close": "5475.0800",
	// 		},
	// 		"2018-07-26 11:25:00": {
	// 			"4. close": "5470.0800",
	// 		},
	// 		"2018-07-26 11:20:00": {
	// 			"4. close": "5468.2900",
	// 		},
	// 		"2018-07-26 11:15:00": {
	// 			"4. close": "5467.8400",
	// 		}
	// 	};
	// };

	_getInitDataset = () => {
		return [
			{ date: 1, close: 4 },
			{ date: 2, close: 4 },
			{ date: 3, close: 5 },
			{ date: 4, close: 12 },
			{ date: 5, close: 8 }
		];
	};

	render() {
		return (
			<div>
				<Chart dataset={this.state.dataset} data={this.state.dataset}/>
			</div>
		);
	}
}

//   ReactDOM.render(<Graph />, document.getElementById("app"));
export default Graph;
