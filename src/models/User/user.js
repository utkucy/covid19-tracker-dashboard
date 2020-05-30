

export default class User {

  constructor(data = {}) {

    this.countryID = data.countryID
    this.first_name = data.fName
    this.last_name = data.lName
    this.username = data.username
    this.password = data.password
    this.is_admin = data.rid === 1 ? true : false
  }

  nullIfUndefined(data) {
    return data !== undefined ? data : null
  }

}