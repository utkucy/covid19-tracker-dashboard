import React  from 'react'
import ReactSearchBox from 'react-search-box'

import { observer } from "mobx-react"
import styled from 'styled-components'

import Store from '../../store/index'
import AddCountry from './add-country'

@observer
class Searchbar extends React.Component {

  handleSelect = (record) => {
    console.log(record)
    Store.showCountryInfo(record.key)
  }

  render() {
    return (
      <Container>
        <ReactSearchBox
        placeholder="Search by country..."
        // value="Doe"
        style={{ display: 'block'  }}
        data={Store.countries}
        // callback={record => this.handleSelect(record)}
        onSelect={record => this.handleSelect(record)}
        inputBoxBorderColor="rgb(85, 85, 85)"
      />
      {!!Store.user.is_admin && 
        <AddCountry/>
      }
      </Container>
    )
  }
  

 
}

const Container = styled.div`
  flex-direction: column;
  width: 30%;
  height: auto;
  padding: 30px;

  margin: 50px;
  border-radius: 25px;
  /* margin-bottom: 5px; */
  /* margin-bottom: 70px; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(251, 235, 224);
`


export default Searchbar