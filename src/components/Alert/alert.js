import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Store from '../../store/index'
import { observer } from "mobx-react"

@observer
class AlertDialog extends React.Component {

  handleCloseLogin = () => {
    Store.changeLoginStatus(null)
  }

  handleCloseSignUp = () => {
    Store.changeSignUpStatus(null)
  }

  render() {
    return (
      <div>
        {!!this.props.forLogin && 
          <Dialog
          open={Store.login_status === false}
          onClose={this.handleCloseLogin}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Login Failed"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your username and/or password do not match
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseLogin} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        }

        {!!this.props.forSignup &&
          <Dialog
          open={Store.signup_status === false}
          onClose={this.handleCloseSignUp}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Signup Failed"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This username is already taken
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSignUp} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        }
        
      </div>
    )
  }

}

export default AlertDialog
