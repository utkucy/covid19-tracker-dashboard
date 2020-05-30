import React from 'react';

import styled from 'styled-components'

class WorldInfo extends React.Component {
  render() {
    return (
      <Container>
        <CustomCard textColor={this.props.textColor}>
          <TitleContainer textColor={this.props.textColor}>
            <Title>
              {this.props.mainText}
            </Title>
          </TitleContainer>
         <DataContainer>
          <Data>
              {this.props.data}
            </Data>
         </DataContainer>
        </CustomCard>
      </Container>
    )
  }
}


const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 70px;
`

const CustomCard = styled.div`
  width: 150px;
  height: 150px;
  min-height: 200px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 6px 19px 1px ${props => props.textColor};
  -moz-box-shadow: 0px 6px 19px 1px ${props => props.textColor};
  box-shadow: 0px 6px 19px 1px ${props => props.textColor};
  
  &:hover {
    -webkit-box-shadow: 0px 6px 19px 1px ${props => props.textColor};
    -moz-box-shadow: 0px 6px 19px 1px ${props => props.textColor};
    box-shadow: 5px 11px 24px 6px ${props => props.textColor};
  }
`

const TitleContainer = styled.div`
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 5px;
`

const DataContainer = styled.div`
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 5px;

`

const Title = styled.text`
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  /* letter-spacing: 0.5px; */
`

const Data = styled.text`
  font-family: Montserrat;
  font-size: 16px;
  letter-spacing: 2px;
`

export default WorldInfo