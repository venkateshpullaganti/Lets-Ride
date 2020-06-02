import React from 'react'
import { observer } from 'mobx-react'

import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

import LoadingView from './LoadingView'
import FailureView from './FailureView'
<<<<<<< HEAD
import NoDataView from '../NoDataView'
=======
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833

import NetworkErrorView from './NetworkErrorView'

@observer
class LoadingWrapperWithFailure extends React.Component {
   render() {
      const {
         apiStatus,
         renderSuccessUI: RenderSuccessUI,
         onRetryClick,
<<<<<<< HEAD
         apiError,
         isNoData
      } = this.props

      console.log('isNodata', isNoData)

=======
         apiError
      } = this.props
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
      const errorMsg = getUserDisplayableErrorMessage(apiError)

      switch (apiStatus) {
         case API_FETCHING:
            return <LoadingView />
         case API_SUCCESS:
<<<<<<< HEAD
            if (isNoData) return <NoDataView />
            else return <RenderSuccessUI />

=======
            return <RenderSuccessUI />
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
         case API_FAILED:
            return (
               <FailureView onRetryClick={onRetryClick} errorMsg={errorMsg} />
            )

         default:
            return null
      }
   }
}

export default LoadingWrapperWithFailure

// (
//    <NetworkErrorView onRetryClick={onRetryClick} errorMsg={errorMsg} />
// )

/* <FailureView onRetryClick={onRetryClick} errorMsg={errorMsg} /> */
