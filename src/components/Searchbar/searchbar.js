import React, { Component, useState } from 'react'
import ReactSearchBox from 'react-search-box'

import styled from 'styled-components'

const data = [
  {
    key: 'john',
    value: 'John Doe',
  },
  {
    key: 'jane',
    value: 'Jane Doe',
  },
  {
    key: 'mary',
    value: 'Mary Phillips',
  },
  {
    key: 'robert',
    value: 'Robert',
  },
  {
    key: 'karius',
    value: 'Karius',
  },
]


const Searchbar = () => {

  const [state] = useState(data)

  return (
    <Container>
      <ReactSearchBox
      placeholder="Search by country..."
      // value="Doe"
      data={state}
      callback={record => console.log(record)}
      onSelect={record => console.log(record)}
      inputBoxBorderColor="rgb(66,82,175)"
    />
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  height: auto;
  margin-top: 50px;
  margin-bottom: 100px;
`


export default Searchbar