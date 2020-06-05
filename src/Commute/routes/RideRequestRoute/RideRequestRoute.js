import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, computed, action } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { RideRequestForm } from '../../components/RideRequestForm'
import strings from '../../i18n/strings.json'

@inject('requestStore')
@observer
class RideRequestRoute extends Component {
   @observable btnDisplayText

   constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
      this.onSuccess = this.onSuccess.bind(this)
      this.init()
   }

   init = () => {
      this.btnDisplayText = strings.requestBtnText
   }

   get requestStore() {
      return this.props.requestStore
   }

   onSubmit(formData) {
      this.doNetworkCalls(formData)
   }

   doNetworkCalls = formData => {
      const {
         sourcePlace,
         destinationPlace,
         isFlexible,
         flexibleFromDate,
         flexibleToDate,
         seatCount,
         laguageCount,
         travelDate
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
         laguage_quantity: laguageCount
      }
      console.log('req obj', requestObj)

      this.requestStore.rideRequest(requestObj, this.onSuccess, this.onFailure)
   }
   @action
   onSuccess() {
      this.init()
   }

   @action
   onFailure(error) {
      this.btnDisplayText = strings.retry
   }

   render() {
      console.log('ROUTE', this.requestStore.getRideRequestAPIStatus)
      return (
         <RideRequestForm
            onSubmit={this.onSubmit}
            btnDisplayText={this.btnDisplayText}
            isLoading={this.requestStore.getRideRequestAPIStatus === 100}
         />
      )
   }
}

export { RideRequestRoute }
