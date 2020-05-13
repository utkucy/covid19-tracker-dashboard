import firebase from 'react-native-firebase'
import { observable, action, computed } from 'mobx'


export default class User {

  constructor(data = {}) {

    this.id = data.id
    this.username = data.username
    this.password = data.password
    this.is_admin = data.is_admin

    console.log(this.id + this.username + this.password + " " + this.is_admin)
  }

  nullIfUndefined(data) {
    return data !== undefined ? data : null
  }

}