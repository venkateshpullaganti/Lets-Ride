import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { displayToaster } from '../../../Common/components/Toaster'

import { AssetTransportRequestForm } from '../../components/AssetTransportRequestForm'
import strings from '../../i18n/strings.json'

@inject('requestStore')
@observer
class AssetTransportRequestRoute extends Component {
   constructor(props) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
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
         assetCount,
         travelDate,
         selectedAssetSensitivity,
         selectedAssetType,
         whomToDeliver,
         assetTypeOthers
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
         asset_quantity: assetCount,
         asset_type: selectedAssetType,
         asset_sensitivity: selectedAssetSensitivity,
         asset_type_others: assetTypeOthers,
         deliver_to: whomToDeliver.split('-')[0],
         phone_number: whomToDeliver.split('-')[1]
      }
      console.log('route', requestObj)

      this.requestStore.assetRequest(requestObj, this.onSuccess, this.onFailure)
   }
   onSuccess() {
      displayToaster(strings.requestAddedSuccessfully, false)
   }

   onFailure(error) {
      displayToaster(strings.somethingWentWrong, true, error)
   }

   render() {
      return (
         <AssetTransportRequestForm
            onSubmit={this.onSubmit}
            isLoading={
               this.requestStore.getAssetRequestAPIStatus === API_FETCHING
            }
         />
      )
   }
}

export { AssetTransportRequestRoute }
