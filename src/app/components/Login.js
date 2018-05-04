import React from 'react';
import { connect } from "react-redux";
import store from "../store";
import { updateMsg, setGoogleResponse } from "../actions/mainActions";
import { Redirect } from "react-router";
import { GoogleLogin } from 'react-google-login';

@connect((store) => {
  return {
    message: store.main.message,
  };
})

export  class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  responseGoogle(response) {
    console.log(response)
    sessionStorage.setItem('googleId', response.googleId)
    sessionStorage.setItem('profileObj', JSON.stringify(response.profileObj))
    this.props.dispatch(setGoogleResponse(response))
    this.props.history.push("/home");
  }
  failureGoogle(response) {
    alert("Failed to login.Please try again")
  }
  render() {
    return (
      <div className = "col-md-12" >
     <div className="col-md-4 login-div">
     <div className="form-group xs-pt-25">
      <div className="input-group">
      <input id="username" type="text" placeholder="Username" autoComplete="off" className="form-control"/>
      </div>
      </div>

      <div className="form-group">
      <div className="input-group">
      <input id="password" type="password"   placeholder="password" autoComplete="off" className="form-control"/>
      </div>
      </div>

      <GoogleLogin clientId = "209378584578-s5nmcisn7u0j18i5pn5t0a0eflp1suf8.apps.googleusercontent.com"
      buttonText = "Login with Google"
      onSuccess = { this.responseGoogle.bind(this) }
      onFailure = { this.failureGoogle.bind(this) }
      className="login-button"/>
      < /div >
      </div>
    );
  }
}
