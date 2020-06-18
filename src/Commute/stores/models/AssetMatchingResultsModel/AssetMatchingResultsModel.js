import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, API_SUCCESS } from '@ib/api-constants'
import { observable, action } from 'mobx'

class AssetMatchingResultsModel {
   id
   sourcePlace
   destinationPlace
   travelDate
   flexibleFromDate
   flexibleToDate
   isFlexible
   assetType
   assetTypeOthers
   assetSensitivity
   assetQuantity
   deliverTo
   receiverPhoneNumber
   isAccepted
   requestedPerson
   requestedPersonMobile
   travelMatchingId
   rideMatchingId

   @observable isAccepted
   @observable assetRequestApiStatus
   @observable assetRequestApiError

   constructor(assetObj, commuteAPIService) {
      this.id = assetObj.asset_request_id
      this.sourcePlace = assetObj.source
      this.destinationPlace = assetObj.destination
      this.travelDate = assetObj.travel_date_time
      this.isFlexible = assetObj.flexible_timings
      this.flexibleFromDate = assetObj.flexible_from_date_time
      this.flexibleToDate = assetObj.flexible_to_date_time
      this.assetType = assetObj.asset_type
      this.assetQuantity = assetObj.asset_quantity
      this.assetTypeOthers = assetObj.asset_type_others
      this.assetSensitivity = assetObj.asset_sensitivity
      this.deliverTo = assetObj.deliver_to
      this.receiverPhoneNumber = assetObj.phone_number
      this.requestedPerson = assetObj.username
      this.requestedPersonMobile = assetObj.user_phone_number
      this.isAccepted = false
      this.travelMatchingId = assetObj.travel_matching_id
      this.rideMatchingId = assetObj.ride_matching_id

      this.commuteService = commuteAPIService
      this.assetRequestApiStatus = API_INITIAL
      this.assetRequestApiError = null
   }
   @action
   setGetAssetRequestApiStatus = status => {
      this.assetRequestApiStatus = status
   }
   @action
   setGetAssetRequestApiError = error => {
      this.assetRequestApiError = error
      console.log(error)
   }
   setGetRideRequestApiResponse = response => {}

   acceptAssetRequest = () => {
      const requestObj = {
         asset_request_id: this.id,
         travel_matching_id: this.travelMatchingId,
         ride_matching_id: this.rideMatchingId
      }
      const requestPromise = this.commuteService.acceptAssetTransportRequest(
         requestObj
      )
      return bindPromiseWithOnSuccess(requestPromise)
         .to(
            this.setGetAssetRequestApiStatus,
            this.setGetRideRequestApiResponse
         )
         .catch(this.setGetAssetRequestApiError)
   }

   acceptRequest = async () => {
      await this.acceptAssetRequest()
      if (this.assetRequestApiStatus === API_SUCCESS) this.isAccepted = true
   }
}

export { AssetMatchingResultsModel }
