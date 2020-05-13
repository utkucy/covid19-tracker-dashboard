import React from './node_modules/react';
import { Link } from "./node_modules/react-router-dom"

import styled from './node_modules/styled-components'

import IconButton from './node_modules/@material-ui/core/IconButton';
import ExitToAppRoundedIcon from './node_modules/@material-ui/icons/ExitToAppRounded';
import { makeStyles } from './node_modules/@material-ui/core/styles';

import SimpleTable from '../Simple-Table/simple-table';
import Searchbar from '../Searchbar/searchbar'


const useStyles = makeStyles({
  root: {
    color: 'white',
  },
});


const Dashboard = () => {

  const classes = useStyles();

  return(
    <Container>
      <NavBar>
        <LeftBar>
          <StyledNavText>COVID-19 TRACKER SYSTEM</StyledNavText>
        </LeftBar>
        <RightBar>
          <StyledNavText>Utkucan Yıldırım</StyledNavText>
          <Link  to="/">
            <IconButton aria-label="logout">
              <ExitToAppRoundedIcon classes={{ 
                root: classes.root
              }}fontSize="medium" color="primary" />
            </IconButton>
          </Link>
        </RightBar>
      </NavBar>
      <Content>
          <WorldInfoContainer>
            <Row>
              <WorldNameText>Globally</WorldNameText>
              <WorldInfoText>Total Case</WorldInfoText>
              <WorldInfoText>Total Death</WorldInfoText>
              <WorldInfoText>Total Tests</WorldInfoText>
              <WorldInfoText>Total Recovery</WorldInfoText>
            </Row>
            <Row>
              <WorldNameText style={{ visibility: "hidden" }}>Globally</WorldNameText>
              <WorldInfoText>4,234,654</WorldInfoText>
              <WorldInfoText>244,632</WorldInfoText>
              <WorldInfoText>10,032,872</WorldInfoText>
              <WorldInfoText>2,321,123</WorldInfoText>
            </Row>
          </WorldInfoContainer>
          <Searchbar style={{ marginBottom: 10 }}/>
          <SimpleTable />
      </Content>
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const NavBar = styled.div`
  width: 100%;
  height: 8%;
  background: rgb(66,82,175);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LeftBar = styled.div`
  width: auto;
  display: flex;
  margin-left: 20px;
`

const RightBar = styled.div`
  width: auto;
  display: flex;
`

const StyledNavText = styled.h3`
  font-size: 16px;
  text-align: center;
  color: white;
  font-family: Montserrat;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
`

const WorldInfoContainer = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`

const Row = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const WorldNameText = styled.text`
  font-family: Montserrat-ExtraBold;
  font-size: 42px;
`

const WorldInfoText = styled.text`
  font-family: Montserrat;
  font-size: 20px;
`
 
export default Dashboard;