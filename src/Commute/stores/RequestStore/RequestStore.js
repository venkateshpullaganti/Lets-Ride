import React from 'react'

import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class RequestStore {
   @observable getRideRequestAPIStatus
   @observable getRideRequestAPIError

   @observable getAssetRequestAPIStatus
   @observable getAssetRequestAPIError
   commuteAPIService

   constructor(CommuteService) {
      this.commuteAPIService = CommuteService
      this.init()
   }

   @action.bound
   setRideRequestAPIResponse(response) {}

   @action.bound
   setGetRideRequestAPIError(APIError) {
      this.getRideRequestAPIError = APIError
   }

   @action.bound
   setGetRideRequestAPIStatus(APIStatus) {
      this.getRideRequestAPIStatus = APIStatus
   }

   @action.bound
   init() {
      this.getRideRequestAPIStatus = API_INITIAL
      this.getRideRequestAPIError = null

      this.getAssetRequestAPIStatus = API_INITIAL
      this.getAssetRequestAPIError = null
   }
   @action.bound
   rideRequest(requestObject, onSuccess, onFailure) {
      console.log('store', requestObject)
      const rideRequestPromise = this.commuteAPIService.rideRequest(
         requestObject
      )

      return bindPromiseWithOnSuccess(rideRequestPromise)
         .to(this.setGetRideRequestAPIStatus, response => {
            this.setRideRequestAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetRideRequestAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   setAssetRequestAPIResponse(response) {}

   @action.bound
   setGetAssetRequestAPIError(APIError) {
      this.getAssetRequestAPIError = APIError
   }

   @action.bound
   setGetAssetRequestAPIStatus(APIStatus) {
      this.getAssetRequestAPIStatus = APIStatus
   }

   @action.bound
   assetRequest(requestObject, onSuccess, onFailure) {
      const assetRequestPromise = this.commuteAPIService.assetRequest(
         requestObject
      )

      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetAssetRequestAPIStatus, response => {
            this.setAssetRequestAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetAssetRequestAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { RequestStore }
