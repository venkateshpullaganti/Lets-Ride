import React from 'react'

import { NoDataViewContainer, NoDataViewText } from './styledComponents'
interface NoDataViewProps {}
class NoDataView extends React.Component<NoDataViewProps> {
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
