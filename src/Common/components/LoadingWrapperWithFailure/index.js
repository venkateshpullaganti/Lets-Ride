import React from 'react'
import { observer } from 'mobx-react'

import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

import LoadingView from './LoadingView'
import FailureView from './FailureView'
import NoDataView from '../NoDataView'

import NetworkErrorView from './NetworkErrorView'

@observer
class LoadingWrapperWithFailure extends React.Component {
   render() {
      const {
         apiStatus,
         renderSuccessUI: RenderSuccessUI,
         onRetryClick,
         apiError,
         isNoData
      } = this.props
      const errorMsg = getUserDisplayableErrorMessage(apiError)

      switch (apiStatus) {
         case API_FETCHING:
            return <LoadingView />
         case API_SUCCESS:
            if (isNoData) return <NoDataView />
            else return <RenderSuccessUI />

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
