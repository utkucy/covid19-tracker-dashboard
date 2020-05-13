import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, cases, death, tests, recovery, ic) {
  return { date, cases, death, tests, recovery, ic };
}

const rows = [
  createData('08/06/2020', 3200, 50, 32753, 3876, 1523),
  createData('09/06/2020', 3200, 50, 32753, 3876, 1523),
  createData('10/06/2020', 3200, 50, 32753, 3876, 1523),
  createData('11/06/2020', 3200, 50, 32753, 3876, 1523),
  createData('12/06/2020', 3200, 50, 32753, 3876, 1523),
];

const SimpleTable = () => {
  const classes = useStyles();

  return (
    <Container>
      <CountryInfo>
        <CountryNameText>Turkey</CountryNameText>
        <CountryInfoText>Total Case:</CountryInfoText>
        <CountryInfoText>Total Death:</CountryInfoText>
        <CountryInfoText>Total Tests:</CountryInfoText>
        <CountryInfoText>Total Recovery:</CountryInfoText>
      </CountryInfo>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Cases</TableCell>
              <TableCell align="right">Death</TableCell>
              <TableCell align="right">Tests</TableCell>
              <TableCell align="right">Recovery</TableCell>
              <TableCell align="right">Intensive Care</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.cases}</TableCell>
                <TableCell align="right">{row.death}</TableCell>
                <TableCell align="right">{row.tests}</TableCell>
                <TableCell align="right">{row.recovery}</TableCell>
                <TableCell align="right">{row.ic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  height: 100%;
`

const CountryInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`

const CountryNameText = styled.text`
  font-family: Montserrat-ExtraBold;
  font-size: 32px;
`

const CountryInfoText = styled.text`
  font-family: Montserrat;
  font-size: 20px;
`

export default SimpleTable
