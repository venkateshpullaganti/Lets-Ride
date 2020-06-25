import React from 'react'

import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { CommuteService } from '../../services/CommuteService'

class RequestStore {
   @observable getRideRequestAPIStatus!: APIStatus
   @observable getRideRequestAPIError!: Error | null

   @observable getAssetRequestAPIStatus!: APIStatus
   @observable getAssetRequestAPIError!: Error | null

   commuteAPIService: CommuteService

   constructor(commuteService: CommuteService) {
      this.commuteAPIService = commuteService
      this.init()
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   init() {
      this.getRideRequestAPIStatus = API_INITIAL
      this.getRideRequestAPIError = null

      this.getAssetRequestAPIStatus = API_INITIAL
      this.getAssetRequestAPIError = null
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
   rideRequest(
      requestObject,
      onSuccess: () => void,
      onFailure: (error: Error) => void
   ) {
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
   assetRequest(
      requestObject,
      onSuccess: () => void,
      onFailure: (error: Error) => void
   ) {
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
}
export { RequestStore }
