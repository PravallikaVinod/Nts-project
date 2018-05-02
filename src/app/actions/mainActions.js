
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
    //   return responseJson.movies;
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

function makeAPICall(){
  /*  return fetch("http://www.amiiboapi.com/api/gameseries", {
  method: 'GET',
  mode:'no-cors',
  headers: {
  'Content-Type': 'application/json',
  'Accept':'application/json'
}
}).then(response => Promise.all([response, JSON.stringify(response.json())]));*/
}

function d3ChartAPICall(dispatch){
  $.ajax({
    url: 'https://api.worldbank.org/v2/countries/NOR/indicators/NY.GDP.MKTP.KD.ZG?per_page=30&MRV=30&format=json',
    complete: function(json) {
      var  data = JSON.parse(json.responseText);
      // set some variable to host data
      //console.log(data[1])
      sessionStorage.setItem("chartData",JSON.stringify(data[1]))
      var modifiedData = [];
      data[1].forEach(function(d){
        if(d.value > 0) modifiedData.push(d)
      })
      //console.log(data[1])
      dispatch(updateChartData(modifiedData));
      if(d3ChartInterval == null)
      refreshChart(dispatch)
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

export function fecthChartData1(){
  return (dispatch) => {
    return getD3ChartData().then(([response, json]) =>{
      //console.log(json);
    //  console.log(response)
    });
  }
}
