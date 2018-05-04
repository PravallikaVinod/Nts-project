
import $ from "jquery";

var tableDataInterval = null;
var d3ChartInterval = null;
export function updateMsg(){
  var msg = "Hello Manvitha Reddy"
  return {
    type: "UPDATE_MSG",
    msg
  }
}
export function setGoogleResponse(googleUserResponse) {
  return {
    type: "GOOGLE_RESPONSE",
    googleUserResponse
  }
}

function getHeader(){
  return {
    'Content-Type': 'application/json'
  };
}

export function getTableData(){
  return (dispatch) => {
    tableAPICall(dispatch)
  }
}

function tableAPICall(dispatch){
  return fetch('https://facebook.github.io/react-native/movies.json')
  .then((response) => response.json())
  .then((responseJson) => {
    dispatch(updateStore(responseJson.movies));
    if(tableDataInterval == null)
    tableSetInterval(dispatch);
  })
  .catch((error) => {
    console.error(error);
  });
}
export function tableSetInterval(dispatch){
  tableDataInterval = setInterval(function(){
    tableAPICall(dispatch)
  },10000)
}
function updateStore(data){
  return {
    type: "GET_TABLE_DATA",
    data
  }
}

export function generateNormalTableRows(table) {
  var tbodyData = table.map(function(rowData,i){
    return(<tr key={i}><td key={j}>{colData.key}</td><td key={j}>{colData.name}</td></tr>);
  })
  return tbodyData;
}


function d3ChartAPICall(dispatch){
  $("#chartLoader").addClass("displayBlock")
  $("#chartData").addClass("displayNone")
  $("#chartLoader").removeClass("displayNone")
  $("#chartData").removeClass("displayBlock")
  $.ajax({
    url: 'https://api.worldbank.org/v2/countries/NOR/indicators/NY.GDP.MKTP.KD.ZG?per_page=30&MRV=30&format=json',
    complete: function(json) {
      var  data = JSON.parse(json.responseText);
      // set some variable to host data
      sessionStorage.setItem("chartData",JSON.stringify(data[1]))
      var modifiedData = [];
      data[1].forEach(function(d){
        if(d.value > 0) modifiedData.push(d)
      })
      setTimeout(function(){
        $("#chartLoader").removeClass("displayBlock")
        $("#chartLoader").addClass("displayNone")
        $("#chartData").addClass("displayBlock")
        $("#chartData").removeClass("displayNone");
        dispatch(updateChartData(modifiedData));
        if(d3ChartInterval == null)
        refreshChart(dispatch)
      },10000)

    },
    error: function() {
      console.log('there was an error!');
    }
  });
}
export function getD3ChartData(){
  return (dispatch) => {
    d3ChartAPICall(dispatch);
  }
}
function refreshChart(dispatch){
  d3ChartInterval = setInterval(function(){
    d3ChartAPICall(dispatch)
  },10000)
}
function updateChartData(data){

  return {
    type: "CHART_DATA",
    data
  }
}
