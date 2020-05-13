import React from 'react';
import styled from 'styled-components'
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Link } from "react-router-dom"

import { observer } from "mobx-react"
import Store from '../../store/index'



const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const classes = useStyles();




class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    
  }

  handleLogin()  {
    console.log(Store.username + Store.password)
    console.log("login pressed!")
  }

  render() {
    return (
      <Container>
        <CustomText2>COVID-19 TRACKER SYSTEM</CustomText2>
        <form className={classes.root} noValidate>
          <CssTextField
            fullWidth
            className={classes.margin}
            label="Username"
            id="custom-css-standard-input"
            autoComplete="off"
            ref={(name) => { Store.username = name }}
          />
          <CssTextField
            fullWidth
            className={classes.margin}
            label="Password"
            id="custom-css-standard-input"
            type="password"
            style={{ marginBottom: 30 }}
            ref={(password) => { Store.password = password }}
          />
  
          <Link style={{ color: 'rgb(66,82,175)', textDecoration: 'none' }} to="/dashboard">
            <Button 
              variant="outlined" 
              color="primary" 
              href="#"
              size="large"
              fullWidth
              style={{ marginTop:10 }}
              onClick={this.handleLogin}
              >
              Login
            </Button>
          </Link>
        </form>
  
        <TextContainer>
            <CustomText>
              Don't have an account? 
              <Link style={{ color: 'rgb(66,82,175)', textDecoration: 'none' }} to="/sign-up"> Sign Up</Link>
            </CustomText>
          </TextContainer>
      </Container>
    )
  }
  
}


const Container = styled.div`
  width: 70%;
  height: 70%;
  /* background: yellow; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;
  align-content: center;
  justify-content: center;
`

const CustomText = styled.text`
  font-size: 18px;
  text-align: center;
  font-family: Montserrat;
`

const CustomText2 = styled.h1`
  font-family: Montserrat;
  font-size: 24px;
  text-align: center;
  color: rgb(66,82,175);
`


export default LoginForm


