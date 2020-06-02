import React from 'react'

// import Loader from '../Icons/Loader'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { LoadingViewContainer } from './styledComponents'

class LoadingView extends React.Component {
   render() {
      return (
         <LoadingViewContainer>
            <Loader type='TailSpin' color='#00BFFF' height={80} width={80} />
         </LoadingViewContainer>
      )
   }
}

export default LoadingView
