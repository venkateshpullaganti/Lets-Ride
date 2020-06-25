import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { displayToaster } from '../../../Common/components/Toaster'

import withHeader from '../../components/Common/hocs/withHeader'
import { ShareTravelInfoForm } from '../../components/ShareTravelInfoForm'
import strings from '../../i18n/strings.json'
import { ShareStore } from '../../stores/ShareStore'
import { ShareTravelInfoData } from '../../components/types'

interface ShareTravelInfoRouteProps {}
interface InjectedProps {
   shareStore: ShareStore
}

@inject('shareStore')
@observer
class ShareTravelInfoRoute extends Component<ShareTravelInfoRouteProps> {
   constructor(props: ShareTravelInfoRouteProps) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
   }
   get injectedProps() {
      return this.props as InjectedProps
   }

   get shareStore() {
      return this.injectedProps.shareStore
   }

   onSubmit(formData: ShareTravelInfoData) {
      this.doNetworkCall(formData)
   }

   doNetworkCall = (formData: ShareTravelInfoData) => {
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
   onFailure(error: Error) {
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
