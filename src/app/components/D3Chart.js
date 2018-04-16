import React from 'react';
import {connect} from "react-redux";
import store from "../store";
import {updateMsg,setGoogleResponse}  from "../actions/mainActions";

var d3 = require("d3");

@connect((store) => {
  return {
    message: store.main.message,
    tableData:store.main.tableData,
  };
})

export class D3Chart extends React.Component {

  constructor(props) {
   super(props);
 }


   render() {
     var margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
};
var width = 600 - margin.left - margin.right;
var height = 270 - margin.top - margin.bottom;

var parseDate = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


var valueline = d3.line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.close);
    });

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
var data = [{
    date: "1-May-12",
    close: "58.13"
}, {
    date: "30-Apr-12",
    close: "53.98"
}, {
    date: "27-Apr-12",
    close: "67.00"
}, {
    date: "26-Apr-12",
    close: "89.70"
}, {
    date: "25-Apr-12",
    close: "99.00"
}];

data.forEach(function (d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
});

// Scale the range of the data
x.domain(d3.extent(data, function (d) {
    return d.date;
    }));
y.domain([0, d3.max(data, function (d) {
    return d.close;
    })]);

svg.append("path") // Add the valueline path.
.attr("d", valueline(data));

// Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

      return (
	  <div>
<div className="col-md-8" id="chart"></div>
		 </div>
      );
   }
}
