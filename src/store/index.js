import { observable, action, computed, toJS } from 'mobx'
import axios from 'axios';
import moment from 'moment'

import User from '../models/User/user'
import Country from '../models/Country/country';
import CovidData from '../models/Covid-Data/covid-data';
import Stats from '../models/Stats/stats';




class Store {

  @observable user = null
  @observable stats = null
  @observable is_country_created = null
  @observable global_stats = null
  @observable countryInfo = []
  @observable selectedCountryGraphInfo = []
  @observable globalGraphInfo = []
  

  //login info
  @observable login_status = null
  @observable signup_status = null
  @observable fetch_status = null

  @observable countries = []
  @observable selectedCountryIndex


  @action
  async signup (username, password, fName, lName, is_admin, cname) {
    const rid = is_admin ? 1 : 0
    let countryID = null
    
    countryID = await this.addNewCountry(cname)
    console.log(countryID)
    if(typeof(countryID) === 'undefined') {
      try {
        const get_response = await axios.get(`http://localhost:8080/api/v1/country/${cname}`)
        console.log(get_response)
        countryID = get_response.data.id
        console.log(countryID)
      }
      catch (error) {
        console.log("error2")
        console.log(error)
      }
    }
    
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user", {countryID, username, password, fName, lName, rid})
      console.log(res);
      console.log(res.data)
      this.signup_status = true
    }
    catch(error) {
      console.log(error)
      this.signup_status = false
    }
  }

  @action
  async addNewCountry(cname,adminAdded) {
    let id = -1      

    try {
      const get_response = await axios.get(`http://localhost:8080/api/v1/country/${cname}`)
      this.is_country_created = true
      return get_response.data.cid
    }
    catch (error) {
      this.is_country_created = false
      console.log("This country is not created before!")
      console.log(error)
    }

    if(this.is_country_created === false) {
      const post_response = await axios.post(`http://localhost:8080/api/v1/country`, { cname, id })
      try {
        console.log(post_response)
        console.log(post_response.data)
        this.is_country_created = null
      } catch (error) {
        console.log(error)
      }
    }

    if(adminAdded) {
      await this.getAllCountries(adminAdded)
    }
  }

  @action
  async showCountryInfo(cname) {
    this.countries.forEach((country, index) => {
      if(country.key === cname)
        this.selectedCountryIndex = index
    })
    this.getCovidDataOfSelectedCountry()
  }

  @action
  async addCovidDataToCountry(newData) {
    newData.countryID = this.selectedCountry.countryID
    const covidData = new CovidData(newData)
    console.log(newData)
    console.log(covidData)

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/covid-data`, { 
                      countryID: covidData.countryID,
                      day_data: covidData.day_data,
                      numTest: covidData.numTest,
                      numCase: covidData.numCase,
                      numIntubated: covidData.numIntubated,
                      numICU: covidData.numICU,
                      numRecovered: covidData.numRecovered,
                      numDeceased: covidData.numDeceased
                    }
                  )
      console.log(res)
      console.log(res.data)
      await this.getCovidDataOfSelectedCountry()
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async login (username, password) {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/${username}`)
      console.log(res.data)
      this.user = new User(res.data)
      // console.log(this.user.first_name)
      // console.log(this.user.last_name)
      // console.log(this.user.username)
      // console.log(this.user.password)
      // console.log(this.user.is_admin)
      if(this.user.username === username && this.user.password === password) {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        this.login_status = true
        console.log("Login is successfull!" + localStorage.getItem('username') + localStorage.getItem('password'))
      }
      else {
        throw new Error('User not found!')
      }
    } catch (error) {
      this.login_status = false
      console.log(error)
    }
    console.log(this.login_status)
  }

  @action
  async fetchData() {
    //USER
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('username')}`)
      this.user = new User(res.data)
      console.log("******FETHING DATA*******")
      console.log(this.user.first_name)
      console.log(this.user.last_name)
      console.log(this.user.username)
      console.log(this.user.password)
      console.log(this.user.is_admin)        
    } catch (error) {
      console.log(error)
    }

    //GLOBAL STATS
    await this.getGlobalStats()
    
    //COUNTRIES
    await this.getAllCountries()

    //COVID DATA
    await this.getCovidDataOfSelectedCountry()

    //GRAPH GLOBAL DATA
    await this.getGlobalGraphInfo()

    //GRAPH COUNTRY DATA
    await this.showGraphOfSelectedCountry()


    this.fetch_status = true
  }

 
  @action
  async getAllCountries(adminAdded) {
    try {
      const res =  await axios.get(`http://localhost:8080/api/v1/country`)
      // console.log("Countries")
        // console.log(res)
        // console.log(res.data[0].name)
        // console.log(toJS(res).data)
      res.data.forEach((country, index) => {
        console.log(country)
        if(country.id === this.user.countryID)
          this.selectedCountryIndex = index
        if(!!adminAdded) {
          if(index === res.data.length-1) {
            this.countries.push(
              {
                key: country.name.toLowerCase(),
                value: country.name.toUpperCase(),
                countryID: country.id
              }
            )
          }
          return
        }
        this.countries.push(
          {
            key: country.name.toLowerCase(),
            value: country.name.toUpperCase(),
            countryID: country.id
          }
        )
      })
      console.log(toJS(this.countries))
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async getCovidDataOfSelectedCountry() {
    if(this.countryInfo.length > 0)
      this.countryInfo = []

    console.log(this.selectedCountry.countryID)
    //DAILY STATS
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/covid-data/${this.selectedCountry.countryID}`)
      res.data.forEach((covidData, index) => {
        console.log(covidData)
        this.countryInfo.push(
          new CovidData(covidData)
        )
      })
      // console.log(this.countryInfo)
    } catch (error) {
      console.log(error)
    }

    //STATS
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/stats/${this.selectedCountry.countryID}`)
      this.stats = new Stats(res.data)
    } catch (error) {
      console.log(error)
    }

    //GLOBAL STATS
    await this.getGlobalStats()

    // GLOBAL GRAPH
    await this.getGlobalGraphInfo()
    // COUNTRY GRAPH
    await this.showGraphOfSelectedCountry()
  }

  @action
  async getGlobalStats() {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/stats`)
      this.global_stats = new Stats(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async deleteCovidDataOfSelectedCountry(oldData) {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/covid-data/${this.selectedCountry.countryID}/${oldData.day_data}`)
      await this.getCovidDataOfSelectedCountry()
      console.log("data deleted!")
    } catch (error) {
      console.log(error)
    } 
  }

  @action
  async updateCovidDataOfSelectedCountry(newData, oldData) {
    newData.countryID = this.selectedCountry.countryID
    oldData.countryID = this.selectedCountry.countryID
    const newCovidData = new CovidData(newData)
    console.log(newData)
    console.log(newCovidData)

    try {
      const res = await axios.put(`http://localhost:8080/api/v1/covid-data/${this.selectedCountry.countryID}/${oldData.day_data}`, 
        // { 
        //   countryID: newCovidData.countryID,
        //   day_data: newCovidData.day_data,
        //   numTest: newCovidData.numTest,
        //   numCase: newCovidData.numCase,
        //   numIntubated: newCovidData.numIntubated,
        //   numICU: newCovidData.numICU,
        //   numRecovered: newCovidData.numRecovered,
        //   numDeceased: newCovidData.numDeceased
        // }
        newCovidData
      )
      console.log(res)
      console.log(res.data)
      await this.getCovidDataOfSelectedCountry()
    } catch (error) {
      console.log(error)
    }
  }

  @action
  showGraphOfSelectedCountry(start,end) {
    if(this.selectedCountryGraphInfo.length > 0)
      this.selectedCountryGraphInfo = []
    
    if(!!start && !!end) {
      console.log("start:  " + moment(start).format('MM/DD/YYYY'))
      console.log("end:  " + moment(end).format('MM/DD/YYYY'))
      this.countryData
      .sort((a,b) => moment(a.day_data) - moment(b.day_data))
      .forEach((country, index) => {
        // if(moment(country.day_data).isSameOrAfter(start) && moment(country.day_data).isSameOrBefore(end)) {
        if(moment(country.day_data).isBetween(moment(start).format('MM/DD/YYYY'), moment(end).format('MM/DD/YYYY'), undefined, '[]')){
          let sumDeath = 0
          let sumCase = 0
          let sumRecovered = 0
          for(let i = 0; i <= index; i ++) {
            sumDeath = sumDeath + this.countryData[i].numDeceased
            sumCase = sumCase + this.countryData[i].numCase
            sumRecovered = sumRecovered + this.countryData[i].numRecovered
          }
          this.selectedCountryGraphInfo
          .push(
            {
              name: moment(country.day_data).format('MM/DD/YYYY'),
              total_death: sumDeath,
              total_recovered: sumRecovered,
              total_case: sumCase
            }
          )
        }
      }) 
    }
    else {
      this.countryData
      .sort((a,b) => moment(a.day_data) - moment(b.day_data))
      .forEach((country, index) => {
        let sumDeath = 0
        let sumCase = 0
        let sumRecovered = 0
        for(let i = 0; i <= index; i ++) {
          sumDeath = sumDeath + this.countryData[i].numDeceased
          sumCase = sumCase + this.countryData[i].numCase
          sumRecovered = sumRecovered + this.countryData[i].numRecovered
        }
          this.selectedCountryGraphInfo
          .push(
            {
              name: moment(country.day_data).format('MM/DD/YYYY'),
              total_death: sumDeath,
              total_recovered: sumRecovered,
              total_case: sumCase
            }
          )
        }
      )}
      
    console.log(toJS(this.selectedCountryGraphInfo))
  }

  @action
  async getGlobalGraphInfo(start, end) {
    if(this.globalGraphInfo.length > 0)
      this.globalGraphInfo = []

    try {
      const res = await axios.get(`http://localhost:8080/api/v1/covid-data/global-total`)
      const data = toJS(res.data)
      console.log(res.data)
      console.log(toJS(res.data))
      if(!!start && !!end) {
        console.log("start:  " + moment(start).format('MM/DD/YYYY'))
        console.log("end:  " + moment(end).format('MM/DD/YYYY'))
        
        data.sort((a,b) => moment(a.day_data) - moment(b.day_data))
        .forEach((day, index) => {
          const _day_data = moment(day.day_data).format('MM/DD/YYYY')
          console.log("if öncesi   " + _day_data)
          if(moment(_day_data).isBetween(moment(start).format('MM/DD/YYYY'), moment(end).format('MM/DD/YYYY'), undefined, '[]')) {
            let sumDeath = 0
            let sumCase = 0
            let sumRecovered = 0
            for(let i = 0; i <= index; i ++) {
              sumDeath = sumDeath + data[i].numDeceased
              sumCase = sumCase + data[i].numCase
              sumRecovered = sumRecovered + data[i].numRecovered
            }
            this.globalGraphInfo
            .push(
              {
                name: moment(day.day_data).format('MM/DD/YYYY'),
                total_death: sumDeath,
                total_recovered: sumRecovered,
                total_case: sumCase
              })
            console.log("IFE GİRİYOR!!")
          }
        })
      }
      else {
        data.sort((a,b) => moment(a.day_data) - moment(b.day_data))
        .forEach((day, index) => {
          let sumDeath = 0
          let sumCase = 0
          let sumRecovered = 0
          for(let i = 0; i <= index; i ++) {
            sumDeath = sumDeath + data[i].numDeceased
            sumCase = sumCase + data[i].numCase
            sumRecovered = sumRecovered + data[i].numRecovered
          }
          this.globalGraphInfo
          .push(
            {
              name: moment(day.day_data).format('MM/DD/YYYY'),
              total_death: sumDeath,
              total_recovered: sumRecovered,
              total_case: sumCase
              //day.numCase
            }
          )
        }
        )
      }
    } catch (error) {
      console.log(error)
    }    
  }

  

  @action
  async logout() {
    localStorage.clear()
    if(this.countries.length > 0)
      this.countries = []
    this.fetch_status = null
    this.changeLoginStatus(null)
  }

  @action
  changeLoginStatus(status) {
    this.login_status = status
  }

  @action
  changeSignUpStatus(status) {
    this.signup_status = status
  }





    

  @computed
  get selectedCountry() {
    // console.log("computed" + toJS(this.countries)[this.selectedCountryIndex].value)
    return toJS(this.countries)[this.selectedCountryIndex]
  }

  @computed
  get countryData() {
    return toJS(this.countryInfo)
  }

  @computed
  get countryGraphData() {
    return toJS(this.selectedCountryGraphInfo)
  }

  @computed
  get globalGraphData() {
    return toJS(this.globalGraphInfo)
  }
  



}


  




const store = new Store()
export default store