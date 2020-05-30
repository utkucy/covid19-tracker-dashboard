import React, { useState } from 'react';
import styled from 'styled-components'
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import { Link } from "react-router-dom"
import Store from '../../store/index';

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


const LoginForm = () => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles();

  const handleLogin = () => {
    console.log(name + password)
    Store.login(name, password)
  }
  
  
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
          onChange={(name) => setName(name.target.value)}
        />
        <CssTextField
          fullWidth
          className={classes.margin}
          label="Password"
          id="custom-css-standard-input"
          type="password"
          onChange={(password) => setPassword(password.target.value)}
        />
          <Button 
            variant="outlined" 
            color="primary" 
            // href="/dashboard"
            size="large"
            fullWidth
            style={{ marginTop:30 }}
            onClick={handleLogin}
            >
            Login
          </Button>
      </form>
      <TextContainer >
        <CustomText>
          Don't have an account?  
          <Link style={{ color: 'rgb(66,82,175)', textDecoration: 'none' }} to="/sign-up"> Sign up</Link>
        </CustomText>
      </TextContainer>
    </Container>
  )
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
  margin-top: 20px;
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


