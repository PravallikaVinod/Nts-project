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
      loginInfo = <div className="col-md-4 xs-pl-25"><span>{profileObj.name}</span><br/><span>{profileObj.email}</span><br/><span>{profileObj.googleId}</span></div>;
    }

    return (
      <div className="col-md-12 header">
      <div className="row">
      <div className="row">
      <div className="col-md-1 xs-pl-25 xs-pt-15"><img className="profile" src="https://lh4.googleusercontent.com/-m7MxIcN9WtI/AAAAAAAAAAI/AAAAAAAAAGo/vBrC-sIjdSw/s96-c/photo.jpg" />
      </div>
      {loginInfo}
      </div>
      </div>

      <div className="row">
      <div className="col-md-8 xs-pt-15 chartBorder">
      <div id="chartData"><D3Chart/></div>
      <div id="chartLoader" className="displayNone"><img src="/assets/images/loading_icon.gif" width="20%"/></div>
      </div>
      <div className="col-md-4 xs-pt-15 tableBorder">
      <Table/>
      </div>
      </div>


      </div>
    );
  }
}
