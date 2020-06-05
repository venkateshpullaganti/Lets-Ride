import React, { Component, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, computed } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { ShareRideForm } from '../../components/ShareRideForm'
import strings from '../../i18n/strings.json'

@inject('shareStore')
@observer
class ShareRideRoute extends Component {
   @observable btnDisplayText

   constructor(props) {
      super(props)
      this.init()
      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
      this.onSuccess = this.onSuccess.bind(this)
   }

   init = () => {
      this.seatCount = 0
      this.laguageCount = 0
      this.isFlexible = false
      this.destinationPlace = ''
      this.sourcePlace = ''
      this.errorMsg = null
      this.travelDate = ''
      this.flexibleFromDate = ''
      this.flexibleToDate = ''
      this.btnDisplayText = strings.shareBtnText
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
      this.init()
   }
   onFailure(error) {
      this.btnDisplayText = strings.retry
   }

   render() {
      const { onSubmit, btnDisplayText } = this

      return (
         <ShareRideForm
            onSubmit={onSubmit}
            btnDisplayText={btnDisplayText}
            apiStatus={this.shareStore.getRideShareAPIStatus}
         />
      )
   }
}

export { ShareRideRoute }
