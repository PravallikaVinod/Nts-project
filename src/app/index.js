import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route, Switch, IndexRoute} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./store"
import {Login} from "./components/Login";
import {Home} from "./components/Home";
import {Main} from "./components/Main";

class App extends React.Component {

  render() {

    return(
      <BrowserRouter>
      <Switch>
          <Route exact path="/login" component={Login}/>
          <Main>
           <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home}/>
          </Main>
      </Switch>
      </BrowserRouter>
    );
  }

}

render(
  <Provider store={store}><App/></Provider>,window.document.getElementById('app'));
