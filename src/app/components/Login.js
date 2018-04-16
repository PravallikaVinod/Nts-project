import React from 'react';
import {connect} from "react-redux";
import store from "../store";
import {updateMsg,setGoogleResponse}  from "../actions/mainActions";

import { GoogleLogin } from 'react-google-login';

@connect((store) => {
  return {
    message: store.main.message,
  };
})

export class Login extends React.Component {

  constructor(props) {
   super(props);
 }

responseGoogle(response){
  console.log(response)
    sessionStorage.setItem('googleId',response.googleId)
    sessionStorage.setItem('profileObj',JSON.stringify(response.profileObj))
  this.props.dispatch(setGoogleResponse(response))
  this.props.history.push("/home");
}
failureGoogle(response){
  alert("Failed to login.Please try again")
}
   render() {

      return (


	  <div className="col-md-4">
 <GoogleLogin
   clientId="209378584578-s5nmcisn7u0j18i5pn5t0a0eflp1suf8.apps.googleusercontent.com"
   buttonText="Login"
   onSuccess={this.responseGoogle.bind(this)}
   onFailure={this.failureGoogle.bind(this)}
 />
		 </div>
      );
   }
}
