import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { displayToaster } from '../../../Common/components/Toaster'
import withHeader from '../../components/Common/hocs/withHeader'

import { RideRequestForm } from '../../components/RideRequestForm'
import strings from '../../i18n/strings.json'
import { RequestStore } from '../../stores/RequestStore'
import { RideFromData } from '../../components/types'
import { action } from 'mobx'

interface RideRequestRouteProps {}
interface injectProps extends RideRequestRouteProps {
   requestStore: RequestStore
}

@inject('requestStore')
@observer
class RideRequestRoute extends Component {
   constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
      this.onSuccess = this.onSuccess.bind(this)
   }
   get injectProps() {
      return this.props as injectProps
   }
   get requestStore() {
      return this.injectProps.requestStore
   }

   onSubmit(formData: RideFromData) {
      this.doNetworkCalls(formData)
   }

   doNetworkCalls = (formData: RideFromData) => {
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

      this.requestStore.rideRequest(requestObj, this.onSuccess, this.onFailure)
   }
   @action
   onSuccess() {
      displayToaster(strings.requestAddedSuccessfully, false)
   }

   @action
   onFailure(error) {
      displayToaster(strings.somethingWentWrong, true, error)
   }

   render() {
      console.log('ROUTE', this.requestStore.getRideRequestAPIStatus)
      return (
         <RideRequestForm
            onSubmit={this.onSubmit}
            apiStatus={this.requestStore.getRideRequestAPIStatus}
         />
      )
   }
}

export default withHeader(RideRequestRoute)
