import React from 'react';
import {connect} from "react-redux";
import store from "../store";
import {updateMsg,setGoogleResponse,getD3ChartData}  from "../actions/mainActions";

var d3 = require("d3");

@connect((store) => {
  return {
    message: store.main.message,
    chartData:store.main.chartData,
  };
})

export class D3Chart extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(getD3ChartData())
  }

  render() {

    var parseDate = d3.timeParse("%Y");

    var margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 50
    };
    var width = 600 - margin.left - margin.right;
    var height = 270 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%Y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);


    var valueline = d3.line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.value);
    });

    if(this.props.chartData.length > 0){
      var svgContent = document.getElementsByClassName("chart")[0].innerHTML;
      if(svgContent == undefined || svgContent == ""){
        var svg =  d3.select(".chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        var data = this.props.chartData;

        data.forEach(function (d) {
          d.date = parseDate(d.date);
          d.value = +d.value;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
          return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d.value;
        })]);

        svg.append("path") // Add the valueline path.
        .attr("d", valueline(data));

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

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

      }
      else{
        // Get the data
        var data = this.props.chartData;

        data.forEach(function (d) {
          d.date = parseDate(d.date);
          d.value = +d.value;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
          return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d.value;
        })]);

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        var svg = d3.select(".chart").transition();
        // Make the changes
        svg.select(".line")   // change the line
        .duration(750)
        .attr("d", valueline(data));
        svg.select(".x.axis") // change the x axis
        .duration(750)
        .call(d3.axisBottom(x));
        svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(d3.axisLeft(y));
      }
    }
    return (
      <div>
      <div className="col-md-8 chart"></div>
      </div>
    );
  }
}
