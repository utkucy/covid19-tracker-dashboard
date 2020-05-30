import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Alert from '@material-ui/lab/Alert';

import styled from 'styled-components'
import store from '../../store';

import { observer } from "mobx-react"


@observer
class AddCountry extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      open: false,
      country_name: null,
    }
  }

  handleClickOpen = () => {
    this.setState({open : true})
  };

  handleClose = () => {
    this.setState({open : false})
  }

  handleSubmit = async () => {
    console.log(this.state.country_name)
    if(this.state.country_name !== null) { {
      await store.addNewCountry(this.state.country_name.toLowerCase(), true)
    }
      
    if(!!store.is_country_created)
      return
    
    this.handleClose()
    }
  }

  render() {
    return (
      <Container>
        <CustomButton variant="outlined"  onClick={this.handleClickOpen}>
          Add new country
        </CustomButton>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Country</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Please enter the country name to add new country information to dashboard. 
            </DialogContentText>
            <TextField
              autoComplete="off"
              autoFocus
              margin="dense"
              id="name"
              label="Country Name"
              // type="email"
              fullWidth
              onChange={(countryName) => this.setState({country_name: countryName.target.value})}
            />
          </DialogContent>
          {!!store.is_country_created && <Alert severity="error">This country is already added</Alert>}
          <Alert severity="warning">Country name is required</Alert>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        </Container>
    )
  }
}


const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CustomButton = styled(Button)`
  color; :read;
`

export default AddCountry