import React from 'react';
import {connect} from "react-redux";
import store from "../store";
import {updateMsg,getTableData}  from "../actions/mainActions";
import {Table} from "./Table";
import {D3Chart} from "./D3Chart";

@connect((store) => {
  return {
    message: store.main.message,
    googleResponse:store.main.googleResponse,
  };
})

export class Home extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(getTableData());
  }
  render() {
    var profileObj = this.props.googleResponse.profileObj;
    var loginInfo = null;
if(profileObj != undefined){
loginInfo = <span><label>Name : {profileObj.name}</label><label>Email : {profileObj.email}</label><label>Family Name : {profileObj.familyName}</label><br/><label>Google Id : {profileObj.googleId}</label></span>;
}
    return (
      <div className="col-md-12">
      <div className="row">
      <div className="col-md-4 xs-pt-15 google-Info">
{loginInfo}
      </div>
      <div className="col-md-4">
      <D3Chart/>
      </div>
      </div>
      <div className="row">
      <div className="col-md-4">
      <Table/>
      </div>

      </div>

      </div>
    );
  }
}
