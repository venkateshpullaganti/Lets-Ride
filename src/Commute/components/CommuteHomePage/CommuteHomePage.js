import React, { Component } from 'react'

import { Header } from '../Header'
import { MyRequests } from '../MyRequests'

import { Root, Body } from './styledComponents'

class CommuteHomePage extends Component {
   render() {
      return (
         <Root>
            <Header />
            <Body>
               <MyRequests />
            </Body>
         </Root>
      )
   }
}

export { CommuteHomePage }
