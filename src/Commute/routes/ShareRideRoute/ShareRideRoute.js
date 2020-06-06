import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { displayToaster } from '../../../Common/components/Toaster'

import { ShareRideForm } from '../../components/ShareRideForm'
import strings from '../../i18n/strings.json'

@inject('shareStore')
@observer
class ShareRideRoute extends Component {
   constructor(props) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
      this.onSuccess = this.onSuccess.bind(this)
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
         flexibleToDate,
         flexibleFromDate,
         seatCount,
         travelDate,
         laguageCount
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
         seats: seatCount,
         asset_quantity: laguageCount
      }

      this.shareStore.rideShare(requestObj, this.onSuccess, this.onFailure)
   }
   onSuccess = () => {
      displayToaster(strings.requestAddedSuccessfully, false)
   }
   onFailure(Apierror) {
      displayToaster(strings.somethingWentWrong, true, Apierror)
   }

   render() {
      const { onSubmit } = this
      return (
         <ShareRideForm
            onSubmit={onSubmit}
            apiStatus={this.shareStore.getRideShareAPIStatus}
         />
      )
   }
}

export { ShareRideRoute }
