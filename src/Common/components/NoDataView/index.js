import React from 'react'

import { NoDataViewContainer, NoDataViewText } from './styledComponents'

class NoDataView extends React.Component {
   render() {
      console.log('no data')
      return (
         <NoDataViewContainer>
            <NoDataViewText>No data found! ¯\_(ツ)_/¯ </NoDataViewText>
         </NoDataViewContainer>
      )
   }
}

export default NoDataView
