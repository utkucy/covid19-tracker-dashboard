import React from 'react';
import { Link } from "react-router-dom"

import styled from 'styled-components'
import { observer } from "mobx-react"

import IconButton from '@material-ui/core/IconButton';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';


import SimpleTable from '../../components/Simple-Table/simple-table'
import AdminTable from '../../components/Admin-Table/admin-table'
import WorldInfo from '../../components/WorldInfo/world-info'
import Progress from '../../components/Progress/progress'
import Graph from '../../components/Graph/graph'
import GraphDate from '../../components/Graph-Date/graph-date'

import Store from '../../store/index'

@observer
class Dashboard extends React.Component {

  componentDidMount() {
    Store.fetchData()
  }

  handleLogout() {
    console.log("logout!!!")
    Store.logout()
    console.log(localStorage.getItem('username'))
  }

  render() {
    if(Store.fetch_status === null)
      return <Progress />

    return(
      <Container>
        <NavBar>
          <LeftBar>
            <StyledNavText>COVID-19 TRACKER SYSTEM</StyledNavText>
          </LeftBar>
          <RightBar>
            <StyledNavText>{Store.user.username}, {Store.user.first_name} {Store.user.last_name}</StyledNavText>
            <Link to="/" onClick={() => this.handleLogout()}>
              <IconButton aria-label="logout">
                <LogoutIcon/>
              </IconButton>
            </Link>
          </RightBar>
        </NavBar>
        <Content>
          <World> 
            <WorldInfoTextContainer>
                <WorldInfoText>World Statistics</WorldInfoText>
            </WorldInfoTextContainer>
            <WorldStatisticContainer>
                <WorldInfo background="rgb(234, 237, 254)" mainText="Total Case" data={Store.global_stats.totalCase} textColor="rgb(249, 168, 37)"/>
                <WorldInfo background="rgb(234, 237, 254)" mainText="Total Death" data={Store.global_stats.totalDeceased} textColor="rgb(191, 54, 12)"/>
                <WorldInfo background="rgb(234, 237, 254)" mainText="Total Test" data={Store.global_stats.totalTest} textColor="rgb(66, 165, 245)" />
                <WorldInfo background="rgb(234, 237, 254)" mainText="Total Recovery" data={Store.global_stats.totalRecovered} textColor="rgb(0, 200, 83)"/>
                <WorldInfo background="rgb(234, 237, 254)" mainText="Total Intensive Care" data={Store.global_stats.totalICU} textColor="rgb(202, 190, 72)"/>
                <WorldInfo background="rgb(234, 237, 254)" mainText="Total Intubated Patient" data={Store.global_stats.totalIntubated} textColor="rgb(175, 106, 45 )"/>
            </WorldStatisticContainer>
            <WorldInfoContainer>

              <GraphDate global={true}/>
              <WorldGraphContainer>
                <Graph global={true}/>
              </WorldGraphContainer>
            </WorldInfoContainer>
          </World>

          {!!!Store.user.is_admin && 
            <SimpleTable />
          }

          {!!Store.user.is_admin &&
            <AdminTable/>
          }
          
        </Content>
      </Container>
    )
  }
  
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

`

const NavBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
`

const LeftBar = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  margin-left: 20px;
  align-items: center;
`

const RightBar = styled.div`
  width: auto;
  display: flex;
  height: 100%;
  align-items: center;
`

const StyledNavText = styled.h3`
  font-size: 16px;
  text-align: center;
  color: black;
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

const World = styled.div`

  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(234, 237, 254);
  /* border-radius: 20px; */
  /* margin-top: 100px; */

`

const WorldInfoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`

const WorldInfoTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 10px;
`

const WorldInfoText = styled.text`
  font-family: Montserrat-ExtraBold;
  font-size: 32px;
  
`

const WorldStatisticContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const WorldGraphContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
`

const LogoutIcon = styled(ExitToAppRoundedIcon)`
  color: black;
`
 
export default Dashboard;