import React, { Component } from 'react'

import images from '../../themes/Images'

import strings from '../../i18n/strings.json'

import {
   Image,
   ErrorContainer,
   ErrorIcon,
   ErrorMsg,
   BackToHomeBtn,
   ErrorCode,
   MsgContainer,
   Message,
   ImgContainer
} from './styledComponents'

interface NetworkErrorViewProps {
   errorMsg: string | null
   statusCode: string | number
   onClickBackToHome: () => void
}

class NetworkErrorView extends Component<NetworkErrorViewProps> {
   static defaultProps = {
      statusCode: 'Error 404'
   }

   render() {
      const { errorMsg, statusCode, onClickBackToHome } = this.props

      return (
         <ErrorContainer>
            <Image src={images.noInternetImage} />
            <MsgContainer>
               <ImgContainer>
                  <ErrorIcon
                     src={images.errorIcon}
                     width='50px'
                     height='50px'
                  />
               </ImgContainer>
               <Message>
                  <ErrorCode>{statusCode}</ErrorCode>
                  <ErrorMsg>{errorMsg}</ErrorMsg>
               </Message>
            </MsgContainer>
            <BackToHomeBtn onClick={onClickBackToHome}>
               {strings.backToHome}
            </BackToHomeBtn>
         </ErrorContainer>
      )
   }
}

export default NetworkErrorView
