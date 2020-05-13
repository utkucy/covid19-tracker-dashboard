import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createGlobalStyle } from 'styled-components'

import Login from './screens/auth/login'
import SignUp from './screens/auth/sign-up'
import Dasboard from './screens/dasboard/dasboard'

import Montserrat from './fonts/Montserrat/Montserrat-Regular.ttf'


function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <Router>
        <Route path="/"  exact component={Login}/>
        <Route path="/sign-up"  exact component={SignUp}/>
        <Route path="/dashboard"  exact component={Dasboard}/>
      </Router>
    </React.Fragment>

  );
}

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: ${Montserrat};
    /* background: linear-gradient(to bottom, #f05053, #e1eec3); */
    height: 100%;
    width: 100%;
    margin: 0;
    color: #555
  }

  #root {
    display: flex;
    height: 100%;
    width: 100%;
  }
`


export default App;
