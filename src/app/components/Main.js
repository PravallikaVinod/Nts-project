import React from 'react';
import {connect} from "react-redux";
import store from "../store";
import {updateMsg,setGoogleResponse}  from "../actions/mainActions";
import { Redirect } from "react-router";


@connect((store) => {
  return {
    message: store.main.message,
  };
})

export class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    if(sessionStorage.getItem("googleId") != null){
      return (
        <div>
        {this.props.children}
        </div>
      );
    }else{
      sessionStorage.clear();
      return(<Redirect to={"/login"} />)
    }

  }
}
