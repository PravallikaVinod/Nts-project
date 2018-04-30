import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/Login';
import store from "../store";


describe('A suite', function() {
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
});
