import React from 'react'
import { observer } from 'mobx-react'

import images from '../../themes/images'

import {
   FailureViewContainer,
   FailureViewMessage,
   RetryButton,
   Image
} from './styledComponents'

@observer
class FailureView extends React.Component {
   render() {
      const { onRetryClick, errorMsg } = this.props

      return (
         <FailureViewContainer>
            <Image src={images.noInternetImage} />
            <FailureViewMessage>{errorMsg}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </FailureViewContainer>
      )
   }
}

export default FailureView
