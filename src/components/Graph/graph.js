import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import styled from 'styled-components'
import Store from '../../store/index'
import { observer } from "mobx-react"

// const data = [
//   {
//     name: 'Page A', total_death: 4000, total_recovered: 2400, total_case: 2400,
//   },
//   {
//     name: 'Page B', total_death: 3000, total_recovered: 1398, total_case: 2210,
//   },
//   {
//     name: 'Page C', total_death: 2000, total_recovered: 9800, total_case: 2290,
//   },
//   {
//     name: 'Page D', total_death: 2780, total_recovered: 3908, total_case: 2000,
//   },
//   {
//     name: 'Page E', total_death: 1890, total_recovered: 4800, total_case: 2181,
//   },
//   {
//     name: 'Page F', total_death: 2390, total_recovered: 3800, total_case: 2500,
//   },
//   {
//     name: 'Page G', total_death: 3490, total_recovered: 4300, total_case: 2100,
//   },
//   {
//     name: 'Page A', total_death: 4000, total_recovered: 2400, total_case: 2400,
//   },
//   {
//     name: 'Page B', total_death: 3000, total_recovered: 1398, total_case: 2210,
//   },
//   {
//     name: 'Page C', total_death: 2000, total_recovered: 9800, total_case: 2290,
//   },
//   {
//     name: 'Page D', total_death: 2780, total_recovered: 3908, total_case: 2000,
//   },
//   {
//     name: 'Page E', total_death: 1890, total_recovered: 4800, total_case: 2181,
//   },
//   {
//     name: 'Page F', total_death: 2390, total_recovered: 3800, total_case: 2500,
//   },
//   {
//     name: 'Page G', total_death: 3490, total_recovered: 4300, total_case: 2100,
//   },
// ];

@observer
class Graph extends React.Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <Container>
        {!!this.props.global && 
          <ResponsiveContainer width="100%" height={600}>
          <LineChart
            // width="100%"
            // height={300}
            data={Store.globalGraphData}
            // margin={{
            //   top: 50,
            // }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_recovered" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="total_death" stroke="rgb(191, 54, 12)" />
            <Line type="monotone" dataKey="total_case" stroke="rgb(249, 168, 37)" />
          </LineChart>
         
        </ResponsiveContainer> 
        }
        {!!this.props.country &&
          <ResponsiveContainer  width="100%" height={600}>
            <LineChart
              // width="100%"
              // height={300}
              data={Store.countryGraphData}
              margin={{
                top: 30,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_recovered" stroke="#82ca9d" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="total_death" stroke="rgb(191, 54, 12)" />
              <Line type="monotone" dataKey="total_case" stroke="rgb(249, 168, 37)" />
            </LineChart>
          </ResponsiveContainer> 
        }
      </Container>
    )
  }
}


const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(230,250,229); */
`

export default Graph