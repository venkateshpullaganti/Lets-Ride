import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { displayToaster } from '../../../Common/components/Toaster'

import withHeader from '../../components/Common/hocs/withHeader'
import { AssetTransportRequestForm } from '../../components/AssetTransportRequestForm'

import strings from '../../i18n/strings.json'
import { RequestStore } from '../../stores/RequestStore'
import { FormDataType } from '../../components/types'

type AssetTransportRequestRouteProps = {
   requestStore: RequestStore
}

@inject('requestStore')
@observer
class AssetTransportRequestRoute extends Component<
   AssetTransportRequestRouteProps
> {
   constructor(props: AssetTransportRequestRouteProps) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
   }

   get requestStore(): RequestStore {
      return this.props.requestStore
   }

   onSubmit(formData: FormDataType): void {
      this.doNetworkCalls(formData)
   }

   doNetworkCalls = (formData: FormDataType): void => {
      const {
         sourcePlace,
         destinationPlace,
         isFlexible,
         flexibleFromDate,
         flexibleToDate,
         assetCount,
         travelDate,
         selectedAssetSensitivity,
         selectedAssetType,
         whomToDeliver,
         assetTypeOthers
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
         asset_quantity: assetCount,
         asset_type: selectedAssetType,
         asset_sensitivity: selectedAssetSensitivity,
         asset_type_others: assetTypeOthers,
         deliver_to: whomToDeliver.split('-')[0],
         phone_number: whomToDeliver.split('-')[1]
      }

      this.requestStore.assetRequest(requestObj, this.onSuccess, this.onFailure)
   }
   onSuccess(): void {
      displayToaster(strings.requestAddedSuccessfully, false)
   }

   onFailure(error): void {
      displayToaster(strings.somethingWentWrong, true, error)
   }

   render() {
      return (
         <AssetTransportRequestForm
            onSubmit={this.onSubmit}
            apiStatus={this.requestStore.getAssetRequestAPIStatus}
         />
      )
   }
}

export default withHeader(AssetTransportRequestRoute)
