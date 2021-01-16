import React, { useState }from 'react';
import styled from 'styled-components'
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Alert from '@material-ui/lab/Alert';

import Store from '../../store/index';

import { Link } from "react-router-dom"
import { observer } from 'mobx-react'

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


const SignUpForm = observer(() => {

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [country_name, setCountryName] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [is_admin, setIsAdmin] = useState('')

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });
  const [checked_admin, setCheckedAdmin] = React.useState(false)

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    setCheckedAdmin(!checked_admin)
    setIsAdmin(event.target.checked)
  }

  const classes = useStyles();

  const handleSignUp = () => {
    console.log(username + password + first_name + last_name + is_admin)
    Store.signup(username, password, first_name, last_name, is_admin, country_name)
  }
  

  return (
    <Container>
      <CustomText2>COVID-19 TRACKER SYSTEM</CustomText2>
      <form className={classes.root} noValidate>
        <CssTextField
          fullWidth
          className={classes.margin}
          label="First Name"
          id="custom-css-standard-input"
          autoComplete="off"
          onChange={(first_name) => setFirstName(first_name.target.value)}
        />
        <CssTextField
          fullWidth
          className={classes.margin}
          label="Last Name"
          id="custom-css-standard-input"
          autoComplete="off"
          onChange={(last_name) => setLastName(last_name.target.value)}
        />
        <CssTextField
          fullWidth
          className={classes.margin}
          label="Country Name"
          id="custom-css-standard-input"
          autoComplete="off"
          onChange={(country_name) => setCountryName(country_name.target.value.toLowerCase())}
        />
        <CssTextField
          fullWidth
          className={classes.margin}
          label="Username"
          id="custom-css-standard-input"
          autoComplete="off"
          onChange={(username) => setUserName(username.target.value)}
        />
        <CssTextField
          fullWidth
          className={classes.margin}
          label="Password"
          id="custom-css-standard-input"
          type="password"
          onChange={(password) => setPassword(password.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          labelPlacement="start"
          label="Admin User"
        />
      
        {/* <Link style={{ color: 'rgb(66,82,175)', textDecoration: 'none' }} to="/"> */}
          <Button 
            variant="outlined" 
            color="primary" 
            // href="#"
            size="large"
            fullWidth
            style={{ marginTop:10 }}
            onClick={handleSignUp}
            >
            Sign Up
          </Button>
          {!!Store.signup_status && <Alert severity="success">Your account is created successfully.</Alert>}
        {/* </Link> */}
      </form>
      <TextContainer >
        <CustomText>
          Already have an account? 
          <Link style={{ color: 'rgb(66,82,175)', textDecoration: 'none' }} to="/"> Login</Link>
        </CustomText>
      </TextContainer>
    </Container>
  )
})


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



export default SignUpForm


