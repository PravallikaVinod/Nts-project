import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {Login} from '../components/Login';
import store from "../store";
import {Home} from '../components/Home';


describe('Test suite', function() {
  it('Login To be defined', function() {
    console.log("Test Cases")
    expect(Login).toBeDefined();
  });

  it('Login snapshot', function() {
    const login = shallow(
      <Login store={store}  />
    );
    expect(login).toMatchSnapshot();
  });

  it('Find Class "login-div"', function() {
    const login = mount(
      <Login store={store}  />
    );
    expect(login.find(".login-div").length).toBe(1)
  });


  it('Home To be defined', function() {
    expect(Home).toBeDefined();
  });

  it('Home snapshot', function() {
    const home = shallow(
      <Home store={store}  />
    );
    expect(home).toMatchSnapshot();
  });



});
