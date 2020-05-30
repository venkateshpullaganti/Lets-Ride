import React from 'react'

import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class CommuteStore {
   @observable getMyRideRequestsAPIStatus
   @observable getMyRideRequestsAPIError
   @observable myRideRequests
   @observable totalMyRideRequests

   @observable getMyAssetRequestsAPIStatus
   @observable getMyAssetRequestsAPIError
   @observable myAssetRequests
   @observable totalMyAssetRequests

   commuteAPIService

   constructor(CommuteService) {
      this.commuteAPIService = CommuteService
      this.init()
   }

   @action.bound
   setRideRequestAPIResponse(response) {}

   @action.bound
   setGetMyRideRequestsAPIError(APIError) {
      this.getMyRideRequestsAPIError = APIError
   }

   @action.bound
   setGetMyRideRequestsAPIStatus(APIStatus) {
      this.getMyRideRequestsAPIStatus = APIStatus
   }

   @action.bound
   init() {
      this.getMyRideRequestsAPIStatus = API_INITIAL
      this.getMyRideRequestsAPIError = null

      this.getMyAssetRequestsAPIStatus = API_INITIAL
      this.getMyAssetRequestsAPIError = null
   }
   @action.bound
   myRideRequests(requestObject, onSuccess, onFailure) {
      const rideRequestPromise = this.commuteAPIService.rideRequest(
         requestObject
      )

      return bindPromiseWithOnSuccess(rideRequestPromise)
         .to(this.setGetMyRideRequestsAPIStatus, response => {
            this.setRideRequestAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetMyRideRequestsAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   setMyAssetRequestsAPIResponse(response) {}

   @action.bound
   setGetMyAssetRequestsAPIError(APIError) {
      this.getMyAssetRequestsAPIError = APIError
   }

   @action.bound
   setGetMyAssetRequestsAPIStatus(APIStatus) {
      this.getMyAssetRequestsAPIStatus = APIStatus
   }

   @action.bound
   assetRequest(requestObject, onSuccess, onFailure) {
      const assetRequestPromise = this.commuteAPIService.assetRequest(
         requestObject
      )

      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetMyAssetRequestsAPIStatus, response => {
            this.setMyAssetRequestsAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetMyAssetRequestsAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { CommuteStore }
