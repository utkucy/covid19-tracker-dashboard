import React from 'react';

import styled from 'styled-components'
import { observer } from "mobx-react"
import { Redirect } from 'react-router-dom'

import backgroundImg from '../../images/covid_19.jpg'

import LoginForm from '../../components/Login-Form/login-form'
import AlertDialog from '../../components/Alert/alert'
import Store from '../../store/index'

@observer
class Login extends React.Component {

  componentDidMount() {
    console.log("Login page " + Store.login_status)
  }

  render() {

    if (!!Store.login_status) {
      return <Redirect to={"/dashboard"} />
    }

    return(
      <Container>
        <ImageContainer></ImageContainer>
        <Content>
          <AlertDialog forLogin={true} />
          <LoginForm />
        </Content>
      </Container>
    )
  }
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const ImageContainer = styled.div`
  flex: 0 0 60%;
  background: url(${backgroundImg});
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%;
  background-position: left top, right top;
`

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

 
export default Login;