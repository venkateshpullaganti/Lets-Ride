import React from 'react'
import { observer } from 'mobx-react'

import images from '../../themes/Images'

import {
   FailureViewContainer,
   FailureViewMessage,
   RetryButton,
   Image
} from './styledComponents'

interface FailureViewProps {
   onRetryClick: () => void
   errorMsg: string
}

@observer
class FailureView extends React.Component<FailureViewProps> {
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
