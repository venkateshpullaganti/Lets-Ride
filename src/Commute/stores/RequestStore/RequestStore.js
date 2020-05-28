import React from 'react'

import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class RequestStore {
   @observable getRideRequestApiStatus
   @observable getRideRequestApiError

   @observable getAssetRequestApiStatus
   @observable getAssetRequestApiError
   commuteApiService

   constructor(CommuteService) {
      this.commuteApiService = CommuteService
      this.init()
   }

   @action.bound
   setRideRequestAPIResponse(response) {}

   @action.bound
   setGetRideRequestAPIError(APIError) {
      this.getRideRequestApiError = APIError
   }

   @action.bound
   setGetRideRequestAPIStatus(APIStatus) {
      this.getRideRequestApiStatus = APIStatus
   }

   @action.bound
   init() {
      this.getRideRequestApiStatus = API_INITIAL
      this.getRideRequestApiError = null

      this.getAssetRequestApiStatus = API_INITIAL
      this.getAssetRequestApiError = null
   }
   @action.bound
   rideRequest(requestObject, onSuccess, onFailure) {
      const rideRequestPromise = this.commuteApiService.rideRequest(
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
      this.getAssetRequestApiError = APIError
   }

   @action.bound
   setGetAssetRequestAPIStatus(APIStatus) {
      this.getAssetRequestApiStatus = APIStatus
   }

   @action.bound
   assetRequest(requestObject, onSuccess, onFailure) {
      const assetRequestPromise = this.commuteApiService.assetRequest(
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
