import React from 'react'

import { observable, action, computed } from 'mobx'
import axios from 'axios';

import User from '../models/User/user'


class Store {

  @observable user;

  //login info
  @observable username;
  @observable password;


  @action
  log = () => {
    axios.get()
  }






}



const store = new Store()
export default store