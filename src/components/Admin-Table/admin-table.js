import React from 'react';
import MaterialTable from 'material-table'

import { observer } from "mobx-react"
import styled from 'styled-components'
import Store from '../../store/index'

import Graph from '../Graph/graph'
import GraphDate from '../Graph-Date/graph-date'
import WorldInfo from '../WorldInfo/world-info'

import { forwardRef } from 'react';
 
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn'

import Searchbar from '../Searchbar/searchbar'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


@observer
class AdminTable extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      columns: [
        { title: 'Date', field: 'day_data', type: 'date', format: 'DD-MM-YYYY'},
        { title: 'Cases', field: 'numCase', type: 'numeric' },
        { title: 'Death', field: 'numDeceased', type: 'numeric' },
        { title: 'Tests', field: 'numTest', type: 'numeric' },
        { title: 'Recovery', field: 'numRecovered', type: 'numeric' },
        { title: 'Intensive Care', field: 'numICU', type: 'numeric' },
        { title: 'Intubated Patient', field: 'numIntubated', type: 'numeric' },
      ]
    }
    
  }

  render() {
    return (
      <Container>
        <Searchbar />
        <CountryNameContainer>
          <CountryNameText>{Store.selectedCountry.value}</CountryNameText>
        </CountryNameContainer>
        
        <CountryInfo>
          <WorldInfo background="rgb(234, 237, 254)" mainText="Total Case" data={Store.stats.totalCase} textColor="rgb(249, 168, 37)"/>
          <WorldInfo background="rgb(234, 237, 254)" mainText="Total Death" data={Store.stats.totalDeceased} textColor="rgb(191, 54, 12)"/>
          <WorldInfo background="rgb(234, 237, 254)" mainText="Total Test" data={Store.stats.totalTest} textColor="rgb(66, 165, 245)" />
          <WorldInfo background="rgb(234, 237, 254)" mainText="Total Recovery" data={Store.stats.totalRecovered} textColor="rgb(0, 200, 83)"/>
          <WorldInfo background="rgb(234, 237, 254)" mainText="Total Intensive Care" data={Store.stats.totalICU} textColor="rgb(202, 190, 72)"/>
          <WorldInfo background="rgb(234, 237, 254)" mainText="Total Intubated Patient" data={Store.stats.totalIntubated} textColor="rgb(175, 106, 45 )"/>
        </CountryInfo>

        <TableContainer>
        <MaterialTable
          icons={tableIcons}
          title="Country Status"
          columns={this.state.columns}
          // data={this.state.data}
          data={Store.countryData}
          editable={{
            onRowAdd: (newData) => 
              new Promise((resolve) => {
                // console.log(newData.day_data.toISOString().substring(0,10))
                // console.log(moment(newData.day_data).format('MM-DD-YYYY'))
                console.log(newData)
                Store.addCovidDataToCountry(newData)
                setTimeout(() => {
                  resolve();
                }, 600)
              })
             ,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                Store.updateCovidDataOfSelectedCountry(newData, oldData)
                setTimeout(() => {
                  resolve();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                Store.deleteCovidDataOfSelectedCountry(oldData)
                setTimeout(() => {
                  resolve();
                }, 600);
              }),
          }}
        />
        </TableContainer>

        
        <GraphDate country={true}/>
        <Graph country={true}/>
      </Container>

    )
  }
}


const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: rgb(234,254,251);
  /* background: #EEEEEE; */
  padding: 25px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TableContainer = styled.div`
  width: 100%;
`

const CountryInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const CountryNameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CountryNameText = styled.text`
  font-family: Montserrat-ExtraBold;
  font-size: 32px;
`



export default AdminTable
