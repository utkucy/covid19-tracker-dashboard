import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';

import styled from 'styled-components'
import Store from '../../store/index'
import { observer } from "mobx-react"
import moment from 'moment'

import { DateRangePicker } from 'react-dates';


@observer
class GraphDate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      country_start_date: moment(),
      country_end_date: moment(),
      global_start_date: moment(),
      global_end_date: moment()
    }
  }

  handleDateChangeCountry = (startDate, endDate) => {
    // console.log("FIRST")
    // console.log(moment(startDate).format('MM/DD/YYYY'))
    // console.log(moment(endDate).format('MM/DD/YYYY'))
    this.setState({ country_start_date: startDate })
    this.setState({ country_end_date: endDate })
    // console.log("SECOND")
    // console.log(moment(this.state.country_start_date))
    // console.log(moment(this.state.country_end_date))
    Store.showGraphOfSelectedCountry(startDate, endDate)
  }

  handleDateChangeGlobal = (startDate, endDate) => {
     console.log("FIRST")
    console.log(moment(startDate).format('MM/DD/YYYY'))
    console.log(moment(endDate).format('MM/DD/YYYY'))
    this.setState({ global_start_date: startDate })
    this.setState({ global_end_date: endDate })
    Store.getGlobalGraphInfo(startDate, endDate)
  }

  handleFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
  }

  render() {
    return (
      <Container>
        {!!this.props.country &&
          <PickerContainer>
            <DateRangePicker
            isOutsideRange={() => false}
            startDate={this.state.country_start_date} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.country_end_date} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.handleDateChangeCountry(startDate, endDate)} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.handleFocusChange(focusedInput)} // PropTypes.func.isRequired,
          />
          </PickerContainer>
          
        }

        {!!this.props.global && 
          <DateRangePicker
            isOutsideRange={() => false}
            startDate={this.state.global_start_date} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.global_end_date} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.handleDateChangeGlobal(startDate, endDate)} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.handleFocusChange(focusedInput)} // PropTypes.func.isRequired,
          />
        }
        <TextContainer>
          <CustomText>* Please select date interval to display graph</CustomText>
        </TextContainer>
        
      </Container>
     
    )
  }
}


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PickerContainer = styled.div`
  margin-top: 70px;
`

const TextContainer = styled.div`
  margin-top: 10px;
  
`

const CustomText = styled.text`
  font-family: Montserrat;
  font-size: 14px;
`


export default GraphDate








// {!!this.props.global && 
//   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//     <Grid container justify="space-around">
//       <KeyboardDatePicker
//         disableToolbar
//         variant="inline"
//         format="dd/MM/yyyy"
//         margin="normal"
//         id="date-picker-inline"
//         label="Date picker inline"
//         // value={selectedDate}
//         onChange={this.handleDateChange}
//         KeyboardButtonProps={{
//           'aria-label': 'change date',
//         }}
//       />
//       <KeyboardDatePicker
//         margin="normal"
//         id="date-picker-dialog"
//         label="Date picker dialog"
//         format="MM/dd/yyyy"
//         // value={selectedDate}
//         onChange={this.handleDateChange}
//         KeyboardButtonProps={{
//           'aria-label': 'change date',
//         }}
//       />
//     </Grid>
//   </MuiPickersUtilsProvider>
// }
// {!!this.props.country && 
//   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//     <Grid container justify="space-around">
//       <KeyboardDatePicker
//           margin="normal"
//           id="date-picker-dialog"
//           label="Start Date"
//           format={moment().format('DD/MM/YYYY')}
//           value={Store.countryGraphData[0].name}
//           onChange={this.handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//       <KeyboardDatePicker
//         margin="normal"
//         id="date-picker-dialogg"
//         label="End Date"
//         format={moment().format('DD/MM/YYYY')}
//         // format="dd/MM/yyyy"
//         value={Store.countryGraphData[5].name}
//         onChange={this.handleDateChange}
//         KeyboardButtonProps={{
//           'aria-label': 'change date',
//         }}
//       />
//     </Grid>
//   </MuiPickersUtilsProvider>