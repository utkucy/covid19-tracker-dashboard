import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { observer } from "mobx-react"
import styled from 'styled-components'
import Store from '../../store/index'
import WorldInfo from '../WorldInfo/world-info'
import moment from 'moment'

import Searchbar from '../Searchbar/searchbar'
import Graph from '../Graph/graph'
import GraphDate from '../Graph-Date/graph-date'



@observer
class SimpleTable extends React.Component {

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
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >Date</TableCell>
                <TableCell align="right">Cases</TableCell>
                <TableCell align="right">Death</TableCell>
                <TableCell align="right">Tests</TableCell>
                <TableCell align="right">Recovery</TableCell>
                <TableCell align="right">Intensive Care</TableCell>
                <TableCell align="right">Intubated Patient</TableCell>
  
              </TableRow>
            </TableHead>
            <TableBody>
              {Store.countryData
              .sort((a,b) => moment(a.day_data) - moment(b.day_data))
              .map((row, index) => (
                <TableRow key={row.date}>
                  <TableCell component="th" scope="row">
                    {row.day_data}
                  </TableCell>
                  <TableCell align="right">{row.numCase}</TableCell>
                  <TableCell align="right">{row.numDeceased}</TableCell>
                  <TableCell align="right">{row.numTest}</TableCell>
                  <TableCell align="right">{row.numRecovered}</TableCell>
                  <TableCell align="right">{row.numICU}</TableCell>
                  <TableCell align="right">{row.numIntubated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

const CountryInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
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

export default SimpleTable
