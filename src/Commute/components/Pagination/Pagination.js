import React, { Component } from 'react'

import { Navigator, Arrow, Page } from './styledComponents'

class Pagination extends Component {
   render() {
      return (
         <Navigator>
            <Arrow>{'<'}</Arrow>
            <Page>{'1'}</Page>
            <Page>{'2'}</Page>
            <Arrow>{'>'}</Arrow>
         </Navigator>
      )
   }
}

export { Pagination }
