import React from 'react'

import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ShareStore {
   @observable getRideShareApiStatus
   @observable getRideShareApiError

   @observable getTravelInfoApiStatus
   @observable getTravelInfoApiError
   commuteApiService

   constructor(CommuteService) {
      this.commuteApiService = CommuteService
      this.init()
   }

   @action.bound
   setRideShareAPIResponse(response) {}

   @action.bound
   setGetRideShareAPIError(APIError) {
      this.getRideShareApiError = APIError
   }

   @action.bound
   setGetRideShareAPIStatus(APIStatus) {
      this.getRideShareApiStatus = APIStatus
   }

   @action.bound
   init() {
      this.getRideShareApiStatus = API_INITIAL
      this.getRideShareApiError = null

      this.getTravelInfoApiStatus = API_INITIAL
      this.getTravelInfoApiError = null
   }
   @action.bound
   rideShare(requestObject, onSuccess, onFailure) {
      const rideSharePromise = this.commuteApiService.rideShare(requestObject)

      return bindPromiseWithOnSuccess(rideSharePromise)
         .to(this.setGetRideShareAPIStatus, response => {
            this.setRideShareAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetRideShareAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   setTravelInfoAPIResponse(response) {}

   @action.bound
   setGetTravelInfoAPIError(APIError) {
      this.getTravelInfoApiError = APIError
   }

   @action.bound
   setGetTravelInfoAPIStatus(APIStatus) {
      this.getTravelInfoApiStatus = APIStatus
   }

   @action.bound
   travelInfo(requestObject, onSuccess, onFailure) {
      const travelInfoPromise = this.commuteApiService.travelInfo(requestObject)

      return bindPromiseWithOnSuccess(travelInfoPromise)
         .to(this.setGetTravelInfoAPIStatus, response => {
            this.setTravelInfoAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetTravelInfoAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { ShareStore }
