import React, { Component } from 'react'

import { MyRequests } from '../MyRequests'

import withHeader from '../Common/hocs/withHeader'

import { Root, Body } from './styledComponents'

class CommuteHomePage extends Component {
   render() {
      return (
         <Root>
            <Body>
               <MyRequests />
            </Body>
         </Root>
      )
   }
}

export default withHeader(CommuteHomePage)
