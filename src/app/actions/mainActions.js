
import $ from "jquery";

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
    $.ajax({
    method: "GET",
    url: "http://www.amiiboapi.com/api/gameseries",
    dataType: "json"
  })
    .done(function( msg ) {
      console.log(msg)
      var data = msg.amiibo;
dispatch(updateStore(data))
    });
}
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
