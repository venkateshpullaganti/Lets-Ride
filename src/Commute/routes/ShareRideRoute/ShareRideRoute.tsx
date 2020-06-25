import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { displayToaster } from '../../../Common/components/Toaster'

import withHeader from '../../components/Common/hocs/withHeader'
import { ShareRideForm } from '../../components/ShareRideForm'
import strings from '../../i18n/strings.json'
import { ShareStore } from '../../stores/ShareStore'
import { RideFromData } from '../../components/types'

interface ShareRideRouteProps {}
interface InjectedProps extends ShareRideRouteProps {
   shareStore: ShareStore
}

@inject('shareStore')
@observer
class ShareRideRoute extends Component<ShareRideRouteProps> {
   constructor(props: ShareRideRouteProps) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
      this.onSuccess = this.onSuccess.bind(this)
   }
   get injectedProps() {
      return this.props as InjectedProps
   }

   get shareStore() {
      return this.injectedProps.shareStore
   }

   onSubmit(formData: RideFromData) {
      this.doNetworkCall(formData)
   }

   doNetworkCall = (formData: RideFromData) => {
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

      let mainDate: string, fromDate: string, toDate: string

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
   onFailure(Apierror: Error) {
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

export default withHeader(ShareRideRoute)
