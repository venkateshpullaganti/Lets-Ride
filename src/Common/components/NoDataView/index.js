import React from 'react'

import { NoDataViewContainer, NoDataViewText } from './styledComponents'

class NoDataView extends React.Component {
   render() {
      return (
         <NoDataViewContainer>
            <NoDataViewText>
               No data found!
               <span> ¯\_(ツ)_/¯ </span>
            </NoDataViewText>
         </NoDataViewContainer>
      )
   }
}

export default NoDataView
