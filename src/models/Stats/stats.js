

export default class Stats {

  constructor(data = {}) {

    this.countryID = data.countryID
    this.totalTest = data.totalTest
    this.totalCase = data.totalCase
    this.totalIntubated = data.totalIntubated
    this.totalICU = data.totalICU
    this.totalRecovered = data.totalRecovered
    this.totalDeceased = data.totalDeceased
  }

  nullIfUndefined(data) {
    return data !== undefined ? data : null
  }

}