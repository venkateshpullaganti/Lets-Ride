import React, { Component } from 'react'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import { observable, computed } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import withHeader from '../../components/Common/hocs/withHeader'
import { displayToaster } from '../../../Common/components/Toaster'

import { ShareTravelInfoForm } from '../../components/ShareTravelInfoForm'
import strings from '../../i18n/strings.json'

@inject('shareStore')
@observer
class ShareTravelInfoRoute extends Component {
   constructor(props) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
   }

   get shareStore() {
      return this.props.shareStore
   }

   onSubmit(formData) {
      this.doNetworkCall(formData)
   }

   doNetworkCall = formData => {
      const {
         sourcePlace,
         destinationPlace,
         isFlexible,
         flexibleFromDate,
         flexibleToDate,
         travelDate,
         travelMedium,
         assetCount
      } = formData
      let mainDate, fromDate, toDate

      if (isFlexible) {
         mainDate = ''
         fromDate = flexibleFromDate
         toDate = flexibleToDate
      } else {
         mainDate = travelDate
         fromDate = ''
         toDate = ''
      }

      const requestObj = {
         source: sourcePlace,
         destination: destinationPlace,
         flexible_timings: isFlexible,
         travel_date_time: mainDate,
         flexible_from_date_time: fromDate,
         flexible_to_date_time: toDate,
         travel_medium: travelMedium,
         asset_quantity: assetCount
      }
      console.log(requestObj)

      this.shareStore.shareTravelInfo(
         requestObj,
         this.onSuccess,
         this.onFailure
      )
   }
   onSuccess = () => {
      displayToaster(strings.travelInfoSharedSuccessfully, false)
   }
   onFailure(error) {
      displayToaster(strings.somethingWentWrong, true, error)
   }

   render() {
      return (
         <ShareTravelInfoForm
            onSubmit={this.onSubmit}
            apiStatus={this.shareStore.getTravelInfoAPIStatus}
         />
      )
   }
}

export default withHeader(ShareTravelInfoRoute)
