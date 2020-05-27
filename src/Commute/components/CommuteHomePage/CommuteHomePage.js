import React, { Component } from 'react'

import { Header } from '../Header'

import { Root } from './styledComponents'

class CommuteHomePage extends Component {
   render() {
      return (
         <Root>
            <Header />
            <div>Home Page</div>
         </Root>
      )
   }
}

export { CommuteHomePage }
