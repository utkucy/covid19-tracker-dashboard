import moment from 'moment'

export default class CovidData {

  constructor(data = {}) {
    this.countryID = data.countryID
    this.day_data = moment(data.day_data).format('YYYY-MM-DD')
    this.numTest = data.numTest
    this.numCase = data.numCase
    this.numIntubated = data.numIntubated
    this.numICU = data.numICU
    this.numRecovered = data.numRecovered
    this.numDeceased = data.numDeceased
  }

  nullIfUndefined(data) {
    return data !== undefined ? data : null
  }
}



