import React from 'react';

import styled from 'styled-components'

import backgroundImg from '../../images/covid_19.jpg'

import SignUpForm from '../../components/Signup-Form/signup-form'
import AlertDialog from '../../components/Alert/alert'


class SignUp extends React.Component {
  render() {
    return(
      <Container>
        <ImageContainer></ImageContainer>
        <Content>
          <AlertDialog forSignup={true}/>
          <SignUpForm />
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
 
export default SignUp;