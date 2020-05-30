export default class Country {

  constructor(data = {}) {
    this.cname = data.cname
    this.id = data.id
  }

  nullIfUndefined(data) {
    return data !== undefined ? data : null
  }
}