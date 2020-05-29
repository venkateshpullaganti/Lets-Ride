import React, { Component } from 'react'

import images from '../../themes/images'

import {
   Image,
   ErrorContainer,
   ErrorIcon,
   ErrorMsg,
   RetryBtn,
   ErrorCode
} from './styledComponents'

class NetworkError extends Component {
   render() {
      const { errorMsg, onRetry, retryBtnText } = this.props

      return (
         <ErrorContainer>
            <Image />
            <div>
               <ErrorIcon src={images.errorIcon} width='40px' height='40px' />
               <div>
                  <ErrorCode>{'Error 404 '}</ErrorCode>
                  <ErrorMsg>{errorMsg}</ErrorMsg>
               </div>
            </div>
            <RetryBtn>{retryBtnText}</RetryBtn>
         </ErrorContainer>
      )
   }
}

export { NetworkError }
