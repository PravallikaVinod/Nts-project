import React from 'react';
import {connect} from "react-redux";
import store from "../store";
import {updateMsg,setGoogleResponse}  from "../actions/mainActions";

import { GoogleLogin } from 'react-google-login';

@connect((store) => {
  return {
    message: store.main.message,
    tableData:store.main.tableData,
  };
})

export class Table extends React.Component {

  constructor(props) {
   super(props);
 }


   render() {
var tbodyData = this.props.tableData.map(function(rowData,i){
    return(<tr key={i}><td>{rowData.key}</td><td>{rowData.name}</td></tr>);
  })
      return (
	  <div>
<table className="table-style">
  <thead><tr><th>Key</th><th>Name</th></tr></thead>
  <tbody>{tbodyData}</tbody>
</table>
		 </div>
      );
   }
}
